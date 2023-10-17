package controllers

import (
	"fmt"
	"github.com/labstack/echo"
	"io"
	"net/http"
	"os"
)

// Upload description: 文件上传控制器
// author: Coffee_Killer
// date: 2023_10_16 22:21:26
func Upload(content echo.Context) error {

	// 获取用户上传的文件
	file, err := content.FormFile("file")
	if err != nil {
		fmt.Println("1111111", err)
		return err
	}

	// 打开文件
	src, err := file.Open()
	if err != nil {
		fmt.Println("2222222", err)
		return err
	}
	defer src.Close()

	// 创建保存路径文件 file.Filename(即文件上传的名称), 创建upload文件夹
	dst, err := os.Create("public/static/" + file.Filename)
	if err != nil {
		fmt.Println("333333", err)
		return err
	}
	defer dst.Close()

	// 将源拷贝值目标文件
	if _, err := io.Copy(dst, src); err != nil {
		return err
	}

	return content.HTML(http.StatusOK, fmt.Sprintf("文件上传成功"))
}
