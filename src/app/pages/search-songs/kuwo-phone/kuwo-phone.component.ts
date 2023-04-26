import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-kuwo-phone',
  templateUrl: './kuwo-phone.component.html',
  styleUrls: ['./kuwo-phone.component.scss']
})
export class KuwoPhoneComponent implements OnInit {
	@Input() kuwoList: any;
  constructor(public common: CommonService,public api: ApiService) { }
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
	lyricClick(item:any){
		item.lyricShow = true;
		if(item.lyricData2){
			item.lyricReadly = true;
		}else{
			item.lyricReadly = false;
			this.getLyric(item)
		}
	}
	closeLyric(i:any){
		this.kuwoList[i].lyricShow = false;
	}
  ngOnInit(): void {
  }

}
