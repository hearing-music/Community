import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CommonService} from "../services/common.service";
@Injectable({
	providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
	constructor( private router: Router,private common:CommonService) {
		
	}
	// 角色权限验证
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const url: string = state.url; // 将要跳转的路径
		if(this.common.checkAdmin()){
			return true
		}else{
			return this.checkUrl(url);
		}
	}
	private checkUrl(url: string): any {
		console.log('checkUrl')
		let menus_item:any = localStorage.getItem('menus_item')
		menus_item = JSON.parse(menus_item);
		let menu_list = menus_item.menuList || [];
		let arr = []
		for(let i = 0;i<menu_list.length;i++){
			if(menu_list[i].display == 1){
				arr.push(menu_list[i].value.link)
			}
		}
		if(arr.includes(url)){
			return true
		}else{
			if(menu_list.length != 0){
				return this.router.parseUrl(menu_list[0].value.link);
			}else{
				return this.router.parseUrl('**');
			}
		}
		
	}

}
