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
		  this.message.error(error.statusText)
          console.log(error)
        }
      )
    )
  }
}