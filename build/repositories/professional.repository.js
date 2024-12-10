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
exports.ProfessionalRepository = void 0;
const user_repository_1 = require("./user.repository");
class ProfessionalRepository {
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const professional = yield user_repository_1.prisma.professional.create({
                data: {
                    name: data.name,
                    specialty: data.specialty,
                    avatar: data.avatar
                }, select: {
                    id: true,
                    name: true,
                    specialty: true,
                    available: true,
                    avatar: true
                }
            });
            return professional;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const professional = yield user_repository_1.prisma.professional.update({
                where: { id: id },
                data: {
                    name: data.name,
                    specialty: data.specialty,
                    available: data.available,
                    avatar: data.avatar
                }, select: {
                    id: true,
                    name: true,
                    specialty: true,
                    available: true,
                    avatar: true
                }
            });
            return professional;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const professional = yield user_repository_1.prisma.professional.delete({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    specialty: true,
                    available: true,
                    avatar: true
                }
            });
            return professional;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const professional = yield user_repository_1.prisma.professional.findFirst({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    specialty: true,
                    available: true,
                    avatar: true
                }
            });
            return professional;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const professionals = yield user_repository_1.prisma.professional.findMany({
                select: {
                    id: true,
                    name: true,
                    specialty: true,
                    available: true,
                    avatar: true
                }
            });
            return professionals;
        });
    }
    findBySpecialty(specialty) {
        return __awaiter(this, void 0, void 0, function* () {
            const professionals = yield user_repository_1.prisma.professional.findMany({
                where: { specialty: specialty },
                select: {
                    id: true,
                    name: true,
                    specialty: true,
                    available: true,
                    avatar: true
                }
            });
            return professionals;
        });
    }
    findByAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            const professionals = yield user_repository_1.prisma.professional.findMany({
                where: { available: true },
                select: {
                    id: true,
                    name: true,
                    specialty: true,
                    available: true,
                    avatar: true
                }
            });
            return professionals;
        });
    }
    profile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const professional = yield user_repository_1.prisma.professional.findFirst({
                where: { id: id },
                select: {
                    id: true,
                    name: true,
                    specialty: true,
                    available: true,
                    avatar: true
                }
            });
            return professional;
        });
    }
}
exports.ProfessionalRepository = ProfessionalRepository;
