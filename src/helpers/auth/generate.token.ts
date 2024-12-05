import  jwt  from "jsonwebtoken";

async function generateToken(userId: string,role:string): Promise<string> {

   const payload = {
        sub:userId,
        role:role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
}

export default generateToken;