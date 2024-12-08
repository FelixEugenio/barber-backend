import { ICreateUserDto,ILoginUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { Request,Response } from "express";
import { cookieConfig } from "../config/cookie.config";
import { sendBlockedAccountEmail, sendUnBlockedAccountEmail, sendWelcomeEmail } from "../utils/mail/send.mail.messages";
import { uploadUserAvatar } from "../utils/cloudinary/cloudinary";

const userService = new UserService();

export class UsersControllers {

    async register(req:Request,res:Response) {

        const data:ICreateUserDto = req.body;

        const user = await userService.create(data);

        await sendWelcomeEmail(user.email, user.name);

        console.log(user.name,user.email)

        return res.status(201).json(user);
    }

    async login(req:Request,res:Response) {

        const data:ILoginUserDto = req.body;

        const token = await userService.login(data);

        res.cookie("token",cookieConfig);

        return res.status(200).json(token)
    }

    async logout(req:Request,res:Response) {

        res.clearCookie("token");

        return res.status(200).json({message:"Logout"});
    }

    async profile(req:Request,res:Response){

        const userId = req.params.id;

        const user = await userService.userprofile(userId);

        return res.status(200).json(user);
    }

    async block(req:Request,res:Response) {

        const userId = req.params.id;

        const user = await userService.block(userId);

        sendBlockedAccountEmail(user.email, user.name);

        return res.status(200).json(user);
    }

    async unBlock(req:Request,res:Response) {

        const userId = req.params.id;

        const user =  await userService.unBlock(userId);

        sendUnBlockedAccountEmail(user.email, user.name);

        return res.status(200).json(user);
    }

    async findAll(req:Request,res:Response) {

        const users = await userService.findAll();

        return res.status(200).json(users);
    }

    async update(req:Request,res:Response) {

        const userId = req.params.id;

        const file = req.file;
        
        const userData:IUpdateUserDto = req.body;

        if(file) {
            const imageUrl = await uploadUserAvatar(file.path);
            userData.avatar = imageUrl;
        }

        const user = await userService.update(userId,userData);

        return res.status(200).json(user);

    }

    async delete(req:Request,res:Response) {

        const userId = req.params.id;

        await userService.delete(userId);

        return res.status(200).json({message:"User deleted"});

    }
}    