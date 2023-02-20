import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'
import {CommonService} from "../services/common.service";
@Injectable({
	providedIn: 'root'
})
export class GuardsGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router,private common:CommonService) {
		
	}
	// token 和 token过期时间验证   刷新时 重新加载menu
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const url: string = state.url; // 将要跳转的路径
		return this.checkLogin(url);
		// return true;
	}
	private checkLogin(url: string): any {
		console.log('checkLogin')
		let date = new Date(new Date().getTime() + 1000 * 60 * 60 * 8).toISOString()
		// let phone = localStorage.getItem('phone');
		let token = localStorage.getItem('token');
		let token_expiration_time = localStorage.getItem('token_expiration_time');
		// let permission_name_id = localStorage.getItem('permission_name_id');

		if (!token || !token_expiration_time) {
			// this.message.error('未登录')
			// 修改登陆后重定向的地址
			this.authService.redirectUrl = url;
			this.common.removeLocalStorages()
			// 重定向到登录页面
			return this.router.parseUrl('/login/layers');
		}
		if (date > token_expiration_time) {
			console.log(date)
			console.log(token_expiration_time)
			// this.message.error('登录过期')
			// 修改登陆后重定向的地址
			this.authService.redirectUrl = url;
			this.common.removeLocalStorages()
			// 重定向到登录页面
			return this.router.parseUrl('/login/layers');

		}
		this.authService.isLoggedIn = true;
		// 刷新时 重新获取menu
		this.authService.getPermission().subscribe((res: any) => {
			// console.log(res)
			if(res.success){
				let menus_item = localStorage.getItem('menus_item')
				if(menus_item != JSON.stringify(res.result.menus_item)){
					localStorage.setItem('menus_item', JSON.stringify(res.result.menus_item))
					// 调用组件方法 更新menu
					window['NgAppRef'].zone.run(function () {
					    window['NgAppRef'].component.headerMenuUpdate();
						window['NgAppRef2'].component.leftMenuUpdate();
					});
				}
			}
		}, (err: any) => {
			console.log(err)
		});
		
		// 已经登录，直接返回true
		if (this.authService.isLoggedIn) { return true; }
	}

}
