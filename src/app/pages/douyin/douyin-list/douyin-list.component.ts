import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
import { NzMessageService  } from 'ng-zorro-antd/message';
@Component({
  selector: 'ngx-douyin-list',
  templateUrl: './douyin-list.component.html',
  styleUrls: ['./douyin-list.component.scss']
})
export class DouyinListComponent implements OnInit {
  constructor(public api: ApiService,public common: CommonService,private message: NzMessageService) {
  }
  ngOnInit(): void {
  	  this.getDouyinHotList()
  }
	tagList = [{
		name: '抖音热榜',
		holder: '抖音热榜搜索'
	},{
		name: '音乐热歌榜',
		holder: '音乐热歌榜搜索'
	},{
		name: '热门视频榜',
		holder: '热门视频榜搜索'
	},{
		name: '亚运会热榜',
		holder: '亚运会热榜搜索'
	},]
	selectItem = '抖音热榜';
	searchValue = '';
	loading = false;
	searchHolder = "抖音热榜搜索";
	dyHotList=[]
	dyMusicList=[]
	dyVideoList=[]
	dyYyhList=[]
	onSelect(item: any) {
		this.selectItem = item.name;
		this.searchHolder = item.holder;
		// this.searchValue = '';
		if (this.selectItem == '抖音热榜'&&this.dyHotList.length==0) {
			this.getDouyinHotList()
		}
		if (this.selectItem == '音乐热歌榜'&&this.dyMusicList.length==0) {
			this.getDouyinMusicHotList()
		}
		if (this.selectItem == '热门视频榜'&&this.dyVideoList.length==0) {
			this.getDouyinVideoHotList()
		}
		if (this.selectItem == '亚运会热榜'&&this.dyYyhList.length==0) {
			this.getDouyinYyhList()
		}
	}
	// search(value: string) {
	// 	if(this.loading) return
	// 	this.searchValue = value;
	// 	// this.McscSearchZGPage=1;
	// 	this.loading = true;
	// 	if (this.selectItem == '抖音热榜') {
	// 		this.getDouyinHotList()
	// 	}
	// 	if (this.selectItem == '音乐热歌榜') {
	// 		this.getDouyinMusicHotList()
	// 	}
	// 	if (this.selectItem == '热门视频榜') {
	// 		this.getDouyinVideoHotList()
	// 	}
	// 	if (this.selectItem == '亚运会热榜') {
	// 		this.getDouyinYyhList()
	// 	}
		
	// }
	// 亚运会
	getDouyinYyhList(){
		this.loading = true;
		this.api.getDouyinYyhList().subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.dyYyhList=res.result;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	time:any=''
	// 视频
	getDouyinVideoHotList(){
		this.loading = true;
		this.api.getDouyinVideoHotList().subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.dyVideoList=res.result;
				this.time = res.time
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	// 音乐
	getDouyinMusicHotList(){
		this.loading = true;
		this.api.getDouyinMusicHotList().subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.dyMusicList=res.result;
				this.time = res.time
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	// 热榜
	getDouyinHotList(){
		this.loading = true;
		this.api.getDouyinHotList().subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.dyHotList=res.result;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
