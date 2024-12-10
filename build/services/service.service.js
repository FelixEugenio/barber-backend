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
exports.ServiceService = void 0;
const service_repository_1 = require("../repositories/service.repository");
const error_types_1 = require("../utils/error/error.types");
class ServiceService {
    constructor() {
        this.serviceRepository = new service_repository_1.ServiceRepository();
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyIfServiceAlreadyExists = yield this.serviceRepository.findByName(data.name);
            if (verifyIfServiceAlreadyExists.length > 0) {
                throw new error_types_1.ConflictError("Servico ja cadastrado");
            }
            return yield this.serviceRepository.create(data);
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield this.serviceRepository.findById(id);
            if (!service) {
                throw new error_types_1.ConflictError("Servico nao encontrado");
            }
            return yield this.serviceRepository.update(id, data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield this.serviceRepository.findById(id);
            if (!service) {
                throw new error_types_1.ConflictError("Servico nao encontrado");
            }
            return yield this.serviceRepository.delete(id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.serviceRepository.findAll();
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.serviceRepository.findById(id);
        });
    }
}
exports.ServiceService = ServiceService;
