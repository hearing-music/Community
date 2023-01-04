import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-free-songs',
  templateUrl: './free-songs.component.html',
  styleUrls: ['./free-songs.component.scss']
})
export class FreeSongsComponent implements OnInit {
	constructor(public common: CommonService, public api: ApiService) { }
	
	ngOnInit(): void {
		this.getKugou_freeSongs()
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
		name:'歌曲 audio ID'
	}]
	checked=false
	nzPageIndexChange(e:any){
		this.pageCurrent = e;
		this.getKugou_freeSongs()
	}
	openLink(item:any) {
		console.log(item)
		if (!item.song_url) return
		window.open(item.song_url)
	}
	copy(text:string){
		this.common.copy(text)
	}
	reloadExponent(item:any){
		this.loading = true;
		this.api.getKugou_exponent({
			scid:item.audio_id
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if(res.success){
				item.newExponent = res.result;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	search(e:any){
		this.searchValue =e;
		this.pageCurrent = 1;
		this.getKugou_freeSongs()
	}
	ngModelChange(e:any){
		if(this.type == '歌曲名'){
			this.searchHolder = '搜索歌曲名'
		}else{
			this.searchHolder = '搜索歌曲audio ID'
		}
	}
	ngModelChangeCheckBox(e:any){
		console.log(e)
	}
	change(e:any) {
		this.pageCurrent = e.current;
		this.getKugou_freeSongs()
	}
	getKugou_freeSongs() {
		this.loading = true;
		this.api.getKugou_freeSongs({
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
