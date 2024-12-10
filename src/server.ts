import { Request, Response ,NextFunction} from "express";
import express from "express";
import "express-async-errors";
import { routes } from "./routes/routes";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import {Server} from "socket.io";
import http from "http" 


dotenv.config();

const app = express();

const server = http.createServer(app);

const io = new Server(server);

export{ io }

app.use(express.json());
app.use(cors());
app.use(routes);
app.use(cookieParser());
  
  // Inicializando o Passport




app.use('files', express.static(path.resolve(__dirname, "..", "tmp")));

app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));
