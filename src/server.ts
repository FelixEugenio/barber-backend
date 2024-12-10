import { Request, Response } from "express";
import express from "express";
import "express-async-errors";
import { routes } from "./routes/routes";
import dotenv from "dotenv";
import cors from "cors";
import { handleError } from "./utils/error/error.handle";
import path from "path";
import cookieParser from "cookie-parser";
import {Server} from "socket.io";
import http from "http" 
import passport from "passport";
import session from "express-session"

dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server);

export{ io }

app.use(express.json());
app.use(routes);
app.use(cookieParser());
app.use(
    session({
      secret: process.env.SECRET_KEY as string,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },  // Defina como `true` se estiver usando HTTPS
    })
  );
  
  // Inicializando o Passport
  app.use(passport.initialize());
  app.use(passport.session());
app.use(cors());

app.use(handleError);

app.use('files', express.static(path.resolve(__dirname, "..", "tmp")));

app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
