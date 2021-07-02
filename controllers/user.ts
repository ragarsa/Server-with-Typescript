import { Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import generateJWT from '../helpers/generate-jwt'
import User from '../models/User';

interface User {
    name: string; 
    email: string; 
    password: string; 
    avatar?:string;
}

export const getUsers = (req:Request, res:Response) => {
    
    res.json({msg: 'Router'})

}

export const postUsers = async (req:Request, res:Response) => {
    const post: User = req.body;
    const {email, password} = post;

    try {
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({
                msg: 'User found in database'
            })
        }



        user = new User(req.body)

        //Hashear password 
        
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt)

        //Save user
        await user.save(); 

        const token:string = await generateJWT(user.id);

        res.json({
            msg: 'User created',
            token
        })

    } catch (error) {
        console.log(error)
        res.json({
            msg: 'Sth gone wrong'
        })
    }

}