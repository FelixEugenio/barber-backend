import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { UsersControllers } from "../controllers/users.controllers";

const usersControllers = new UsersControllers();

const routes = Router();

routes.post("/register", usersControllers.register);

export { routes };