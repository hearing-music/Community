import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { ApiService } from '../services/api.service'
import { ToastrService } from 'ngx-toastr';
import {CommonService} from "../services/common.service";
@Component({
	selector: 'ngx-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	constructor(private toast: ToastrService,public api: ApiService,public authService: AuthService, public router: Router,public common: CommonService) { }

	ngOnInit(): void {
		this.phone = localStorage.getItem('phone') || '';
	}
	loading = false;
	phone = ''
	sms = ''
	smsText:any = '发送验证码'
	smsInterval(){
		this.smsText = 60;
		var inter = setInterval(()=>{
			this.smsText -= 1;
			if(this.smsText == 0){
				clearInterval(inter)
				inter = null;
				this.smsText = '发送验证码'
			}
		},1000)
	}
	focus(){
		document.onkeydown =  (event_e)=>{
			if(event_e.code === 'Enter' || event_e.code === 'NumpadEnter'){
				this.login()
			}
		}
	}
	blur(){
		document.onkeydown = null
	}
	getSms() {
		if(!this.common.checkPhone(this.phone)){
			this.toast.error('手机号格式错误')
			return
		}
		this.loading = true;
		this.authService.getSms({
			phone: this.phone,
		}).subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			if (res.success) {
				this.toast.success('发送成功')
				this.smsInterval()
			}else{
				// this.toast.error(res.message)
			}
		}, (err: any) => {
			this.loading = false;
			console.log(err)
			// this.toast.error(err)
		});
	}
	login() {
		if(!this.common.checkPhone(this.phone)){
			this.toast.error('手机号格式错误')
			return
		}
		if(!this.common.checkSms(this.sms)){
			this.toast.error('验证码格式错误')
			return
		}
		// this.authService.isLoggedIn = true;
		// return
		this.loading = true;
		this.authService.login({
			phone: this.phone,
			sms: this.sms
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			document.onkeydown = null
			if (res.success) {
				this.common.storageSet({
					"guideShow":"1",
					"phone":this.phone,
					"userId":res.result.userId,
					"token":res.result.token,
					"token_expiration_time":res.result.token_expiration_time,
					"role_id":res.result.role_id,
					"role":res.result.role,
					"username": res.result.username,
					"menu":JSON.stringify(res.result.menu),
					"create_at":res.result.create_at,
					"url":res.result.url,
					"developIDs":res.result.developIDs,
					"highUserList":res.result.highUserList,
					"ks_monitoring_limit":res.result.ks_monitoring_limit
				})
				this.authService.isLoggedIn = true;
				this.toast.success('登录成功')
				const redirectUrl = this.authService.redirectUrl || '/'; // 防止用户直接在地址栏输入造成的redirectUrl为空的错误
				// 跳转回重定向路径
				this.router.navigate([redirectUrl]);
				this.api.douyin_videoGetInterval().subscribe((res: any) => {
					if(res.success){
						localStorage.setItem('ks_monitoring_limitNow',res.count)
						// 调用组件方法 更新douyincount
						try{
							window['NgAppRef'].zone.run(function () {
								window['NgAppRef3'].component.updateDYCount();
							});
						}catch(e){
							//TODO handle the exception
						}
					}
				}, (err: any) => {
					console.log(err)
					// this.toast.error(err)
				});
			}else{
				// this.toast.error(res.message)
			}
			// if (this.authService.isLoggedIn) {
			//   const redirectUrl = this.authService.redirectUrl || '/'; // 防止用户直接在地址栏输入造成的redirectUrl为空的错误
			//   // 跳转回重定向路径
			//   this.router.navigate([redirectUrl]);
			// }
		}, (err: any) => {
			this.loading = false;
			console.log(err)
			// this.toast.error(err)
		});
	}
}
