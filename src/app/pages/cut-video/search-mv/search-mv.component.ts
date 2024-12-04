import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: "ngx-search-mv",
	templateUrl: "./search-mv.component.html",
	styleUrls: ["./search-mv.component.scss"],
})
export class SearchMvComponent implements OnInit {
	constructor(public common : CommonService, public api : ApiService, private router : Router,private toast: ToastrService,) { }
	ngOnInit() : void {
		
	}
	loading=false;
	keyword="";
	selectIndex=0;
	tagList:any=[{
		name:"qq搜索",
		holder:"请输入链接",
		tip:"https://y.qq.com/n/ryqq/mv/002wmPDs1kCWku"
	},{
		name:"酷狗搜索",
		holder:"请输入链接",
		tip:"https://www.kugou.com/mv/7cw3675"
	}];
	qqData:any=null
	kgData:any=null
	kgSongItem:any=null
	search(keyword:string){
		this.keyword = keyword;
		let KeyWord = keyword;
		if(this.selectIndex==0){
			if(KeyWord.indexOf("https://y.qq.com/n/ryqq/mv/") == -1){
				this.toast.info("链接格式错误")
				return
			}
			KeyWord = KeyWord.replace("https://y.qq.com/n/ryqq/mv/","")
			this.qqApi(KeyWord)
		}
		if(this.selectIndex==1){
			if(KeyWord.indexOf("www.kugou.com/mv/") == -1 && KeyWord.indexOf("www.kugou.com/mvweb/html") == -1){
				this.toast.info("链接格式错误")
				return
			}
			KeyWord = KeyWord.replace("https://www.kugou.com/mv/","")
			KeyWord = KeyWord.replace("https://www.kugou.com/mvweb/html/mv_","")
			KeyWord = KeyWord.replace("/","")
			this.kgApi(KeyWord)
		}
	}
	onSelect(index:number){
		this.selectIndex = index;
	}
	qqApi(KeyWord:string){
		this.loading=true;
		this.api.MvInfoUrlProxyQQ({
			Mid:KeyWord,
		}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.qqData=res.data;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	kgApi(KeyWord:string){
		this.loading=true;
		this.api.MvInfoUrlProxyKG({
			Id:KeyWord,
		}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				res.data.authors.forEach((item:any)=>{
					item.singeravatar = item.singeravatar.replace("{size}","240")
				})
				this.kgData=res.data;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	searchSongKg(){
		this.loading = true;
		this.api.searchKeywordKGForMv({
			MixSongID:this.kgData.MixSongID,
			scid:this.kgData.scid,
			keyword:this.kgData.mv_name
		}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.kgSongItem=res.data;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
