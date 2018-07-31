import { IDataService } from '../i-data-service';
import { MongoClient } from 'mongodb';
import ENV from '../../environment';
// import { resolve } from 'dns';

export class UserService implements IDataService {
    private collection: string;
    private strConnection: string;
    
    constructor() {
        this.collection = 'users';
        this.strConnection = `mongodb://${ENV.MONGODB_USER}:${ENV.MONGODB_PASSWORD}@${ENV.MONGODB_HOST}:${ENV.MONGODB_PORT}/?ssl=true`;
    }
    
    find(filter: any, fields?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.strConnection)
            .then(db => {
                const dbo = db.db('dashboard');
                dbo.collection(this.collection).find(filter).toArray((err, result) => {
                    if(err) return reject(err);
                    return resolve(result);
                    db.close();
                });
            })
            .catch(err => {
                return reject(err);
            })
        });
    }

    findOne(filter: any, fields?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.strConnection)
            .then(db => {
                const dbo = db.db('dashboard');
                dbo.collection(this.collection).findOne(filter, (err, result) => {
                    if(err) return reject(err);
                    return resolve(result);
                    db.close();
                });
            })
            .catch(err => {
                return reject(err);
            })
        });
    }
    
    save(element: Object): Promise<any> {
        return new Promise((resolve, reject) => {
            MongoClient.connect(this.strConnection)
            .then(db => {
                const dbo = db.db('dashboard');
                dbo.collection(this.collection).insertOne(element, (err, res) => {
                    if (err) return reject(err);
                    return resolve(res);
                    db.close();
                });
            })
            .catch(err => {
                return reject(err);
            })
        });
    }
}