import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import aiRoutes from './routes/aiRoutes';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);

mongoose.connect(process.env.MONGO_URI as string, {
} as mongoose.ConnectOptions).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
});

export default app;
