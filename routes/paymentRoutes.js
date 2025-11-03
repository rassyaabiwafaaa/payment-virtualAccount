import express from 'express';

import{
    createVirtualAccountController as createVa,
    inquiryVirtualAccountController as inquiryVa,
    paymentVirtualAccountController as payVa,
    checkStatusController as checkStatus,     // [BARU] controller Cek Status
    webHookHandler
} from "../controller/paymentController.js";


const router = express.Router();

console.log("🧭 paymentRoutes.js loaded"); // biar ada lognya aja di terminal

router.post('/create-va', (req, res, next) => {
  console.log("🔥 Route /create-va hit");
  next();
}, createVa);

router.post('/create-va', createVa);
router.post('/inquiry-va', inquiryVa);
router.post('/payment-va', payVa);
router.get('/status/:vaNumber', checkStatus);  // [BARU] Tambahkan route cek status
router.post('/payments/webhook', webHookHandler);

export default router;
