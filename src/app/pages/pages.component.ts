import { Component,OnInit,NgZone } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import {CommonService} from "../services/common.service";
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
	constructor(public common: CommonService,private ngZone:NgZone) {
		window["NgAppRef2"] = { component: this, zone: this.ngZone };
	}
	// 刷新更新左侧菜单
	leftMenuUpdate(){
		this.menuChange()
	}
	ngOnInit(): void {
		console.log('pageinit')
		this.menuChange()
	}
	menuChange(){
		if(!this.common.checkAdmin()){
			let menus_item:any = localStorage.getItem('menus_item')
			menus_item = JSON.parse(menus_item)
			let list = menus_item.menuList || [];
			let arr = []
			for(let i = 0;i<list.length;i++){
				if(list[i].display == 1&&list[i].type=='leftMenu'){
					arr.push(list[i].value)
				}
			}
			this.menu = arr;
		}else{
			this.menu = MENU_ITEMS;
		}
	}
  menu = [];
}
