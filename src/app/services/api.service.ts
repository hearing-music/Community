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
	downloadUrl2 = environment.downloadUrl2;
	downloadUrl = environment.downloadUrl;
	constructor(private http : HttpClient) {

	}
	async fetchFile(fileUrl : string) {
		// 使用fetch获取文件  
		const response = await fetch(this.downloadUrl + fileUrl);
		// 确保响应成功  
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		// 将响应体读取为Blob  
		const blob = await response.blob();
		return blob;
	}
	// qq搜索歌曲
	getQQ(params : any) {
		let {
			keyword,
			page
		} = params;
		// return this.http.get(this.tencentUrl + "/music?action=search_qq&params=" + JSON.stringify({ keyword, page }))
		return this.http.get(this.baseUrl + '/qq/search_qq?page=' + page + '&keyword=' + keyword)
	}
	// 获取专辑所有歌曲指数
	qq_getAlbumExponent(params : any) {
		let {
			albummid
		} = params;
		return this.http.get(this.baseUrl + '/qq/qq_getAlbumExponent?albummid=' + albummid)
	}
	// qq获取公司名字
	getCompanyName(params : any) {
		return this.http.get(this.baseUrl + '/qq/getCompanyName?idlist=' + JSON.stringify(params.idlist))
	}
	// qq免费歌曲
	getQq_freeSongs(params : any) {
		let { page, pageSize, keyword, type, newly, sort, publish_timeOrderby, exponentOrderby } = params;
		let url =
			this.baseUrl +
			"/qq/freeSongs?page=" +
			page +
			"&pageSize=" +
			pageSize +
			"&keyword=" +
			keyword +
			"&type=" +
			type +
			"&newly=" +
			newly +
			"&sort=" +
			sort + "&publish_timeOrderby=" + publish_timeOrderby + "&exponentOrderby=" + exponentOrderby
		return this.http.get(url);
	}
	//获取免费歌曲排序标签
	GetSortList() {
		// GetSortList
		let url = this.baseUrl + "/qq/GetSortList";
		return this.http.get(url);
	}
	// qq 免费歌手 歌曲列表 标签 
	getQq_freeSongsLabel(params : any) {
		let {
			label
		} = params;
		let url = this.baseUrl + '/qq/freeSongsLabel?Label=' + label
		return this.http.get(url)
	}
	// 根据mid获取 收听 指数 排名
	getQq_exponent(params : any) {
		let {
			songmid,
			keyword
		} = params;
		let url = this.baseUrl + "/qq/qq_exponent?songmid=" + songmid
		return this.http.get(url)
	}
	// qq歌词
	getQQLyric(params : any) {
		let {
			songmid
		} = params;
		return this.http.get(this.baseUrl + "/qq/qq_lyric?songmid=" + songmid)
	}
	// 酷狗歌词
	getKugouLyric(params : any) {
		let {
			hash
		} = params;
		return this.http.get(this.baseUrl + "/kugou/kugou_lyric?hash=" + hash)
	}
	// 酷我歌词
	getKuwoLyric(params : any) {
		let {
			rid
		} = params;
		return this.http.get(this.baseUrl + "/kuwo/kuwo_lyric?rid=" + rid)
	}
	// 网易云歌词
	getWangyiyunLyric(params : any) {
		let {
			songid
		} = params;
		return this.http.get(this.baseUrl + "/wangyiyun/wangyiyun_lyric?songid=" + songid)
	}
	// 搜索qq歌单
	get_qq_songlist(params : any) {
		let {
			pageSize,
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/qq/search_qq_songlist?page=" + page + "&pageSize=" + pageSize + "&keyword=" + keyword)
	}
	// 酷我搜索歌曲
	getKuwo(params : any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/kuwo/search_kuwo?keyword=" + keyword + "&page=" + page)
	}
	// 获取酷我单条评论数
	getKuwoComment(params : any) {
		let {
			rid,
		} = params;
		return this.http.get(this.baseUrl + "/kuwo/search_kuwo_comment?rid=" + rid)
	}
	// 网易云搜索歌曲
	getWangyiyun(params : any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/wangyiyun/search_wangyiyun?keyword=" + keyword + "&page=" + page)
	}
	// 网易云搜索用户
	getWangyiyun_user(params : any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/wangyiyun/search_wangyiyun_user?keyword=" + keyword + "&page=" + page)
	}
	// 酷狗v3搜索歌曲
	getV3(params : any) {
		let {
			keyword,
			page
		} = params;
		keyword = encodeURIComponent(keyword);
		return this.http.get(`${this.baseUrl}/kugou/search_kugou?keyword=${keyword}&page=${page}`)
	}
	// 酷狗歌曲链接
	getKugouSongUrl(params: any) {
	  let { EMixSongID } = params;
	  return this.http.get(
	    this.baseUrl + '/kugou/getKugouSongUrl?EMixSongID=' + EMixSongID
	  );
	}
	getV3_2(params : any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/kugou/search_kugou2?keyword=" + keyword + "&page=" + page)
	}
	// 酷狗飙升榜
	getKugou_soaring(params : any) {
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
	getKugou_yinghuo(params : any) {
		return this.http.get(this.baseUrl + "/kugou/kugou_yinghuo?params=" + JSON.stringify(params))
	}
	// 酷狗 id获取指数
	getKugou_exponent(params : any) {
		let {
			scid
		} = params
		let url = this.baseUrl + "/kugou/kugou_exponent?scid=" + scid
		return this.http.get(url)
	}
	// 酷狗免费歌曲
	getKugou_freeSongs(params : any) {
		let { page, pageSize, keyword, type, newly, sort, publish_timeOrderby, exponentOrderby, isOriginal } = params;
		let url =
			this.baseUrl +
			"/kugou/freeSongs?page=" +
			page +
			"&pageSize=" +
			pageSize +
			"&keyword=" +
			keyword +
			"&type=" +
			type +
			"&newly=" +
			newly +
			"&sort=" +
			sort + "&publish_timeOrderby=" + publish_timeOrderby + "&exponentOrderby=" + exponentOrderby + '&isOriginal=' + isOriginal;
		return this.http.get(url);
	}
	// 获取URL预览 qq
	GetPreview(params:any){
		let {
			Url
		} = params;
		return this.http.post(this.baseUrl + "/qq/GetPreview",{Url})
	}
	// 腾讯音乐人搜索
	getMusicianTx(params : any) {
		let {
			page,
			keyword,
		} = params;
		return this.http.get(this.baseUrl + "/qq/search_qq_musician?page=" + page + "&keyword=" + keyword)
	}
	// 腾讯音乐人搜索 电话
	getMusician_phone(params : any) {
		return this.http.get(this.baseUrl + "/qq/search_qq_musician_phone?uinList=" + JSON.stringify(params.uinList))
	}
	// 抖音热点
	getDouyinHot() {
		return this.http.get(this.baseUrl + "/douyin/douyin_hot")
	}
	//抖音 亚运榜
	getDouyinYyhList() {
		return this.http.get(this.baseUrl + "/douyin/SearchHotYyhList")
	}
	//抖音 热榜
	getDouyinHotList() {
		return this.http.get(this.baseUrl + "/douyin/SearchHotList")
	}
	//抖音 音乐热歌榜
	getDouyinMusicHotList() {
		return this.http.get(this.baseUrl + "/douyin/SetsListOf?sign=Dgey31RvZq")
	}
	//抖音 热门视频榜
	getDouyinVideoHotList() {
		return this.http.get(this.baseUrl + "/douyin/SetsListOf?sign=DpQvNABoNE")
	}
	// 抖音 视频分析 热点宝贝
	getDouHotBear(params : any) {
		let { aweme_id } = params;
		return this.http.get(this.baseUrl + "/douyin/DouHotBear?videoId=" + aweme_id)
	}
	// 抖音 热点详情 热点宝贝
	getDouSentenceDetail(params : any) {
		let { sentence_id, videoId } = params;
		return this.http.get(this.baseUrl + "/douyin/DouSentenceDetail?sentence_id=" + sentence_id + "&videoId=" + (videoId ? videoId : ""))
	}
	// 抖音 作者趋势分析 热点宝贝
	getDouAuthorInfo(params : any) {
		let { sec_uid } = params;
		return this.http.get(this.baseUrl + "/douyin/DouAuthorInfo?sec_uid=" + sec_uid)
	}
	//抖音短视频
	getDouyinVideo(params : any) {
		let {
			keyword
		} = params;
		return this.http.get(this.baseUrl + "/douyin/douyin_video?keyword=" + keyword)

	}
	// 抖音达人搜索
	DouYinSearchBigV(params : any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/douyin/DouYinSearchBigV?keyword=" + keyword + "&offset=" + (page - 1) + "&count=10")
	}
	// 获取指定视频id信息 跟拍
	getAwemeMusicVideo(params : any) {
		let {
			secUid,
			arr
		} = params
		return this.http.get(this.baseUrl + "/douyin/getAwemeMusicVideo?secUid=" + secUid + "&arr=" + JSON.stringify(arr))
	}
	// douyin_darenSearch(params:any){
	// 	let {
	// 		keyword,
	// 		page
	// 	} = params;
	// 	return this.http.get(this.baseUrl + "/douyin/DouYinSearch?keyword=" + keyword+'&offset='+page)
	// }
	// 抖音达人是否被监控 true为被监控
	douyin_isListen(params : any) {
		let {
			SecUid
		} = params;
		return this.http.get(this.baseUrl + "/douyin/douyin_isListen?SecUid=" + SecUid)
	}
	//抖音 添加监控达人
	douyin_listenDaren(params : any) {
		return this.http.post(this.baseUrl + "/douyin/douyin_listenDaren", { ...params })
	}
	// 抖音 修改监控达人基本信息
	douyin_listenDarenEdit(params : any) {
		return this.http.post(this.baseUrl + "/douyin/douyin_listenDarenEdit", { ...params })
	}
	// 抖音获取权限id
	douyin_authority() {
		return this.http.post(this.baseUrl + "/douyin/douyin_authority", {})
	}
	// 抖音 更多视频 涨粉量
	getDouMoreVideos(params : any) {
		let {
			item_id,
			sec_uid,
			min_cursor,
			max_cursor
		} = params
		return this.http.post(this.baseUrl + "/douyin/DouMoreVideos?sec_uid=" + sec_uid + "&min_cursor=" + min_cursor + "&max_cursor=" + max_cursor, { item_id })
	}
	//抖音 获取监控列表
	douyin_getListenDaren(params : any) {
		// let {
		// 	page,
		// 	keyword,
		// 	type,
		// 	diggCountAveMax, diggCountAveMin, activityNum,
		// 	minimumMax,minimumMin
		// } = params;
		// let pageSize: any = params.pageSize
		return this.http.get(this.baseUrl + "/douyin/douyin_getListenDaren", { params })
	}
	// 获取抖音博主7条视频 10
	getDouYinBloggerVideo(params : any) {
		let {
			secUidArr
		} = params;
		return this.http.get(this.baseUrl + "/douyin/GetDouYinBloggerVideo?secUidArr=" + JSON.stringify(secUidArr))
	}
	// 获取抖音博主7条视频 1 并更新相应数据
	getDouYinBloggerVideoOne(params : any) {
		let {
			secUid
		} = params;
		return this.http.get(this.baseUrl + "/douyin/getDouYinBloggerVideoOne?secUid=" + secUid)
	}
	// 抖音达人搜索上传Exle
	dyDaRenExle(params : any) {
		let { files } = params;
		const formData : FormData = new FormData();
		formData.append("excel", files[0]);
		let url = this.baseUrl + "/douyin/BulkAccessSecUidXlsx";
		return this.http.post(url, formData);
	}
	// 抖音 视频id搜索
	DouYinSearchVideoDetails(params : any) {
		let {
			keyword,
			type
		} = params;
		return this.http.get(this.baseUrl + "/douyin/DouYinSearchVideoDetails?keyword=" + keyword + '&type=' + type)
	}
	// 抖音 获取音乐跟拍 arr
	getMusicInfo(params : any) {
		let {
			secUid,
			arr
		} = params;
		return this.http.get(this.baseUrl + "/douyin/getMusicInfo?secUid=" + secUid + '&arr=' + JSON.stringify(arr))
	}
	// 抖音批量搜索 视频id url
	DouYinSearchVideoDetailsList(params : any) {
		let {
			arr,
			type
		} = params;
		return this.http.post(this.baseUrl + "/douyin/DouYinSearchVideoDetailsList", { arr, type })
	}
	// 抖音监控声源
	douyinListenSourdSource(params : any) {
		let requestBody = params;
		return this.http.post(
			this.baseUrl + "/douyin/douyinListenSourdSource",
			requestBody
		);
	}
	// 	 获取抖音达人类别列表
	douyin_darenTypeList() {
		return this.http.get(this.baseUrl + "/douyin/douyin_darenTypeList")
	}
	// 获取监控声源
	getDouyinListenSourdSource(params : any) {
		let { userId, type } = params;
		if (type) {
			return this.http.get(this.baseUrl + "/douyin/getDouyinListenSourdSource?userId=" + userId);
		} else {
			return this.http.get(this.baseUrl + "/douyin/getDouyinListenSourdSource");
		}
	}
	//抖音上升热点
	DouRiseSearch(params : any) {
		let { keyword, page, pageSize,tag } = params;
		return this.http.get(
			this.baseUrl +
			"/douyin/DouRiseSearch?keyword=" +
			keyword +
			"&page=" +
			page +
			"&page_size=" +
			pageSize+'&tag='+tag
		);
	}
	//抖音上升热点详情
	DouSentenceDetail(params : any) {
		let { sentence_id, videoId } = params;
		return this.http.get(
			this.baseUrl + "/douyin/DouSentenceDetail?sentence_id=" + sentence_id + '&videoId=' + (videoId ? videoId : '')
		);
	}
	// 获取监控视频 监控十分钟视频的数量
	douyin_videoGetInterval() {
		return this.http.post(this.baseUrl + "/douyin/douyin_videoGetInterval", null);
	}
	// 取消十分钟监控视频
	douyin_cancelInterval10M(params : any) {
		let { id } = params;
		return this.http.post(this.baseUrl + "/douyin/douyin_cancelInterval10M", { id });
	}
	// 抖音 热点宝贝 热门账号 才艺音乐
	getDouMonitorUser(params : any) {
		let { page, pageSize } = params;
		return this.http.get(
			this.baseUrl + "/douyin/DouMonitorUser?page_num=" + page + '&page_size=' + pageSize
		);
	}
	//抖音 获取热点id
	DouIndexOfSentenceId(params : any) {
		let { aweme_id } = params;
		return this.http.get(
			this.baseUrl + "/douyin/DouIndexOfSentenceId?AwemeId=" + aweme_id
		);
	}
	// 抖音 视频是否被本人监控 并且必须监控该达人
	douyin_videoisListen(params : any) {
		let {
			awemeId,
			secUid
		} = params;
		return this.http.get(this.baseUrl + "/douyin/douyin_videoisListen?awemeId=" + awemeId + '&secUid=' + secUid)
	}
	//抖音 添加监控视频
	douyin_listenVideo(params : any) {
		return this.http.post(this.baseUrl + "/douyin/douyin_listenVideo", { ...params })
	}
	// 抖音 获取视频监控列表
	douyin_getListenVideo(params : any) {
		let {
			page,
			keyword,
			type,
			isdownload,
			pageSize
		} = params;
		return this.http.get(this.baseUrl + "/douyin/douyin_getListenVideo?pageSize=" + pageSize + "&page=" + page + '&keyword=' + keyword + '&type=' + type + '&isdownload=' + isdownload)
	}
	// 重新获取抖音audio地址 并存入库中
	getDouyinAudio(params : any) {
		return this.http.get(this.baseUrl + "/douyin/getDouyinAudio?awemeId=" + params.awemeId)
	}
	// 抖音 官网 热点 set cookie
	dygw_setCookie(params : any) {
		return this.http.post(this.baseUrl + "/douyin/dygw_setCookie", { value: params.value })
	}
	dyrd_setCookie(params : any) {
		return this.http.post(this.baseUrl + "/douyin/dyrd_setCookie", { value: params.value })
	}
	// 听歌识曲
	getIdentification(params : any) {
		let {
			files
		} = params;
		const formData : FormData = new FormData();
		for (let i = 0; i < files.length; i++) {
			formData.append('files', files[i]);
		}
		let url = this.baseUrl + '/articles/getIdentification'
		// let url = "https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/ffm?action=getIdentification"
		return this.http.post(url, formData)
	}
	// 音轨分离
	trackSeparate(params : any) {
		let {
			file,
			compress
		} = params;
		const formData : FormData = new FormData();
		formData.append('file', file);
		formData.append('compress', compress)
		let url = this.baseUrl + '/articles/trackSeparate'
		// let url = 'http://communityapi.jinzhoushaokao.top'+'/articles/trackSeparate'
		return this.http.post(url, formData)
	}
	// 删除音轨分离文件
	removeFile(params : any) {
		let {
			filename
		} = params;
		let url = this.baseUrl + '/articles/removeFileTrackSeparate?filename=' + filename
		return this.http.get(url)
	}
	//版权搜索 名字
	copyrightSearch(params : any) {
		let {
			keyword
		} = params;
		return this.http.get(this.baseUrl + "/articles/copyright_search?keyword=" + keyword)
	}
	// 版权搜索链接
	copyrightSearchLink(params : any) {
		let {
			keyword
		} = params;
		return this.http.get(this.baseUrl + "/articles/copyright_searchLink?url=" + keyword)
	}
	// 版权扫描 上传文件
	copyrightCheck(params : any) {
		let {
			file,
			name,
			type
		} = params;
		const formData : FormData = new FormData();
		formData.append('file', file);
		let url = this.baseUrl + '/articles/copyrightCheck?name=' + name + '&type=' + type
		return this.http.post(url, formData)
	}
	// 版权扫描 上传文件 刷新
	copyrightCheck_reload(params : any) {
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
	getLsdd(params : any) {
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
	// 魔表潜力榜
	getKuaishouHotEventList(params : any) {
		let { page } = params;
		return this.http.get(this.baseUrl + "/kuaishou/hotEventList?page=" + page)
	}
	//获取快手dj
	getkuaishouDj(params : { page : any; pageSize : any; }) {
		let url = this.baseUrl + "/kuaishou/kuaishou_1?page=" + params.page + "&pageSize=" + params.pageSize
		return this.http.get(url)
	}
	// 快手音频使用量
	getkuaishouVolumeOfUse(params : any) {
		let { keyword } = params
		let url = this.baseUrl + "/kuaishou/VolumeOfUse?Value=" + keyword
		return this.http.get(url)
	}
	// 快手音频搜索
	getkuaishouCenterMusicList(params : any) {
		let { keyword } = params
		let url = this.baseUrl + "/kuaishou/centerMusicList?keyWorld=" + keyword
		return this.http.get(url)
	}
	// bgm使用量
	getkuaishouTotalByMusic(params : any) {
		let { musicType, musicId } = params
		let url = this.baseUrl + "/kuaishou/totalByMusic?musicId=" + musicId + "&musicType=" + musicType
		return this.http.get(url)
	}
	// 快手视频详情
	getKsVideoDetails(params : any) {
		let { src } = params
		let url = this.baseUrl + "/kuaishou/KsVideoDetails?url=" + src
		return this.http.get(url)
	}
	// 快手视频详情 xlsx 批量
	getKsVideoDetailsXlsx(params : any) {
		let { srcArr } = params
		const FormData = require('form-data');
		let data = new FormData();
		data.append('urls', JSON.stringify(srcArr));
		let url = this.baseUrl + "/kuaishou/KsVideoDetailsXlsx"
		return this.http.post(url, data)
	}
	//获取素材
	getSourcePhoto(params : any) {
		let {
			page,
		} = params;
		return this.http.get(this.baseUrl + "/kuaishou/discover?page=" + page)
	}
	//工具银行卡
	getbank(params : { name : any; idcard_number : any; bankcard_number : any; }) {
		let url = "http://betaapi.tingjianmusic.cn/egress/aliyun/bank/validate"
		return this.http.post(url, params)
	}
	//exel转json
	exceljsonChange(params : any) {
		let { file } = params;
		const formData : FormData = new FormData();
		formData.append('content', file);
		let url = 'http://api.jinzhoushaokao.top/webtools/excel2json/create'
		return this.http.post(url, formData)
	}
	//查询歌曲搜索排行相关信息 酷狗 qq
	getqq_kugouKeywordInfo(params : any) {
		let { mid, scid } = params;
		let url = this.baseUrl + '/qq_kugou/getqq_kugouKeywordInfo?mid=' + mid + '&scid=' + scid
		return this.http.get(url)
	}
	//酷狗刷搜索
	kuGouAutoSearch(params : any) {
		let { songName, singerName, playLink, playTime } = params;
		const formData : FormData = new FormData();
		formData.append("songName", songName);
		formData.append("singerName", singerName);
		formData.append("playLink", playLink);
		formData.append("playTime", playTime);
		let url = this.baseUrl + "/kugou/kuGouAutoSearch";
		return this.http.post(url, formData);
	}
	//加入ranking数据
	setqq_kugouKeywordInfo(params : any) {
		let url = this.baseUrl + '/qq_kugou/setqq_kugouKeywordInfo'
		return this.http.post(url, { ...params })
	}
	// 查询ranking数据
	getqq_kugouInfo(params : any) {
		let { page, pageSize, type, keyword, orderby, plain } = params;
		let url = this.baseUrl + '/qq_kugou/getqq_kugouInfo?page=' + page + '&pageSize=' + pageSize + '&type=' + type + '&keyword=' + keyword + '&orderby=' + orderby + '&plain=' + plain
		return this.http.get(url)
	}
	// 查询ranking数据 全部 用于监控
	getqq_kugouInfoAll(){
		let url = this.baseUrl + '/qq_kugou/getqq_kugouInfoAll'
		return this.http.get(url)
	}
	// 刷新ranking数据
	getqq_kugouKeywordRanking(params : any) {
		let { mid, scid, keyword } = params;
		let url = this.baseUrl + '/qq_kugou/getqq_kugouKeywordRanking?scid=' + scid + '&mid=' + mid + '&keyword=' + keyword
		return this.http.get(url)
	}
	// chatgpt
	getChatgpt(params : any) {
		let { question, lastQuestionArr } = params;
		let url = this.baseUrl + '/v1/chat/completions?question=' + question + '&lastQuestionArr=' + JSON.stringify(lastQuestionArr)
		return this.http.get(url)
	}
	// chatgpt绘图
	getChatgptPlot(params : any) {
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

	addUsersApi(params : any) {
		let url = 'https://golang.tingjianmusic.top/UserApiAdd'
		return this.http.post(url, params)
	}
	//获取酷狗多少人再搜
	getV3SearchNum(params : any) {
		let {
			keyword,
		} = params;
		return this.http.get(this.baseUrl + "/kugou/searchPeople?songname=" + keyword)
	}
	//获取酷狗多少人再听
	getV3ListenPeopleNum(params : any) {
		let {
			mixsongid,
		} = params;
		return this.http.get(this.baseUrl + "/kugou/listenPeople?mixsongid=" + mixsongid)
	}
	//获取酷狗在唱人
	getV3SingingPeople(params : any) {
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
	getOpenidInfo(params : any) {
		let { idArr } = params
		let url = this.baseUrl + '/xilixili/getOpenidInfo?idArr=' + JSON.stringify(idArr)
		return this.http.get(url)
	}
	// xilixili 发送订阅消息
	sendSubscribeMessage(params : any) {
		let url = this.baseUrl + '/xilixili/sendSubscribeMessage'
		return this.http.post(url, { ...params })
	}
	//ogg文件转换
	// oggConversion(params : any) {
	// 	let {
	// 		file,
	// 		typeOf
	// 	} = params;
	// 	const formData : FormData = new FormData();
	// 	formData.append('file', file);
	// 	let url = 'https://whaleTail.tingjianmusic.top:444/v8/SetOggToMp3?typeOf=' + typeOf;
	// 	return this.http.post(url, formData);
	// }
	getRadarTime() {
		return this.http.get(this.baseUrl + "/radar/GetRadarMusicTime")
	}
	getRadarList(params : any) {
		let {
			platform,
			time,
			page,
			timeId
		} = params;
		return this.http.get(this.baseUrl + "/radar/getRadarList?platform=" + platform + "&time=" + time + "&page=" + page + '&timeId=' + timeId)
	}
	getKuGouHash(params : any) {
		let {
			keyword,
			mixSongId,
		} = params;
		return this.http.get(this.baseUrl + "/kugou/getHash?keyword=" + keyword + "&mixSongId=" + mixSongId)
	}
	getQqIdExponent(params : any) {
		let {
			keyword,
			songid,
		} = params;
		return this.http.get(this.baseUrl + "/qq/qq_idSearchMid?keyword=" + keyword + "&songid=" + songid)
	}
	//获取启明星标签
	getVenusTags(params : any) {
		return this.http.get(this.baseUrl + "/venus/getVenusTags")
	}
	//获取启明星列表
	getVenusList(params : any) {
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
	getVenusSongsAllIndex(params : any) {
		let {
			changJiangId
		} = params;
		return this.http.get(this.baseUrl + "/venus/getVenusSongsAllIndex?changJiangId=" + changJiangId)
	}
	// qq 获取指定作者10首个mid 歌曲地址 歌词
	getqq_singerSongs(params : any) {
		let {
			singerId
		} = params;
		return this.http.get(this.baseUrl + "/qq/qq_singerSongs?singerId=" + singerId)
	}
	// 获取歌手 歌曲信息
	getVenusSongs(params : any) {
		let {
			id,
			page,
			type
		} = params;
		return this.http.get(this.baseUrl + "/venus/getVenusSongs?page=" + page + "&id=" + id + '&type=' + type)
	}
	// 获取歌手用户画像
	getVenusSingerData(params : any) {
		let {
			id
		} = params;
		return this.http.get(this.baseUrl + "/venus/getVenusSingerData?id=" + id)
	}
	//唱将音乐搜索
	searchEnlightenmentSongs2(params : any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + "/venus/searchEnlightenmentSongs2?page=" + page + '&keyword=' + keyword)
	}
	// mgg转ogg
	QqAudioDecryptio(params : any) {
		let {
			file
		} = params;
		const formData : FormData = new FormData();
		formData.append('file', file);
		let url = this.baseUrl + '/zhuanhuanyun/QqAudioDecryptio'
		return this.http.post(url, formData);
	}
	// mgg转wav新
	QqAudioDecryptioNew(params : any) {
		let {
			musicUrl
		} = params;
		let url = this.baseUrl + '/zhuanhuanyun/QqAudioDecryptioNew?MusicUrl=' + musicUrl
		return this.http.get(url);
		
	}
	// ogg - mp3
	OggToMp3(params:any){
		let {
			typeOf,
			file,
		} = params;
			const formData : FormData = new FormData();
			formData.append('file', file);
		let url = this.baseUrl + '/zhuanhuanyun/OggToMp3?typeOf=' + typeOf
		return this.http.post(url,formData);
	}
	// 图片识别文字
	TextExtractionImage(params : any) {
		let {
			file,
			language
		} = params;
		const formData : FormData = new FormData();
		formData.append('file', file);
		formData.append('language', language);
		let url = this.baseUrl + '/text_extraction/TextExtractionImage'
		return this.http.post(url, formData);
	}
	//浮浮雷达获取数据
	getfufuleida() {
		return this.http.get(this.baseUrl + '/fufuleida/GetDailyList')
	}
	// 雷达音乐 搜索
	getfufuleidaQuerySongs(params : any) {
		return this.http.get(this.baseUrl + '/fufuleida/QuerySongsResult?query_word=' + params.keyword + '&page=' + params.page)
	}
	// 雷达音乐热 搜索
	getfufuleidaQueryHotSongs(params : any) {
		return this.http.get(this.baseUrl + '/fufuleida/QueryHotSearchTermsResult?query_word=' + params.keyword + '&page=' + params.page)
	}
	// 雷达音乐艺人 搜索
	getfufuleidaQuerySingers(params : any) {
		return this.http.get(this.baseUrl + '/fufuleida/QueryArtisteResult?query_word=' + params.keyword + '&page=' + params.page)
	}
	// 剪映
	getJianying(params : any) {
		let {
			webId
		} = params
		return this.http.get(this.baseUrl + '/jianying/GetTemplates?webId=' + webId)
	}
	// 下载文件
	downloadFile(params : any) {
		let {
			path,
			type
		} = params;
		return this.http.get(this.baseUrl + '/articles/downloadFile/' + path + '?flag=download&type=' + type)
	}
	// 合成mv
	createMV(params : any) {
		let {
			zip,
			type
		} = params;
		const formData : FormData = new FormData();
		for (let i = 0; i < zip.length; i++) {
			formData.append('zip', zip[i]);
		}
		formData.append('type', type);
		let url = this.baseUrl + '/articles/createMV'
		return this.http.post(url, formData);
	}
	// 词曲版权搜索
	getCopyright(params : any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + '/venus/demoTrade?keyword=' + keyword + '&page=' + page)
	}
	//港台音著协
	searchMcscSearchHK(params : any) {
		let {
			keyword
		} = params;
		return this.http.get(this.baseUrl + '/mcsc/McscSearchHK?keyword=' + keyword)
	}
	//内陆音著协
	searchMcscSearchCN(params : any) {
		let {
			keyword,
			acsa
		} = params;
		return this.http.get(this.baseUrl + '/mcsc/McscSearchCN?keyword=' + keyword + '&acsa=' + acsa)
	}
	// 中国音著协
	searchMcscSearchZG(params : any) {
		let {
			keyword,
			page
		} = params;
		return this.http.get(this.baseUrl + '/cavca/ProductionsSearch?key=' + keyword + '&page=' + page)
	}
	// 切换繁体字
	change_text(params : any) {
		let {
			keyword,
		} = params;
		return this.http.get(this.baseUrl + '/mcsc/change_text?keyword=' + keyword)
	}
	// 云图搜索
	searchTmeMap(params : any) {
		let {
			keyword,
			page,
			pageSize,
			operate
		} = params
		return this.http.get(this.baseUrl + '/tme_map/tmeMap?pageNo=' + (page - 1) + '&pageSize=' + pageSize + '&keyword=' + keyword + '&operate=' + operate)
	}
	// 单曲指数观测  云图
	ExponentialObservation(params : any) {
		let {
			trackId
		} = params
		return this.http.get(this.baseUrl + '/tme_map/ExponentialObservation?trackId=' + trackId)
	}
	// /获取听见音乐最新的100首歌曲  云图
	GetMusicLimitHundred() {
		return this.http.get(this.baseUrl + '/tme_map/GetMusicLimitHundred')
	}
	//获取5sing
	GetfiveSing(params : any) {
		let {
			page,
			pagesize,
			keyword,
		} = params;
		return this.http.get(this.baseUrl + "/searchPage/fiveSing?keyword=" + keyword + "&page=" + page + "&pagesize=" + pagesize)
	}
	// 点歌搜索
	ChooseSongSearchComprehensiveServices(params : any) {
		let { SongName, Page } = params;
		return this.http.get(
			this.baseUrl +
			"/room/ChooseSongSearchComprehensiveServices?SongName=" +
			SongName +
			"&Page=" +
			Page
		);
	}
	// 获取已点歌曲列表
	GetMusicChatRoomList() {
		return this.http.get(this.baseUrl + "/room/GetMusicChatRoomList");
	}
	// 获取表情列表
	GetEmojiList() {
		return this.http.get(this.baseUrl + "/room/GetEmojiList");
	}

	// 点歌
	SetMusicChatRoom(params : any) {
		let {
			musicId,
			name,
			singerName,
			albumName,
			albumSubtitle,
			ImageUrl,
			lyric,
			platformType,
			time,
			userId,
		} = params;
		return this.http.post(this.baseUrl + "/room/SetMusicChatRoom", {
			musicId,
			name,
			singerName,
			albumName,
			albumSubtitle,
			ImageUrl,
			lyric,
			platformType,
			time,
			userId,
			collect: { data: [] },
		});
	}
	// 展示用户收藏
	GetCollectList() {
		return this.http.post(this.baseUrl + "/room/GetCollectList", {});
	}
	// 添加收藏
	AddCollectList(params : any) {
		let { musicId, state } = params;
		return this.http.post(this.baseUrl + "/room/SetMusicCollect", {
			state,
			musicId,
		});
	}
	//获取厂牌
	GetbrandUser(params : any) {
		let { page, pagesize, keyword } = params;
		return this.http.get(
			this.baseUrl +
			"/searchPage/brandUser?keyword=" +
			keyword +
			"&page=" +
			page +
			"&pagesize=" +
			pagesize
		);
	}
	//获取qq厂牌名字
	getQBrandSongs(params : any) {
		let { brand } = params;
		return this.http.get(this.baseUrl + "/qq/QBrandSongsPrompt?brand=" + brand);
	}
	//获取qq厂牌
	GetbrandSong(params : any) {
		let { page, pageSize, brand } = params;
		return this.http.get(
			this.baseUrl +
			"/qq/QBrandSongs?brand=" +
			brand +
			"&page=" +
			page +
			"&pageSize=" +
			pageSize
		);
	}
	// 获取酷狗厂牌歌曲
	GetbrandSongKg(params : any) {
		let { page, pageSize, brand } = params;
		return this.http.get(
			this.baseUrl +
			"/kugou/KgBrandSongs?brand=" +
			brand +
			"&page=" +
			page +
			"&pageSize=" +
			pageSize
		);
	}
	//获取歌手关系图
	getArtiest(params : any) {
		let {
			singerMid,
		} = params;
		return this.http.get(this.baseUrl + "/qq/SingerContacts?singerMid=" + singerMid + "&num=5")
	}
	//获取原创音频
	GetOriginalAudio(params : any) {
		let {
			page,
			pagesize
		} = params;
		return this.http.get(this.baseUrl + "/original-audio/OriginalSong?limit=" + pagesize + "&offset=" + page)
	}
	// ISRC搜索
	search_ISRC(params : any) {
		let {
			keyword,
			page,
			pageSize
		} = params;
		return this.http.get(this.baseUrl + "/mcsc/search_ISRC?keyword=" + keyword + "&pageSize=" + pageSize + "&page=" + page)
	}
	//快手特效查询
	GetSpecialEffectsSearch(params : any) {
		let { magicFaceId } = params;
		return this.http.get(
			this.baseUrl + "/kuaishou/SpecialEffectsSearch?magicFaceId=" + magicFaceId
		);
	}
	//快手特效监控
	kuaishouMonitor(params : any) {
		let {
			magicFaceId,
			name,
			userId,
			author,
			phone,
			weChat,
			QQ,
			BGM,
			time,
			usageCount,
			creationTime,
			CDN,
			BgmId,
			BgmType,
			BgmUtilizationRate,
		} = params;

		const requestBody = {
			magicFaceId: magicFaceId,
			name: name,
			userId: userId,
			author: author,
			phone: phone,
			weChat: weChat,
			QQ: QQ,
			BGM: BGM,
			CDN: CDN,
			BgmId,
			BgmType,
			BgmUtilizationRate,
			utilisation: {
				res: [
					{
						time: time,
						usageCount: usageCount,
					},
				],
			},
			creationTime: creationTime,
		};
		return this.http.post(
			this.baseUrl + "/kuaishou/SpecialEffectsInsert",
			requestBody
		);
	}
	//快手监控查询
	SwollenKsEeList(params : any) {
		let { userId, type, keyword } = params;
		if (type) {
			return this.http.get(
				this.baseUrl + "/kuaishou/SwollenKsEeList?keyword=" + keyword + "&userId=" + userId
			);
		} else {
			return this.http.get(this.baseUrl + "/kuaishou/SwollenKsEeList?keyword=" + keyword);
		}
	}
	//快手监控特效上传海报
	GetKuaiShouStatus(params : any) {
		let { file } = params;
		const formData : FormData = new FormData();
		formData.append("img", file);
		let url = this.baseUrl + "/kuaishou/GetStatus";
		return this.http.post(url, formData);
	}
	// 快手 批量添加特效
	BulkAccessSecUidXlsx(params : any) {
		let { xls } = params;
		const formData : FormData = new FormData();
		formData.append("xls", xls);
		let url = this.baseUrl + "/kuaishou/BulkAccessSecUidXlsx";
		return this.http.post(url, formData);
	}
	// pdf转word
	pdfToWord(params : any) {
		let { pdf } = params;
		const formData : FormData = new FormData();
		formData.append("pdf", pdf);
		let url = this.baseUrl + "/childprocess/PDFToWord";
		return this.http.post(url, formData);
	}
	// 存储音频
	synthesis_setAudioStorage(params : any) {
		let { audio, type, duration } = params;
		const formData : FormData = new FormData();
		formData.append("data", audio);
		formData.append("type", type);
		formData.append('duration', duration)
		let url = this.baseUrl + "/articles/synthesis_setAudioStorage";
		return this.http.post(url, formData);
	}
	// 获取自己上传的音频
	getAudioStorage() {
		let url = this.baseUrl + "/articles/getAudioStorage";
		return this.http.post(url, {});
	}
	// 查询灵感视频
	getVideoStorage(params : any) {
		let url = this.baseUrl + "/articles/getVideoStorage?keyword=" + params.keyword;
		return this.http.get(url);
	}
	// 合成灵感视频音频
	composeVideoAudio(params : any) {
		let url = this.baseUrl + "/articles/composeVideoAudio";
		return this.http.post(url, { audioId: params.audioId, videoId: params.videoId });
	}

	// 音频降噪
	musicNoiseReduction(params : any) {
		let { file } = params;
		const formData : FormData = new FormData();
		formData.append("file", file);
		let url = this.downloadUrl2 + "api/audio?type=NoiseReduction";
		return this.http.post(url, formData);
	}
	// 音量归一
	musicVolumeNormalisation(params : any) {
		let { file } = params;
		const formData : FormData = new FormData();
		formData.append("file", file);
		let url = this.downloadUrl2 + "api/audio?type=VolumeNormalisation";
		return this.http.post(url, formData);
	}
	// 音频分段1
	musicSegmentation(params : any) {
		let { file } = params;
		const formData : FormData = new FormData();
		formData.append("file", file);
		let url = this.downloadUrl2 + "api/audio?type=Segmentation";
		return this.http.post(url, formData);
	}
	//音频分段2
	musicSegmentationNew(params : any) {
		let { file } = params;
		const formData : FormData = new FormData();
		formData.append("file", file);
		let url = this.downloadUrl2 + "api/audio?type=SegmentationNew";
		return this.http.post(url, formData);
	}
	// 云图月报
	GetMonthlyReport(params : any) {
		let { reportMonth, pages, type } = params;
		let url =
			this.baseUrl +
			"/tme_map/GetMonthlyReport?reportMonth=" +
			reportMonth +
			"&pages=" +
			pages +
			"&type=" +
			type;
		return this.http.get(url);
	}
	// 云图歌曲
	GetRankSong(params : any) {
		let { pages, type } = params;
		let url =
			this.baseUrl + "/tme_map/GetRankSong?pages=" + pages + "&operate=" + type;
		return this.http.get(url);
	}
	// 由你上传数据库
	EnteredByYou(params : any) {
		let { file } = params;
		const formData : FormData = new FormData();
		formData.append("excel", file);
		let url = this.baseUrl + "/tme_map/EnteredByYou";
		return this.http.post(url, formData);
	}

	// 获取全部韵脚
	tripartite_vowel(params : any) {
		let url = `${this.baseUrl}/tripartite/tripartite_vowel`
		return this.http.get(url);
	}
	// 获取指定韵脚 声调 句子
	tripartite_info(params : any) {
		let url = `${this.baseUrl}/tripartite/tripartite_info?vowel=${params.vowel}&sound=${params.sound}`
		return this.http.get(url);
	}
	// 获取文字搜索符合的韵脚
	tripartite_keyword(params : any) {
		let url = `${this.baseUrl}/tripartite/tripartite_juzi?keyword=${params.keyword}`
		// let url = `https://script.tingjianmusic.cn:444?sentence=${params.keyword}`
		return this.http.get(url);
	}
	// 获取话术全部分类
	GetModelInfo() {
		let url = `${this.baseUrl}/wisdom_knowledge_base/GetModelInfo`;
		return this.http.get(url);
	}
	GetAllInformation() {
		let url = `${this.baseUrl}/wisdom_knowledge_base/GetAllInformation`;
		return this.http.get(url);
	}
	//添加问题答案
	AdditionalDataInfo(params : any) {
		let url = this.baseUrl + "/wisdom_knowledge_base/AdditionalDataInfo";
		return this.http.post(url, params);
	}
	// 转换视频
	AllAudioConversion(params : any) {
		let { files } = params;
		const formData : FormData = new FormData();
		formData.append("files", files);
		let url = this.baseUrl + "/complaint_audio/AllAudioConversion";
		return this.http.post(url, formData);
	}
	// 获取用户行为
	SearchUserBehaviour(params:any){
		let data = JSON.stringify({
		    "UserId":params.ids,
			"Offset":params.Offset,
			"pageSize":params.pageSize,
			"timestampStart":params.timeStart,
			"timestampEnd":params.timeEnd,
		})
		let url = this.baseUrl + "/login/SearchUserBehaviour";
		return this.http.post(url, data);
	}
	// 获取用户行为 老
	SearchUserBehaviour2(params:any){
		let data = JSON.stringify({
		    "UserId":params.ids,
			"Offset":params.Offset,
			"pageSize":params.pageSize,
			"timestampStart":params.timeStart,
			"timestampEnd":params.timeEnd,
		})
		let url = this.baseUrl + "/login/SearchUserBehaviour2";
		return this.http.post(url, data);
	}
	// 老用户行为导出今日表格
	UserBehaviourExcel2(params:any){
		let {
			timeStart,timeEnd,userId
		} = params
		let data = {timeStart,timeEnd,userId}
		let url = this.baseUrl + "/login/UserBehaviourExcel2";
		return this.http.post(url, data);
	}
	// 获取全部用户
	get_webUsersName(){
		let url = this.baseUrl + "/login/get_webUsersName";
		return this.http.post(url, {});
	}
	// 获取全部用户老网站
	get_webUsersName2(){
		let url = this.baseUrl + "/login/get_webUsersName2";
		return this.http.post(url, {});
	}
	// 获取监控定时描述
	getTimed_task_lists(){
		let url = `${this.baseUrl}/articles/getTimed_task_lists`;
		return this.http.get(url);
	}
	// 酷狗免费歌曲定时 监控 获取更新时间
	freeSongsControlKG(){
		let url = `${this.baseUrl}/kugou/freeSongsControl`;
		return this.http.get(url);
	}
	// qq免费歌曲定时 监控 获取更新时间
	freeSongsControlQQ(){
		let url = `${this.baseUrl}/qq/freeSongsControl`;
		return this.http.get(url);
	}
	// 酷狗热搜榜单
	DevTipListKugou(){
		let url = `${this.baseUrl}/kugou/DevTipList`;
		return this.http.get(url);
	}
	// 酷狗热搜榜单 单独请求
	DevTipListWeChatMini(params:any){
		let url = `${this.baseUrl}/kugou/DevTipListWeChatMini?info=${params.info}`;
		return this.http.get(url);
	}
	// 抖音监控声源 进度
	douyinSoundSourceControl(){
		let url = `${this.baseUrl}/douyin/douyinSoundSourceControl`;
		return this.http.get(url);
	}
	//抖音监控达人进度
	douyinDarenControl(){
		let url = `${this.baseUrl}/douyin/douyinDarenControl`;
		return this.http.get(url);
	}
	// 抖音监控视频进度
	douyinVideoControl(){
		let url = `${this.baseUrl}/douyin/douyinVideoControl`;
		return this.http.get(url);
	}
	// 云图涨幅100首监控进度
	GetMusicLimitHundred2(){
		let url = `${this.baseUrl}/tme_map/GetMusicLimitHundred2`;
		return this.http.get(url);
	}
}