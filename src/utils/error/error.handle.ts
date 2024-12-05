import { Request, Response, NextFunction } from 'express';
import { AppError } from './app.error';

// Função para lidar com erros
export const handleError = (err: any, req: Request, res: Response, next: NextFunction) => {
    // Se o erro for instância de AppError, usamos o statusCode e a mensagem dele.
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    // Se o erro não for um AppError, retornamos erro genérico
    return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
};