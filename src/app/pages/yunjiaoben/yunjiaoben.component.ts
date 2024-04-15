import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
	selector: 'ngx-yunjiaoben',
	templateUrl: './yunjiaoben.component.html',
	styleUrls: ['./yunjiaoben.component.scss']
})
export class YunjiaobenComponent implements OnInit {

	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) { }
	ngOnInit(): void {
		this.getTripartite_vowel();
	}
	getTripartite_vowel(){
		this.loading = true;
		this.api.tripartite_vowel({}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				let arr = []
				res.result.forEach((item:any)=>{
					arr.push({value:item.vowel,label:item.vowel})
				})
				this.yunjiaolist = arr;
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	loading = false;
	searchValue = "";
	searchHolder = "请输入一段文字";
	search(e: any) {
		console.log(e)
		this.searchValue = e;
		if(!e) return;
		this.loading = true;
		this.api.tripartite_keyword({keyword:e}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				let arr = [];
				res.result.forEach((item:any)=>{
					arr.push({value:item,label:item})
				})
				this.yunjiaoAccordlist = arr;
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	

	shengdiao = 0;
	shengdiaolist = [
		{
			value: 0,
			label: "全部"
		},
		{
			value: 5,
			label: "平声"
		}, {
			value: 1,
			label: "一声"
		}, {
			value: 2,
			label: "二声"
		}, {
			value: 3,
			label: "三声"
		}, {
			value: 4,
			label: "四声"
		},]
	ngModelShengdiao(e: any) {
		console.log(e)
		this.Search(this.yunjiaoAccord,this.shengdiao,"sousuo")
	}
	yunjiaoAccord = null;
	yunjiaoAccordlist=[];
	ngModelYunjiaoAccord(e:any){
		console.log(e)
		this.Search(this.yunjiaoAccord,this.shengdiao,"sousuo")
	}
	
	
	
	
	shengdiao2 = 0;
	shengdiaolist2 = [
		{
			value: 0,
			label: "全部"
		},
		{
			value: 5,
			label: "平声"
		}, {
			value: 1,
			label: "一声"
		}, {
			value: 2,
			label: "二声"
		}, {
			value: 3,
			label: "三声"
		}, {
			value: 4,
			label: "四声"
		},]
	ngModelShengdiao2(e: any) {
		console.log(e)
	}
	yunjiao = "";
	yunjiaolist:any = []
	
	ngModelYunjiao(e: any) {
		console.log(e)
	}
	yunjiaoSearch(){
		this.Search(this.yunjiao,this.shengdiao2,"yunjiao")
	}
	// 韵脚搜索 & 关键字搜索
	Search(yunjiao:string,shengdiao:number,type:string){
		if(yunjiao == null) return;
		this.loading = true;
	
		this.api.tripartite_info({vowel:yunjiao,sound:shengdiao}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.yunjiaoPage = 1;
				this.sousuoPage=1;
				if(type=="yunjiao"){
					this.yunjiaoResult = this.common.spArr(res.result,this.size)
					this.yunjiaoTotal = res.result.length;
				}
				if(type=="sousuo"){
					this.sousuoResult = this.common.spArr(res.result,this.size)
					this.sousuoTotal = res.result.length;
				}
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	yunjiaoPage=1;
	yunjiaoTotal=1;
	size=15;
	sousuoPage=1;
	sousuoTotal=1;
	yunjiaoResult:any=[];
	sousuoResult:any=[];
	nzPageIndexChangeSousuo(page:any){
		this.sousuoPage=page;
	}
	nzPageIndexChangeYunjiao(page:any){
		this.yunjiaoPage = page;
	}
}
