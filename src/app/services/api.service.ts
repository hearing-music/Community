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
	getQQLyric(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=qq_lyric&params="+JSON.stringify({songmid:params.songmid}))
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
	// 酷狗萤火计划 获取标签
	getKugou_yinghuoTag(){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=kugou_yinghuo_tag")
	}
	// 酷狗 萤火计划
	getKugou_yinghuo(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=kugou_yinghuo&params="+JSON.stringify(params))
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
	// 听歌识曲
	getIdentification(params:any){
		const formData: FormData = new FormData();
		formData.append('file', params.file);
		let url = 'http://communityapi.jinzhoushaokao.top/articles/getIdentification'
		// let url = "https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/ffm?action=getIdentification"
		return this.http.post(url,formData)
	}
	//版权搜索 名字
	copyrightSearch(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=copyright_search&params="+JSON.stringify({keyword:params.keyword}))
	}
	// 版权搜索链接
	copyrightSearchLink(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=copyright_searchLink&params="+JSON.stringify({url:params.keyword}))
	}
	// 版权扫描 上传文件
	copyrightCheck(params:any){
		const formData: FormData = new FormData();
		formData.append('file', params.file);
		let url = "https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/ffm?action=copyright_check&params="+JSON.stringify({name:params.name,type:params.type})
		return this.http.post(url,formData)
	}
	//铃声多多热铃榜
	lsddHot(){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=lsdd_hot")
	}
	//铃声多多热铃榜
	lsddSoar(){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=lsdd_soar")
	}
	//铃声多多古风榜
	lsddArchaic(){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=lsdd_archaic")
	}
	// 铃声多多搜索
	getLsdd(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_lsdd&params="+JSON.stringify({page:params.page,pageSize:params.pageSize,keyword:params.keyword}))
	}
	//快手热度搜索
	getkuaishouSearch() {
	    return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=kuaishou_hot")
	}
}