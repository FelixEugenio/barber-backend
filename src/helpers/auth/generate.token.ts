import  jwt  from "jsonwebtoken";
import { IPayloadDto } from "../../dtos/user.dto";

async function generateToken(userId: string): Promise<string> {

   const payload:IPayloadDto = {
        sub:userId
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
}

export default generateToken;