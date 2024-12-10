import { ICreateUserDto,ILoginUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";
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
        try{
            const verifyIfUserAlreadyExists = await this.userRepository.findByEmail(data.email);

        if(verifyIfUserAlreadyExists) {
            throw new Error("Utilizador já existe");
        }

        const passwordHash = await bcrypt.hash(data.password, 8);

        const user = await this.userRepository.create({...data, password:passwordHash});

        return user;

        }catch(err){
            console.log(err.message);
        }
        
        
    }

    async login(loginData:ILoginUserDto){
        try{
            const user = await this.userRepository.findByEmail(loginData.email);
        if(!user) {
            throw new Error("Utilizador nao encontrado");
        }

        const isValidPassword = await bcrypt.compare(loginData.password, user.password);
        if(!isValidPassword) {
            throw new Error("Palavra Passe Invalida");
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

        }catch(err) {
            console.log(err.message);
        }

        
    }

    async delete(id:string) {
        try{
            const user = await this.userRepository.findById(id);

            if(!user) {
                throw new Error("Utilizador nao encontrado");
            }
    
            await this.userRepository.delete(id);
        }catch(err) {
            console.log(err.message);
        }

        
    }

    async findAll():Promise<IUserResponseDto[]> {
        try{
            const users = await this.userRepository.findAll();
        return users;

        }catch(err) {
            console.log(err.message);
        }
        
    }

    async userprofile(id:string):Promise<IUserResponseDto> {
        try{
            const user = await this.userRepository.findById(id);

        if(!user) {
            throw new Error("Utilizador nao encontrado");
        }

        const userProfile = await this.userRepository.profile(id);
        return userProfile;

        }catch(err) {
            console.log(err.message);
        }

        
    }

    async findById(id:string):Promise<IUserResponseDto> {
        try{
            const user = await this.userRepository.findById(id);
        return user;

        }catch(err) {
            console.log(err.message);
        }
        
    }

    async block(id:string) :Promise<IUserResponseDto>{
        try{
            const user = await this.userRepository.findById(id);

        if(!user) {
            throw new Error("Utilizador nao encontrado");
        }

      return  await this.userRepository.block(id);

        }catch(err) {
            console.log(err.message);
        }

        
    }

    async unBlock(id:string):Promise<IUserResponseDto>{ 

        try{
            const user = await this.userRepository.findById(id);
        
        if(!user) {
            throw new Error("Utilizador nao encontrado");
        }

        return await this.userRepository.unBlock(id);

        }catch(err) {   
            console.log(err.message);
        }

        
    }

    async profile(id:string):Promise<IUserResponseDto> {
        try{
            const user = await this.userRepository.profile(id);
            return user;
        }catch(err) {
            console.log(err.message);
        }
        
    }

    async update(id:string,data:IUpdateUserDto):Promise<IUserResponseDto>{

        try{
            const user = await this.userRepository.findById(id);

        if(!user) {
            throw new Error("Utilizador nao encontrado");
        }
        
        return await this.userRepository.update(id,data);
        }catch(err) {
            console.log(err.message);
        }

    }

    async findByEmail(email:string):Promise<IUserResponseDto> {
        try{
            const user = await this.userRepository.findByEmail(email);
            return user;
        }catch(error) {
            throw new Error("Utilizador nao encontrado");
        }
        

    }
     
}