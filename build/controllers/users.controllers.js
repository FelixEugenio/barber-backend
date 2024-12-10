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
exports.UsersControllers = void 0;
const user_service_1 = require("../services/user.service");
const cookie_config_1 = require("../config/cookie.config");
const send_mail_messages_1 = require("../utils/mail/send.mail.messages");
const cloudinary_1 = require("../utils/cloudinary/cloudinary");
const userService = new user_service_1.UserService();
class UsersControllers {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const user = yield userService.create(data);
                yield (0, send_mail_messages_1.sendWelcomeEmail)(user.email, user.name);
                console.log(user.name, user.email);
                return res.status(201).json(user);
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const token = yield userService.login(data);
                res.cookie("token", cookie_config_1.cookieConfig);
                return res.status(200).json(token);
            }
            catch (err) {
                next(err);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("token");
                return res.status(200).json({ message: "Logout" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    profile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield userService.userprofile(userId);
                return res.status(200).json(user);
            }
            catch (err) {
                next(err);
            }
        });
    }
    block(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield userService.block(userId);
                (0, send_mail_messages_1.sendBlockedAccountEmail)(user.email, user.name);
                return res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    unBlock(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield userService.unBlock(userId);
                (0, send_mail_messages_1.sendUnBlockedAccountEmail)(user.email, user.name);
                return res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    findAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userService.findAll();
                return res.status(200).json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const file = req.file;
                const userData = req.body;
                if (file) {
                    const imageUrl = yield (0, cloudinary_1.uploadUserAvatar)(file.path);
                    userData.avatar = imageUrl;
                }
                const user = yield userService.update(userId, userData);
                return res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                yield userService.delete(userId);
                return res.status(200).json({ message: "User deleted" });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.UsersControllers = UsersControllers;
