import  jwt  from "jsonwebtoken";
import { IPayloadDto } from "../../dtos/user.dto";

async function generateToken(userId: string,role:string): Promise<string> {

   const payload:IPayloadDto = {
        sub:userId,
        role:role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
}

export default generateToken;