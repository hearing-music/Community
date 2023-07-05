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
	// qq获取公司名字
	getCompanyName(params: any) {
		return this.http.get(this.baseUrl + '/qq/getCompanyName?idlist=' + JSON.stringify(params.idlist))
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
	// 抖音达人搜索
	DouYinSearchBigV(params: any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/douyin/DouYinSearchBigV?keyword=" + keyword + "&offset=" + (page - 1) + "&count=10")
	}
	// douyin_darenSearch(params:any){
	// 	let {
	// 		keyword,
	// 		page
	// 	} = params;
	// 	return this.http.get(this.baseUrl + "/douyin/DouYinSearch?keyword=" + keyword+'&offset='+page)
	// }
	// 抖音达人是否被监控 true为被监控
	douyin_isListen(params: any) {
		let {
			SecUid
		} = params;
		return this.http.get(this.baseUrl + "/douyin/douyin_isListen?SecUid=" + SecUid)
	}
	//抖音 添加监控达人
	douyin_listenDaren(params: any) {
		return this.http.post(this.baseUrl + "/douyin/douyin_listenDaren", { ...params })
	}
	//抖音 获取监控列表
	douyin_getListenDaren(params: any) {
		let {
			page,
			keyword,
			type
		} = params;
		return this.http.get(this.baseUrl + "/douyin/douyin_getListenDaren?page=" + page + '&keyword=' + keyword + '&type=' + type)
	}
	// 抖音 视频id搜索
	DouYinSearchVideoDetails(params: any) {
		let {
			keyword,
			type
		} = params;
		return this.http.get(this.baseUrl + "/douyin/DouYinSearchVideoDetails?keyword=" + keyword + '&type=' + type)
	}
	// 抖音批量搜索 视频id url
	DouYinSearchVideoDetailsList(params: any) {
		let {
			arr,
			type
		} = params;
		return this.http.post(this.baseUrl + "/douyin/DouYinSearchVideoDetailsList", { arr, type })
	}
	// 抖音 视频是否被本人监控 并且必须监控该达人
	douyin_videoisListen(params: any) {
		let {
			awemeId,
			secUid
		} = params;
		return this.http.get(this.baseUrl + "/douyin/douyin_videoisListen?awemeId=" + awemeId + '&secUid=' + secUid)
	}
	//抖音 添加监控视频
	douyin_listenVideo(params: any) {
		return this.http.post(this.baseUrl + "/douyin/douyin_listenVideo", { ...params })
	}
	// 抖音 获取视频监控列表
	douyin_getListenVideo(params: any) {
		let {
			page,
			keyword,
			type,
			isdownload
		} = params;
		return this.http.get(this.baseUrl + "/douyin/douyin_getListenVideo?page=" + page + '&keyword=' + keyword + '&type=' + type + '&isdownload=' + isdownload)
	}
	// 听歌识曲
	getIdentification(params: any) {
		let {
			files
		} = params;
		const formData: FormData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i]);
		}
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
	//获取素材
	getSourcePhoto(params: any) {
		let {
			page,
		} = params;
		return this.http.get(this.baseUrl + "/kuaishou/discover?page=" + page)
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
		let { page, pageSize, type, keyword, orderby, plain } = params;
		let url = this.baseUrl + '/qq_kugou/getqq_kugouInfo?page=' + page + '&pageSize=' + pageSize + '&type=' + type + '&keyword=' + keyword + '&orderby=' + orderby + '&plain=' + plain
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
		let { question, lastQuestionArr } = params;
		let url = this.baseUrl + '/v1/chat/completions?question=' + question + '&lastQuestionArr=' + JSON.stringify(lastQuestionArr)
		return this.http.get(url)
	}
	// chatgpt绘图
	getChatgptPlot(params: any) {
		let { question } = params;
		let url = this.baseUrl + '/v1/chat/chatgptPlot?question=' + question
		return this.http.get(url)
	}
	//获取用户列表
	getUsersApi() {
		return this.http.get('https://golang.tingjianmusic.top/getUsersApi')
	}

	deleteUserApi(id) {
		let url = 'https://golang.tingjianmusic.top/UserApiUpdate/' + id
		return this.http.delete(url)
	}

	addUsersApi(params: any) {
		let url = 'https://golang.tingjianmusic.top/UserApiAdd'
		return this.http.post(url, params)
	}
	//获取酷狗多少人再搜
	getV3SearchNum(params: any) {
		let {
			keyword,
		} = params;
		return this.http.get(this.baseUrl + "/kugou/searchPeople?songname=" + keyword)
	}
	//获取酷狗多少人再听
	getV3ListenPeopleNum(params: any) {
		let {
			mixsongid,
		} = params;
		return this.http.get(this.baseUrl + "/kugou/listenPeople?mixsongid=" + mixsongid)
	}
	//获取酷狗在唱人
	getV3SingingPeople(params: any) {
		let {
			songname,
		} = params;
		return this.http.get(this.baseUrl + "/kugou/singingPeople?songname=" + songname)
	}

	// xilixili获取npc信息和sig id
	getNpc() {
		let url = this.baseUrl + '/xilixili/getNpc'
		return this.http.get(url)
	}
	// xilixili 获取用户信息 全部
	getOpenidList() {
		let url = this.baseUrl + '/xilixili/getOpenidList'
		return this.http.get(url)
	}

	// xilixili 获取用户信息 指定
	getOpenidInfo(params: any) {
		let { idArr } = params
		let url = this.baseUrl + '/xilixili/getOpenidInfo?idArr=' + JSON.stringify(idArr)
		return this.http.get(url)
	}
	// xilixili 发送订阅消息
	sendSubscribeMessage(params: any) {
		let url = this.baseUrl + '/xilixili/sendSubscribeMessage'
		return this.http.post(url, { ...params })
	}
	//ogg文件转换
	oggConversion(params: any) {
		let {
			file,
			typeOf
		} = params;
		const formData: FormData = new FormData();
		formData.append('file', file);
		let url = 'http://whaleTail.tingjianmusic.top/v8/SetOggToMp3?typeOf=' + typeOf;
		return this.http.post(url, formData);
	}
	getRadarList(params: any) {
		let {
			platform,
			time,
			page,
		} = params;
		return this.http.get(this.baseUrl + "/radar/getRadarList?platform=" + platform + "&time=" + time + "&page=" + page)
	}
	getKuGouHash(params: any) {
		let {
			keyword,
			mixSongId,
		} = params;
		return this.http.get(this.baseUrl + "/kugou/getHash?keyword=" + keyword + "&mixSongId=" + mixSongId)
	}
	getQqIdExponent(params: any) {
		let {
			keyword,
			songid,
		} = params;
		return this.http.get(this.baseUrl + "/qq/qq_idSearchMid?keyword=" + keyword + "&songid=" + songid)
	}
	//获取启明星标签
	getVenusTags(params: any) {
		return this.http.get(this.baseUrl + "/venus/getVenusTags")
	}
	//获取启明星列表
	getVenusList(params: any) {
		let {
			keyword,
			page,
			level,//等级评分
			granularity,//音色
			tag,//听感
			identity//身份
		} = params;
		return this.http.get(this.baseUrl + "/venus/getVenusList?keyword=" + keyword + "&page=" + page + "&level=" + level + "&granularity=" + granularity + "&tag=" + tag + "&identity=" + identity)
	}
	// 获取 付费 免费 播放指数总和
	getVenusSongsAllIndex(params: any) {
		let {
			changJiangId
		} = params;
		return this.http.get(this.baseUrl + "/venus/getVenusSongsAllIndex?changJiangId=" + changJiangId)
	}
	// qq 获取指定作者10首个mid 歌曲地址 歌词
	getqq_singerSongs(params: any) {
		let {
			singerId
		} = params;
		return this.http.get(this.baseUrl + "/qq/qq_singerSongs?singerId=" + singerId)
	}
	// 获取歌手 歌曲信息
	getVenusSongs(params: any) {
		let {
			id,
			page,
			type
		} = params;
		return this.http.get(this.baseUrl + "/venus/getVenusSongs?page=" + page + "&id=" + id + '&type=' + type)
	}
	// 获取歌手用户画像
	getVenusSingerData(params: any) {
		let {
			id
		} = params;
		return this.http.get(this.baseUrl + "/venus/getVenusSingerData?id=" + id)
	}
	//唱将音乐搜索
	searchEnlightenmentSongs2(params: any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/venus/searchEnlightenmentSongs2?page=" + page + '&keyword=' + keyword)
	}
	// mgg转ogg
	QqAudioDecryptio(params: any) {
		let {
			file
		} = params;
		const formData: FormData = new FormData();
		formData.append('file', file);
		let url = this.baseUrl + '/zhuanhuanyun/QqAudioDecryptio'
		return this.http.post(url, formData);
	}
	// 图片识别文字
	TextExtractionImage(params: any) {
		let {
			file,
			language
		} = params;
		const formData: FormData = new FormData();
		formData.append('file', file);
		formData.append('language', language);
		let url = this.baseUrl + '/text_extraction/TextExtractionImage'
		return this.http.post(url, formData);
	}
	//浮浮雷达获取数据
	getfufuleida() {
		return this.http.get(this.baseUrl + '/fufuleida/GetDailyList')
	}
	getfufuleidaQuerySongs(params: any) {
		return this.http.get(this.baseUrl + '/fufuleida/QuerySongsResult?query_word=' + params.keyword + '&page=' + params.page)
	}
	// 剪映
	getJianying(params: any) {
		let {
			webId
		} = params
		return this.http.get(this.baseUrl + '/jianying/GetTemplates?webId=' + webId)
	}
	// 下载文件
	downloadFile(params: any) {
		let {
			path,
			type
		} = params;
		return this.http.get(this.baseUrl + '/articles/downloadFile/' + path + '?flag=download&type=' + type)
	}
	// 合成mv
	createMV(params: any) {
		let {
			zip,
		} = params;
		const formData: FormData = new FormData();
		for(let i = 0;i<zip.length;i++){
			formData.append('zip', zip[i]);
		}
		let url = this.baseUrl + '/articles/createMV'
		return this.http.post(url, formData);
	}
}