import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { db } from "../db";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_secret_password";

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

const signin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if(typeof email !== "string" || typeof password !== "string"){
        res.status(400).json({
            msg: "Invalid email or password format"
        })
        return;
    }

    try{
        const foundUser = await db.user.findFirst({
            where: {
                email
            }
        });

        if(!foundUser || !foundUser.password){
           res.status(404).json({
                msg: "User not found",
           })
           return;
        }
        const isMatch = await bcrypt.compare(password, foundUser?.password);

        if(!isMatch){
            res.status(400).json({
                msg: "Invalid credentials"
            });
            return;
        }

        const token = jwt.sign(
            { userId: foundUser.id, name: foundUser.name },
             JWT_SECRET,{
                expiresIn: "1h"
             });

        res.setHeader("Authorization", `Bearer ${token}`);

        res.status(200).json({ msg: "Login successful",
            token: token
         });
        
    } catch(error){
        console.error("Something went wrong ", error);
        res.status(500).json({
            msg: "Error while login user"
        }) 
    }

} 

export {
    signup,
    signin
}