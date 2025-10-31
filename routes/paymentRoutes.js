import express from 'express';

import{
    createVa,
    inquiryVa,
    payVa,
    webHookHandler
} from 'controllers/paymentController.js';


const router = express.Router();

router.post('/create-va', createVa);
router.post('/inquiry-va', inquiryVa);
router.post('/payment-va', payVa);
router.post('/payments/webhook', webHookHandler);

export default router;
