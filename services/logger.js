import dotenv from 'dotenv';
dotenv.config();

export const logInfo = (message, data) => {
    if(process.env.MODE === 'development'){
        console.log(`[INFO]: ${message}`, data || '');
    }
};

export const logError = (message, error) => {
    console.error(`[ERROR]: ${message}`, error || '');
}

