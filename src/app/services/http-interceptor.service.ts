import { Injectable } from '@angular/core';
import { NzMessageService  } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
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

  constructor(private message: NzMessageService,private router:Router,private common:CommonService,private notification: NzNotificationService) { }
	close(){
		console.log(1)
	}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
	let date = new Date(new Date().getTime() + 1000 * 60 * 60 * 8).toISOString()
	let isTrue = true;
    let secureReq: HttpRequest<any> = req;
	let token = localStorage.getItem('token') || ''
	let token_expiration_time = localStorage.getItem('token_expiration_time') || ''
	let AppVersion = localStorage.getItem('AppVersion') || false
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
						if(typeof response.body.message=='object'){
							response.body.message = JSON.stringify(response.body.message)
						}
						// 这些接口不弹窗
						if(!req.url.includes(`kugou/kuGouAutoSearch`)){
							this.message.error('🙊🙉🙈'+response.body.message)
						}
					}
					if(response.body.code == 380){
						// 返回登录页面
						setTimeout(()=>{
							this.common.removeLocalStorages()
							this.router.navigate(['/login']);
						},1400)
					}
			  }
			  
				try{
					if(response.body.AppVersion){
						let version = response.body.AppVersion.version
						if(version!=AppVersion){
							// 版本不一致  存入localstorage 提示更新 刷新
							// this.modal.create({
							//       nzTitle: '提示',
							//       nzContent: '网站有更新哦',
							//       nzClosable: false,
							//       nzOnOk: () => location.reload()
							//     });
							let updateTip = this.notification.blank('',`<div class="ant-notification-notice-content">
								<div>
									<div class="ant-notification-notice-message">提示</div>
										<div class="ant-notification-notice-description">
											网站有新内容，刷新网页既可。
										</div>
									</div>
								</div>`,{nzDuration:0});
							localStorage.setItem('AppVersion',version+'')
						}
					}
				}catch(err){
					console.log('版本异常',err)
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
		},1400)
		return []
	}
    
  }
}