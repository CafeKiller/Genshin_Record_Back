import express, {Application, NextFunction, Request, Response, Router} from 'express';
import {PlatformPath} from "path";

// 引入http异常处理模块
const createError = require("http-errors")
// 引入path模块 (nodejs)
const path:PlatformPath = require('path')
// 引入cookieParser模块 (express)
const cookieParser = require("cookie-parser")
// 创建express
const app:Application = express();
// 引入cors跨域组件
const cors = require('cors')

// 启用跨域
app.use(cors())
// 引入主路由
const indexRouter:Router = require("./routes/index")
const rolePoolRouter:Router  = require("./routes/roolPool")

// 开启JSON处理
app.use(express.json())
// 开启URL-encoded数据解析. extended为false时表示常规解析,为true时表示可以进行富文本解析
app.use(express.urlencoded({extended:false}))
// 设置/static 路径为静态文件路径. path对象可以获取当前项目的路径,使用join进行路径的拼接.
app.use("/static",express.static(path.join(__dirname,"static")))
// 开启cookie支持
app.use(cookieParser())

// 使用路由
app.use("/",indexRouter)
app.use("/role/pool/",rolePoolRouter)

const db = require("./db/dbManager")

// 简单处理404错误
app.use((req:Request, res:Response, next:NextFunction)=>{
    console.log("当前页面不存在")
    res.send(`<h1>404</h1>
                    <h2>当前页面不存在</h2>`)
})

module.exports = app