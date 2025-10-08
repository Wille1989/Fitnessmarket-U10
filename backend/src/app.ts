import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';
import { env } from './config/env';
import { Request, Response } from 'express';
import userRouter from '../src/routes/user.routes';
import authRouter from './routes/auth.routes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/auth', authRouter);

app.get('/health', (_req: Request, res: Response): Response => {
    return res.status(200).json ({
        ok: true,
        message: 'server is working',
        data: null,
        timeStamp: new Date().toISOString(),
    });
});

app.listen(env.PORT, () => {
    console.log(`Server is running on http://localhost:${env.PORT}`);
});