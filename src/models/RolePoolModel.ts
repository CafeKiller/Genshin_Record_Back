import * as mongoose from 'mongoose';
import { RolePoolSchema } from "../schemas/rolePoolSchema";
import {Model} from "mongoose";

const rolePool:Model<any> = mongoose.model('role_pools',RolePoolSchema)

export default class RoleModel{
    // 获取全部元素
    public getAll = async ():Promise<any> => {
        return await rolePool.find();
    }
    //
    public find = async (key:any):Promise<any> =>{
        console.log(key)
        return await rolePool.find(key)
    }


}