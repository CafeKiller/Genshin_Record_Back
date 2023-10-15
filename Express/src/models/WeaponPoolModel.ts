import * as mongoose from 'mongoose';
import { WeapPoolScheme } from "../schemas/weapPoolScheme";
import {Model} from "mongoose";

const weaponPool:Model<any> = mongoose.model('weap_pools',WeapPoolScheme)

export default class RoleModel{
    // 获取全部元素
    public getAll = async ():Promise<any> => {
        return await weaponPool.find();
    }

    //通过关键字查询
    public find = async (key:any):Promise<any> =>{
        console.log(key)
        return await weaponPool.find(key)
    }


}