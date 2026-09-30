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

// Only listen locally; Vercel exports the app as a handler
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running in development mode on http://localhost:${PORT}`);
    });
}

export default app;

// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import connectDB from './config/db.js';

// // Route imports
// import todoRoutes from './routes/todoRoutes.js';
// import noteRoutes from './routes/noteRoutes.js';

// // Middleware imports
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// dotenv.config();

// // Connect to MongoDB
// connectDB();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Standard Middleware
// app.use(cors());
// app.use(express.json());

// // API Routes
// app.use('/api/todos', todoRoutes);
// app.use('/api/notes', noteRoutes);

// // Health-check verification route
// app.get('/api/test', (req, res) => {
//     res.status(200).json({ status: 'success', message: 'Backend is running' });
// });

// // Central Error Handlers (must be registered AFTER all routes)
// app.use(notFound);
// app.use(errorHandler);

// app.listen(PORT, () => {
//     console.log(`Server running in development mode on http://localhost:${PORT}`);
// });