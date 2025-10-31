import express from 'express';

import{
    createVirtualAccountController as createVa,
    inquiryVirtualAccountController as inquiryVa,
    paymentVirtualAccountController as payVa,
    webHookHandler
} from "../controller/paymentController.js";


const router = express.Router();

router.post('/create-va', createVa);
router.post('/inquiry-va', inquiryVa);
router.post('/payment-va', payVa);
router.post('/payments/webhook', webHookHandler);

export default router;
