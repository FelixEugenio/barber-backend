import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import { IPayloadDto } from "../dtos/user.dto";
import { verify } from "jsonwebtoken";

export async function isAuthenticated(req:Request,res:Response,next:NextFunction){

    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"Token not found"});
    }

    const [ ,token] = authHeader.split(" ");

    try{
        const {sub} = verify(token,process.env.JWT_SECRET) as IPayloadDto;

        req.userId = sub;

       return next();
       
    }catch(err){
        return res.status(401).end();
    }
}