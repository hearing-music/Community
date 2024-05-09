import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-wangyiyun',
  templateUrl: './wangyiyun.component.html',
  styleUrls: ['./wangyiyun.component.scss']
})
export class WangyiyunComponent implements OnInit {
	@Input() wangyiyunList: any;
	@Output() change: EventEmitter<any> = new EventEmitter<any>();
	constructor(public common: CommonService,public api: ApiService) { }
	playAudio(url: string, i: number) {
		if(url){
			this.change.emit({src:url,i});
		}
	}
	openLink(songid:string|number){
		window.open('https://music.163.com/#/song?id='+songid)
	}
	downloadUrl(downloadUrl:string,songname:string){
		let suxIndex = downloadUrl.lastIndexOf('.')
		let sux = downloadUrl.substr(suxIndex)
		this.common.download(downloadUrl,songname+sux)
		// window.open(downloadUrl)
	}
  ngOnInit(): void {
  }
	// 获取歌词
	getLyric(item:any){
		this.api.getWangyiyunLyric({
			songid:item.songid,
		}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				item.lyricText = res.result
				item.lyricData2 = this.common.parseLRC3(item.lyricText)
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
}
