import jwt from "jsonwebtoken";
import { Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../types/user/auth';

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Ingen token skickad' });
    };

    // separate Bearer and token key
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.user = decoded;
        next();
    } catch (error) {
        console.error('JWT kunde inte verifiera', error);
        return res.status(403).json({ message: 'Ogiltlig eller utgången token' });
    };
};

export function requireRole(...allowedRoles: string []) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const role = req.user?.role;

        if(!role || !allowedRoles.includes(role)){
            return res.status(403).json({ message: 'Du har inte tillgång till detta' });
        };
        next();
    };
};