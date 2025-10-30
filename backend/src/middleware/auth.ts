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
        console.log(decoded);
        req.user = decoded;
        next();

    } catch (error: any) {
        console.error("JWT kunde inte verifieras:", error.name, error.message);
        if(error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Token har gått ut' });
            return;
        }

        res.status(403).json({ message: 'Ogiltlig eller utgången token' });
        return;
    };
};

export function requireRole(...allowedRoles: string[]) {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

        if(!req.user) {
            res.status(401).json({ message: 'Ingen giltig inloggning' });
        };

        const role = req.user?.role;

        if(!role) {
            res.status(403).json({ message: 'Kan inte identifera din roll' });
            return;
        };

        if(!allowedRoles.includes(role)){
            res.status(403).json({ message: `Du har inte behörighet för detta - ${role}` });
            return;
        };

        next();
    };
};
