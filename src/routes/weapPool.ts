import {Request, Response, Router} from "express";
import WeaponPoolModel from "../models/WeaponPoolModel";
import BaseResult from "../models/BaseResult";

const express = require("express")
const router:Router = express.Router()

const weaponPoolModel:WeaponPoolModel = new WeaponPoolModel()


// 获取全部数据
router.get("/api/get",(req:Request, res:Response)=>{
    weaponPoolModel.getAll().then((result)=>{
        // BaseResult.success(result)
        res.send(BaseResult.success("操作成功",result))
    })
})


// 使用关键字获取数据
router.get("/api/find/",(req:Request, res:Response)=>{
    console.log(req.query)
    weaponPoolModel.find(req.query).then((result)=>{
        if (result === null || result.length <=0){
            res.send(BaseResult.fail("Data does not exist",null))
        } else {
            res.send(BaseResult.success("数据查询成功",result))
        }
    })
})

module.exports = router