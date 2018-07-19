export interface IDataService {
    find(filter: any, fields?: any): Promise<any>;
    findOne(filter: any, fields?: any): Promise<any>;
    save(object: any): Promise<any>;
}