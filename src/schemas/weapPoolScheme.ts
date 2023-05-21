import * as mongoose from "mongoose";
const Scheme = mongoose.Schema

export  const  WeapPoolScheme = new Scheme({
    goWeapon:{
        type:Array,
        length: 2
    },
    puWeapon:{
        type:Array,
        length: 5
    },
    version:String,
    startTime:String,
    endTime:String,
    cover:String,
    number:Number
})