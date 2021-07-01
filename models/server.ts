import express, { Application } from 'express';
import cors from 'cors';
import userRoutes from '../routes/users';
import connectionDb from '../config/db';

class Server {

    private app: Application;
    private port: string ; 
    private apiPaths = {
        users: '/api/users'
    }


    constructor() {
        this.app = express();
        this.port = process.env.PORT || '8000' ;

        this.connectDb();

        this.middlewares(); 

        this.routes();

        
    }

    async connectDb() {
        await connectionDb();
    }

    middlewares() {
        
        this.app.use( cors() )

        this.app.use(express.json())
    }

    
    routes() {

        this.app.use(this.apiPaths.users, userRoutes)
    
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running in port' + this.port);
        })
    }

    
}

export default Server;