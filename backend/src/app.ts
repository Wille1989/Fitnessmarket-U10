import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { Request, Response } from 'express';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// Middleware
app.use(express.json());
app.use(cors())

app.get('/health', (_req: Request, res: Response): Response => {
    return res.status(200).json ({
        ok: true,
        message: 'server is working',
        data: null,
        timeStamp: new Date().toISOString(),
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
});