import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connecttoDB from './config/db.config.js';
import morgan from 'morgan';
dotenv.config();
const app = express();
const corsOption = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};
//middlewares 
app.use(express.json());
app.use(cors(corsOption));
app.use(morgan('dev'));
connecttoDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log('Error connecting to MongoDB:', error);
});
//# sourceMappingURL=index.js.map