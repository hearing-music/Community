import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CommonService} from "../services/common.service";
import { NzMessageService } from "ng-zorro-antd/message";
@Injectable({
	providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
	constructor( private router: Router,private common:CommonService,public message: NzMessageService) {
		
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
	private checkUrl(url: any): any {
		console.log('checkUrl permission','跳转')
		let menu:any = localStorage.getItem('menu')
		menu = JSON.parse(menu);
		let menu_list:any = menu || {top:[],left:[]};
		let arr = []
		for(let i = 0;i<menu_list.left.length;i++){
			if(menu_list.left[i].menu.children){
				for(let j = 0;j<menu_list.left[i].menu.children.length;j++){
					arr.push(menu_list.left[i].menu.children[j].link)
				}
			}else{
				arr.push(menu_list.left[i].menu.link)
			}
		}
		for(let i = 0;i<menu_list.top.length;i++){
			if(menu_list.top[i].ID){
				arr.push(menu_list.top[i].menu.link)
			}
		}
		if(arr.includes(url)){
			return true
		}else{
			let istrue = false;
			for(let i = 0;i<arr.length;i++){
				if(url.indexOf(arr[i])!=-1){
					istrue = true;
					break
				}
			}
			if(istrue) return true
			return this.router.parseUrl('**');
		}
		
	}

}
