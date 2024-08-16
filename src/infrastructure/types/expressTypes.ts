import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
    userId?: string;
}

export type Req = AuthenticatedRequest;
export type Res = Response;
export type Next = NextFunction;
