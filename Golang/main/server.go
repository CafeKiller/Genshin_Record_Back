package main

import (
	"Golang/controllers"
	"github.com/labstack/echo" // 导入echo包
	"net/http"
)

func main() {
	// 实例化echo对象
	echoApp := echo.New()

	echoApp.Static("/images", "public/static")

	// 注册Get请求, 同时绑定一个控制器函数, 此处使用闭包函数
	echoApp.GET("/hello", func(context echo.Context) error {
		// 控制器函数 直接返回一个字符串
		// StatusOK 即 响应码200
		return context.String(http.StatusOK, "Hello echo")
	})

	// 注册Post请求, 用于处理文件上传
	echoApp.POST("/upload", controllers.Upload)

	// 绑定端口, 同时监听服务
	echoApp.Start(":3333")
}
