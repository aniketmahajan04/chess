import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";


const signup = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try{
        const hashedPassword = await bcrypt.hash(password, 5);

        const user = await db.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        res.status(200).json({
            msg: "signup successfull!"
        })
        
    }catch(error) {
        console.error("Something went wrong ", error);
        res.status(500).json({
            msg: "Error while creating user"
        })
    }
}

export {
    signup
}