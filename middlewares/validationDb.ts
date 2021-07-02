
import { Request, Response, NextFunction } from "express";
import { idUser } from "../interfaces/user.interfaces";
import Project from "../models/Project";

export const findId = async (id='') => {

    const project = await Project.findById(id);

    if(!project) {
        throw new Error('ID not valid');
    }


};

export const validateIdCreator = async (req:Request, res:Response, next:NextFunction) => {

    const project = await Project.findById(req.params.id) || null;

    if (project?.creator.toString()  !== (req as idUser).id) {
        res.status(401).json({
            msg: 'Not authorized'
        })
    }

    next();

};
