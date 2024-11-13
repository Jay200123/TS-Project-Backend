import express, { Router, Request, Response, NextFunction } from 'express';

type Middleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;

type Route = {
    method: keyof Router,
    path: string,
    handler: Middleware;
}

type ErrorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => void;


export {
    express,
    Route,
    Router,
    Request,
    Response,
    NextFunction,
    ErrorMiddleware
}