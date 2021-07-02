import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import generateJWT from '../helpers/generate-jwt';

interface auth {
    _id?: string;
    name: string;
    email: string;
    password: string | null;
    avatar?: string;
    timestamp?: string;
}


export const authUser = async (req: Request, res: Response) => {


    const { email, password } = req.body

    try {
        //check if a user exists
        let user: auth | null = await User.findOne({ email });

        if (!user) {
            res.status(400).json({
                msg: 'User doesnt exist'
            })
        }

        
        //password
        const correctPass = await bcryptjs.compare(password, user?.password || '');
        if (
            !correctPass) {
            return res.status(400).json(
                {
                    msg: 'Incorrect Password'
                })
        }

        //jsonwebtoken
        const token = await generateJWT(user?._id)

        res.status(200).json(
            {
                msg: 'Auth success',
                token
            }
        )

    } catch (error: unknown) {
        console.log(error)
    }
}