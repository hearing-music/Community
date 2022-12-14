import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
@Component({
	selector: 'ngx-search-songs',
	templateUrl: './search-songs.component.html',
	styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit {
	constructor(public api: ApiService) { }
	tagList = [{
		name: 'QQ音乐',
		holder: 'qq搜索'
	}, {
		name: '酷狗V3',
		holder: '酷狗V3搜索'
	}, {
		name: '酷我音乐',
		holder: '酷我搜索'
	}, {
		name: '网易云',
		holder: '网易云搜索'
	}]
	selectItem = 'QQ音乐';
	searchValue = '';
	loading = false;
	searchHolder = "qq搜索";
	wangyiyunList:any[]=[]
	kuwoList:any[]=[]
	kuwoPage=1
	wangyiyunPage=1

qqList: any[] = []
kugouV3List: any[] = []
qqPage = 1;
kugouV3Page = 1;
onSelect(item: any) {
	this.selectItem = item.name;
	this.searchHolder = item.holder;
	this.searchValue = '';
}
search(value: string) {
	console.log(value)
	this.searchValue = value;
	this.qqPage = 1;
	this.kugouV3Page = 1;
	this.loading = true;
	if (this.selectItem == 'QQ音乐') {
		this.searchQQ()
	}
	if (this.selectItem == '酷狗V3') {
		this.searchV3()
	}
	if (this.selectItem == '酷我音乐') {
		this.searchKuwo()
	}
	if (this.selectItem == '网易云') {
		this.searchWangyiyun()
	}
}
searchKuwo(){
	this.api.getKuwo({
		keyword: this.searchValue,
		page: this.kuwoPage
	}).subscribe((res: any) => {
		this.loading = false;
		console.log(res)
		res.result.forEach((item:any)=>{
			item.payInfo.feeType = item.payInfo.feeType || {}
		})
		if (this.kuwoPage == 1) {
			this.kuwoList = res.result;
		} else {
			this.kuwoList = [...this.kuwoList, ...res.result];
		}
	}, (err: any) => {
		console.log(err)
		this.loading = false;
	})
}
searchWangyiyun(){
	this.api.getWangyiyun({
		keyword: this.searchValue,
		page: this.wangyiyunPage
	}).subscribe((res: any) => {
		this.loading = false;
		console.log(res)
		if (this.wangyiyunPage == 1) {
			this.wangyiyunList = res.result;
		} else {
			this.wangyiyunList = [...this.wangyiyunList, ...res.result];
		}
	}, (err: any) => {
		console.log(err)
		this.loading = false;
	})
}
searchQQ(){
	this.api.getQQ({
		keyword: this.searchValue,
		page: this.qqPage
	}).subscribe((res: any) => {
		this.loading = false;
		console.log(res)
		res.result.forEach((item: any) => {
			item.topinfo = item.topinfo || {}
			item.playinfo = item.playinfo || {}
		})
		if (this.qqPage == 1) {
			this.qqList = res.result;
		} else {
			this.qqList = [...this.qqList, ...res.result];
		}
	}, (err: any) => {
		console.log(err)
		this.loading = false;
	})
}

searchV3(){
	this.api.getV3({
		keyword: this.searchValue,
		page: this.kugouV3Page
	}).subscribe((res: any) => {
		this.loading = false;
		console.log(res)
		if (res.success) {
			if (this.kugouV3Page == 1) {
				this.kugouV3List = res.result;
			} else {
				this.kugouV3List = [...this.kugouV3List, ...res.result];
			}
		}
	}, (err: any) => {
		console.log(err)
		this.loading = false;
	})
}
qqPageNext(){
	if (this.qqList.length == 0) {
		return
	}
	this.qqPage += 1;
	this.loading = true;
	this.searchQQ()
}
kuwoPageNext(){
	if (this.kuwoList.length == 0) {
		return
	}
	this.kuwoPage += 1;
	this.loading = true;
	this.searchKuwo()
}
wangyiyunPageNext(){
	if (this.wangyiyunList.length == 0) {
		return
	}
	this.wangyiyunPage += 1;
	this.loading = true;
	this.searchWangyiyun()
}
kugouV3PageNext(){
	if (this.kugouV3List.length == 0) {
		return
	}
	this.kugouV3Page += 1;
	this.loading = true;
	this.searchV3()
}

ngOnInit(): void {

}

}
