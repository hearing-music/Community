import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-v3',
  templateUrl: './v3.component.html',
  styleUrls: ['./v3.component.scss'],
})
export class V3Component implements OnInit {
@Input() kugouV3List: any;
	constructor(public common: CommonService,public api: ApiService) { }
  ngOnInit(): void {
	  
  }
	openSongDetail(scid:string|number,hash:string|number) {
		window.open('https://www.kugou.com/song/#hash='+hash+'&album_audio_id='+scid)
	}
	
	// 获取歌词
	getLyric(item:any){
		this.api.getKugouLyric({
			hash:item.FileHash,
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
