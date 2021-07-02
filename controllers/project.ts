import { Request, Response } from 'express';
import { idUser } from '../interfaces/user.interfaces';
import Project from '../models/Project';



interface newProject {
    name: string
}

export const getProjects = async (req: Request, res: Response) => {

    //Info extracted from jwt
    try {
        const idCreatorProject: string = (req as idUser).id
        const project = await Project.find({ creator: idCreatorProject }).sort({ timestamp: -1 })

        res.status(200).json(
            project
        )

    } catch (error) {
        res.status(500).json({
            error
        })
    }

}

export const createProject = async (req: Request, res: Response) => {

    try {
        const projectUser = req.body
        const project = new Project(projectUser);

        //save creator project by JWT
        project.creator = (req as idUser).id

        await project.save();

        res.status(200).json({
            msg: 'Project created',
            project
        })


    } catch (error) {
        res.status(500).json({
            msg: 'Sth gon wrong',
            error
        })
    }

};


export const updateProject = async (req: Request, res: Response) => {

    const { id } = req.params
    const { name } = req.body;

    const newProject: newProject = { name: '' };

    if (name) {
        newProject.name = name;
    }

    try {



        //project creator 

        const project = await Project.findByIdAndUpdate({ _id: id }, { $set: newProject }, { new: true });

        res.status(200).json({ project })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Server gone wrong'
        })
    }

};

export const deleteProject = async (req: Request, res: Response) => {

    const { id } = req.params

    try {

        await Project.findOneAndRemove({ _id: id });

        res.json({
            msg: 'Project deleted'
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Server gone wrong'
        })
    }

}

