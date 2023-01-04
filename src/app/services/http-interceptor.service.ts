import { Injectable } from '@angular/core';
import { NzMessageService  } from 'ng-zorro-antd/message';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor, // 拦截器
  HttpRequest, // 请求
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private message: NzMessageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let secureReq: HttpRequest<any> = req;
    secureReq = secureReq.clone({
      // url: environment.baseUrl + req.url,
      url:req.url,
			headers:secureReq.headers.set("Access-Control-Allow-Origin","*"),
			
    });

    return next.handle(secureReq).pipe(
      tap(
        (response: any) => {
          // 处理响应的数据
          console.log(response)
		  if(response.type==0){
			  return
		  }
		  if(!response.body.success){
				if(response.body.message){
					this.message.error(response.body.message)
				}
		  }
        },
        (error: any) => {
          // 处理错误的数据
		  if(error.url == "http://communityapi.jinzhoushaokao.top/articles/trackSeparate"&&error.status == 500){
			  this.message.error('文件过大，请选择压缩处理')
		  }else{
			  this.message.error(error.error.code||error.statusText)
		  }
		  
          console.log(error)
        }
      )
    )
  }
}