import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import type { Role } from '@prisma/client';
export type TokenPayload = { id: string; role: Role };
export const signToken = (payload: TokenPayload) => jwt.sign(payload, env.JWT_SECRET, { expiresIn: '7d' });
export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET) as TokenPayload;
