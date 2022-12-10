import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-wangyiyun',
  templateUrl: './wangyiyun.component.html',
  styleUrls: ['./wangyiyun.component.scss']
})
export class WangyiyunComponent implements OnInit {
	@Input() wangyiyunList: any;
  constructor(public common: CommonService) { }
	openLink(songid:string|number){
		window.open('https://music.163.com/#/song?id='+songid)
	}
	downloadUrl(downloadUrl:string,songname:string){
		this.common.download(downloadUrl,songname)
	}
  ngOnInit(): void {
  }

}
