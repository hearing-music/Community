import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
import { NzMessageService  } from 'ng-zorro-antd/message';
import { DomSanitizer } from '@angular/platform-browser';
import * as XLSX from 'xlsx'
@Component({
  selector: 'ngx-douyin-listenVideo',
  templateUrl: './douyin-listenVideo.component.html',
  styleUrls: ['./douyin-listenVideo.component.scss']
})
export class DouyinListenVideoComponent implements OnInit {
constructor(private dz: DomSanitizer,public api: ApiService,public common: CommonService,private message: NzMessageService) {
  }
  ngOnInit(): void {
	  this.userId = localStorage.getItem('userId') || '0'
	  let highUserList = localStorage.getItem('highUserList')=='undefined'?false:localStorage.getItem('highUserList')
	  this.highUserList = highUserList || ['1','2','3','4','5','8','11','13','17','26','34']
	  this.douyin_getListenVideo()
  }
  highUserList:any=[]
  userId='0'
  loading=false;
  searchValue:any=''
  searchHolder:any = '请搜索抖音视频名字'
  list:any=[]
  
  page=1;
  pageSize=10;
  pageSizeOptions=[10,100,250,500,1000,9999999]
  pageTotal = 0;
  search(e:any){
	  this.searchValue = e;
	  this.page = 1;
	  this.douyin_getListenVideo()
  }
  type=true;
  // 取消十分钟监控 改为24小时
  confirm(item:any){
	  if(item.UserId != this.userId){
		  this.message.info('不是我的监控')
		  return
	  }
	  this.douyin_cancelInterval10M(item)
  }
  cancel(){
	  
  }
  // 取消十分钟监控 改为24小时api
  douyin_cancelInterval10M(item:any){
	  this.loading = true;
	  this.api.douyin_cancelInterval10M({id:item.VID}) .subscribe((res: any) => {
	  	console.log(res)
		if(res.success){
			item.expectationsDoubled=0;
			this.message.success('取消成功')
			this.douyin_videoGetInterval()
			this.douyin_videoGetIntervalAll(res)
		}
	  	this.loading = false;
	  }, (err: any) => {
	  	console.log(err)
	  	this.loading = false;
	  })
  }
  // 存入当前十分钟监控视频次数 并更新
  douyin_videoGetIntervalAll(res:any){
  	localStorage.setItem('ks_monitoring_limit',res.ks_monitoring_limit)
  	window['NgAppRef'].zone.run(function () {
  		window['NgAppRef3'].component.updateDYCount();
  	});
  }
  douyin_videoGetInterval(){
	  this.api.douyin_videoGetInterval().subscribe((res: any) => {
	  	if(res.success){
	  		localStorage.setItem('ks_monitoring_limitNow',res.count)
	  		// 调用组件方法 更新douyincount
	  			window['NgAppRef'].zone.run(function () {
	  				window['NgAppRef3'].component.updateDYCount();
	  			});
	  	}
	  }, (err: any) => {
	  	console.log(err)
	  	// this.message.error(err)
	  });
  }
  // 开关切换
  ngModelChange(){
  	  this.type = !this.type
  	  this.page = 1;
  	  this.douyin_getListenVideo()
  }
  douyin_getListenVideo(){
	  this.loading = true;
	  this.api.douyin_getListenVideo({pageSize:this.pageSize,page:this.page,keyword:this.searchValue,type:this.type?'我的':'全部',isdownload:''})
	  .subscribe((res: any) => {
	  	console.log(res)
		if(res.success){
			res.result.forEach((item:any)=>{
				item.isShowRadio3 = true;
				item.isplay=false;
				item.homeUrl='https://www.douyin.com/user/'+item.SecUid
				item.videoUrl = `https://www.douyin.com/user/${item.SecUid}?modal_id=${item.awemeId}`
				item.expand = false;
				item.admireCountArr = Object.values(item.admireCount)
				item.admireCountKeys = Object.keys(item.admireCount)
				item.collectCountArr = Object.values(item.collectCount)
				item.commentCountArr = Object.values(item.commentCount)
				item.diggCountArr = Object.values(item.diggCount)
				item.playCountArr = Object.values(item.playCount)
				item.shareCountArr = Object.values(item.shareCount)
				item.textExtra = item.textExtra.split(',')
				item.commentTextArr = item.text.split(',')
				item.position = item.position-1
				// 处理高亮
				if(item.position!=-1){
					try{
						item.commentList[item.position].text = item.commentList[item.position].text || ''
						let textHtml:any = item.commentList[item.position].text
						for(let i = 0;i<item.commentTextArr.length;i++){
							let str = '<span style="color:#68f168;">'+item.commentTextArr[i]+'</span>'
							textHtml = textHtml.replaceAll(item.commentTextArr[i],str)
						}
						item.textHtml = textHtml;
					}catch(e){
						// TODO handle the exception
						item.commentList[item.position] = {}
					}
				}
			})
			this.list=res.result;
			this.pageTotal=res.total;
		}
		
	  	this.loading = false;
	  }, (err: any) => {
	  	console.log(err)
	  	this.loading = false;
	  })
  }
  // 转换标签
  assembleHTML(strHTML:any) {
      return this.dz.bypassSecurityTrustHtml(strHTML);
    }
  nzPageIndexChange(e:any){
	  this.page = e;
	  this.douyin_getListenVideo()
  }
  nzPageSizeChange(e:any){
	  this.page=1;
  	  this.pageSize = e;
  	  this.douyin_getListenVideo()
  }
	goHomeUrl(url:string){
		window.open(url)
	}
	
