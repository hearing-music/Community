import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
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
	type:any='链接搜索'
	typeList:any=[{value:'链接搜索',label:'链接搜索'},{value:'ID搜索',label:'ID搜索'}]
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
	Sex:any=''
	sexList:any=[{value:'男',label:'男'},{value:'女',label:'女'}]
	search(e: any) {
		this.searchValue = e;
		this.DouYinSearchVideoDetails()
	}
	isVisible = false;
	// 监控达人
	listenDaren(item: any) {
		this.douyin_isListen(item)
	}

	// 是否被监控
	douyin_isListen(item: any) {
		this.loading = true;
		this.api.douyin_isListen({ SecUid: item.secUid })
			.subscribe((res: any) => {
				console.log(res)
				this.loading = false;
				item.isListen = res.result;
				this.isVisible = true;
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
	}
	// 点击录入
	handleOk(): void {
		this.douyin_listenDaren()
	}
	// 点击取消
	handleCancel(): void {
		this.isVisible = false;
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
		var split = this.Split;
		var original = this.Original;
		var originalShare = this.OriginalShare;
		var fees = this.Fees;
		var note = this.Note;
		var sex = this.Sex;
		// if (!sex||!information || !home || !type || !style || !characteristics || !vocals || !split || !original || !originalShare || !fees) {
		// 	this.message.info('缺少必填参数')
		// 	return
		// }
		var nickname = obj.nickName;
		var secUid = obj.secUid;
		var uniqueId = obj.uniqueId;
		this.loading = true;
		this.api.douyin_listenDaren({ nickname,sex, secUid, uniqueId, information,clicklike:obj.totalFavorited,fans:obj.followerCount,
		home,type,style,characteristics,vocals,split,original,originalShare,fees,note}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.message.success('添加监控成功')
				this.loading = false;
				this.isVisible = false;
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
				this.Sex=''
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
			this.information = ''
		})
	}
    awemeId:any=''
	// 视频搜索
	DouYinSearchVideoDetails() {
		if(!this.searchValue){
			this.message.error('不能空')
			return
		}
		if(this.type=="链接搜索"&&this.searchValue.indexOf('https://v.douyin.com/')==-1){
			this.message.error('链接格式错误')
			return
		}
		if(this.type=="ID搜索"&&isNaN(Number(this.searchValue))){
			this.message.error('ID格式错误')
			return
		}
		this.loading = true;
		this.api.DouYinSearchVideoDetails({ keyword: this.searchValue,type:this.type })
			.subscribe((res: any) => {
				console.log(res)
				this.loading = false;
				if(res.success){
					res.result.BloggerInfo.homeUrl = 'https://www.douyin.com/user/' + res.result.BloggerInfo.secUid
					res.result.videoUrl = `https://www.douyin.com/user/${res.result.BloggerInfo.secUid}?modal_id=${res.result.awemeId}`
					this.BloggerInfo = res.result.BloggerInfo;
					this.awemeId = res.result.awemeId
					this.result = res.result;
				}
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
	}
	isVisible2 = false;
	expectations: any = ''
	commentSecUid:any=''
	watchComment:any=false;
	positionList:any=[{value:1,label:1},{value:2,label:2},{value:3,label:3}]
	position=1;
	commentText=''
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
	// 使用作者id
	useAuthorSecUid(){
		if(this.watchComment){
			this.commentSecUid = this.BloggerInfo.secUid;
		}else{
			this.message.info('请先打开监控评论开关')
		}
	}
	// 添加监控视频
	douyin_listenVideo() {
		if (!this.expectations) {
			this.message.info('期望点赞必填')
			return
		}
		if(this.watchComment&&!this.commentSecUid){
			this.message.info('监控评论Id必填')
			return
		}
		if(this.watchComment&&!this.commentText){
			this.message.info('监控评论话术必填')
			return
		}
		this.loading = true;
		let preTitle:any = this.result.previewTitle;
		let textExtra:any = ''
		let commentText:any =this.commentText.trim()
		commentText = commentText.replaceAll('，',',')
		if(this.result.textExtra.length>0){
			for(let i = 0;i<this.result.textExtra.length;i++){
				preTitle = preTitle.replace('#'+this.result.textExtra[i].hashtag_name,'')
				if(i==this.result.textExtra.length-1){
					textExtra+=this.result.textExtra[i].hashtag_name?this.result.textExtra[i].hashtag_name:''
				}else{
					textExtra+=this.result.textExtra[i].hashtag_name?this.result.textExtra[i].hashtag_name+',':''
				}
			}
		}
		this.api.douyin_listenVideo({position:this.position,commentText, watchComment:this.watchComment?1:0,secUid: this.BloggerInfo.secUid,commentSecUid:this.commentSecUid, awemeId: this.awemeId,title:this.result.title, admireCount: this.result.admireCount, collectCount: this.result.collectCount, commentCount: this.result.commentCount, diggCount: this.result.diggCount, playCount: this.result.playCount, previewTitle: preTitle, shareCount: this.result.shareCount, textExtra: textExtra, createTime: this.result.createTime, expectations: this.expectations })
			.subscribe((res: any) => {
				console.log(res)
				this.loading = false;
				if (res.success) {
					this.message.success('添加监控成功')
					this.isVisible2 = false;
					this.expectations = ''
					this.commentSecUid=''
					this.watchComment = false;
					this.commentText=''
				}
			}, (err: any) => {
				console.log(err)
				this.loading = false;
				this.expectations = ''
			})
	}
	// 点击录入
	handleOk2(): void {
		this.douyin_listenVideo()
	}
	handleCancel2(){
		this.isVisible2 = false;
	}
	goHomeUrl(url: string) {
		window.open(url)
	}

}
