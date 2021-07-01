export interface User {
    name: string;
    email: string;
    password: string;
    avatar?: string;
}

export interface UserMongoose extends User {

    timestamp: string
}
