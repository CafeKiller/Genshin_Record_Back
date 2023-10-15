import BaseResultCode from "../constant/BaseResultCode";

class BaseResult{
    code:number
    message:string
    data?:any
    error?:any
    time:Date

    constructor(code:number,message:string,data?:any) {
        this.code = code
        this.message = message
        this.data = data
        this.time = new Date();
    }
    // 成功
    static success(msg:string,data:any){
        return new BaseResult(BaseResultCode.SUCCESS,msg,data)
    }

    // 失败
    static fail(msg:string,err:any){

        let baseResult:BaseResult =  new BaseResult(BaseResultCode.SUCCESS,msg)
        baseResult.error = err

        return baseResult
    }
}

export default BaseResult