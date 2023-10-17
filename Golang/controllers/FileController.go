package controllers

import (
	"github.com/labstack/echo"
	"io"
	"net/http"
	"os"
)

type Result struct {
	Message string `json:"message"`
	Data    string `json:"data"`
}

// Upload description: 文件上传控制器
// author: Coffee_Killer
// date: 2023_10_16 22:21:26
func Upload(content echo.Context) error {

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

	// 创建保存路径文件 file.Filename(即文件上传的名称), 创建upload文件夹
	filename := "public/static/" + file.Filename
	dst, err := os.Create(filename)
	if err != nil {
		return err
	}
	defer dst.Close()

	// 将源拷贝值目标文件
	if _, err := io.Copy(dst, src); err != nil {
		return err
	}

	res := &Result{
		Message: "图片上传成功",
		Data:    filename,
	}

	// 返回JSON格式数据
	//content.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJavaScriptCharsetUTF8)
	//content.Response().WriteHeader(http.StatusOK)
	//return json.NewEncoder(content.Response()).Encode(res)
	return content.JSON(http.StatusOK, res)
}
