import type { RequestHandler } from 'express';
import { AppError } from '../utils/errors.js';
import { verifyToken } from '../utils/jwt.js';
export const requireAuth: RequestHandler = (req, _res, next) => { const header=req.headers.authorization; if(!header?.startsWith('Bearer ')) return next(new AppError('AUTH_REQUIRED','Authentication required',401)); try { req.user=verifyToken(header.slice(7)); next(); } catch { next(new AppError('INVALID_TOKEN','Invalid or expired token',401)); } };
export const requireRole = (...roles: string[]): RequestHandler => (req,_res,next)=>{ if(!req.user||!roles.includes(req.user.role)) return next(new AppError('FORBIDDEN','Insufficient permissions',403)); next(); };
