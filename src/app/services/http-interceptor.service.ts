import { Injectable } from '@angular/core';
import { NzMessageService  } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor, // 拦截器
  HttpRequest, // 请求
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {CommonService} from "./common.service";
// import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private message: NzMessageService,private router:Router,private common:CommonService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
	let date = new Date(new Date().getTime() + 1000 * 60 * 60 * 8).toISOString()
	let isTrue = true;
    let secureReq: HttpRequest<any> = req;
	let token = localStorage.getItem('token') || ''
	let token_expiration_time = localStorage.getItem('token_expiration_time') || ''
	// console.log(req.url)
	if(!req.url.includes('/login/login') && !req.url.includes('/login/getSms') && !req.url.includes('/kugou/getLiarUserInfo') && !req.url.includes('/qq/getLiarUserInfo')){
		if(!token || !token_expiration_time){
			this.message.error('请登录')
			isTrue = false;
		}
		if(date>token_expiration_time){
			this.message.error('登录过期')
			isTrue = false;
		}
	}
    secureReq = secureReq.clone({
      // url: environment.baseUrl + req.url,
      url:req.url,
		setHeaders:{
			"Access-Control-Allow-Origin":"*",
			"token":token
		}
    });
	if(isTrue){
		return next.handle(secureReq).pipe(
		  tap(
		    (response: any) => {
		      // 处理响应的数据
		      // console.log(response)
			  if(response.type==0){
				  return
			  }
			  if(!response.body.success){
					if(response.body.message){
						this.message.error(response.body.message)
					}
					if(response.body.code == 380){
						// 返回登录页面
						setTimeout(()=>{
							this.common.removeLocalStorages()
							this.router.navigate(['/login']);
						},2000)
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
	}else{
		setTimeout(()=>{
			this.router.navigate(['/login']);
		},2000)
		return []
	}
    
  }
}