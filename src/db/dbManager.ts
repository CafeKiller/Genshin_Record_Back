// 引入mongoose模块
const mongoose = require("mongoose")
// 连接数据库
mongoose.connect("mongodb://127.0.0.1/genshin_record")

const db = mongoose.connection

db.on("err",console.error.bind(console,"MongoDB: Database connection failure!!!"))
db.on("open",() => {
    console.log("MongoDB: Database connection success......")
})

module.exports = db


