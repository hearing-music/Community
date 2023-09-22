import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'ngx-bloggerVideos',
  templateUrl: './bloggerVideos.component.html',
  styleUrls: ['./bloggerVideos.component.scss']
})
export class BloggerVideosComponent implements OnInit {
 @Input() BloggerVideo: any=[];
 @Input() NewFans: any=[];
 @Input() secUid: any='';
  constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) { }
  
  ngOnInit(): void {
  }
	ToRadio(aweme_id: any) {
		window.open(
			"https://www.douyin.com/user/" + this.secUid + "?modal_id=" + aweme_id
		);
	}
}
