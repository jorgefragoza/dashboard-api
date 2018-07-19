import jwt from 'jsonwebtoken';

export class Auth {
    private expiresIn:string = '7d' // time to live
    private secret:string = 'samplejwtauthgraphql' // secret key
    private tokenPrefix:string = 'JWT' // Prefix for HTTP header

    constructor() {}

    public createToken(_id, username):Promise<any> {
        return new Promise((resolve, reject) => {
            const payload = {
                username: username,
                id: _id
            };
            const token = jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
            return resolve(token);
        });
    }
}