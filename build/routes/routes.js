"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const users_controllers_1 = require("../controllers/users.controllers");
const service_controllers_1 = require("../controllers/service.controllers");
const professional_controllers_1 = require("../controllers/professional.controllers");
const appointment_controllers_1 = require("../controllers/appointment.controllers");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const multer_1 = __importDefault(require("multer"));
const passport_1 = __importDefault(require("passport"));
const usersControllers = new users_controllers_1.UsersControllers();
const professionalController = new professional_controllers_1.ProfessionalController();
const serviceController = new service_controllers_1.ServiceController();
const appointmentController = new appointment_controllers_1.AppointmentController();
const upload = (0, multer_1.default)(multer_config_1.default.upload("../tmp"));
const routes = (0, express_1.Router)();
exports.routes = routes;
// *** Rotas de Autenticação com Google ***
routes.get("/auth/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
routes.get("/auth/google/callback", passport_1.default.authenticate("google", { failureRedirect: "/" }), (req, res) => {
    // Se o login for bem-sucedido, o usuário é redirecionado para o dashboard ou qualquer página principal
    res.redirect("/dashboard"); // ou a rota que deseja redirecionar após o login
});
routes.get("/logout", (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao sair" });
        }
        res.redirect("/"); // ou qualquer outra página para redirecionar após o logout
    });
});
// *** Rota para exibir o perfil do usuário autenticado ***
routes.get("/profile", auth_middleware_1.isAuthenticated, (req, res) => {
    return res.status(200).json(req.user);
});
routes.post("/users", usersControllers.register);
routes.post('/login', usersControllers.login);
routes.get('/profile/:id', auth_middleware_1.isAuthenticated, usersControllers.profile);
routes.get('/logout', auth_middleware_1.isAuthenticated, usersControllers.logout);
routes.get('/unblock/:id', auth_middleware_1.isAuthenticated, usersControllers.unBlock);
routes.get('/block/:id', auth_middleware_1.isAuthenticated, usersControllers.block);
routes.get('/users', auth_middleware_1.isAuthenticated, usersControllers.findAll);
routes.put('/users/:id', auth_middleware_1.isAuthenticated, upload.single("file"), usersControllers.update);
routes.delete('/users/delete/:id', auth_middleware_1.isAuthenticated, usersControllers.delete);
routes.post('/professional', auth_middleware_1.isAuthenticated, upload.single("file"), professionalController.create);
routes.get('/professionals', auth_middleware_1.isAuthenticated, professionalController.findAll);
routes.get('/professional/:id', auth_middleware_1.isAuthenticated, professionalController.profile);
routes.put('/professional/:id', auth_middleware_1.isAuthenticated, upload.single("file"), professionalController.update);
routes.delete('/professional/:id', auth_middleware_1.isAuthenticated, professionalController.delete);
routes.get('/professional/specialty/:specialty', auth_middleware_1.isAuthenticated, professionalController.findBySpecialty);
routes.get('/professional/available', auth_middleware_1.isAuthenticated, professionalController.findByAvailable);
routes.post('/services', auth_middleware_1.isAuthenticated, upload.single("file"), serviceController.create);
routes.get('/services', auth_middleware_1.isAuthenticated, serviceController.findAll);
routes.get('/service/:id', auth_middleware_1.isAuthenticated, serviceController.findById);
routes.put('/service/:id', auth_middleware_1.isAuthenticated, upload.single("file"), serviceController.update);
routes.delete('/service/:id', auth_middleware_1.isAuthenticated, serviceController.delete);
routes.post('/appointments', auth_middleware_1.isAuthenticated, appointmentController.create);
routes.get('/appointments', auth_middleware_1.isAuthenticated, appointmentController.getAll);
routes.get('/appointment/:id', auth_middleware_1.isAuthenticated, appointmentController.getOne);
routes.put('/appointment/:id', auth_middleware_1.isAuthenticated, appointmentController.update);
routes.delete('/appointment/:id', auth_middleware_1.isAuthenticated, appointmentController.delete);
routes.get('/appointment/cancel/:id', auth_middleware_1.isAuthenticated, appointmentController.cancel);
