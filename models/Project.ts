import {Schema, model}  from 'mongoose';
import { Project } from '../interfaces/user.interfaces';


const ProjectSchema = new Schema <Project> ({
    name: {
        type: String, 
        required: true, 
        trim: true
    },
    creator: {
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        trim: true
    },
    timestamp: {
        type: Date, 
        default: Date.now()
    }

})

export default model<Project>('Project', ProjectSchema);