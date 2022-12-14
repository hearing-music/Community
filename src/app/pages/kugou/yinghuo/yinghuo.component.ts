import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
	selector: 'ngx-yinghuo',
	templateUrl: './yinghuo.component.html',
	styleUrls: ['./yinghuo.component.scss']
})
export class YinghuoComponent implements OnInit {
	constructor(public common: CommonService, public api: ApiService) { }

	ngOnInit(): void {
		this.getYinghuoTag()
	}
	loading = false;
	page = 1;
	pageSize = 20;
	pageTotal = 20;
	list:any=[];

	searchValue = '';
	searchHolder = '搜索';

	tagDataArr:any[] = [] //value id
	
	popInfoShow=false;
	infoText = '';
	audioSrc = '';
	ngModelChange(value: any,index:number) {
		var id = this.tagDataArr[index].items.find((e:any)=>e.desc == value).id
		this.tagDataArr[index].id = id;
		// console.log(this.tagDataArr)
		this.getKugouYinghuo()
	}
	search(value: any) {
		console.log(value)
		this.searchValue = value;
		this.getKugouYinghuo()
	}
	nzPageIndexChange(page:any){
		this.page = page;
		this.getKugouYinghuo()
	}
	getYinghuoTag(){
		this.loading = true;
		this.api.getKugou_yinghuoTag().subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			res.result.data.forEach((item:any)=>{
				item.id = undefined
				item.value = '全部'
			})
			if(res.success){
				this.tagDataArr = res.result.data;
				this.getKugouYinghuo()
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	getKugouYinghuo() {
		this.loading = true;
		let params :any = {}
		this.tagDataArr.forEach((item:any)=>{
			params[item.tag] = item.id;
		})
		this.api.getKugou_yinghuo({
			keyword: this.searchValue,
			page: this.page,
			pageSize: this.pageSize,
			...params
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if(res.success){
				this.audioSrc = ''
				this.list = res.result;
				this.pageTotal = res.totalCount;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	// 弹出 隐藏 简介
	popInfo(item:any){
		this.infoText = item.singerInfo.intro;
		this.popInfoShow = true;
	}
	handleCancel(): void {
	  this.popInfoShow = false;
	}
	// 播放歌曲
	songsPlay(item:any){
		this.audioSrc = item.detail.data.url;
	}
	
}
