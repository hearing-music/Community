import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'ngx-kuwo',
  templateUrl: './kuwo.component.html',
  styleUrls: ['./kuwo.component.scss']
})
export class KuwoComponent implements OnInit {
	@Input() kuwoList: any;
	@Output() change: EventEmitter<any> = new EventEmitter<any>();
  constructor(public common: CommonService,public api: ApiService,public message:NzMessageService) { }
  playAudio(item:any,i:number){
  	  if(item.downloadUrl){
  		  this.change.emit({src:item.downloadUrl,i});
  	  }else{
  		  this.message.info("会员歌曲暂无法播放")
  		  // this.songurl_kuwo(item,i)
  	  }
  }
	openLink(rid:string|number){
		window.open('http://kuwo.cn/play_detail/'+rid)
	}
	reloadComment(rid:string|number){
		this.api.getKuwoComment({
			rid
		}).subscribe((res: any) => {
			console.log(res.result.total)
			if(res.success){
				this.kuwoList.find((e:any)=>e.rid == rid).commentCount = res.result.total;
			}
	}, (err: any) => {
		console.log(err)
	})
	}
	
	// 获取歌词
	getLyric(item:any){
		this.api.getKuwoLyric({
			rid:item.rid,
		}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				item.lyricData2 = this.common.parseLRC3(res.result)
				item.lyricReadly = true;
			}
		}, (err: any) => {
			console.log(err)
		})
		
	}
	mouseenter(item:any){
		item.lyricShow = true;
		if(item.lyricText){
			item.lyricData2 = this.common.parseLRC3(item.lyricText)
			item.lyricReadly = true;
		}else{
			item.lyricReadly = false;
			this.getLyric(item)
		}
	}
	mouseleave(item:any){
		item.lyricShow = false;
	}
  ngOnInit(): void {
  }

}
