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
exports.ServiceController = void 0;
const service_service_1 = require("../services/service.service");
const cloudinary_1 = require("../utils/cloudinary/cloudinary");
const serviceService = new service_service_1.ServiceService();
class ServiceController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const file = req.file;
            if (typeof data.price == 'string') {
                data.price = parseFloat(data.price);
                if (isNaN(data.price)) {
                    return res.status(400).json({ message: "Preço inválido" });
                }
            }
            else if (typeof data.duration == 'string') {
                data.duration = parseInt(data.duration);
                if (isNaN(data.duration)) {
                    return res.status(400).json({ message: "Duração inválida" });
                }
            }
            if (file) {
                const imageUrl = yield (0, cloudinary_1.uploadServiceImage)(file.path);
                data.img = imageUrl;
            }
            const service = yield serviceService.create(data);
            return res.status(201).json(service);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const file = req.file;
            const data = req.body;
            if (typeof data.price == 'string') {
                data.price = parseFloat(data.price);
                if (isNaN(data.price)) {
                    return res.status(400).json({ message: "Preço inválido" });
                }
            }
            else if (typeof data.duration == 'string') {
                data.duration = parseInt(data.duration);
                if (isNaN(data.duration)) {
                    return res.status(400).json({ message: "Duração inválida" });
                }
            }
            if (file) {
                const imageUrl = yield (0, cloudinary_1.uploadServiceImage)(file.path);
                data.img = imageUrl;
            }
            const service = yield serviceService.update(id, data);
            return res.status(200).json(service);
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield serviceService.findAll();
            return res.status(200).json(services);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const service = yield serviceService.delete(id);
            return res.status(200).json(service);
        });
    }
    findById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const service = yield serviceService.findById(id);
            return res.status(200).json(service);
        });
    }
}
exports.ServiceController = ServiceController;
