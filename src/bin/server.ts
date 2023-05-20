import {Application} from "express";
import {AddressInfo} from "net";


// 引入app模块
const app:Application = require("../app")
// 引入http模块(nodejs)
const http = require("http")
// 获取port. 接收启动参数 或 使用默认的3333
let PORT:any = normalizePort(process.env.PORT || "3333");
// 设置port参数
app.set("port",PORT)


// 创建服务器对象
const server = http.createServer(app)
// 开启监听对应端口
server.listen(PORT)
// 绑定异常处理
server.on("error",onError)
// 绑定监听处理
server.on("listening",onListening)

/*
*   传入一个值,将其转换为一个正常的端口值(字符串或整数)
*   如果无法转换则返回false
* */
function normalizePort( val:any ):string|number|boolean{

    //将参数转为一个10进制的整数
    let port:number = parseInt(val,10);

    //判断参数是否为NaN,如果是NaN则表示参数可能为命名管道
    if (isNaN(port)){
        return val;
    }
    //判断是否为合法的端口号
    if (port>=0){
        return  port;
    }
    return false
}

// 异常处理函数
function onError(error:Error):void {
    console.error("Server Error......")
    throw error
}

// 监听处理函数
function onListening():void{
    let addr:string|AddressInfo =server.address();
    let bind:string = typeof addr === 'string' ? ('pipe '+addr) : ('port '+ addr.port);
    console.log(`正在监听: ${bind}`)
    console.log(`Server Running here 👉 http://localhost:${PORT}`);
}

