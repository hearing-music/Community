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
	  this.highUserList = localStorage.getItem('highUserList') || ['1','2','3','4','5','8','11','13','17','26','34']
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
			item.originalSound = res.result.originalSound;
			this.audioErr = false;
			this.loading = false;
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
}
