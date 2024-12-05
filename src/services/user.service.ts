import { ICreateUserDto,ILoginUserDto,IUpdateUserDto,IUserResponseDto } from "../dtos/user.dto";
import { UserRepository } from "../repositories/user.repository";
import { UserNotFoundError, InvalidPasswordError,ConflictError } from "../utils/error/error.types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import generateToken from "../helpers/auth/generate.token";

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

        const token = generateToken(user.id,user.role);
        return token;
    }

    async update(data:IUpdateUserDto, userId:string):Promise<IUserResponseDto> {
        const user = await this.userRepository.update(data, userId);
        return user;
    }

    async delete(userId:string):Promise<void> {
        await this.userRepository.delete(userId);
    }

    async findAll():Promise<IUserResponseDto[]> {
        const users = await this.userRepository.findAll();
        return users;
    }

    async Userprofile(userId:string):Promise<IUserResponseDto> {
        const user = await this.userRepository.profile(userId);
        return user;
    }

    async findById(userId:string):Promise<IUserResponseDto> {
        const user = await this.userRepository.findById(userId);
        return user;
    }

    async block(userId:string):Promise<void> {
        await this.userRepository.block(userId);
    }

    async unBlock(userId:string):Promise<void> {
        await this.userRepository.unBlock(userId);
    }

    async profile(userId:string):Promise<IUserResponseDto> {
        const user = await this.userRepository.profile(userId);
        return user;
    }
     
}