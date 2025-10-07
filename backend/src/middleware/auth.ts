import jwt from "jsonwebtoken";
import { Response, NextFunction } from 'express';
import type { AuthenticatedRequest, DecodedToken } from '../types/user/UserAuth';

export function verifyToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        res.status(401).json({ message: 'Ingen token skickad' });
        return;
    };

    // separate Bearer with token
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
        req.user = decoded;

        next();

    } catch (error) {
        console.error('JWT kunde inte verifiera', error);
        res.status(403).json({ message: 'Ogiltlig eller utgången token' });
        return;
    };
};

export function requireRole(...allowedRoles: string[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const role = req.user?.role;

        if(!role || !allowedRoles.includes(role)){
            res.status(403).json({ message: 'Du har inte tillgång till detta' });
            return;
        };

        next();
    };
};