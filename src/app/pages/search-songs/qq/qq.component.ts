import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { NzMessageService  } from 'ng-zorro-antd/message';
// import { NzModalModule } from 'ng-zorro-antd/modal';
import { ApiService } from "../../../services/api.service";
@Component({
	selector: 'ngx-qq',
	templateUrl: './qq.component.html',
	styleUrls: ['./qq.component.scss']
})
export class QqComponent implements OnInit {
	@Input() qqList: any;
	constructor(public common: CommonService,private message: NzMessageService,public api: ApiService) { }
	@Output() change: EventEmitter<any> = new EventEmitter<any>();
	playAudio(url: string, i: number) {
		if(url){
			this.change.emit({src:url,i});
		}
	}
	ngOnInit(): void {
	}
	popRankShow = false;
	rankItem :any = [];
	lyricShow = false;
	
	
	// 获取歌词
	getLyric(item:any){
		this.api.getQQLyric({
			songmid: item.mid,
		}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				item.lyricText = res.result.lyric
				item.lyricData2 = this.common.parseLRC2(item.lyricText)
				item.lyricReadly = true;
			}
		}, (err: any) => {
			console.log(err)
		})
		
	}
	mouseenter(item:any){
		item.lyricShow = true;
		if(item.lyricText){
			item.lyricData2 = this.common.parseLRC2(item.lyricText)
			item.lyricReadly = true;
		}else{
			item.lyricReadly = false;
			this.getLyric(item)
		}
	}
	mouseleave(item:any){
		item.lyricShow = false;
	}
	// 打开公司
	openCompay(id:string|number){
		window.open('https://y.qq.com/portal/company_detail.html?id='+id+'#sort=1&type=album')
	}
	// 打开链接
	openSongDetail(songId:string|number){
		window.open('https://y.qq.com/n/ryqq/songDetail/'+songId+'?songtype=0')
		
	}
	// 打开链接
	openLink(mid:string|number){
		window.open('https://y.qq.com/m/client/music_index/index.html?mid='+mid+'&type='+mid+'&ADTAG=wxfshare')
	}
	// 弹出排行
	popRank(item:any){
		if(!item.record.newData){
			this.message.error('该歌曲没有排行')
			return
		}
		this.rankItem = item.record.newData;
		this.popRankShow = true;
	}
	
	  handleCancel(): void {
	    console.log('Button cancel clicked!');
	    this.popRankShow = false;
	  }
	
}
