import { Component, OnInit, Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { NzMessageService  } from 'ng-zorro-antd/message';
// import { NzModalModule } from 'ng-zorro-antd/modal';
@Component({
	selector: 'ngx-qq',
	templateUrl: './qq.component.html',
	styleUrls: ['./qq.component.scss']
})
export class QqComponent implements OnInit {
	@Input() qqList: any;
	constructor(public common: CommonService,private message: NzMessageService) { }
	ngOnInit(): void {
	}
	popRankShow = false;
	rankItem :any = [];
	openCompay(id:string|number){
		window.open('https://y.qq.com/portal/company_detail.html?id='+id+'#sort=1&type=album')
	}
	openSongDetail(songId:string|number){
		window.open('https://y.qq.com/n/ryqq/songDetail/'+songId+'?songtype=0')
		
	}
	openLink(mid:string|number){
		window.open('https://y.qq.com/m/client/music_index/index.html?mid='+mid+'&type='+mid+'&ADTAG=wxfshare')
	}
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