	audioSrc:any=''
	isPlay:any=false
	audioErr:any=false;
	play() {
		let audio: any = document.getElementById('audio')
		audio.play()
		this.list.forEach((item:any)=>{
			if(item.originalSound==this.audioSrc){
				item.isplay=true;
			}
		})
	}
	pause() {
		let audio: any = document.getElementById('audio')
		audio.pause()
		this.list.forEach((item:any)=>{
			item.isplay=false;
		})
	}
	error(e:any){
		if(this.audioSrc){
			this.audioErr = true;
		}
	}
	reloadAudio(item:any){
		this.loading = true;
		this.api.getDouyinAudio({awemeId:item.awemeId})
		.subscribe((res: any) => {
			console.log(res)
			item.originalSound = res.result.videoUrl || res.result.originalSound;
			this.audioSrc = res.result.videoUrl || res.result.originalSound;
			this.audioErr = false;
			this.loading = false;
			this.play()
			setTimeout(()=>{
				let audio: any = document.getElementById('audio')
				audio.play()
			},2000)
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	playMusic(item:any){
			this.isPlay = true;
			this.audioSrc = item.originalSound
			setTimeout(() => {
				this.list.forEach((item:any)=>{
					item.isplay=false;
				})
				item.isplay=true;
				this.play()
			},50)
		
	}
	pauseMusic(item:any){
		this.pause()
	}
	
	
	
	
	listAll:any=[]
	exportXlsb(){
		this.douyin_getListenVideoAll()
	}
	douyin_getListenVideoAll(){
		  this.loading = true;
		  this.api.douyin_getListenVideo({page:this.page,keyword:this.searchValue,type:this.type?'我的':'全部',isdownload:1})
		  .subscribe((res: any) => {
		  	console.log(res)
			if(res.result.length==0){
				this.message.info('没有数据可以导出')
				return
			}
			res.result.forEach((item:any)=>{
				item.isShowRadio3 = true;
				item.homeUrl='https://www.douyin.com/user/'+item.SecUid
				item.videoUrl = `https://www.douyin.com/user/${item.SecUid}?modal_id=${item.awemeId}`
				item.admireCountArr = Object.values(item.admireCount)
				item.admireCountKeys = Object.keys(item.admireCount)
				item.collectCountArr = Object.values(item.collectCount)
				item.commentCountArr = Object.values(item.commentCount)
				item.diggCountArr = Object.values(item.diggCount)
				item.playCountArr = Object.values(item.playCount)
				item.shareCountArr = Object.values(item.shareCount)
			})
		  	this.loading = false;
			this.listAll=res.result;
			this.toXlsb()
		  }, (err: any) => {
		  	console.log(err)
		  	this.loading = false;
		  })
	}
	toXlsb(){
		let titleArr = ["视频名", "声源","标签","视频发布时间","期望点赞","点赞","评论","收藏","分享","播放","待定","最后数据获取时间","博主名","视频链接","博主链接","博主获赞","博主粉丝",
		"录入时间","归属人"]
		let valueArr:any = []
		this.listAll.forEach((item:any)=>{
			valueArr.push([
				item.previewTitle,
				item.title,
				item.textExtra,
				this.common.getTime(item.createTime*1000),
				item.expectations,
				item.diggCountArr[item.diggCountArr.length-1],
				item.commentCountArr[item.commentCountArr.length-1],
				item.collectCountArr[item.collectCountArr.length-1],
				item.shareCountArr[item.shareCountArr.length-1],
				item.playCountArr[item.playCountArr.length-1],
				item.admireCountArr[item.admireCountArr.length-1],
				this.common.getTime(item.updateTime),
				item.Nickname,
				item.videoUrl,
				item.homeUrl,
				item.Clicklike,
				item.Fans,
				this.common.getTime(item.addTime),
				item.username
			])
		})
		var wb = XLSX.utils.book_new();
		 var ws = XLSX.utils.aoa_to_sheet([ titleArr,...valueArr]);
		 XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
		  var xlsbData = XLSX.write(wb, { bookType: "xlsb", type: "array" });
		   var blob = new Blob([xlsbData], { type: "application/vnd.ms-excel.sheet.binary.macroenabled.12" });
		   var downloadLink = document.createElement("a");
		   downloadLink.href = URL.createObjectURL(blob);
		   downloadLink.download = "DouYinVideoListen.xlsb";
			downloadLink.click();
	}
	
	// 视频趋势
	toVideoTrend(item: any) {
		item.aweme_id = item.aweme_id || item.awemeId;
		if (item.seeVideo2) {
			item.isShowRadio2 = item.isShowRadio2 ? false : true;
			item.isShowRadio3 = false;
			item.isShowRadio = false;
		} else {
			this.getDouHotBear(item)
		}
	}
	// 热榜 视频分析
	getDouHotBear(item: any) {
		item.loadingFinished2 = false;
		item.seeVideo2 = true;
		this.api.getDouHotBear({ aweme_id: item.aweme_id }).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				if (res.result.sentence_type == 5) {
					res.result.type = '挑战榜'
				}
				item.VideoTrend = res.result;
				item.isShowRadio2 = true;
				item.isShowRadio3 = false;
				item.isShowRadio = false;
				item.loadingFinished2 = true;
				item.BloggerVideoErr2 = false;
			} else {
				item.BloggerVideoErr2 = true;
				item.loadingFinished2 = true;
			}
		}, (err: any) => {
			console.log(err)
			item.BloggerVideoErr2 = true;
			item.loadingFinished2 = true;
		})
	}
	// 热点id
	getDouIndexOfSentenceId(item: any) {
		item.loadingFinished = false;
		item.seeVideo = true;
		return new Promise((resolve) => {
			this.api.DouIndexOfSentenceId({ aweme_id: item.aweme_id }).subscribe((res: any) => {
				console.log(res)
				if (res.success) {
					item.sentence_id = res.result
				} else {
					item.sentence_id = 0
				}
				item.loadingFinished = true;
				resolve(item.sentence_id)
			}, (err: any) => {
				console.log(err)
				item.sentence_id = 0
				item.loadingFinished = true;
				resolve(0)
				
			})
		})
	}
	// 热点详情
	async toSentenceDetail(item: any) {
		let sentence_id = await this.getDouIndexOfSentenceId(item)
		if(!sentence_id) return
		if (item.seeVideo) {
			item.isShowRadio = item.isShowRadio ? false : true;
			item.isShowRadio3 = false;
			item.isShowRadio2 = false;
		} else {
			this.getDouSentenceDetail(item)
		}
	}
	// 热点详情
	getDouSentenceDetail(item: any) {
		let sentence_id = item.sentence_id
		item.loadingFinished = false;
		item.seeVideo = true;
		this.api.getDouSentenceDetail({ sentence_id,videoId:item.aweme_id }).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				res.result.Top30Video = res.result.Top30Video || []
				res.result.DouSentenceTimeline = res.result.DouSentenceTimeline || []
				res.result.DouSentenceTimeline = this.common.quchong(res.result.DouSentenceTimeline, 'billBoard_type')
				item.sentenceDetail = res.result;
				item.isShowRadio = true;
				item.isShowRadio2 = false;
				item.isShowRadio3 = false;
				item.loadingFinished = true;
				item.BloggerVideoErr = false;
			} else {
				item.BloggerVideoErr = true;
				item.loadingFinished = true;
			}
		}, (err: any) => {
			console.log(err)
			item.BloggerVideoErr = true;
			item.loadingFinished = true;
		})
	}
	reback(item:any){
		item.isShowRadio3 = true;
		item.isShowRadio2 = false;
		item.isShowRadio = false;
	}
}
