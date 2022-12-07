import { Component, OnInit } from '@angular/core';
import { Router,NavigationEnd } from '@angular/router'

@Component({
  selector: 'ngx-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent implements OnInit {
  　constructor ( private myRouter:Router) {
	   this.myRouter.events.subscribe(event => { 
	          if(event instanceof NavigationEnd){
	            // console.log(event);
				this.pathname = event.url
	          }    
	        })
	}
	pathname='';
	clickMenu(link:string,name:string){
		if(name=='官网'){
			window.open(link)
			return
		}
		this.pathname = link;
		this.myRouter.navigateByUrl(link);
		// console.log(window.location.pathname)
	}
	headerMenu = [
		{
			name:'查询歌单',
			link:'/pages/query-songlist'
		},
		{
			name:'搜索',
			link:'/pages/search-page'
		},
		{
			name:'官网',
			link:'http://www.tingjianmusic.top/'
		}
	]
  ngOnInit(): void {
	  
  }

}
