import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { UsersControllers } from "../controllers/users.controllers";
import { ServiceController } from "../controllers/service.controllers";
import { ProfessionalController } from "../controllers/professional.controllers";
import { AppointmentController } from "../controllers/appointment.controllers";
import uploadConfig from "../config/multer.config";
import multer from "multer";
import passport from "passport";


const usersControllers = new UsersControllers();
const professionalController = new ProfessionalController();
const serviceController = new ServiceController();
const appointmentController = new AppointmentController();

const upload = multer(uploadConfig.upload("../tmp"));

const routes = Router();


// *** Rotas de Autenticação com Google ***
routes.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  
  routes.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
      // Se o login for bem-sucedido, o usuário é redirecionado para o dashboard ou qualquer página principal
      res.redirect("/dashboard");  // ou a rota que deseja redirecionar após o login
    }
  );
  
  routes.get("/logout", (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Erro ao sair" });
      }
      res.redirect("/");  // ou qualquer outra página para redirecionar após o logout
    });
  });
  
  // *** Rota para exibir o perfil do usuário autenticado ***
  routes.get("/profile", isAuthenticated, (req, res) => {
    return res.status(200).json(req.user);
  });

routes.post("/users", usersControllers.register);
routes.post('/login',usersControllers.login);
routes.get('/profile/:id',isAuthenticated,usersControllers.profile);
routes.get('/logout',isAuthenticated,usersControllers.logout);
routes.get('/unblock/:id',isAuthenticated,usersControllers.unBlock);
routes.get('/block/:id',isAuthenticated,usersControllers.block);
routes.get('/users',isAuthenticated,usersControllers.findAll);
routes.put('/users/:id',isAuthenticated,upload.single("file"),usersControllers.update);
routes.delete('/users/delete/:id',isAuthenticated,usersControllers.delete);

routes.post('/professional',isAuthenticated,upload.single("file"),professionalController.create);
routes.get('/professionals',isAuthenticated,professionalController.findAll);
routes.get('/professional/:id',isAuthenticated,professionalController.profile);
routes.put('/professional/:id',isAuthenticated,upload.single("file"),professionalController.update);
routes.delete('/professional/:id',isAuthenticated,professionalController.delete);
routes.get('/professional/specialty/:specialty',isAuthenticated,professionalController.findBySpecialty);
routes.get('/professional/available',isAuthenticated,professionalController.findByAvailable);

routes.post('/services',isAuthenticated,upload.single("file"),serviceController.create);
routes.get('/services',isAuthenticated,serviceController.findAll);
routes.get('/service/:id',isAuthenticated,serviceController.findById);
routes.put('/service/:id',isAuthenticated,upload.single("file"),serviceController.update);
routes.delete('/service/:id',isAuthenticated,serviceController.delete);

routes.post('/appointments',isAuthenticated,appointmentController.create);
routes.get('/appointments',isAuthenticated,appointmentController.getAll);
routes.get('/appointment/:id',isAuthenticated,appointmentController.getOne);
routes.put('/appointment/:id',isAuthenticated,appointmentController.update);
routes.delete('/appointment/:id',isAuthenticated,appointmentController.delete);
routes.get('/appointment/cancel/:id',isAuthenticated,appointmentController.cancel);


export { routes };