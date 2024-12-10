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
exports.ServiceRepository = void 0;
const user_repository_1 = require("./user.repository");
class ServiceRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield user_repository_1.prisma.service.create({
                data: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    duration: data.duration,
                    img: data.img
                }, select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    duration: true,
                    img: true
                }
            });
            return service;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield user_repository_1.prisma.service.update({
                where: { id: id },
                data: data, select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    duration: true,
                    img: true
                }
            });
            return service;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield user_repository_1.prisma.service.findMany();
            return services;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield user_repository_1.prisma.service.findFirst({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    duration: true,
                    img: true
                }
            });
            return service;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield user_repository_1.prisma.service.delete({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    duration: true,
                    img: true
                }
            });
            return service;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield user_repository_1.prisma.service.findMany({
                where: { name: name }, select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    duration: true,
                    img: true
                }
            });
            return services;
        });
    }
}
exports.ServiceRepository = ServiceRepository;
