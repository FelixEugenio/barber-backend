// errorTypes.ts
import { AppError } from './app.error';

export class UserNotFoundError extends AppError {
    constructor(message: string = "User not found") {
        super(message, 404);  // 404 é o código HTTP para "Não encontrado"
    }
}

export class ServiceNotFoundError extends AppError {
    constructor(message: string = "User not found") {
        super(message, 404);  // 404 é o código HTTP para "Não encontrado"
    }
}

export class InvalidPasswordError extends AppError {
    constructor(message: string = "Invalid password") {
        super(message, 400);  // 400 é o código HTTP para "Bad Request"
    }
}

export class UnauthorizedError extends AppError {
    constructor(message: string = "Unauthorized") {
        super(message, 401);  // 401 é o código HTTP para "Não autorizado"
    }
}

export class ConflictError extends AppError {
    constructor(message: string = "Conflict occurred") {
        super(message, 409);  // 409 é o código HTTP para "Conflito"
    }
}

export class ValidationError extends AppError {
    constructor(message: string = "Validation error") {
        super(message, 422);  // 422 é o código HTTP para "Unprocessable Entity"
    }
}