package controllers

import (
	"fmt"
	"github.com/labstack/echo"
	"io"
	"net/http"
	"os"
)

type Result[T string | []string] struct {
	Message string `json:"message"`
	Data    T      `json:"data"`
}

// Upload description: 单文件上传控制器
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

	res := &Result[string]{
		Message: "图片上传成功",
		Data:    filename,
	}

	// 返回JSON格式数据
	//content.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJavaScriptCharsetUTF8)
	//content.Response().WriteHeader(http.StatusOK)
	//return json.NewEncoder(content.Response()).Encode(res)
	return content.JSON(http.StatusOK, res)
}

// UploadMore
func UploadMore(content echo.Context) error {
	form, err := content.MultipartForm()
	if err != nil {
		fmt.Errorf("err = %s", err)
		return err
	}

	files := form.File["files"]

	var fileArr []string
	for _, file := range files {
		// NOTE: 使用匿名函数, 避免defer在循环中调用导致内存泄漏问题
		err := func() error {
			src, err := file.Open()
			if err != nil {
				fmt.Errorf("err = %s", err)
				return err
			}
			defer src.Close()

			fileName := "public/static/" + file.Filename
			dst, err := os.Create(fileName)
			if err != nil {
				fmt.Errorf("err = %s", err)
				return err
			}
			defer dst.Close()

			fileArr = append(fileArr, fileName)

			if _, err = io.Copy(dst, src); err != nil {
				fmt.Errorf("err = %s", err)
				return err
			}

			return nil
		}()
		if err != nil {
			fmt.Errorf("err = %s", err)
		}
	}

	res := &Result[[]string]{
		Message: "图片上传成功",
		Data:    fileArr,
	}
	return content.JSON(http.StatusOK, res)
}
