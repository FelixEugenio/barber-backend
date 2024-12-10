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
const error_types_1 = require("../utils/error/error.types");
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
                console.log(err);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const professional = yield this.professionalRepository.findById(id);
            if (!professional) {
                throw new error_types_1.ConflictError("Profissional nao encontrado");
            }
            return yield this.professionalRepository.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const professional = yield this.professionalRepository.findById(id);
            if (!professional) {
                throw new error_types_1.ConflictError("Profissional nao encontrado");
            }
            return yield this.professionalRepository.delete(id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.professionalRepository.findAll();
        });
    }
    findBySpecialty(specialty) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.professionalRepository.findBySpecialty(specialty);
        });
    }
    findByAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.professionalRepository.findByAvailable();
        });
    }
    profile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.professionalRepository.profile(id);
        });
    }
}
exports.ProfessionalService = ProfessionalService;
