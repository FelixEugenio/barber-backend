import { ICreateUserDto,ILoginUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { Request,Response } from "express";
import { cookieConfig } from "../config/cookie.config";
import { uploadServiceImage } from "../utils/cloudinary/cloudinary";
import { sendWelcomeEmail } from "../utils/mail/send.mail.messages";

const userService = new UserService();

export class UsersControllers {

    async register(req:Request,res:Response) {
        const data:ICreateUserDto = req.body;
        const user = await userService.create(data);
        await sendWelcomeEmail(user.name, user.email);
        return res.status(201).json(user);
    }

    async login(req:Request,res:Response) {
        const data:ILoginUserDto = req.body;
        const token = await userService.login(data);
        res.cookie("token",cookieConfig);
        return res.status(200).json(token)
    }

    async profile(req:Request,res:Response){
       
    }
}    