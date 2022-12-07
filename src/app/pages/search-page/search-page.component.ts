import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
@Component({
	selector: 'ngx-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit {

	constructor(public api: ApiService) { }

	ngOnInit(): void {
	}
	tagList = [{
		name: '腾讯音乐人',
		holder: '腾讯音乐人搜索'
	}, {
		name: '网易私信',
		holder: '网易私信搜索'
	}, {
		name: '厂牌用户',
		holder: '用户搜索'
	}, {
		name: '5SING用户',
		holder: '5SING搜索'
	}]
	selectItem = '腾讯音乐人';
	searchValue = '';
	loading = false;
	searchHolder = "腾讯音乐人搜索";
	
	sing5Page=1;
	sing5PageSize=30;
	sing5PageTotal=30;
	sing5List=[];
	
	brandUserPage=1;
	brandUserList=[];
	brandUserPageSize=30;
	brandUserPageTotal=30;
	
	wangyisixinPage=1;
	wangyisixinList=[];
	
	musicianTxPage = 1;
	musicianTxList: any[] = []

	search(value: string) {
		console.log(value)
		this.searchValue = value;
		this.musicianTxPage = 1;
		this.loading = true;
		if (this.selectItem == '腾讯音乐人') {
			this.searchMusicianTx()
		}
		
	}
	onSelect(item: any) {
		this.selectItem = item.name;
		this.searchHolder = item.holder;
		this.searchValue = '';
	}

	musicianTxPageNext(){
		if (this.musicianTxList.length == 0) {
			return
		}
		this.musicianTxPage += 1;
		this.loading = true;
		this.searchMusicianTx()
	}
	nzPageIndexChangeBrandUser(){
		
	}
	nzPageIndexChangeSing5(){
		
	}
	searchMusicianTx(){
		this.api.getMusicianTx({
			keyword: this.searchValue,
			page: this.musicianTxPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			// res.data.results.forEach((item:any)=>{
			// 	item.topinfo = item.topinfo || {}
			// })
			if (res.success) {
				if (this.musicianTxPage == 1) {
					this.musicianTxList = res.result;
				} else {
					this.musicianTxList = [...this.musicianTxList, ...res.result];
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
