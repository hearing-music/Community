import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-wangyiyun-phone',
  templateUrl: './wangyiyun-phone.component.html',
  styleUrls: ['./wangyiyun-phone.component.scss']
})
export class WangyiyunPhoneComponent implements OnInit {
	@Input() wangyiyunList: any;
	constructor(public common: CommonService,public api: ApiService) { }
	openLink(songid:string|number){
		window.open('https://music.163.com/#/song?id='+songid)
	}
	downloadUrl(downloadUrl:string,songname:string){
		this.common.download(downloadUrl,songname)
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
	lyricClick(item:any){
		item.lyricShow = true;
		if(item.lyricText){
			item.lyricReadly = true;
		}else{
			item.lyricReadly = false;
			this.getLyric(item)
		}
	}
	closeLyric(i:any){
		this.wangyiyunList[i].lyricShow = false;
	}
}
