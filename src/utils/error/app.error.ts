// utils/error/AppError.ts
export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
  
    constructor(message: string, statusCode: number = 400, isOperational: boolean = true) {
      super(message);
  
      this.statusCode = statusCode;
      this.isOperational = isOperational;
  
      // Mantém o stack trace da classe de erro
      Error.captureStackTrace(this, this.constructor);
    }
  }
  