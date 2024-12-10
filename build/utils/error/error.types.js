"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = exports.ConflictError = exports.UnauthorizedError = exports.InvalidPasswordError = exports.ServiceNotFoundError = exports.UserNotFoundError = void 0;
// errorTypes.ts
const app_error_1 = require("./app.error");
class UserNotFoundError extends app_error_1.AppError {
    constructor(message = "User not found") {
        super(message, 404); // 404 é o código HTTP para "Não encontrado"
    }
}
exports.UserNotFoundError = UserNotFoundError;
class ServiceNotFoundError extends app_error_1.AppError {
    constructor(message = "User not found") {
        super(message, 404); // 404 é o código HTTP para "Não encontrado"
    }
}
exports.ServiceNotFoundError = ServiceNotFoundError;
class InvalidPasswordError extends app_error_1.AppError {
    constructor(message = "Invalid password") {
        super(message, 400); // 400 é o código HTTP para "Bad Request"
    }
}
exports.InvalidPasswordError = InvalidPasswordError;
class UnauthorizedError extends app_error_1.AppError {
    constructor(message = "Unauthorized") {
        super(message, 401); // 401 é o código HTTP para "Não autorizado"
    }
}
exports.UnauthorizedError = UnauthorizedError;
class ConflictError extends app_error_1.AppError {
    constructor(message = "Conflict occurred") {
        super(message, 409); // 409 é o código HTTP para "Conflito"
    }
}
exports.ConflictError = ConflictError;
class ValidationError extends app_error_1.AppError {
    constructor(message = "Validation error") {
        super(message, 422); // 422 é o código HTTP para "Unprocessable Entity"
    }
}
exports.ValidationError = ValidationError;
