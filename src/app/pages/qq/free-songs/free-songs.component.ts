import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-free-songs',
  templateUrl: './free-songs.component.html',
  styleUrls: ['./free-songs.component.scss']
})
export class FreeSongs_qqComponent implements OnInit {

  constructor(public common: CommonService, public api: ApiService) { }
  	
  	ngOnInit(): void {
  		this.getQq_freeSongs()
  	}
  loading=false;
  	pageCurrent=1;
  	pageSize=50;
  	pageTotal=50;
  	searchValue='';
  	searchHolder='搜索歌曲名'
  	list:any=[];
  	type='歌曲名'
  	typeList = [{
  		name:'歌曲名',
  	},{
  		name:'歌手Mid'
  	}]
  	checked=false
  	nzPageIndexChange(e:any){
  		this.pageCurrent = e;
  		this.getQq_freeSongs()
  	}
  	openLink(item:any) {
		let url = 'https://y.qq.com/n/ryqq/songDetail/'+item.songmid+'/'
  		window.open(url)
  	}
	openCompay(id:any){
		let url = 'https://y.qq.com/portal/company_detail.html?id='+id+'#sort=1&type=album'
		window.open(url)
	}
  	copy(text:string){
  		this.common.copy(text)
  	}
  	reloadExponent(item:any){
  		this.loading = true;
  		this.api.getQq_exponent({
  			songmid:item.songmid,
			keyword:item.songname
  		}).subscribe((res: any) => {
  			this.loading = false;
  			console.log(res)
  			if(res.success){
				item.today_index = res.result.todayIndex;
				item.today_rank = res.result.todayRank;
				item.cnt = res.result.cnt;
			}
  		}, (err: any) => {
  			console.log(err)
  			this.loading = false;
  		})
  	}
  	search(e:any){
  		this.searchValue =e;
  		this.pageCurrent = 1;
  		this.getQq_freeSongs()
  	}
  	ngModelChange(e:any){
  		if(this.type == '歌曲名'){
  			this.searchHolder = '搜索歌曲名'
  		}else{
  			this.searchHolder = '搜索歌手Mid'
  		}
  	}
  	ngModelChangeCheckBox(e:any){
  		console.log(e)
  	}
  	change(e:any) {
  		this.pageCurrent = e.current;
  		this.getQq_freeSongs()
  	}
  	getQq_freeSongs() {
  		this.loading = true;
  		this.api.getQq_freeSongs({
  			page: this.pageCurrent,
  			pageSize: this.pageSize,
  			keyword:this.searchValue,
  			type:this.type,
  			newly:this.checked
  		}).subscribe((res: any) => {
  			this.loading = false;
  			console.log(res)
  			if(res.success){
  				res.result.forEach((item:any)=>{
  					item.newExponent = ''
  				})
  				this.list = res.result;
  				this.pageTotal = res.pageTotal;
  			}
  		}, (err: any) => {
  			console.log(err)
  			this.loading = false;
  		})
  	}
}
