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
exports.ProfessionalService = void 0;
const professional_repository_1 = require("../repositories/professional.repository");
class ProfessionalService {
    constructor() {
        this.professionalRepository = new professional_repository_1.ProfessionalRepository();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.professionalRepository.create(data);
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professional = yield this.professionalRepository.findById(id);
                if (!professional) {
                    throw new Error("Profissional nao encontrado");
                }
                return yield this.professionalRepository.update(id, data);
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const professional = yield this.professionalRepository.findById(id);
                if (!professional) {
                    throw new Error("Profissional nao encontrado");
                }
                return yield this.professionalRepository.delete(id);
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.professionalRepository.findAll();
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    findBySpecialty(specialty) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.professionalRepository.findBySpecialty(specialty);
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    findByAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.professionalRepository.findByAvailable();
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
    profile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.professionalRepository.profile(id);
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
}
exports.ProfessionalService = ProfessionalService;
