import { apiRequest } from './api';
export type QrShare={id:string;token:string;resourceType:string;resourceId:string;accessType:string;expiresAt:string|null;isActive:boolean;scanCount:number;lastScannedAt:string|null;shareUrl?:string;createdAt:string};
export const qrApi={
  generate:(payload:unknown)=>apiRequest<QrShare>('/qr/generate',{method:'POST',body:JSON.stringify(payload)}),
  list:()=>apiRequest<QrShare[]>('/qr'),
  get:(id:string)=>apiRequest<QrShare>(`/qr/${id}`),
  resolve:(token:string)=>apiRequest<any>(`/qr/resolve/${encodeURIComponent(token)}`),
  revoke:(id:string)=>apiRequest<QrShare>(`/qr/${id}/revoke`,{method:'POST'}),
  remove:(id:string)=>apiRequest<{deleted:boolean}>(`/qr/${id}`,{method:'DELETE'})
};
