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
            try {
                const verifyIfUserAlreadyExists = yield this.userRepository.findByEmail(data.email);
                if (verifyIfUserAlreadyExists) {
                    throw new Error("Utilizador já existe");
                }
                const passwordHash = yield bcryptjs_1.default.hash(data.password, 8);
                const user = yield this.userRepository.create(Object.assign(Object.assign({}, data), { password: passwordHash }));
                return user;
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    login(loginData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(loginData.email);
                if (!user) {
                    throw new Error("Utilizador nao encontrado");
                }
                const isValidPassword = yield bcryptjs_1.default.compare(loginData.password, user.password);
                if (!isValidPassword) {
                    throw new Error("Palavra Passe Invalida");
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
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(id);
                if (!user) {
                    throw new Error("Utilizador nao encontrado");
                }
                yield this.userRepository.delete(id);
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.findAll();
                return users;
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    userprofile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(id);
                if (!user) {
                    throw new Error("Utilizador nao encontrado");
                }
                const userProfile = yield this.userRepository.profile(id);
                return userProfile;
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(id);
                return user;
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    block(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(id);
                if (!user) {
                    throw new Error("Utilizador nao encontrado");
                }
                return yield this.userRepository.block(id);
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    unBlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(id);
                if (!user) {
                    throw new Error("Utilizador nao encontrado");
                }
                return yield this.userRepository.unBlock(id);
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    profile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.profile(id);
                return user;
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findById(id);
                if (!user) {
                    throw new Error("Utilizador nao encontrado");
                }
                return yield this.userRepository.update(id, data);
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findByEmail(email);
                return user;
            }
            catch (error) {
                throw new Error("Utilizador nao encontrado");
            }
        });
    }
}
exports.UserService = UserService;
