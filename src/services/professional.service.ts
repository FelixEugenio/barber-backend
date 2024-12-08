import { ICreateProfessionalDto,IUpdateProfessionalDto,IProfessionalResponseDto } from "../dtos/professional.dto";
import { ProfessionalRepository } from "../repositories/professional.repository";
import { ConflictError } from "../utils/error/error.types";

export class ProfessionalService {

    private professionalRepository:ProfessionalRepository;
    constructor() { 
        this.professionalRepository = new ProfessionalRepository();
    }

    async create(data:ICreateProfessionalDto):Promise<IProfessionalResponseDto>{
        
        return await this.professionalRepository.create(data);
    }

    async update(id:string,data:IUpdateProfessionalDto):Promise<IProfessionalResponseDto>{

        const professional = await this.professionalRepository.findById(id);

        if(!professional) {
            throw new ConflictError("Profissional nao encontrado");
        }

        return await this.professionalRepository.update(id,data);
    }

    async delete(id:string):Promise<IProfessionalResponseDto>{

        const professional = await this.professionalRepository.findById(id);

        if(!professional) {
            throw new ConflictError("Profissional nao encontrado");
        }

        return await this.professionalRepository.delete(id);

    }

    async findAll():Promise<IProfessionalResponseDto[]>{
        return await this.professionalRepository.findAll();
    }

    async findBySpecialty(specialty:string):Promise<IProfessionalResponseDto[]>{
        return await this.professionalRepository.findBySpecialty(specialty);
    }

    async findByAvailable():Promise<IProfessionalResponseDto[]>{
        return await this.professionalRepository.findByAvailable();
    }

    async profile(id:string):Promise<IProfessionalResponseDto>{
        return await this.professionalRepository.profile(id);
    }
}