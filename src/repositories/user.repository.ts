import { ICreateUserDto,ILoginUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user.dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
    async create(data:ICreateUserDto):Promise<IUserResponseDto> {
        const user = await prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true
            }
        });
        return user;
    }

    async findByEmail(email:string):Promise<IUserResponseDto> {
        const user = await prisma.user.findUnique({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true
            }
        });
        return user;
    }

    async update(data:IUpdateUserDto, userId:string):Promise<IUserResponseDto> {
        const user = await prisma.user.update({
            where: { 
                id:userId
             },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true
            }

        });
        return user;
    }

    async delete(userId:string):Promise<void> {
        await prisma.user.delete({where:{
            id:userId
        }});
    }

    async profile(userId:string):Promise<IUserResponseDto> {
        const user = await prisma.user.findUnique({
            where: { id:userId },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true
            }
        });
        return user;
    }

    async findById(userId:string):Promise<IUserResponseDto> {
        const user = await prisma.user.findUnique({
            where: { id:userId },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true
            }
        });
        return user;
    }

    async findAll():Promise<IUserResponseDto[]> {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true
            }
        });
        return users;
    }

    async block(userId:string):Promise<void> {
        await prisma.user.update({
            where: { id:userId },
            data: {
                blocked: true
            }
        });
    }

    async unBlock():Promise<void> {
        await prisma.user.updateMany({
            data: {
                blocked: false
            }
        });
    }
}

    
