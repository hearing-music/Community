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
		if(name=='官网' || name=='Telegram'){
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
	headerMenu = [
		{
			name:'歌曲信息',
			link:'/pages/search-songs'
		},
		{
			name:'查询歌单',
			link:'/pages/query-songlist'
		},
		{
			name:'音轨分离',
			link:'/pages/track-separate'
		},
		{
			name:'搜索',
			link:'/pages/search-page'
		},
		{
			name:'官网',
			link:'http://www.tingjianmusic.top/'
		},
		{
			name:'Telegram',
			link:'https://evgeny-nadymov.github.io/telegram-react/'
		}
	]
  ngOnInit(): void {
	  
  }

}
