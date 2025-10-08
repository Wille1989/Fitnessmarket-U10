import express from 'express';
import { Router } from 'express';
import { createUser } from '../controllers/user.controller';
import { loginUser, logoutUser } from '../controllers/auth.controller';
import { verifyToken, requireRole } from '../middleware/auth';

const authRouter: Router = express.Router();

authRouter.post('/register', createUser);
authRouter.post('/login', loginUser);
authRouter.get('/logout', verifyToken, requireRole('admin', 'consumer', 'sales'), logoutUser);

export default authRouter;