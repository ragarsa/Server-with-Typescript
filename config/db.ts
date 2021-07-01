import { connect } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()



const connectionDb = async (): Promise<void> => {
    try {
        await connect(`${process.env.MONGO_CNN}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    console.log('Database Connection OK')
    } catch (error) {
        throw new Error('Database Access Failed '+error)
    }
    

}

export default connectionDb;