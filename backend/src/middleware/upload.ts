import multer from 'multer';
import path from 'node:path';
import fs from 'node:fs';
import { env } from '../config/env.js';
fs.mkdirSync(env.UPLOAD_DIR,{recursive:true});
const allowed=new Set(['application/pdf','image/png','image/jpeg']);
export const upload=multer({dest:env.UPLOAD_DIR,limits:{fileSize:5*1024*1024},fileFilter:(_req,file,cb)=>cb(null,allowed.has(file.mimetype))});
export const publicUploadUrl=(filename:string)=>`/api/uploads/${encodeURIComponent(path.basename(filename))}`;
