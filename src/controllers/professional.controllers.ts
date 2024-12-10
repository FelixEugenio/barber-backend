import { ICreateProfessionalDto,IUpdateProfessionalDto,IProfessionalResponseDto } from "../dtos/professional.dto";
import { Request,Response,NextFunction } from "express";
import { ProfessionalService } from "../services/professional.service";
import { uploadProfessionalAvatar } from "../utils/cloudinary/cloudinary";

const professionalService = new ProfessionalService();

export class ProfessionalController {
    async create(req:Request,res:Response,next:NextFunction){
        try{
            const data:ICreateProfessionalDto = req.body;

        const file = req.file;

        if(file){
          const imageUrl = await uploadProfessionalAvatar(file.path);
          data.avatar = imageUrl
        }

        const professional = await professionalService.create(data);

        return res.status(201).json(professional);

        }catch(err){
            next(err)
        }

        
    }
    async update(req:Request,res:Response,next:NextFunction){

        try{
            const id = req.params.id;
            const file = req.file;
    
            const data:IUpdateProfessionalDto = req.body;
    
            if(file){
              const imageUrl = await uploadProfessionalAvatar(file.path);
              req.body.avatar = imageUrl
            }
    
            const professional = await professionalService.update(id,data);
    
            return res.status(200).json(professional);
        }catch(err){
            next(err)
        }

        
    }
    async delete(req:Request,res:Response,next:NextFunction){
        try{
            const id = req.params.id;

            const professional = await professionalService.delete(id);
    
            return res.status(200).json(professional);
        }catch(err){
            next(err)
        }

        
    }
    async findAll(req:Request,res:Response,next:NextFunction){
        try{
            const professionals = await professionalService.findAll();

            return res.status(200).json(professionals);
        }catch(err){
            next(err)
        }

        
    }
    async findBySpecialty(req:Request,res:Response,next:NextFunction){
        try{
            const specialty = req.params.specialty;

            const professionals = await professionalService.findBySpecialty(specialty);
    
            return res.status(200).json(professionals);
        }catch(error){
            next(error)
        }

        
    }

    async findByAvailable(req:Request,res:Response,next:NextFunction){
        try{
            const professionals = await professionalService.findByAvailable();

            return res.status(200).json(professionals);
        }catch(error){
            next(error)
        }

        
    }

    async profile(req:Request,res:Response,next:NextFunction){
        try{
            const id = req.params.id;

            const professional = await professionalService.profile(id);
    
            return res.status(200).json(professional);
        }catch(error){
            next(error)
        }

        
    }
}