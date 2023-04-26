import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
	selector: 'ngx-qq-phone',
	templateUrl: './qq-phone.component.html',
	styleUrls: ['./qq-phone.component.scss']
})
export class QqPhoneComponent implements OnInit {
	@Input() qqList: any;
	constructor(public common: CommonService,public api: ApiService) { }
	@Output() change: EventEmitter<any> = new EventEmitter<any>();
	playAudio(url: string, i: number) {
		if(url){
			this.change.emit({src:url,i});
		}
	}
	ngOnInit(): void {
	}
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
				item.lyricData2 = this.common.parseLRC3(item.lyricText)
				item.lyricReadly = true;
			}
		}, (err: any) => {
			console.log(err)
		})
		
	}
	lyricClick(item:any){
		this.rankItem = item.record.newData || item.record || [];
		item.lyricShow = true;
		if(item.lyricText){
			item.lyricData2 = this.common.parseLRC3(item.lyricText)
			item.lyricReadly = true;
		}else{
			item.lyricReadly = false;
			this.getLyric(item)
		}
		return false
	}
	closeLyric(i:any){
		this.qqList[i].lyricShow = false;
	}
	// 打开公司
	openCompay(id:string|number){
		window.open('https://y.qq.com/portal/company_detail.html?id='+id+'#sort=1&type=album')
	}
	// 打开链接
	openSongDetail(songMid:string){
		window.open('https://y.qq.com/n/ryqq/songDetail/'+songMid)
		
	}
	// 打开链接
	openLink(mid:string|number){
		window.open('https://y.qq.com/m/client/music_index/index.html?mid='+mid+'&type='+mid+'&ADTAG=wxfshare')
	}
	
	
}
