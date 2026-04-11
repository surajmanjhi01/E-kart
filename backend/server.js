import express from 'express';
import 'dotenv/config';
import connectDB from './database/db.js';
import userRoute from './routes/userRoute.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ CORS first
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api/v1/user', userRoute);

// ✅ Connect DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is   running at port: ${PORT}`);
    });
});
