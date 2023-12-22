import { Component, OnInit,NgZone } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router'
import {CommonService} from "../../services/common.service";
@Component({
  selector: 'ngx-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
	constructor ( private myRouter:Router,private common:CommonService,private ngZone: NgZone) {
		   this.myRouter.events.subscribe(event => { 
		          if(event instanceof NavigationEnd){
		            // console.log(event);
					this.pathname = event.url
		          }    
		        })
			window["NgAppRef"] = { component: this, zone: this.ngZone };
		}
	headerMenu = [];
	// 刷新更新顶部菜单
	headerMenuUpdate(){
		this.menuChange()
	}
	adminHeaderMenu = [
		{
			title:'歌曲信息',
			link:'/pages/search-songs'
		},
		{
			title:'查询歌单',
			link:'/pages/query-songlist'
		},
		{
			title:'音轨分离',
			link:'/pages/track-separate'
		},
		{
			title:'搜索',
			link:'/pages/search-page'
		},
		{
			title:'官网',
			link:'http://www.tingjianmusic.top/'
		},
		{
			title:'工具',
			link:'/pages/tool'
		},
		{
			title:'Telegram',
			link:'https://evgeny-nadymov.github.io/telegram-react/'
		}
	]
	
	ngOnInit(): void {
		  this.menuChange()
	}
	menuChange(){
		// 验证是否为超级管理员
		if(!this.common.checkAdmin()){
			let menu:any = localStorage.getItem('menu')
			menu = JSON.parse(menu)
			let list = menu.top || [];
			let arr = []
			for(let i = 0;i<list.length;i++){
				if(list[i].ID){
					arr.push(list[i].menu)
				}
			}
			this.headerMenu = arr;
		}else{
			this.headerMenu = this.adminHeaderMenu;
		}
	}
	pathname='';
	clickMenu(link:string,title:string){
		if(title=='官网' || title=='Telegram'){
			window.open(link)
			return
		}
		// 去除左侧active
		document.getElementsByClassName('active').length!=0?document.getElementsByClassName('active')[0].classList.remove('active'):''
		document.getElementsByClassName('active')[0]?document.getElementsByClassName('active')[0].classList.remove('active'):''
		this.pathname = link;
		this.myRouter.navigateByUrl(link);
		// console.log(window.location.pathname)
	}
}
