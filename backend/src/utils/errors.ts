export class AppError extends Error { constructor(public code: string, message: string, public status = 400) { super(message); } }
export const ok = <T>(data: T) => ({ success: true, data });
export const fail = (code: string, message: string) => ({ success: false, error: { code, message } });
