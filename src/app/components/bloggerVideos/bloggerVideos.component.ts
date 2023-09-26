import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'ngx-bloggerVideos',
  templateUrl: './bloggerVideos.component.html',
  styleUrls: ['./bloggerVideos.component.scss']
})
export class BloggerVideosComponent implements OnInit {
	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) { }
 @Input() BloggerVideo: any=[];
 @Input() NewFans: any=[];
 @Input() secUid: any='';
 @Input() type: any='';
 @Input() total: any=0;
 @Input() loadingFinished: any=true;
  @Output() toMore: EventEmitter<any> = new EventEmitter<any>();
  clickToMore() {
  	this.toMore.emit({secUid:this.secUid});
  }
  ngOnInit(): void {
  }
  loading:any=false;
	ToRadio(aweme_id: any) {
		window.open(
			"https://www.douyin.com/user/" + this.secUid + "?modal_id=" + aweme_id
		);
	}
	// 热点详情
	toSentence(sentence_id:any,i:any){
		let item = this.BloggerVideo[i]
		// sentence_id
		if (item.seeVideo2) {
		  this.sentenceDetail = item.sentenceDetail
		  item.isShowRadio2 = item.isShowRadio2 ? false : true;
		  this.isShowRadio2=item.isShowRadio2
		  item.isShowRadio = false;
		  this.isShowRadio=item.isShowRadio
		  this.BloggerVideo.forEach((items:any)=>{
		  	if(item.sentence_id!=items.sentence_id){
		  		items.isShowRadio2=false;
		  	}
		  })
		} else {
			this.getDouSentenceDetail(item,sentence_id)
		}
	}
	// 热点详情
	getDouSentenceDetail(item: any,sentence_id:any) {
			let aweme_id = item.aweme_id||item.VideoDetails.aweme_id;
			item.loadingFinished2 = false;
			item.seeVideo2 = true;
			this.api.getDouSentenceDetail({ sentence_id,videoId:aweme_id }).subscribe((res: any) => {
				console.log(res)
				if (res.success) {
					res.result.Top30Video = res.result.Top30Video || []
					res.result.DouSentenceTimeline = this.common.quchong(res.result.DouSentenceTimeline,'billBoard_type')
					this.sentenceDetail = {sentenceDetail:res.result};
					item.sentenceDetail = {sentenceDetail:res.result};
					this.isShowRadio2=true
					this.isShowRadio=false
					item.isShowRadio2 = true;
					item.isShowRadio = false;
					item.loadingFinished2 = true;
					item.BloggerVideoErr2 = false;
					this.BloggerVideo.forEach((items:any)=>{
						if(item.sentence_id!=items.sentence_id){
							items.isShowRadio2=false;
						}
					})
				}else {
					item.BloggerVideoErr2 = true;
					item.loadingFinished2 = true;
				}
			}, (err: any) => {
				console.log(err)
				item.BloggerVideoErr2 = true;
				item.loadingFinished2 = true;
			})
	}
	
	
	
	sentenceDetail:any={}
	VideoTrend:any={}
	isShowRadio=false;
	isShowRadio2=false;
	// 视频趋势
	toVideoTrend(item:any){
		item.aweme_id = item.aweme_id|| item.VideoDetails.aweme_id;
		if (item.seeVideo) {
		  this.VideoTrend = item.VideoTrend
		  item.isShowRadio = item.isShowRadio ? false : true;
		  this.isShowRadio=item.isShowRadio
		  item.isShowRadio2 = false;
		  this.isShowRadio2=item.isShowRadio2
		  this.BloggerVideo.forEach((items:any)=>{
			  items.aweme_id = items.aweme_id|| items.VideoDetails.aweme_id;
		  	if(item.aweme_id!=items.aweme_id){
		  		items.isShowRadio=false;
		  	}
		  })
		} else {
			this.getDouHotBear(item)
		}
	}
	// 热榜 视频分析
	getDouHotBear(item:any) {
		item.loadingFinished = false;
		item.seeVideo = true;
		this.api.getDouHotBear({ aweme_id:item.aweme_id }).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				if (res.result.sentence_type == 5) {
					res.result.type = '挑战榜'
				}
				this.VideoTrend = res.result;
				item.VideoTrend = res.result;
				this.isShowRadio=true
				this.isShowRadio2=false
				item.isShowRadio = true;
				item.isShowRadio2 = false;
				item.loadingFinished = true;
				item.BloggerVideoErr = false;
				this.BloggerVideo.forEach((items:any)=>{
					items.aweme_id = items.aweme_id|| items.VideoDetails.aweme_id;
					if(item.aweme_id!=items.aweme_id){
						items.isShowRadio=false;
					}
				})
			}else {
				item.BloggerVideoErr = true;
				item.loadingFinished = true;
			}
		}, (err: any) => {
			console.log(err)
			item.BloggerVideoErr = true;
			item.loadingFinished = true;
		})
	}
}
