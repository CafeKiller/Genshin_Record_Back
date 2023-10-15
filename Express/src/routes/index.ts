import {Request, Response, Router} from "express";

const express = require("express")
const router:Router = express.Router()

router.get("/",(req:Request, res:Response)=>{
    res.send("我是主路由!!!!!!")
})

module.exports = router