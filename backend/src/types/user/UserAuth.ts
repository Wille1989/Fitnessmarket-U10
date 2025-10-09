import { PrivateUserDTO } from "../dto/UserDTO";
import { Request } from 'express';

export type LoginPayload = {
    user: PrivateUserDTO
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