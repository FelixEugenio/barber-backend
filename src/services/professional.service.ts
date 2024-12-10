import { ICreateProfessionalDto,IUpdateProfessionalDto,IProfessionalResponseDto } from "../dtos/professional.dto";
import { ProfessionalRepository } from "../repositories/professional.repository";

export class ProfessionalService {

    private professionalRepository:ProfessionalRepository;
    constructor() { 
        this.professionalRepository = new ProfessionalRepository();
    }

    async create(data:ICreateProfessionalDto):Promise<IProfessionalResponseDto>{
        try{
            return await this.professionalRepository.create(data);

        }catch(err){
            console.log(err.message);
        }
    }

    async update(id:string,data:IUpdateProfessionalDto):Promise<IProfessionalResponseDto>{
        try{
            const professional = await this.professionalRepository.findById(id);

            if(!professional) {
                throw new Error("Profissional nao encontrado");
            }
    
            return await this.professionalRepository.update(id,data);

        }catch(err){
            console.log(err.message);
        }

       
    }

    async delete(id:string):Promise<IProfessionalResponseDto>{
        try{
            const professional = await this.professionalRepository.findById(id);

        if(!professional) {
            throw new Error("Profissional nao encontrado");
        }

        return await this.professionalRepository.delete(id);

        }catch(err){
            console.log(err.message);
        }

        

    }

    async findAll():Promise<IProfessionalResponseDto[]>{
        try{
            return await this.professionalRepository.findAll();

        }catch(err){
            console.log(err.message);
        }
        
    }

    async findBySpecialty(specialty:string):Promise<IProfessionalResponseDto[]>{
        try{
            return await this.professionalRepository.findBySpecialty(specialty);
        }catch(err){
            console.log(err.message);
        }
        
    }

    async findByAvailable():Promise<IProfessionalResponseDto[]>{
        try{
            return await this.professionalRepository.findByAvailable();
        }catch(err){
            console.log(err.message);
        }
       
    }

    async profile(id:string):Promise<IProfessionalResponseDto>{
        
        try{
            return await this.professionalRepository.profile(id);
        }catch(err){
            console.log(err.message);
        }
       
    }
}