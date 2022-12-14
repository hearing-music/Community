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
	tagList: any[] = [{
		name: '腾讯音乐人',
		holder: '腾讯音乐人搜索'
	}, {
		name: '网易私信',
		holder: '网易私信搜索'
	}, 
	// {
	// 	name: '厂牌用户',
	// 	holder: '用户搜索'
	// }, {
	// 	name: '5SING用户',
	// 	holder: '5SING搜索'
	// }
	]
	selectItem = '腾讯音乐人';
	searchValue = '';
	loading = false;
	searchHolder = "腾讯音乐人搜索";
	
	sing5Page=1;
	sing5PageSize=30;
	sing5PageTotal=30;
	sing5List: any[]=[];
	
	brandUserPage=1;
	brandUserList: any[]=[];
	brandUserPageSize=30;
	brandUserPageTotal=30;
	
	wangyisixinPage=1;
	wangyisixinList: any[]=[];
	
	musicianTxPage = 1;
	musicianTxList: any[] = []

	search(value: string): void {
		console.log(value)
		this.searchValue = value;
		this.musicianTxPage = 1;
		this.loading = true;
		if (this.selectItem == '腾讯音乐人') {
			this.searchMusicianTx()
		}
		if(this.selectItem == '网易私信'){
			this.searchWangyisixin()
		}
		
	}
	onSelect(item: any): void {
		this.selectItem = item.name;
		this.searchHolder = item.holder;
		this.searchValue = '';
	}

	musicianTxPageNext(): void{
		if (this.musicianTxList.length == 0) {
			return
		}
		this.musicianTxPage += 1;
		this.loading = true;
		this.searchMusicianTx()
	}
	wangyisixinPageNext(): void{
		if (this.wangyisixinList.length == 0) {
			return
		}
		this.wangyisixinPage += 1;
		this.loading = true;
		this.searchWangyisixin()
	}
	nzPageIndexChangeBrandUser(e:any): void{
		console.log(e)
	}
	nzPageIndexChangeSing5(e:any): void{
		console.log(e)
	}
	searchWangyisixin(): void{
		this.api.getWangyiyun_user({
			keyword: this.searchValue,
			page: this.wangyisixinPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			// res.data.results.forEach((item:any)=>{
			// 	item.topinfo = item.topinfo || {}
			// })
			if (res.success) {
				if (this.wangyisixinPage == 1) {
					this.wangyisixinList = res.result;
				} else {
					this.wangyisixinList = [...this.wangyisixinList, ...res.result];
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	searchMusicianTx(): void{
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
