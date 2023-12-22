import { Component, OnInit, NgZone } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { CommonService } from "../services/common.service";
import { driver } from "driver.js";
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
	constructor(public common: CommonService, private ngZone: NgZone) {
		window["NgAppRef2"] = { component: this, zone: this.ngZone };
	}
	// 刷新更新左侧菜单
	leftMenuUpdate() {
		this.menuChange()
	}
	ngOnInit(): void {
		console.log('pageinit')
		this.menuChange()
		this.driverFunction()
	}
	driverFunction(){
		let guideShow = localStorage.getItem('guideShow') || '';
		let create_at:any = localStorage.getItem('create_at') || 0;
		create_at = create_at-0
		let now = new Date().getTime();
		if(guideShow=='1'&&create_at+(7*24*60*60*1000)>=now){
			setTimeout(() => {
				const driverObj = driver({
					showProgress: true,
					allowClose: false,
					showButtons: ['next', 'previous'],
					steps: [
						// { element: '.tagList-item:nth-child(1)', popover: { title: '实打实', description: '这是杀害实打实大大缓解', side: "bottom", align: 'start' } },
						{ element: '.fixed', popover: { title: '标题1', description: '内容1', side: "bottom", align: 'center' } },
						{ element: '.scrollable', popover: { title: '标题2', description: '内容2', side: "right", align: 'start' } },
						{ element: '.home', popover: { title: '标题3', description: '内容3', side: "bottom", align: 'start' } },
					]
				});
				localStorage.setItem('guideShow','2')
				driverObj.drive();
			}, 10)
		}
	}
	menuChange() {
		let developIDs:any = localStorage.getItem('developIDs') || '';
		developIDs = developIDs.split(',')
		const userId:any = localStorage.getItem('userId') || 0;
		if (!this.common.checkAdmin()) {
			let menu: any = localStorage.getItem('menu')
			menu = JSON.parse(menu)
			let list = menu.left || [];
			let arr = []
			for (let i = 0; i < list.length; i++) {
				arr.push(list[i].menu)
			}
			this.menu = arr;
		} else {
			this.menu = MENU_ITEMS;
			// // 开发者可看
			// if(developIDs.includes(userId)){
			// 	this.menu = MENU_ITEMS;
			// }else{
			// 	let newMENU_ITEMS = MENU_ITEMS
			// 	let i = newMENU_ITEMS.findIndex((e:any)=>e.title=='游戏')
			// 	 newMENU_ITEMS.splice(i,1)
			// 	this.menu = newMENU_ITEMS;
			// }
		}
	}
	menu = [];
}
