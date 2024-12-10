"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositories/user.repository");
const error_types_1 = require("../utils/error/error.types");
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma = new client_1.PrismaClient();
class UserService {
    constructor() {
        this.userRepository = new user_repository_1.UserRepository();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyIfUserAlreadyExists = yield this.userRepository.findByEmail(data.email);
            if (verifyIfUserAlreadyExists) {
                throw new error_types_1.ConflictError("Utilizador já existe");
            }
            const passwordHash = yield bcryptjs_1.default.hash(data.password, 8);
            const user = yield this.userRepository.create(Object.assign(Object.assign({}, data), { password: passwordHash }));
            return user;
        });
    }
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(loginData.email);
            if (!user) {
                throw new error_types_1.UserNotFoundError();
            }
            const isValidPassword = yield bcryptjs_1.default.compare(loginData.password, user.password);
            if (!isValidPassword) {
                throw new error_types_1.InvalidPasswordError("Palavra Passe Invalida");
            }
            const token = (0, jsonwebtoken_1.sign)({
                name: user.name,
                email: user.email
            }, process.env.JWT_SECRET, {
                subject: user.id,
                expiresIn: "1h"
            });
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                token
            };
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw new error_types_1.UserNotFoundError("Utilizador nao encontrado");
            }
            yield this.userRepository.delete(id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.findAll();
            return users;
        });
    }
    userprofile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw new error_types_1.UserNotFoundError("Utilizador nao encontrado");
            }
            const userProfile = yield this.userRepository.profile(id);
            return userProfile;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            return user;
        });
    }
    block(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw new error_types_1.UserNotFoundError("Utilizador nao encontrado");
            }
            return yield this.userRepository.block(id);
        });
    }
    unBlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw new error_types_1.UserNotFoundError("Utilizador nao encontrado");
            }
            return yield this.userRepository.unBlock(id);
        });
    }
    profile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.profile(id);
            return user;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findById(id);
            if (!user) {
                throw new error_types_1.UserNotFoundError("Utilizador nao encontrado");
            }
            return yield this.userRepository.update(id, data);
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByEmail(email);
            return user;
        });
    }
}
exports.UserService = UserService;
