import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { UsersControllers } from "../controllers/users.controllers";
import uploadConfig from "../config/multer.config";
import multer from "multer";

const usersControllers = new UsersControllers();
const upload = multer(uploadConfig.upload("../tmp"));

const routes = Router();

routes.post("/users", usersControllers.register);
routes.post('/login',usersControllers.login);
routes.get('/profile/:id',isAuthenticated,usersControllers.profile);
routes.get('/logout',isAuthenticated,usersControllers.logout);
routes.get('/unblock/:id',isAuthenticated,usersControllers.unBlock);
routes.get('/block/:id',isAuthenticated,usersControllers.block);
routes.get('/users',isAuthenticated,usersControllers.findAll);
routes.put('/users/:id',isAuthenticated,upload.single("file"),usersControllers.update);
routes.delete('/users/delete/:id',isAuthenticated,usersControllers.delete);


export { routes };