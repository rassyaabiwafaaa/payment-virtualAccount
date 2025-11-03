import { client } from '../elastic/elastic-client.js'; 
import dotenv from 'dotenv';
dotenv.config();

export const logInfo = async (service, message, data = {}) => {
  try {
    if (process.env.MODE === 'development') {
      console.log(`[INFO][${service}]: ${message}`, data || '');
    }

    // Kirim ke Elasticsearch
    await client.index({
      index: 'briva',
      document: {
        level: 'info',
        service,
        message,
        data,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error(`[LOGGER ERROR]: Gagal kirim log ke Elasticsearch`, error.message);
  }
};

export const logError = async (service, message, error = {}) => {
  console.error(`[ERROR][${service}]: ${message}`, error);

  try {
    await client.index({
      index: 'briva',
      document: {
        level: 'error',
        service,
        message,
        error,
        timestamp: new Date().toISOString()
      }
    });
  } catch (err) {
    console.error(`[LOGGER ERROR]: Gagal kirim log error ke Elasticsearch`, err.message);
  }
};
