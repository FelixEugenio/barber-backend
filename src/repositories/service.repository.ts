import { ICreateServiceDto,IUpdateServiceDto,IServiceResponseDto } from "../dtos/service.dto";
import { prisma } from "./user.repository";

export class ServiceRepository {
    async create(data:ICreateServiceDto):Promise<IServiceResponseDto> {
        const service = await prisma.service.create({
            data:{
                name:data.name,
                description:data.description,
                price:data.price,
                duration:data.duration,
                img:data.img
            },select: {
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true,
                img: true
            }
        }); 
        return service;
    }

    async update(id:string,data:IUpdateServiceDto):Promise<IServiceResponseDto>  {
        const service = await prisma.service.update({
            where: { id:id },
            data:data,select: {
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true,
                img: true
            }
        }); 
        return service;

    }

    async findAll():Promise<IServiceResponseDto[]> {
        const services = await prisma.service.findMany(); 
        return services;
    }

    async findById(id:string):Promise<IServiceResponseDto> {
        const service = await prisma.service.findFirst({
            where: { id:id },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true,
                img: true
            }
        }); 
        return service;
    }

    async delete(id:string):Promise<IServiceResponseDto> {
        const service = await prisma.service.delete({
            where: { id:id },
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true,
                img: true
            }
        }); 
        return service;

    }

    async findByName(name:string):Promise<IServiceResponseDto[]> {
        const services = await prisma.service.findMany({
            where: { name:name },select: {
                id: true,
                name: true,
                description: true,
                price: true,
                duration: true,
                img: true
            }
        }); 
        return services;
    }

}



