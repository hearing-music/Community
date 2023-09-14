import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import * as XLSX from 'xlsx'
import JSZipUtils from 'jszip-utils';
@Component({
	selector: 'ngx-douyin-video',
	templateUrl: './douyin-video.component.html',
	styleUrls: ['./douyin-video.component.scss']
})
export class DouyinVideoComponent implements OnInit {
	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) {
	}
	ngOnInit(): void {

	}
	type: any = '链接搜索'
	typeList: any = [{ value: '链接搜索', label: '链接搜索' }, { value: '分享链接搜索', label: '分享链接搜索' }, { value: 'ID搜索', label: 'ID搜索' }]
	fallback = 'data:image/png;base64,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'
	loading = false;
	searchValue: any = ''
	searchHolder: any = '请搜索抖音视频' //链接 id
	result: any = {}
	BloggerInfo: any = {}
	information: any = ''
	// <!-- 艺人主页 Home -->
	Home: any = ''
	// <!-- 艺人类型 Type -->
	Type: any = ''
	// <!-- 艺人风格 Style -->
	Style: any = ''
	// <!-- 嗓音特点 Characteristics -->
	Characteristics: any = ''
	// <!-- 翻唱唱酬 Vocals -->
	Vocals: any = ''
	// <!-- 翻唱分成 Split -->
	Split: any = ''
	// <!-- 原创唱酬 Original -->
	Original: any = ''
	// <!-- 原创分成 OriginalShare -->
	OriginalShare: any = ''
	// <!-- 翻唱视频费用 Fees -->
	Fees: any = ''
	// <!-- 备注  Note -->
	Note: any = ''
	Sex: any = ''
	sexList: any = [{ value: '男', label: '男' }, { value: '女', label: '女' }]
	searchType:any='切换excel批量搜索'
	searchTypeChange(){
		if(this.searchType=='切换excel批量搜索'){
			this.searchType='切换输入搜索'
		}else{
			this.searchType='切换excel批量搜索'
		}
		
	}
	search(e: any) {
		this.searchValue = e;
		this.DouYinSearchVideoDetails()
	}

	// 添加监控达人
	douyin_listenDaren() {
		let obj = this.BloggerInfo
		var information = this.information;
		var home = this.Home;
		var type = this.Type;
		var style = this.Style;
		var characteristics = this.Characteristics;
		var vocals = this.Vocals;
		var vocalsShow = 0;
		var split = this.Split;
		var original = this.Original;
		var originalShare = this.OriginalShare;
		var fees = this.Fees;
		var feesShow = 0;
		var note = this.Note;
		var sex = this.Sex;
		var nickname = obj.nickName;
		var secUid = obj.secUid;
		var uniqueId = obj.uniqueId;
		var signature = obj.signature
		var urlList = obj.urlList
		this.loading = true;
		return new Promise((resolve: any) => {
			this.api.douyin_listenDaren({feesShow,vocalsShow,isVideo: true,urlList,signature, nickname, sex, secUid, uniqueId, information, clicklike: obj.totalFavorited, fans: obj.followerCount,
				home, type, style, characteristics, vocals, split, original, originalShare, fees, note
			}).subscribe((res: any) => {
				console.log(res)
				if (res.success) {
					this.message.success(res.message)
					this.loading = false;
					this.information = ''
					this.Home = '';
					this.Type = '';
					this.Style = '';
					this.Characteristics = '';
					this.Vocals = '';
					this.Split = '';
					this.Original = '';
					this.OriginalShare = '';
					this.Fees = '';
					this.Note = '';
					this.Sex = ''
					resolve(true)
				} else {
					resolve(false)
				}
			}, (err: any) => {
				console.log(err)
				this.loading = false;
				this.information = ''
				resolve(false)
			})
		})

	}
	awemeId: any = ''
	// 视频搜索
	DouYinSearchVideoDetails() {
		let v = this.searchValue;
		if (!v) {
			this.message.error('不能空')
			return
		}
		if (this.type == "分享链接搜索" && v.indexOf('https://v.douyin.com/') == -1) {
			this.message.error('分享链接格式错误')
			return
		}
		if (this.type == "链接搜索") {
			let index = v.indexOf('modal_id=')
			let index2 = v.indexOf('https://www.douyin.com/video/')
			if (index == -1&&index2==-1) {
				this.message.error('链接格式错误')
				return
			}
			if(index!=-1){
				v = v.substr(index + 9)
				let index3 = v.indexOf('&');
				if(index3!=-1){
					v = v.substr(0,index3)
				}
			}else if(index2!=-1){
				v = v.substr(index2 + 29)
				let index4 = v.indexOf('?');
				if(index4!=-1){
					v = v.substr(0,index4)
				}
			}
		}
		if (this.type == "ID搜索" && isNaN(Number(v))) {
			this.message.error('ID格式错误')
			return
		}
		this.loading = true;
		this.api.DouYinSearchVideoDetails({ keyword: v, type: this.type })
			.subscribe((res: any) => {
				console.log(res)
				this.loading = false;
				if (res.success&&res.result.BloggerInfo) {
					res.result.BloggerInfo.homeUrl = 'https://www.douyin.com/user/' + res.result.BloggerInfo.secUid
					res.result.videoUrl = `https://www.douyin.com/user/${res.result.BloggerInfo.secUid}?modal_id=${res.result.awemeId}`
					this.BloggerInfo = res.result.BloggerInfo;
					this.awemeId = res.result.awemeId
					this.audioSrc = res.result.originalSound
					this.isPlay = true;
				}
				this.result = res.result || {};
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
	}
	isVisible2 = false;
	expectations: any = ''
	commentSecUid: any = ''
	watchComment: any = false;
	positionList: any = [{ value: 1, label: 1 }, { value: 2, label: 2 }, { value: 3, label: 3 }]
	position = 1;
	commentText = ''
	// 是否监控视频 监控达人\
	douyin_videoisListen() {
		this.loading = true;
		this.api.douyin_videoisListen({ secUid: this.BloggerInfo.secUid, awemeId: this.awemeId })
			.subscribe((res: any) => {
				console.log(res)
				this.loading = false;
				if (res.success) {
					this.result.isListenVideo = res.result;
					this.isVisible2 = true;
				}
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
	}
	result2:any={}
	douyin_videoisListen2(item:any){
		this.BloggerInfo = item.BloggerInfo;
		this.awemeId = item.awemeId
		this.result2 = item;
		this.loading = true;
		this.api.douyin_videoisListen({ secUid: this.BloggerInfo.secUid, awemeId: this.awemeId })
			.subscribe((res: any) => {
				console.log(res)
				this.loading = false;
				if (res.success) {
					item.isListenVideo = res.result;
					this.isVisible2 = true;
				}
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
	}
	// 使用作者id
	useAuthorSecUid() {
		if (this.watchComment) {
			this.commentSecUid = this.BloggerInfo.secUid;
		} else {
			this.message.info('请先打开监控评论开关')
		}
	}
	// 添加监控视频
	douyin_listenVideo() {
		let result:any = this.result;
		if(this.searchType=='切换输入搜索') result = this.result2
		if (!this.expectations) {
			this.message.info('期望点赞必填')
			return 1
		}
		if (this.watchComment && !this.commentSecUid) {
			this.message.info('监控评论Id必填')
			return 1
		}
		if (this.watchComment && !this.commentText) {
			this.message.info('监控评论话术必填')
			return 1
		}
		let preTitle: any = result.previewTitle;
		let textExtra: any = ''
		let commentText: any = this.commentText.trim()
		commentText = commentText.replaceAll('，', ',')
		if (result.textExtra.length > 0) {
			for (let i = 0; i < result.textExtra.length; i++) {
				preTitle = preTitle.replace('#' + result.textExtra[i].hashtag_name, '')
				if (i == result.textExtra.length - 1) {
					textExtra += result.textExtra[i].hashtag_name ? result.textExtra[i].hashtag_name : ''
				} else {
					textExtra += result.textExtra[i].hashtag_name ? result.textExtra[i].hashtag_name + ',' : ''
				}
			}
		}
		return new Promise((resolve: any) => {
			this.api.douyin_listenVideo({ originalSound: result.originalSound, position: this.position, commentText, watchComment: this.watchComment ? 1 : 0, secUid: this.BloggerInfo.secUid, commentSecUid: this.commentSecUid, awemeId: this.awemeId, title: result.title, admireCount: result.admireCount, collectCount: result.collectCount, commentCount: result.commentCount, diggCount: result.diggCount, playCount: result.playCount, previewTitle: preTitle, shareCount: result.shareCount, textExtra: textExtra, createTime: result.createTime, expectations: this.expectations })
				.subscribe((res: any) => {
					console.log(res)
					this.loading = false;
					if (res.success) {
						this.message.success('添加监控视频成功')
						this.isVisible2 = false;
						this.expectations = ''
						this.commentSecUid = ''
						this.watchComment = false;
						this.commentText = ''
						resolve(true)
					} else {
						resolve(false)
					}
				}, (err: any) => {
					console.log(err)
					this.loading = false;
					this.expectations = ''
					this.commentSecUid = ''
					this.commentText = ''
					resolve(false)
				})
		})

	}
	// 点击录入 添加达人和视频
	async handleOk2() {
		await this.douyin_listenDaren()
		await this.douyin_listenVideo()
	}
	handleCancel2() {
		this.isVisible2 = false;
	}
	goHomeUrl(url: string) {
		window.open(url)
	}
	audioSrc: any = ''
	isPlay: any = false
	play() {
		let audio: any = document.getElementById('audio')
		audio.play()
	}
	pause() {
		let audio: any = document.getElementById('audio')
		audio.pause()
	}
	play2(i:any) {
		// let audioArr:any = document.getElementsByTagName('audio')
		// for(let ii=0;ii<audioArr.length;ii++){
		// 	audioArr[ii].pause()
		// }
		let audio: any = document.getElementById('audio'+i)
		audio.play()
		
	}
	pause2(i:any) {
		let audio: any = document.getElementById('audio'+i)
		audio.pause()
	}
	videoSrc:any=''
	videoShow = false;
	videoTitle=''
	playVideo(src:any,title:any){
		this.videoTitle = title;
		this.videoSrc = src;
		this.videoShow = true;
	}
	closeVideo(){
		this.videoShow = false;
	}
	excelSearch() {
		var inputElement = document.createElement('input');
		// 设置input的type为file
		inputElement.setAttribute('type', 'file');
		inputElement.setAttribute('accept', '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel')
		inputElement.setAttribute('multiple', 'true');
		inputElement.click()
		inputElement.addEventListener('change', (e: any) => {
			const target: any = e.target;
			const files = target.files;

			var reader = new FileReader();

			//文件加载完成后调用
			reader.onload = (e)=> {
				var data = e.target.result;

				const workbook = XLSX.read(data, {
					type: 'array'
				})
				//获取json格式的Excel数据
				var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
					defval: 'null' //单元格为空时的默认值
				});
				this.parseJson(jsonData)
				// console.log(jsonData)
			};

			//加载文件
			reader.readAsArrayBuffer(files[0]);
		})
	}
	listK:any=[]
	listObj:any = {}
	listeValue:any=''
	parseJson(jsonData:any){
		this.listK = []
		this.listObj = {}
		this.listeValue = ''
		try{
			let j:any = {}
			for(let i = 0;i<jsonData.length;i++){
				let k = Object.keys(jsonData[i])
				let v = Object.values(jsonData[i])
				for(let c=0;c<k.length;c++){
					if(!j[k[c]]){
						j[k[c]]=[v[c]]
					}else{
						j[k[c]].push(v[c])
					}
				}
			}
			this.listObj = j
			this.listK = Object.keys(j)
		}catch(e){
			this.message.error('格式错误')
		}
	}
	listeChange(){
		let valueArr:any = []
		// 判断key是链接或者ID 加到数组第一位
		if(this.listeValue.indexOf('https://v.douyin.com/')!=-1||this.listeValue.indexOf('modal_id=')!=-1||!isNaN(Number(this.listeValue))){
			valueArr= [this.listeValue,...this.listObj[this.listeValue]];
		}else{
			valueArr= this.listObj[this.listeValue];
		}
		// 排除null
		valueArr = valueArr.filter((item:any)=> item !== "null");
		// console.log(valueArr)
		//判断不符合规则的 不查询
		var isSearch = valueArr.every((e:any)=>(e+'').indexOf('https://v.douyin.com/')!=-1||(e+'').indexOf('modal_id=')!=-1||((e+'').indexOf('.')==-1&&!isNaN(Number(e))&&(e+'').length>11))
		if(!isSearch || this.listeValue.indexOf('身份证')>-1){
			this.message.error('该列不支持搜索')
			return
		}
		if(valueArr.length==0){
			this.message.error('该列为空')
			return
		}
		this.searchVideoList(valueArr)
	}
	searchVideoList(valueArr:any){
		let type = ''
		// ID搜索
		if(String(valueArr[0]).indexOf('modal_id=')!=-1){
			type='ID'
			for(let i=0;i<valueArr.length;i++){
				let index = String(valueArr[i]).indexOf('modal_id=')
				valueArr[i] = valueArr[i].substr(index + 9)
			}
		}
		if(!isNaN(Number(valueArr[0]))){
			type='ID'
			for(let i=0;i<valueArr.length;i++){
				valueArr[i] = String(valueArr[i]).trim()
			}
		}
		// 链接搜索
		if(String(valueArr[0]).indexOf('https://v.douyin.com/')!=-1){
			type='URL'
		}
		this.loading = true;
		this.api.DouYinSearchVideoDetailsList({type,arr:valueArr})
		.subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			if(res.success){
				res.result.forEach((item:any)=>{
					item.BloggerInfo = item.BloggerInfo||{}
					item.BloggerInfo.homeUrl = 'https://www.douyin.com/user/' + item.BloggerInfo.secUid
					item.videoUrl = `https://www.douyin.com/user/${item.BloggerInfo.secUid}?modal_id=${item.awemeId}`
					this.isPlay = true;
				})
				this.resultList=res.result;
				
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	resultList:any=[]
}
