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
exports.generateAndUploadQrCodeToCloudinary = exports.uploadServiceImage = exports.uploadProfessionalAvatar = exports.uploadUserAvatar = void 0;
const cloudinary_config_1 = __importDefault(require("../../config/cloudinary.config"));
const qrcode_1 = __importDefault(require("qrcode"));
const uploadUserAvatar = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_config_1.default.uploader.upload(file, {
        folder: "users",
        resource_type: "image",
    });
    return result.secure_url;
});
exports.uploadUserAvatar = uploadUserAvatar;
const uploadProfessionalAvatar = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_config_1.default.uploader.upload(file, {
        folder: "professionals",
        resource_type: "image",
    });
    return result.secure_url;
});
exports.uploadProfessionalAvatar = uploadProfessionalAvatar;
const uploadServiceImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_config_1.default.uploader.upload(file, {
        folder: "services",
        resource_type: "image",
    });
    return result.secure_url;
});
exports.uploadServiceImage = uploadServiceImage;
const generateAndUploadQrCodeToCloudinary = (appointmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const qrCodeData = `https://www.qrbarber/appointment/${appointmentId}`;
    const qrCodeImage = yield qrcode_1.default.toDataURL(qrCodeData);
    const result = yield cloudinary_config_1.default.uploader.upload(qrCodeImage, {
        folder: "qrcodes",
        resource_type: "image",
        public_id: `qrcode-${appointmentId}`,
    });
    return result.secure_url;
});
exports.generateAndUploadQrCodeToCloudinary = generateAndUploadQrCodeToCloudinary;
