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
exports.ProfessionalController = void 0;
const professional_service_1 = require("../services/professional.service");
const cloudinary_1 = require("../utils/cloudinary/cloudinary");
const professionalService = new professional_service_1.ProfessionalService();
class ProfessionalController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const file = req.file;
            if (file) {
                const imageUrl = yield (0, cloudinary_1.uploadProfessionalAvatar)(file.path);
                data.avatar = imageUrl;
            }
            const professional = yield professionalService.create(data);
            return res.status(201).json(professional);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const file = req.file;
            const data = req.body;
            if (file) {
                const imageUrl = yield (0, cloudinary_1.uploadProfessionalAvatar)(file.path);
                req.body.avatar = imageUrl;
            }
            const professional = yield professionalService.update(id, data);
            return res.status(200).json(professional);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const professional = yield professionalService.delete(id);
            return res.status(200).json(professional);
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const professionals = yield professionalService.findAll();
            return res.status(200).json(professionals);
        });
    }
    findBySpecialty(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const specialty = req.params.specialty;
            const professionals = yield professionalService.findBySpecialty(specialty);
            return res.status(200).json(professionals);
        });
    }
    findByAvailable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const professionals = yield professionalService.findByAvailable();
            return res.status(200).json(professionals);
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const professional = yield professionalService.profile(id);
            return res.status(200).json(professional);
        });
    }
}
exports.ProfessionalController = ProfessionalController;
