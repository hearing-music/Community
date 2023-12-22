import { Injectable } from '@angular/core';
import {
	HttpClient
} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
	providedIn: 'root'
})

export class AuthService {
	constructor(private http: HttpClient) { }
	baseUrl = environment.baseUrl;
	tencentUrl = environment.tencentUrl;
	// 登陆状态
	isLoggedIn = false;
	// 保存登录后重定向的路径
	redirectUrl: string;
	// 模拟登录
	logout(): void {
		this.isLoggedIn = false;
	}
	login(params: any) {
		let {
			phone,
			sms
		} = params;
		let url = this.baseUrl + "/login/login_web"
		return this.http.post(url,{phone,sms})
	}
	getSms(params:any){
		let {
			phone
		} = params;
		let url = this.baseUrl + "/login/getSms_web"
		return this.http.post(url,{phone})
	}
	getPermission(){
		let url = this.baseUrl + "/login/getPermission"
		return this.http.get(url)
	}
}
