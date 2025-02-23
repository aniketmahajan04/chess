import { Request, Response } from "express"

const signup = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
}

export {
    signup
}