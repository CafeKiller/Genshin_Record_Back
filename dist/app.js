"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// 引入http异常处理模块
const createError = require("http-errors");
// 引入path模块 (nodejs)
const path = require('path');
// 引入cookieParser模块 (express)
const cookieParser = require("cookie-parser");
// 创建express
const app = (0, express_1.default)();
// 引入主路由
const indexRouter = require("./routes/index");
// 开启JSON处理
app.use(express_1.default.json());
// 开启URL-encoded数据解析. extended为false时表示常规解析,为true时表示可以进行富文本解析
app.use(express_1.default.urlencoded({ extended: false }));
// 设置/static 路径为静态文件路径. path对象可以获取当前项目的路径,使用join进行路径的拼接.
app.use("/static", express_1.default.static(path.join(__dirname, "static")));
// 开启cookie支持
app.use(cookieParser());
// 使用路由
app.use("/", indexRouter);
const db = require("./db/dbManager");
// 简单处理404错误
app.use((req, res, next) => {
    console.log("当前页面不存在");
    res.send(`<h1>404</h1>
                    <h2>当前页面不存在</h2>`);
});
module.exports = app;
