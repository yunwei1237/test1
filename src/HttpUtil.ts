/*
 * 用例： 
 */
// var container = this;
// HttpUtil.http("http://httpbin.org/get",egret.HttpMethod.GET,{"id":"12",name:"abc"},function(event:egret.Event){
//     var request = <egret.HttpRequest>event.currentTarget;
//     var data = request.response;
//     TextUtil.addTextView(container,0,0,data,20);
// });
// HttpUtil.http("http://httpbin.org/post",egret.HttpMethod.POST,{"id":"12",name:"abc"},function(event:egret.Event){
//     var request = <egret.HttpRequest>event.currentTarget;
//     var data = request.response;
//     TextUtil.addTextView(container,0,500,data,20);
// });
// HttpUtil.get("http://httpbin.org/get",{"id":"12",name:"abc"},function(data){
//     TextUtil.addTextView(container,0,0,data,20);
// },"json");
// HttpUtil.post("http://httpbin.org/post",{"id":"12",name:"abc"},function(data){
//     TextUtil.addTextView(container,0,500,data,20);
// },"xml");
class HttpUtil {
	public constructor() {
	}
	/**
	 * 发送请求到服务器
	 * @param url 服务器地址
	 * @param params 请求的参数信息
	 * @param success 请求成功执行的函数
	 * @param error 请求错误执行的函数
	 */
	public static get(url:string,params?:Object,success?:Function,type?:string,error?:Function){
		this.http(url,egret.HttpMethod.GET,params,success,type,null,null,null);
	}
	/**
	 * 发送请求到服务器
	 * @param url 服务器地址
	 * @param params 请求的参数信息
	 * @param success 请求成功执行的函数
	 * @param error 请求错误执行的函数
	 */
	public static post(url:string,params?:Object,success?:Function,type?:string,error?:Function){
		this.http(url,egret.HttpMethod.POST,params,success,type,null,null,null);
	}
	/**
	 * 发送请求到服务器
	 * @param url 服务器地址
	 * @param method 请求的方法：GET，POST
	 * @param params 请求的参数信息
	 * @param success 请求成功执行的函数
	 * @param type:返回值的类型，【暂时没有实现】
	 * @param headers 请求的头信息
	 * @param error 请求错误执行的函数
	 * @param progress 请求进度调用的函数
	 */
	public static http(url:string,method:string,params?:Object,success?:Function,type?:string,headers?:Object,error?:Function,progress?:Function){
		var request:egret.HttpRequest = new egret.HttpRequest();
		switch(type){
			case "xml":
				request.responseType = egret.HttpResponseType.TEXT;
			break;
			case "json":
				request.responseType = egret.HttpResponseType.TEXT;
			break;
			case "text":
				request.responseType = egret.HttpResponseType.TEXT;
			break;
			default:
				request.responseType = egret.HttpResponseType.TEXT;
			break;
		}
        
		var parStr = "";
		for(let key in params){
				parStr += key+"="+params[key]+"&";
			}
		//get
		if(method == egret.HttpMethod.GET && params != null){
			url += "?" + parStr.substring(0,parStr.length-1);
		}
        request.open(url,method);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		if(headers != null){
			for(let key in headers){
				request.setRequestHeader(key, headers[key]);
			}
		}
		
		if(method == egret.HttpMethod.POST){//post
			request.send(parStr.substring(0,parStr.length-1));
		}else{//get
 			request.send();
		}
       
		request.addEventListener(egret.Event.COMPLETE,function(event:egret.Event):void{
			var request = <egret.HttpRequest>event.currentTarget;
			if(success != null){
				success(request.response);
			}else{
				console.log(request.response);
			}
			
		},this);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR,function(event:egret.IOErrorEvent){
			if(error != null){
				error(event);
			}else{
				console.error(event);
			}
		},this);
		request.addEventListener(egret.ProgressEvent.PROGRESS,function(event:egret.ProgressEvent){
			if(progress != null){
				progress(event.bytesLoaded,event.bytesTotal);
			}else{
				console.log("progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
			}
		},this);
	}
}