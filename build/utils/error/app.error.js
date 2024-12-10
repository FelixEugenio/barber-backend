"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// AppError.ts
class AppError extends Error {
    constructor(message, statusCode, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        // Mantém o stack trace
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.AppError = AppError;
