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
	ToRadio(aweme_id: any) {
		window.open(
			"https://www.douyin.com/user/" + this.secUid + "?modal_id=" + aweme_id
		);
	}
}
