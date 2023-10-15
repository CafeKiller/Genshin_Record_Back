"use strict";
// 引入mongoose模块
const mongoose = require("mongoose");
// 连接数据库
mongoose.connect("mongodb://127.0.0.1/genshin_record");
const db = mongoose.connection;
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: String
});
const Stus = mongoose.model('stus', userSchema);
db.on("err", console.error.bind(console, "连接失败"));
db.on("open", () => {
    console.log("连接成功");
});
module.exports = db;
