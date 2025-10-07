import type { User } from "./User"
import { Request } from 'express';

export type LoginPayload = {
    user: User
    token: string
}

export type AuthenticatedRequest = Request & {
    user?: { 
        userID: string, 
        email: string, 
        role: string 
    }
};

export type DecodedToken = {
  userID: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
};