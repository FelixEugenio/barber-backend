import { ICreateServiceDto,IServiceResponseDto,IUpdateServiceDto } from "../dtos/service.dto";
import { ServiceRepository } from "../repositories/service.repository";

export class ServiceService {
    private serviceRepository:ServiceRepository;

    constructor(){
        this.serviceRepository = new ServiceRepository();
    }

    async create(data:ICreateServiceDto):Promise<IServiceResponseDto> {

        const verifyIfServiceAlreadyExists = await this.serviceRepository.findByName(data.name);

        if(verifyIfServiceAlreadyExists.length > 0) {
            throw Error("Servico ja cadastrado");
        }

        return await this.serviceRepository.create(data);
    }

    async update(id:string,data:IUpdateServiceDto):Promise<IServiceResponseDto>  {

        const service = await this.serviceRepository.findById(id);

        if(!service) {
            throw new Error("Servico nao encontrado");
        }

        return await this.serviceRepository.update(id,data);
    }

    async delete(id:string):Promise<IServiceResponseDto>  {

        const service = await this.serviceRepository.findById(id);

        if(!service) {
            throw new Error("Servico nao encontrado");
        }

        return await this.serviceRepository.delete(id);

    }

    async findAll():Promise<IServiceResponseDto[]>  {

        return await this.serviceRepository.findAll();

    }

    async findById(id:string):Promise<IServiceResponseDto>  {

        return await this.serviceRepository.findById(id);

    }

}