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

    async delete(id:string) {
        await prisma.user.delete({where:{
            id:id
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

    async findById(id:string):Promise<IUserResponseDto> {
        const user = await prisma.user.findFirst({
            where: { id:id },
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

    async block(id:string):Promise<IUserResponseDto> {
      const user =  await prisma.user.update({
            where: { id:id },
            data: {
                blocked: true
            }
        });

         return user;
    }

    async unBlock(id:string):Promise<IUserResponseDto> {
      const user =  await prisma.user.update({
           where: { id:id },
            data: {
                blocked: false
            }
        });

         return user;
    }

    async update(id:string,data:IUpdateUserDto):Promise<IUserResponseDto>  {

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

    
