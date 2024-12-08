import { ICreateUserDto,ILoginUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user.dto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class UserRepository {
    async create(data:ICreateUserDto):Promise<IUserResponseDto> {
        const user = await prisma.user.create({
            data:{
                name:data.name,
                email:data.email,
                password:data.password,
                avatar:data.avatar,
                phoneNumber:data.phoneNumber
            },
            select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true,
                password:true
            }
        });
        return user;
    }

    async findByEmail(email:string) {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    }

    async delete(userId:string) {
        await prisma.user.delete({where:{
            id:userId
        }});
    }

    async profile(userId:string):Promise<IUserResponseDto> {
        const user = await prisma.user.findFirst({
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
        const user = await prisma.user.findFirst({
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

    async block(userId:string):Promise<IUserResponseDto> {
      const user =  await prisma.user.update({
            where: { id:userId },
            data: {
                blocked: true
            }
        });

         return user;
    }

    async unBlock(userId:string):Promise<IUserResponseDto> {
      const user =  await prisma.user.update({
           where: { id:userId },
            data: {
                blocked: false
            }
        });

         return user;
    }

    async updateUser(id:string,data:IUpdateUserDto):Promise<IUserResponseDto>  {

        const user = await prisma.user.update({
            where: { id:id },
            data:{
                name:data.name,
                email:data.email,
                password:data.password,
                avatar:data.avatar,
                phoneNumber:data.phoneNumber
            },select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
                phoneNumber: true
            }
        });

        return user;
    }
}

    
