"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const app_error_1 = require("./app.error");
// Função para lidar com erros
const handleError = (err, req, res, next) => {
    // Se o erro for instância de AppError, usamos o statusCode e a mensagem dele.
    if (err instanceof app_error_1.AppError) {
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
exports.handleError = handleError;
