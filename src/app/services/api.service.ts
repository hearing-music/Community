import { Injectable } from '@angular/core';
import {
	HttpClient
} from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
	providedIn: 'root'
})
export class ApiService {
	baseUrl = environment.baseUrl;
	tencentUrl = environment.tencentUrl;
	constructor(private http: HttpClient) {

	}

	// qq搜索歌曲
	getQQ(params: any) {
		let {
			keyword,
			page
		} = params;
		// return this.http.get(this.tencentUrl + "/music?action=search_qq&params=" + JSON.stringify({ keyword, page }))
		return this.http.get(this.baseUrl + '/qq/search_qq?page=' + page + '&keyword=' + keyword)
	}
	// qq免费歌曲
	getQq_freeSongs(params: any) {
		let {
			page,
			pageSize,
			keyword,
			type,
			newly
		} = params;
		let url = this.baseUrl + '/qq/freeSongs?page=' + page + '&pageSize=' + pageSize + '&keyword=' + keyword + '&type=' + type + '&newly=' + newly
		return this.http.get(url)
	}
	// 根据mid获取 收听 指数 排名
	getQq_exponent(params: any) {
		let {
			songmid,
			keyword
		} = params;
		let url = this.baseUrl + "/qq/qq_exponent?songmid=" + songmid
		return this.http.get(url)
	}
	// qq歌词
	getQQLyric(params: any) {
		let {
			songmid
		} = params;
		return this.http.get(this.baseUrl + "/qq/qq_lyric?songmid=" + songmid)
	}
	// 酷狗歌词
	getKugouLyric(params: any) {
		let {
			hash
		} = params;
		return this.http.get(this.baseUrl + "/kugou/kugou_lyric?hash=" + hash)
	}
	// 酷我歌词
	getKuwoLyric(params: any) {
		let {
			rid
		} = params;
		return this.http.get(this.baseUrl + "/kuwo/kuwo_lyric?rid=" + rid)
	}
	// 网易云歌词
	getWangyiyunLyric(params: any) {
		let {
			songid
		} = params;
		return this.http.get(this.baseUrl + "/wangyiyun/wangyiyun_lyric?songid=" + songid)
	}
	// 搜索qq歌单
	get_qq_songlist(params: any) {
		let {
			pageSize,
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/qq/search_qq_songlist?page=" + page + "&pageSize=" + pageSize + "&keyword=" + keyword)
	}
	// 酷我搜索歌曲
	getKuwo(params: any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/kuwo/search_kuwo?keyword=" + keyword + "&page=" + page)
	}
	// 获取酷我单条评论数
	getKuwoComment(params: any) {
		let {
			rid,
		} = params;
		return this.http.get(this.baseUrl + "/kuwo/search_kuwo_comment?rid=" + rid)
	}
	// 网易云搜索歌曲
	getWangyiyun(params: any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/wangyiyun/search_wangyiyun?keyword=" + keyword + "&page=" + page)
	}
	// 网易云搜索用户
	getWangyiyun_user(params: any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/wangyiyun/search_wangyiyun_user?keyword=" + keyword + "&page=" + page)
	}
	// 酷狗v3搜索歌曲
	getV3(params: any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/kugou/search_kugou?keyword=" + keyword + "&page=" + page)
	}
	// 酷狗飙升榜
	getKugou_soaring(params: any) {
		let {
			page
		} = params;
		return this.http.get(this.baseUrl + "/kugou/kugou_soaring?page=" + page)
	}
	// 酷狗萤火计划 获取标签
	getKugou_yinghuoTag() {
		return this.http.get(this.baseUrl + "/kugou/kugou_yinghuo_tag")
	}
	// 酷狗 萤火计划
	getKugou_yinghuo(params: any) {
		return this.http.get(this.baseUrl + "/kugou/kugou_yinghuo?params=" + JSON.stringify(params))
	}
	// 酷狗 id获取指数
	getKugou_exponent(params: any) {
		let {
			scid
		} = params
		let url = this.baseUrl + "/kugou/kugou_exponent?scid=" + scid
		return this.http.get(url)
	}
	// 酷狗免费歌曲
	getKugou_freeSongs(params: any) {
		let {
			page,
			pageSize,
			keyword,
			type,
			newly
		} = params;
		let url = this.baseUrl + '/kugou/freeSongs?page=' + page + '&pageSize=' + pageSize + '&keyword=' + keyword + '&type=' + type + '&newly=' + newly
		return this.http.get(url)
	}
	// 腾讯音乐人搜索
	getMusicianTx(params: any) {
		let {
			page,
			keyword,
		} = params;
		return this.http.get(this.baseUrl + "/qq/search_qq_musician?page=" + page + "&keyword=" + keyword)
	}
	// 抖音热点
	getDouyinHot() {
		return this.http.get(this.baseUrl + "/douyin/douyin_hot")
	}
	//抖音短视频
	getDouyinVideo(params: any) {
		let {
			keyword
		} = params;
		return this.http.get(this.baseUrl + "/douyin/douyin_video?keyword=" + keyword)

	}
	// 听歌识曲
	getIdentification(params: any) {
		let {
			file
		} = params;
		const formData: FormData = new FormData();
		formData.append('file', file);
		let url = this.baseUrl + '/articles/getIdentification'
		// let url = "https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/ffm?action=getIdentification"
		return this.http.post(url, formData)
	}
	// 音轨分离
	trackSeparate(params: any) {
		let {
			file,
			compress
		} = params;
		const formData: FormData = new FormData();
		formData.append('file', file);
		formData.append('compress', compress)
		let url = this.baseUrl + '/articles/trackSeparate'
		// let url = 'http://communityapi.jinzhoushaokao.top'+'/articles/trackSeparate'
		return this.http.post(url, formData)
	}
	// 删除音轨分离文件
	removeFile(params: any) {
		let {
			filename
		} = params;
		let url = this.baseUrl + '/articles/removeFileTrackSeparate?filename=' + filename
		return this.http.get(url)
	}
	//版权搜索 名字
	copyrightSearch(params: any) {
		let {
			keyword
		} = params;
		return this.http.get(this.baseUrl + "/articles/copyright_search?keyword=" + keyword)
	}
	// 版权搜索链接
	copyrightSearchLink(params: any) {
		let {
			keyword
		} = params;
		return this.http.get(this.baseUrl + "/articles/copyright_searchLink?url=" + keyword)
	}
	// 版权扫描 上传文件
	copyrightCheck(params: any) {
		let {
			file,
			name,
			type
		} = params;
		const formData: FormData = new FormData();
		formData.append('file', file);
		let url = this.baseUrl + '/articles/copyrightCheck?name=' + name + '&type=' + type
		return this.http.post(url, formData)
	}
	// 版权扫描 上传文件 刷新
	copyrightCheck_reload(params: any) {
		let {
			id
		} = params;
		let url = this.baseUrl + '/articles/copyrightCheck_reload?id=' + id
		return this.http.get(url)
	}
	//铃声多多热铃榜
	lsddHot() {
		return this.http.get(this.baseUrl + "/lsdd/lsdd_hot")
	}
	//铃声多多热铃榜
	lsddSoar() {
		return this.http.get(this.baseUrl + "/lsdd/lsdd_soar")
	}
	//铃声多多古风榜
	lsddArchaic() {
		return this.http.get(this.baseUrl + "/lsdd/lsdd_archaic")
	}
	// 铃声多多搜索
	getLsdd(params: any) {
		let {
			page,
			pageSize,
			keyword
		} = params;
		return this.http.get(this.baseUrl + "/lsdd/search_lsdd?keyword=" + keyword + "&page=" + page + "&pageSize=" + pageSize)
	}
	//快手热度搜索
	getkuaishouSearch() {
		return this.http.get(this.baseUrl + "/kuaishou/kuaishou_hot")
	}
	//获取快手dj
	getkuaishouDj(params: { page: any; pageSize: any; }) {
		let url = this.baseUrl + "/kuaishou/kuaishou_1?page=" + params.page + "&pageSize=" + params.pageSize
		return this.http.get(url)
	}
	//工具银行卡
	getbank(params: { name: any; idcard_number: any; bankcard_number: any; }) {
		let url = "http://betaapi.tingjianmusic.cn/egress/aliyun/bank/validate"
		return this.http.post(url, params)
	}
	//exel转json
	exceljsonChange(params: any) {
		let { file } = params;
		const formData: FormData = new FormData();
		formData.append('content', file);
		let url = 'http://api.jinzhoushaokao.top/webtools/excel2json/create'
		return this.http.post(url, formData)
	}
	//查询歌曲搜索排行相关信息 酷狗 qq
	getqq_kugouKeywordInfo(params: any) {
		let { mid, scid } = params;
		let url = this.baseUrl + '/qq_kugou/getqq_kugouKeywordInfo?mid=' + mid + '&scid=' + scid
		return this.http.get(url)
	}
	//加入ranking数据
	setqq_kugouKeywordInfo(params: any) {
		let url = this.baseUrl + '/qq_kugou/setqq_kugouKeywordInfo'
		return this.http.post(url, { ...params })
	}
	// 查询ranking数据
	getqq_kugouInfo(params: any) {
		let { page, pageSize, type, keyword } = params;
		let url = this.baseUrl + '/qq_kugou/getqq_kugouInfo?page=' + page + '&pageSize=' + pageSize + '&type=' + type + '&keyword=' + keyword
		return this.http.get(url)
	}
	// 刷新ranking数据
	getqq_kugouKeywordRanking(params: any) {
		let { mid, scid, keyword } = params;
		let url = this.baseUrl + '/qq_kugou/getqq_kugouKeywordRanking?scid=' + scid + '&mid=' + mid + '&keyword=' + keyword
		return this.http.get(url)
	}
	// chatgpt
	getChatgpt(params: any) {
		let { question } = params;
		let url = this.baseUrl + '/v1/chat/completions?question=' + question
		return this.http.get(url)
	}
	// ccc(){
	// 	this.bbb().subscribe((res: any) => {
	// 		console.log(res)
	// 		let blob = res

	// 		let downloadElement = document.createElement('a');

	// 		let href = window.URL.createObjectURL(blob); //创建下载的链接

	// 		// let fileName = res.headers["content-disposition"] ? res.headers["content-disposition"].split(';')[1].split('=')[1] : new Date().getTime() + '.xlsx'

	// 		downloadElement.href = href;

	// 		downloadElement.download = decodeURIComponent('1.mp3')//解码

	// 		document.body.appendChild(downloadElement);

	// 		downloadElement.click();

	// 		document.body.removeChild(downloadElement);

	// 		window.URL.revokeObjectURL(href); //释放掉blob对象
	// 	}, (err: any) => {
	// 		console.log(err)
	// 	})
	// }
	// bbb(){
	// 	return this.http.get('http://localhost:3222/qq_kugou/ccc',{responseType:'blob'})

	// }
}