import {Request, Response, Router} from "express";
import RolePoolModel from "../models/RolePoolModel";
import BaseResult from "../models/BaseResult";

const express = require("express")
const router:Router = express.Router()

const rolePoolModel:RolePoolModel = new RolePoolModel()


// 获取全部数据
router.get("/api/get",(req:Request, res:Response)=>{
    rolePoolModel.getAll().then((result)=>{
        // BaseResult.success(result)

        res.send(BaseResult.success("操作成功",result))
    })
})


// 使用关键字获取数据
router.get("/find/",(req:Request, res:Response)=>{
    console.log(req.query)
    rolePoolModel.find(req.query).then((result)=>{
        if (result === null || result.length <=0){
            res.send(BaseResult.fail("Data does not exist",null))
        } else {
            res.send(BaseResult.success("数据查询成功",result))
        }
    })
})

module.exports = router