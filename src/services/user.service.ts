import { ICreateUserDto,ILoginUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";
import { UserNotFoundError, InvalidPasswordError,ConflictError } from "../utils/error/error.types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

export class UserService {
    private userRepository: UserRepository;

    constructor() { 
        this.userRepository = new UserRepository();
    }

    async create(data:ICreateUserDto):Promise<IUserResponseDto> {
        
        const verifyIfUserAlreadyExists = await this.userRepository.findByEmail(data.email);

        if(verifyIfUserAlreadyExists) {
            throw new ConflictError("Utilizador já existe");
        }

        const passwordHash = await bcrypt.hash(data.password, 8);

        const user = await this.userRepository.create({...data, password:passwordHash});

        return user;
    }

    async login(loginData:ILoginUserDto){

        const user = await this.userRepository.findByEmail(loginData.email);
        if(!user) {
            throw new UserNotFoundError();
        }

        const isValidPassword = await bcrypt.compare(loginData.password, user.password);
        if(!isValidPassword) {
            throw new InvalidPasswordError("Palavra Passe Invalida");
        }

        const token = sign(
            {
                name:user.name,
                email:user.email
            },
            process.env.JWT_SECRET,
            {
                subject:user.id,
                expiresIn:"1h"
            }
            
        )
        
        return {
            id:user.id,
            name:user.name,
            email:user.email,
            token
        };
    }

    async delete(id:string) {

        const user = await this.userRepository.findById(id);

        if(!user) {
            throw new UserNotFoundError("Utilizador nao encontrado");
        }

        await this.userRepository.delete(id);
    }

    async findAll():Promise<IUserResponseDto[]> {
        const users = await this.userRepository.findAll();
        return users;
    }

    async userprofile(id:string):Promise<IUserResponseDto> {

        const user = await this.userRepository.findById(id);

        if(!user) {
            throw new UserNotFoundError("Utilizador nao encontrado");
        }

        const userProfile = await this.userRepository.profile(id);
        return userProfile;
    }

    async findById(id:string):Promise<IUserResponseDto> {
        const user = await this.userRepository.findById(id);
        return user;
    }

    async block(id:string) :Promise<IUserResponseDto>{

        const user = await this.userRepository.findById(id);

        if(!user) {
            throw new UserNotFoundError("Utilizador nao encontrado");
        }

      return  await this.userRepository.block(id);
    }

    async unBlock(id:string):Promise<IUserResponseDto>{ 

        const user = await this.userRepository.findById(id);
        
        if(!user) {
            throw new UserNotFoundError("Utilizador nao encontrado");
        }

        return await this.userRepository.unBlock(id);
    }

    async profile(id:string):Promise<IUserResponseDto> {
        const user = await this.userRepository.profile(id);
        return user;
    }

    async update(id:string,data:IUpdateUserDto):Promise<IUserResponseDto>{

        const user = await this.userRepository.findById(id);

        if(!user) {
            throw new UserNotFoundError("Utilizador nao encontrado");
        }
        
        return await this.userRepository.update(id,data);

    }
     
}