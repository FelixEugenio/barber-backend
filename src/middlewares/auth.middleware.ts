import { Request,Response,NextFunction } from "express";
import { IPayloadDto } from "../dtos/user.dto";
import { verify } from "jsonwebtoken";

export async function isAuthenticated(req:Request,res:Response,next:NextFunction): Promise<void>{

    const authHeader = req.headers.authorization;

    if(!authHeader){
        throw new Error("Token not found");
    }

    const [ ,token] = authHeader.split(" ");

    try{
        const {sub} = verify(token,process.env.JWT_SECRET) as IPayloadDto;

        req.userId = sub;

       return next();
       
    }catch(err){
        next(err);
    }
}