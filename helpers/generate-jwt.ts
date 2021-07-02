import jwt from 'jsonwebtoken';

const generateJWT = (id:string = '') : Promise<string> =>  {

    return new Promise((resolve, reject) => {
        const payload = {id}

        //Sign jwt
        jwt.sign(payload, `${process.env.SECRETORPRIVATEKEY}`, {
            expiresIn: 360000
        }, (error: Error | null, token: string | undefined ) => {
            if (error) {
                console.log(error)
                reject('Token in generating token')
            } else {
                resolve(token || '')
            }
            
        });


    });

};

export default generateJWT;