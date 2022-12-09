import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-v3',
  templateUrl: './v3.component.html',
  styleUrls: ['./v3.component.scss'],
})
export class V3Component implements OnInit {
@Input() kugouV3List: any;
	constructor(public common: CommonService) { }
  ngOnInit(): void {
	  
  }
	openSongDetail(scid:string|number,hash:string|number) {
		window.open('https://www.kugou.com/song/#hash='+hash+'&album_audio_id='+scid)
	}
}
