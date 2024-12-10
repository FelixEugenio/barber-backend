import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { UsersControllers } from "../controllers/users.controllers";
import { ServiceController } from "../controllers/service.controllers";
import { ProfessionalController } from "../controllers/professional.controllers";
import { AppointmentController } from "../controllers/appointment.controllers";
import uploadConfig from "../config/multer.config";
import multer from "multer";
import passport from "passport";
import asyncHandler from "../helpers/auth/controll.exception";


const usersControllers = new UsersControllers();
const professionalController = new ProfessionalController();
const serviceController = new ServiceController();
const appointmentController = new AppointmentController();

const upload = multer(uploadConfig.upload("../tmp"));

const routes = Router();


routes.post("/users", asyncHandler(usersControllers.register));
routes.post('/login', asyncHandler(usersControllers.login));
routes.get('/profile/:id',isAuthenticated,asyncHandler(usersControllers.profile));
routes.get('/logout',isAuthenticated, asyncHandler(usersControllers.logout));
routes.get('/unblock/:id',isAuthenticated, asyncHandler(usersControllers.unBlock));
routes.get('/block/:id',isAuthenticated,asyncHandler(usersControllers.block));
routes.get('/users',isAuthenticated,asyncHandler(usersControllers.findAll));
routes.put('/users/:id',isAuthenticated,upload.single("file"),asyncHandler(usersControllers.update));
routes.delete('/users/delete/:id',isAuthenticated,asyncHandler(usersControllers.delete));

routes.post('/professional',isAuthenticated,upload.single("file"),asyncHandler(professionalController.create));
routes.get('/professionals',isAuthenticated,asyncHandler(professionalController.findAll));
routes.get('/professional/:id',isAuthenticated,asyncHandler(professionalController.profile));
routes.put('/professional/:id',isAuthenticated,upload.single("file"),asyncHandler(professionalController.update));
routes.delete('/professional/:id',isAuthenticated,asyncHandler(professionalController.delete));
routes.get('/professional/specialty/:specialty',isAuthenticated,asyncHandler(professionalController.findBySpecialty));
routes.get('/professional/available',isAuthenticated,asyncHandler(professionalController.findByAvailable));

routes.post('/services',isAuthenticated,upload.single("file"),asyncHandler(serviceController.create));
routes.get('/services',isAuthenticated,asyncHandler(serviceController.findAll));
routes.get('/service/:id',isAuthenticated,asyncHandler(serviceController.findById));
routes.put('/service/:id',isAuthenticated,upload.single("file"),asyncHandler(serviceController.update));
routes.delete('/service/:id',isAuthenticated,asyncHandler(serviceController.delete));

routes.post('/appointments',isAuthenticated,asyncHandler(appointmentController.create));
routes.get('/appointments',isAuthenticated,asyncHandler(appointmentController.getAll));
routes.get('/appointment/:id',isAuthenticated,asyncHandler(appointmentController.getOne));
routes.put('/appointment/:id',isAuthenticated,asyncHandler(appointmentController.update));
routes.delete('/appointment/:id',isAuthenticated,asyncHandler(appointmentController.delete));
routes.get('/appointment/cancel/:id',isAuthenticated,asyncHandler(appointmentController.cancel));


export { routes };