import {Schema, model, } from 'mongoose';

import { User, UserMongoose } from '../interfaces/user.interfaces';

const UserSchema = new Schema <UserMongoose> ({
    name: {
        type: String, 
        required: true, 
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        trim: true,
        unique: true
    },
    password: {
        type: String, 
        required: true, 
        trim: true
    },
    avatar: {
        type: String
    },
    timestamp: {
        type: Date, 
        default: Date.now()
    }
})

export default model<User>('User', UserSchema);