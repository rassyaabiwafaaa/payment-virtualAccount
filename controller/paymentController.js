import{
    createVirtualAccount,
    inquiryVirtualAccount,
    paymentVirtualAccount
} from "../services/va-service.js";


// Controller for creating a virtual account
const createVirtualAccountController = async (req, res) => {
    try{
        const {corp_code, cust_code, amount} = req.body;
        if(!corp_code || !cust_code || !amount){
            return res.status(400).json({message: 'Missing required fields'});
        }

        const virtualAccount = createVirtualAccount(corp_code, cust_code, amount);
        logInfo('Virtual account created successfully:', virtualAccount);
        res.status(200).json({message: 'Virtual account created', data: virtualAccount});

    }

    catch(error){
        console.error('Error creating virtual account:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

// Controller for inquiring a virtual account

const inquiryVirtualAccountController = async (req, res) => {
try{
    const{vaNumber} = req.body;
    if(!vaNumber){
        return res.status(400).json({message: 'Missing virtual account number'});
    }

    const vaDetails = inquiryVirtualAccount(vaNumber);
    logInfo('Virtual account inquiry successful:', vaDetails);
    res.status(200).json({message: 'Virtual account details', data: vaDetails});
}

catch (error){
    console.error('Error inquiring virtual account:', error);
    res.status(500).json({message: 'Internal server error'});
    }
}

// Controller for processing payment to a virtual account
const paymentVirtualAccountController = async (req, res) => {
    try{
        const{vaNumber, amount} = req.body;
        if(!vaNumber || !amount){
            return res.status(400).json({message: 'Missing required fields'});
        }
        const paymentResult = paymentVirtualAccount(vaNumber, amount);
        logInfo('Payment processed successfully:', paymentResult);
        res.status(200).json({message: 'Payment successful', data: paymentResult});
    }
    catch(error){
        console.error('Error processing payment:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

// Controller for handling webhook notifications
const webHookHandler = async (req, res) => {
    try{
        const payload = req.body;
        logInfo('Webhook received:', payload);

        // Process the webhook payload as needed
        res.status(200).json({message: 'Webhook processed successfully'});
    }
    catch(error){
        console.error('Error processing webhook:', error);
        res.status(500).json({message: 'Internal server error'});
    }
}

// export semua controller
export {
  createVirtualAccountController,
  inquiryVirtualAccountController,
  paymentVirtualAccountController,
  webHookHandler
};