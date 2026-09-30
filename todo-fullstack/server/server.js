import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import todoRoutes from './routes/todoRoutes.js';
import noteRoutes from './routes/noteRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/todos', todoRoutes);
app.use('/api/notes', noteRoutes);

app.get('/api/test', (req, res) => {
    res.status(200).json({ status: 'success', message: 'Backend is running' });
});

// Central Error Handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;