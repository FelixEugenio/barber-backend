import { Request,Response,NextFunction } from "express";
import { ServiceService } from "../services/service.service";
import { IServiceResponseDto,ICreateServiceDto,IUpdateServiceDto } from "../dtos/service.dto";
import { uploadServiceImage } from "../utils/cloudinary/cloudinary";

const serviceService = new ServiceService();

export class ServiceController{

    async create(req:Request,res:Response,next:NextFunction){
        try{
            const data:ICreateServiceDto = req.body;

            const file = req.file;
    
            if(typeof data.price == 'string'){
                data.price = parseFloat(data.price);
               if(isNaN(data.price)){
                     return res.status(400).json({message:"Preço inválido"});
                }
            }
    
            else if(typeof data.duration == 'string'){
                data.duration = parseInt(data.duration);
                if(isNaN(data.duration)){
                    return res.status(400).json({message:"Duração inválida"});
                }
            }
    
            if(file){
              const imageUrl = await uploadServiceImage(file.path);
              data.img = imageUrl
            }
    
            const service = await serviceService.create(data);
    
            return res.status(201).json(service);
        }catch(err){
           next(err)
        }

        
    }

    async update(req:Request,res:Response,next:NextFunction){
        try{
            const id = req.params.id;
            const file = req.file;
    
            const data:IUpdateServiceDto = req.body;
    
            if(typeof data.price =='string'){
                data.price = parseFloat(data.price);
                if(isNaN(data.price)){
                    return res.status(400).json({message:"Preço inválido"});
                }
            }
    
            else if(typeof data.duration == 'string'){
                data.duration = parseInt(data.duration);
                if(isNaN(data.duration)){
                    return res.status(400).json({message:"Duração inválida"});
                }
    
            }
    
            if(file){
              const imageUrl = await uploadServiceImage(file.path);
              data.img = imageUrl
            }
    
            const service = await serviceService.update(id,data);
    
            return res.status(200).json(service);
        }catch(err){
            next(err)
        }

        
    }

    async findAll(req:Request,res:Response,next:NextFunction){
        try{
            const services = await serviceService.findAll();

            return res.status(200).json(services);
        }catch(err){
            next(err)
        }

        
    }

    async delete(req:Request,res:Response,next:NextFunction){
        try{
            const id = req.params.id;

            const service = await serviceService.delete(id);
    
            return res.status(200).json(service);
        }catch(err){
           next(err)
        }
    }

    async findById(req:Request,res:Response,next:NextFunction){
        try{
            const id = req.params.id;

        const service = await serviceService.findById(id);

        return res.status(200).json(service);

        }catch(err){
           next(err)
        }
    }
}