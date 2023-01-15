import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService{
	baseUrl = environment.baseUrl;
	tencentUrl = environment.tencentUrl;
	constructor(private http:HttpClient) {
		
	}
	
	// qq搜索歌曲
	getQQ(params: any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=search_qq&params="+JSON.stringify({keyword,page}))
	}
	// qq免费歌曲
	getQq_freeSongs(params:any){
		let {
			page,
			pageSize,
			keyword,
			type,
			newly
		} = params;
		let url = this.baseUrl +'/qq/freeSongs?page='+page+'&pageSize='+pageSize+'&keyword='+keyword+'&type='+type+'&newly='+newly
		return this.http.get(url)
	}
	// 根据mid获取 收听 指数 排名
	getQq_exponent(params:any){
		let {
			songmid
		} = params;
		let url = this.tencentUrl+"/music?action=qq_exponent&params="+JSON.stringify({songmid})
		return this.http.get(url)
	}
	// qq歌词
	getQQLyric(params:any){
		let {
			songmid
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=qq_lyric&params="+JSON.stringify({songmid}))
	}
	// 酷狗歌词
	getKugouLyric(params:any){
		let {
			hash
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=kugou_lyric&params="+JSON.stringify({hash}))
	}
	// 酷我歌词
	getKuwoLyric(params:any){
		let {
			rid
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=kuwo_lyric&params="+JSON.stringify({rid}))
	}
	// 网易云歌词
	getWangyiyunLyric(params:any){
		let {
			songid
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=wangyiyun_lyric&params="+JSON.stringify({songid}))
	}
	// 搜索qq歌单
	get_qq_songlist(params:any){
		let {
			pageSize,
			keyword,
			page
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=search_qq_songlist&params="+JSON.stringify({pageSize,keyword,page}))
	}
	// 酷我搜索歌曲
	getKuwo(params: any){
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=search_kuwo&params="+JSON.stringify({keyword,page}))
	}
	// 获取酷我单条评论数
	getKuwoComment(params:any){
		let {
			rid,
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=search_kuwo_comment&params="+JSON.stringify({rid}))
	}
	// 网易云搜索歌曲
	getWangyiyun(params: any){
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=search_wangyiyun&params="+JSON.stringify({keyword,page}))
	}
	// 网易云搜索用户
	getWangyiyun_user(params:any){
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=search_wangyiyun_user&params="+JSON.stringify({keyword,page}))
	}
	// 酷狗v3搜索歌曲
	getV3(params: any){
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=search_kugou&params="+JSON.stringify({keyword,page}))
	}
	// 酷狗飙升榜
	getKugou_soaring(params:any){
		let {
			page
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=kugou_soaring&params="+JSON.stringify({page}))
	}
	// 酷狗萤火计划 获取标签
	getKugou_yinghuoTag(){
		return this.http.get(this.tencentUrl+"/music?action=kugou_yinghuo_tag")
	}
	// 酷狗 萤火计划
	getKugou_yinghuo(params:any){
		return this.http.get(this.tencentUrl+"/music?action=kugou_yinghuo&params="+JSON.stringify(params))
	}
	// 酷狗 id获取指数
	getKugou_exponent(params:any){
		let {
			scid
		} = params
		let url = this.tencentUrl+"/music?action=kugou_exponent&params="+JSON.stringify({scid})
		return this.http.get(url)
	}
	// 酷狗免费歌曲
	getKugou_freeSongs(params:any){
		let {
			page,
			pageSize,
			keyword,
			type,
			newly
		} = params;
		let url = this.baseUrl +'/kugou/freeSongs?page='+page+'&pageSize='+pageSize+'&keyword='+keyword+'&type='+type+'&newly='+newly
		return this.http.get(url)
	}
	// 腾讯音乐人搜索
	getMusicianTx(params:any){
		let {
			page,
			keyword,
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=search_qq_musician&params="+JSON.stringify({keyword,page}))
	}
	// 抖音热点
	getDouyinHot(){
		return this.http.get(this.tencentUrl+"/music?action=douyin_hot")
	}
	//抖音短视频
	getDouyinVideo(params:any){
		let {
			keyword
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=douyin_video&params="+JSON.stringify({keyword}))
		
	}
	// 听歌识曲
	getIdentification(params:any){
		let {
			file
		} = params;
		const formData: FormData = new FormData();
		formData.append('file', file);
		let url = this.baseUrl +'/articles/getIdentification'
		// let url = "https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/ffm?action=getIdentification"
		return this.http.post(url,formData)
	}
	// 音轨分离
	trackSeparate(params:any){
		let {
			file,
			compress
		} = params;
		const formData: FormData = new FormData();
		formData.append('file', file);
		formData.append('compress',compress)
		let url = this.baseUrl +'/articles/trackSeparate'
		// let url = 'http://communityapi.jinzhoushaokao.top'+'/articles/trackSeparate'
		return this.http.post(url,formData)
	}
	// 删除音轨分离文件
	removeFile(params:any){
		let {
			filename
		} = params;
		let url = this.baseUrl +'/articles/removeFileTrackSeparate?filename='+filename
		return this.http.get(url)
	}
	//版权搜索 名字
	copyrightSearch(params:any){
		let {
			keyword
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=copyright_search&params="+JSON.stringify({keyword}))
	}
	// 版权搜索链接
	copyrightSearchLink(params:any){
		let {
			keyword
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=copyright_searchLink&params="+JSON.stringify({url:keyword}))
	}
	// 版权扫描 上传文件
	copyrightCheck(params:any){
		let {
			file,
			name,
			type
		} = params;
		const formData: FormData = new FormData();
		formData.append('file', file);
		let url = this.baseUrl +'/articles/copyrightCheck?name='+name+'&type='+type
		return this.http.post(url,formData)
	}
	// 版权扫描 上传文件 刷新
	copyrightCheck_reload(params:any){
		let {
			id
		} = params;
		let url = this.baseUrl +'/articles/copyrightCheck_reload?id='+id
		return this.http.get(url)
	}
	//铃声多多热铃榜
	lsddHot(){
		return this.http.get(this.tencentUrl+"/music?action=lsdd_hot")
	}
	//铃声多多热铃榜
	lsddSoar(){
		return this.http.get(this.tencentUrl+"/music?action=lsdd_soar")
	}
	//铃声多多古风榜
	lsddArchaic(){
		return this.http.get(this.tencentUrl+"/music?action=lsdd_archaic")
	}
	// 铃声多多搜索
	getLsdd(params:any){
		let {
			page,
			pageSize,
			keyword
		} = params;
		return this.http.get(this.tencentUrl+"/music?action=search_lsdd&params="+JSON.stringify({page,pageSize,keyword}))
	}
	//快手热度搜索
	getkuaishouSearch() {
	    return this.http.get(this.tencentUrl+"/music?action=kuaishou_hot")
	}
}