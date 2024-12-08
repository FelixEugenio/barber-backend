import { ICreateProfessionalDto,IUpdateProfessionalDto,IProfessionalResponseDto } from "../dtos/professional.dto";
import { prisma } from "./user.repository";

export class ProfessionalRepository {

    async create(data:ICreateProfessionalDto):Promise<IProfessionalResponseDto> {
        const professional = await prisma.professional.create({
            data: {
                name: data.name,
                specialty: data.specialty,
                avatar: data.avatar
            },select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar: true
            }
        })
        return professional;
    }

    async update(id:string,data:IUpdateProfessionalDto):Promise<IProfessionalResponseDto> {
        const professional = await prisma.professional.update({
            where: { id:id },
            data: {
                name: data.name,
                specialty: data.specialty,
                available: data.available,
                avatar: data.avatar
            },select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar: true
            }
        })
        return professional;
    }

    async delete(id:string):Promise<IProfessionalResponseDto> {
        const professional = await prisma.professional.delete({
            where: { id:id },
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar: true
            }   
        })

        return professional;

    }

    async findById(id:string):Promise<IProfessionalResponseDto> {
        const professional = await prisma.professional.findFirst({
            where: { id:id },
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar: true
            }   
        })

        return professional;
    }

    async findAll():Promise<IProfessionalResponseDto[]> {
        const professionals = await prisma.professional.findMany({
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar: true
            }   
        })

        return professionals;
    }

    async findBySpecialty(specialty:string):Promise<IProfessionalResponseDto[]> {
        const professionals = await prisma.professional.findMany({
            where: { specialty:specialty },
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar: true
            }   
        })

        return professionals;
    }

    async findByAvailable():Promise<IProfessionalResponseDto[]> {
        const professionals = await prisma.professional.findMany({
            where: { available:true },
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar: true
            }   
        })

        return professionals;
    }

    async profile(id:string):Promise<IProfessionalResponseDto> {
        const professional = await prisma.professional.findFirst({
            where: { id:id },
            select: {
                id: true,
                name: true,
                specialty: true,
                available: true,
                avatar: true
            }   
        })

        return professional;
    }

}