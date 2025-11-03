
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import paymentsRouter from './routes/paymentRoutes.js';
import client from './elastic/elastic-client.js'; 


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Routes
app.use('/api', paymentsRouter);

console.log(" Registering /api routes..."); // biar ada lognya aja di terminal
app.use('/api', paymentsRouter); // biar ada lognya aja di terminal
console.log("Routes registered."); // biar ada lognya aja di terminal

// Tambahan Health check Elasticsearch juga
app.get('/health', async (req, res) => {
  try {
    const esInfo = await client.info();
    res.status(200).json({
      message: 'Server is healthy',
      elasticsearch: {
        cluster_name: esInfo.cluster_name,
        version: esInfo.version.number,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server running, but failed to connect to Elasticsearch',
      error: error.message,
    });
  }
});


const PORT = process.env.PORT || 3000;
console.log("✅ Routes loaded: /api/create-va, /api/inquiry-va, /api/payment-va");
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});