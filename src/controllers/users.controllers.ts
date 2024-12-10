import { ICreateUserDto,ILoginUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { Request,Response,NextFunction } from "express";
import { cookieConfig } from "../config/cookie.config";
import { sendBlockedAccountEmail, sendUnBlockedAccountEmail, sendWelcomeEmail } from "../utils/mail/send.mail.messages";
import { uploadUserAvatar } from "../utils/cloudinary/cloudinary";
import jwt from "jsonwebtoken"

const userService = new UserService();

export class UsersControllers {

    async register(req:Request,res:Response,next:NextFunction) {
        try{
            const data:ICreateUserDto = req.body;

        const user = await userService.create(data);

        await sendWelcomeEmail(user.email, user.name);

        console.log(user.name,user.email)

        return res.status(201).json(user);

        }catch(err){
            next(err)
        }

        
    }

    async login(req:Request,res:Response,next:NextFunction) {
        try{
            const data:ILoginUserDto = req.body;

        const token = await userService.login(data);

        res.cookie("token",cookieConfig);

        return res.status(200).json(token)

        }catch(err){
           next(err)
        }

        
    }

    async logout(req:Request,res:Response,next:NextFunction) {
        try{
            res.clearCookie("token");

        return res.status(200).json({message:"Logout"});

        }catch(err){
            next(err)
        }

        
    }

    async profile(req:Request,res:Response,next:NextFunction){
        try{
            const userId = req.params.id;

            const user = await userService.userprofile(userId);
    
            return res.status(200).json(user);
        }catch(err){
         next(err)
        }

        
    }

    async block(req:Request,res:Response,next:NextFunction) {
        try{
            const userId = req.params.id;

            const user = await userService.block(userId);
    
            sendBlockedAccountEmail(user.email, user.name);
    
            return res.status(200).json(user);

        }catch(error){  
           next(error)
        }

       
    }

    async unBlock(req:Request,res:Response,next:NextFunction) {
        try{
            const userId = req.params.id;

        const user =  await userService.unBlock(userId);

        sendUnBlockedAccountEmail(user.email, user.name);

        return res.status(200).json(user);
           
        }catch(error){
           next(error)
        }

        
    }

    async findAll(req:Request,res:Response,next:NextFunction) {
        try{
            const users = await userService.findAll();

            return res.status(200).json(users);
        }catch(error){
            next(error)
        }

        
    }

    async update(req:Request,res:Response,next:NextFunction) {
        try{
            const userId = req.params.id;

        const file = req.file;
        
        const userData:IUpdateUserDto = req.body;

        if(file) {
            const imageUrl = await uploadUserAvatar(file.path);
            userData.avatar = imageUrl;
        }

        const user = await userService.update(userId,userData);

        return res.status(200).json(user);

        }catch(error){
            next(error)
        }

        

    }

    async delete(req:Request,res:Response,next:NextFunction) {
        try{
            const userId = req.params.id;

        await userService.delete(userId);

        return res.status(200).json({message:"User deleted"});

        }catch(error){
            next(error)
        }

        

    }

  
}    