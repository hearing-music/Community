import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
import { NzMessageService  } from 'ng-zorro-antd/message';
import { DomSanitizer } from '@angular/platform-browser';
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
	  this.douyin_getListenVideo()
  }
  userId='0'
  loading=false;
  searchValue:any=''
  searchHolder:any = '请搜索抖音视频名字'
  list:any=[]
  
  page=1;
  pageSize=10;
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
	  this.api.douyin_getListenVideo({page:this.page,keyword:this.searchValue,type:this.type?'我的':'全部'})
	  .subscribe((res: any) => {
	  	console.log(res)
		res.result.forEach((item:any)=>{
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
			// 处理高亮
			if(item.position!=0){
				item.commentList[item.position].text = item.commentList[item.position].text || ''
				let textHtml:any = item.commentList[item.position].text
				for(let i = 0;i<item.commentTextArr.length;i++){
					let str = '<span style="color:#68f168;">'+item.commentTextArr[i]+'</span>'
					textHtml = textHtml.replaceAll(item.commentTextArr[i],str)
				}
				item.textHtml = textHtml;
			}
		})
	  	this.loading = false;
		this.list=res.result;
		this.pageTotal=res.total;
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
	goHomeUrl(url:string){
		window.open(url)
	}
	
}
