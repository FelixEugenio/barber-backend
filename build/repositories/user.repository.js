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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
class UserRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield exports.prisma.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    avatar: data.avatar,
                    phoneNumber: data.phoneNumber
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    phoneNumber: true,
                    password: true
                }
            });
            return user;
        });
    }
    findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield exports.prisma.user.findUnique({
                where: { email },
            });
            return user;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.prisma.user.delete({ where: {
                    id: id
                } });
        });
    }
    profile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield exports.prisma.user.findFirst({
                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    phoneNumber: true
                }
            });
            return user;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield exports.prisma.user.findFirst({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    phoneNumber: true
                }
            });
            return user;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield exports.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    phoneNumber: true
                }
            });
            return users;
        });
    }
    block(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield exports.prisma.user.update({
                where: { id: id },
                data: {
                    blocked: true
                }
            });
            return user;
        });
    }
    unBlock(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield exports.prisma.user.update({
                where: { id: id },
                data: {
                    blocked: false
                }
            });
            return user;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield exports.prisma.user.update({
                where: { id: id },
                data: {
                    name: data.name,
                    email: data.email,
                    password: data.password,
                    avatar: data.avatar,
                    phoneNumber: data.phoneNumber
                }, select: {
                    id: true,
                    name: true,
                    email: true,
                    avatar: true,
                    phoneNumber: true
                }
            });
            return user;
        });
    }
}
exports.UserRepository = UserRepository;
