import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IPayloadDto } from "../dtos/user.dto";
import { verify } from "jsonwebtoken";
export async function isAuthenticated(req:Request,res:Response,next:NextFunction){
    const authHeader = req.cookies.auth_token;
    if(!authHeader){
        return res.status(401).json({message:"Token not found"});
    }
    const [ ,token] = authHeader.split(" ");
    try{
        const decoded = verify(token,process.env.JWT_SECRET) as IPayloadDto;

        if(!decoded.sub){
            return res.status(401).json({message:"Unauthorized"});
        }

        req.userId = decoded.sub;

       return next();
       
    }catch(err){
        return res.status(401).json({message:"Invalid token"});
    }
}