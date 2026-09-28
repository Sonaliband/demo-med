import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError, fail } from '../utils/errors.js';
export const notFound: RequestHandler = (_req,res)=>res.status(404).json(fail('NOT_FOUND','Endpoint not found'));
export const errorHandler: ErrorRequestHandler = (err,_req,res,_next)=>{ const e=err instanceof ZodError?new AppError('VALIDATION_ERROR',err.issues.map(x=>x.message).join('; '),422):err instanceof AppError?err:new AppError('INTERNAL_ERROR','Unexpected server error',500); res.status(e.status).json(fail(e.code,e.message)); };
