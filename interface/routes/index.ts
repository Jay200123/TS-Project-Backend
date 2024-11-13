import { Router, Request, Response, NextFunction } from 'express';

type Middleware = {
    req: Request,
    res: Response,
    next: NextFunction
}

type Route = {
    method: keyof Router,
    path: string,
    handler: Middleware;
}

export type { Route }