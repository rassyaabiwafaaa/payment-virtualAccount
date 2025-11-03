import {
    createVirtualAccount,
    inquiryVirtualAccount,
    paymentVirtualAccount
} from "../services/va-service.js";

import { logInfo, logError } from "../services/logger.js";              
import client from "../elastic/elastic-client.js";                      


// ========== CREATE VA ( gamasuk log ke kibana ) ==========
const createVirtualAccountController = async (req, res) => {
    try {
        const { customer_name, amount, bank_code, description } = req.body;
        if (!customer_name || !amount || !bank_code || !description) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // karena VA dibuat otomatis tanpa input corp_code dan cust_code
        const virtualAccount = createVirtualAccount(customer_name, amount, bank_code, description);
        logInfo('CreateVA', 'Virtual account created successfully', virtualAccount);

        res.status(200).json({
            message: 'Virtual account created',
            data: virtualAccount
        });

    } catch (error) {
        logError('CreateVA', 'Error creating virtual account', error);
        console.error('Error detail:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// ========== Inquiry VA ==========
const inquiryVirtualAccountController = async (req, res) => {
    try {
        const { vaNumber } = req.body;
        if (!vaNumber) {
            return res.status(400).json({ message: 'Missing virtual account number' });
        }

        const vaDetails = inquiryVirtualAccount(vaNumber);

        // Logging ke Kibana
        await client.index({
            index: 'briva',
            document: {
                service: 'Inquiry',
                vaNumber,
                status: vaDetails ? 'SUCCESS' : 'FAILED',
                message: vaDetails ? 'VA ditemukan dan siap digunakan' : 'VA Tidak Ditemukan',
                timestamp: new Date().toISOString(),
            },
        });

        if (!vaDetails) {
            return res.status(404).json({ message: 'VA Tidak Ditemukan' });
        }

        logInfo('Virtual account inquiry successful:', vaDetails);
        res.status(200).json({ message: 'Virtual account details', data: vaDetails });

    } catch (error) {
        logError('Error inquiring virtual account:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// ========== PAYMENT VA ==========
const paymentVirtualAccountController = async (req, res) => {
    try {
        const { vaNumber, amount } = req.body;
        if (!vaNumber || !amount) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const paymentResult = paymentVirtualAccount(vaNumber, amount);

        // Logging ke Kibana
        await client.index({
            index: 'briva',
            document: {
                service: 'Payment',
                vaNumber,
                status: paymentResult ? 'SUCCESS' : 'FAILED',
                message: paymentResult ? 'Pembayaran berhasil' : 'Pembayaran gagal / VA tidak ditemukan',
                amount,
                timestamp: new Date().toISOString(),
            },
        });

        logInfo('Payment processed successfully:', paymentResult);
        res.status(200).json({ message: 'Payment successful', data: paymentResult });

    } catch (error) {
        logError('Error processing payment:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// ========== CEK STATUS VA  ==========
const checkStatusController = async (req, res) => {
    try {
        const { vaNumber } = req.params;

        if (!vaNumber) {
            return res.status(400).json({ message: 'Missing VA number' });
        }

        // contoh dummy: ambil status dari dummy DB atau map lokal (DIBANTU gpt)
        const dummyData = {
            'VA12345': { status: 'PAID', amount: 10000 },
            'VA99999': { status: 'UNPAID', amount: 5000 },
        };

        const statusData = dummyData[vaNumber] || null;

        // Logging ke Kibana
        await client.index({
            index: 'briva',
            document: {
                service: 'Cek Status',
                vaNumber,
                status: statusData ? statusData.status : 'NOT FOUND',
                message: statusData
                    ? `Status tagihan: ${statusData.status}`
                    : 'VA Tidak Ditemukan',
                timestamp: new Date().toISOString(),
            },
        });

        if (!statusData) {
            return res.status(404).json({ message: 'VA Tidak Ditemukan' });
        }

        res.status(200).json({
            message: 'Status ditemukan',
            data: statusData
        });

    } catch (error) {
        logError('Error checking status VA:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



const webHookHandler = async (req, res) => {
    try {
        const payload = req.body;
        logInfo('Webhook received:', payload);

        // process payload sesuai kebutuhan
        res.status(200).json({ message: 'Webhook processed successfully' });

    } catch (error) {
        logError('Error processing webhook:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


export {
    createVirtualAccountController,
    inquiryVirtualAccountController,
    paymentVirtualAccountController,
    checkStatusController,         //Baru karena pengen ada cek statusTambahan export baru
    webHookHandler
};
