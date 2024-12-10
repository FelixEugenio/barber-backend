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
exports.UsersControllers = void 0;
const user_service_1 = require("../services/user.service");
const cookie_config_1 = require("../config/cookie.config");
const send_mail_messages_1 = require("../utils/mail/send.mail.messages");
const cloudinary_1 = require("../utils/cloudinary/cloudinary");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService = new user_service_1.UserService();
class UsersControllers {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const user = yield userService.create(data);
            yield (0, send_mail_messages_1.sendWelcomeEmail)(user.email, user.name);
            console.log(user.name, user.email);
            return res.status(201).json(user);
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = req.body;
            const token = yield userService.login(data);
            res.cookie("token", cookie_config_1.cookieConfig);
            return res.status(200).json(token);
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("token");
            return res.status(200).json({ message: "Logout" });
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield userService.userprofile(userId);
            return res.status(200).json(user);
        });
    }
    block(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield userService.block(userId);
            (0, send_mail_messages_1.sendBlockedAccountEmail)(user.email, user.name);
            return res.status(200).json(user);
        });
    }
    unBlock(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const user = yield userService.unBlock(userId);
            (0, send_mail_messages_1.sendUnBlockedAccountEmail)(user.email, user.name);
            return res.status(200).json(user);
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userService.findAll();
            return res.status(200).json(users);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            const file = req.file;
            const userData = req.body;
            if (file) {
                const imageUrl = yield (0, cloudinary_1.uploadUserAvatar)(file.path);
                userData.avatar = imageUrl;
            }
            const user = yield userService.update(userId, userData);
            return res.status(200).json(user);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            yield userService.delete(userId);
            return res.status(200).json({ message: "User deleted" });
        });
    }
    googleCallback(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // O Passport já armazenou o perfil do usuário no `req.user`
            const { email, name, picture } = req.user;
            // Verificar se o usuário já existe no banco de dados
            let user = yield userService.findByEmail(email);
            if (!user) {
                // Caso o usuário não exista, criamos um novo
                user = yield userService.create({
                    name,
                    email,
                    password: "", // Usuário do Google não precisa de senha
                    avatar: picture,
                    phoneNumber: "", // Opcional
                });
            }
            // Gerar um token JWT para o usuário
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
            // Retornar o token para o cliente
            return res.json({ message: "Login com Google bem-sucedido", token });
        });
    }
}
exports.UsersControllers = UsersControllers;
