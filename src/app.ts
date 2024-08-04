import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import aiRoutes from './routes/aiRoutes';
import materialRoutes from './routes/materialRoutes';
import { setupSwagger } from './swagger';
import telegramRoutes from './routes/telegramRoutes';
// import chatRoutes from './routes/chatRoutes';
import questionRoutes from './routes/questionRoutes'; 
import testRoutes from './routes/testRoutes'; 
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/telegram', telegramRoutes);
app.use('/api', testRoutes); 
// app.use('/api', chatRoutes);
app.use('/api', questionRoutes); 
setupSwagger(app);
mongoose.connect(process.env.MONGO_URI as string, {
} as mongoose.ConnectOptions).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
});

export default app;