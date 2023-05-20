import * as mongoose from 'mongoose';
//导入mongoose的约束模块
const Schema = mongoose.Schema

// Role约束类
export const RolePoolSchema = new Schema({
    poolName :String,
    goRole : Object,
    puRole :{
        type:Array,
        length: 3
    },
    version :String,
    startTime :String,
    endTime :String,
    cover :String,
    number : Number,
    isRemake : Number
})