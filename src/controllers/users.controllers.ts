import { ICreateUserDto,ILoginUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user.dto";
import { UserService } from "../services/user.service";
import { Request,Response } from "express";
import { cookieConfig } from "../config/cookie.config";
import { sendBlockedAccountEmail, sendUnBlockedAccountEmail, sendWelcomeEmail } from "../utils/mail/send.mail.messages";
import { uploadUserAvatar } from "../utils/cloudinary/cloudinary";
import jwt from "jsonwebtoken"

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

    async googleCallback(req: Request, res: Response) {
        // O Passport já armazenou o perfil do usuário no `req.user`
        const { email, name, picture } = req.user as { email: string, name: string, picture: string };

        // Verificar se o usuário já existe no banco de dados
        let user = await userService.findByEmail(email);

        if (!user) {
            // Caso o usuário não exista, criamos um novo
            user = await userService.create({
                name,
                email,
                password: "",  // Usuário do Google não precisa de senha
                avatar: picture,
                phoneNumber: "",  // Opcional
            });
        }

        // Gerar um token JWT para o usuário
        const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

        // Retornar o token para o cliente
        return res.json({ message: "Login com Google bem-sucedido", token });
    }
}    