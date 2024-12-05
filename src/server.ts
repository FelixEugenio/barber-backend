import { Request, Response } from "express";
import express from "express";
import "express-async-errors";
import { routes } from "./routes/routes";
import dotenv from "dotenv";
import cors from "cors";
import { handleError } from "./utils/error/error.handle";
import path from "path";

dotenv.config();

const app = express();

app.use(express.json());

app.use(routes);

app.use(cors());

app.use(handleError);

app.use('files', express.static(path.resolve(__dirname, "..", "tmp")));

app.listen(process.env.PORT, () => console.log(`server is running on port ${process.env.PORT}`));