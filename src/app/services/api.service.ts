import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService{
	constructor(private http:HttpClient) {
		
	}
	// qq搜索歌曲
	getQQ(params: any) {
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_qq&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	// 搜索qq歌单
	get_qq_songlist(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_qq_songlist&params="+JSON.stringify({pageSize:params.pageSize,keyword:params.keyword,page:params.page}))
	}
	// 酷我搜索歌曲
	getKuwo(params: any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_kuwo&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	// 获取酷我单条评论数
	getKuwoComment(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_kuwo_comment&params="+JSON.stringify({rid:params.rid}))
	}
	// 网易云搜索歌曲
	getWangyiyun(params: any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_wangyiyun&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	// 网易云搜索用户
	getWangyiyun_user(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_wangyiyun_user&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	// 酷狗v3搜索歌曲
	getV3(params: any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_kugou&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	// 酷狗飙升榜
	getKugou_soaring(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=kugou_soaring&params="+JSON.stringify({page:params.page}))
	}
	// 腾讯音乐人搜索
	getMusicianTx(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_qq_musician&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	// 抖音热点
	getDouyinHot(){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=douyin_hot")
	}
	//抖音短视频
	getDouyinVideo(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=douyin_video&params="+JSON.stringify({keyword:params.keyword}))
		
	}

  
}