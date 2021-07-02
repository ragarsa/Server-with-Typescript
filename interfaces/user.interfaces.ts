import { Request } from "express";

export interface User {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface UserMongoose extends User {

    timestamp: string;
}

export interface Project {
    name: string;
    creator: string;
    timestamp: string;
}

export interface idUser extends Request{
    id: string
}