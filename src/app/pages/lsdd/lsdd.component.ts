import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
@Component({
  selector: 'ngx-lsdd',
  templateUrl: './lsdd.component.html',
  styleUrls: ['./lsdd.component.scss']
})
export class LsddComponent implements OnInit {
  constructor(public api: ApiService,public common: CommonService) { }

  ngOnInit(): void {
		this.lsddHot()
  }
  tagList = [{
  	name: '热歌榜',
  }, {
  	name: '飙升榜',
  }, {
  	name: '古风榜',
  }]
  selectItem = '热歌榜';
	loading = false;
	hotList :any= [];
	soarList :any= [];
	archaicList :any= [];
	list :any = [];
	
	hotPage = 1;
	soarPage = 1;
	archaicPage =1;
	hotPageSize = 20;
	soarPageSize = 20;
	archaicPageSize = 20;
	hotPageTotal = 200;
	soarPageTotal = 200;
	archaicPageTotal = 200;
	reload(){
		if(this.selectItem == '热歌榜'){
			this.lsddHot()
		}
		if(this.selectItem == '飙升榜'){
			this.lsddSoar()
		}
		if(this.selectItem == '古风榜'){
			this.lsddArchaic()
		}
	}
	onSelect(item: any) {
		this.selectItem = item.name;
		if(this.selectItem == '热歌榜'){
			var list = JSON.parse(JSON.stringify(this.hotList))
			this.list = list.splice((this.hotPage - 1) * this.hotPageSize,this.hotPageSize)
		}else if(this.selectItem == '飙升榜'){
			if(this.soarList.length == 0){
				this.lsddSoar()
			}else{
				var list = JSON.parse(JSON.stringify(this.soarList))
				this.list = list.splice((this.soarPage - 1) * this.soarPageSize,this.soarPageSize)
			}
		}else if(this.selectItem == '古风榜'){
			if(this.archaicList.length == 0){
				this.lsddArchaic()
			}else{
				var list = JSON.parse(JSON.stringify(this.archaicList))
				this.list = list.splice((this.archaicPage - 1) * this.archaicPageSize,this.archaicPageSize)
			}
		}
	}
	//铃声多多热铃榜
	lsddHot(){
		this.loading = true;
		this.api.lsddHot().subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				res.result.forEach((item:any)=>{
					item.isPlay = false;
				})
				this.hotPage = 1;
				this.hotList = JSON.parse(JSON.stringify(res.result))
				this.list = res.result.splice((this.hotPage - 1)* this.hotPageSize,this.hotPageSize)
			}
			console.log(res)
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	//铃声多多热铃榜
	lsddSoar(){
		this.loading = true;
		this.api.lsddSoar().subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				res.result.forEach((item:any)=>{
					item.isPlay = false;
				})
				this.soarPage = 1;
				this.soarList = JSON.parse(JSON.stringify(res.result))
				this.list = res.result.splice((this.soarPage - 1)* this.soarPageSize,this.soarPageSize)
			}
			console.log(res)
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	//铃声多多古风榜
	lsddArchaic(){
		this.loading = true;
		this.api.lsddArchaic().subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				res.result.forEach((item:any)=>{
					item.isPlay = false;
				})
				this.archaicPage = 1;
				this.archaicList = JSON.parse(JSON.stringify(res.result))
				this.list = res.result.splice((this.archaicPage - 1)* this.archaicPageSize,this.archaicPageSize)
			}
			console.log(res)
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	nzPageIndexChangeHot(page:number): void{
		this.hotPage = page;
		var list = JSON.parse(JSON.stringify(this.hotList))
		this.list = list.splice((this.hotPage - 1) * this.hotPageSize,this.hotPageSize)
	}
	nzPageIndexChangeSoar(page:number): void{
		this.soarPage = page;
		var list = JSON.parse(JSON.stringify(this.soarList))
		this.list = list.splice((this.soarPage - 1) * this.soarPageSize,this.soarPageSize)
	}
	nzPageIndexChangeArchaic(page:number): void{
		this.archaicPage = page;
		var list = JSON.parse(JSON.stringify(this.archaicList))
		this.list = list.splice((this.archaicPage - 1)* this.archaicPageSize,this.archaicPageSize)
	}
}
