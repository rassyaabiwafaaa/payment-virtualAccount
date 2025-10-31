import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import paymentsRouter from './routes/paymentRoutes.js';



dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/', paymentsRouter);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy');
}
);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});