import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { UsersControllers } from "../controllers/users.controllers";

const usersControllers = new UsersControllers();

const routes = Router();

routes.post("/register", usersControllers.register);
routes.post('/login',usersControllers.login);
routes.get('/profile/:id',isAuthenticated,usersControllers.profile);
routes.get('/logout',isAuthenticated,usersControllers.logout);
routes.post('/block/:id',isAuthenticated,usersControllers.block);
routes.get('/unblock/:id',isAuthenticated,usersControllers.unBlock);
routes.get('/users',usersControllers.findAll);

export { routes };