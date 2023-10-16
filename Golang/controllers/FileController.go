package controllers

import (
	"fmt"
	"github.com/labstack/echo"
	"net/http"
)

// description: 文件上传控制器
// author: Coffee_Killer
// date: 2023_10_16 22:21:26
func upload(content echo.Context) error {

	// 获取用户上传的文件
	file, err := content.FormFile("file")
	if err != nil {
		return err
	}

	// 打开文件
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	return content.HTML(http.StatusOK, fmt.Sprintf("文件上传成功"))

}
