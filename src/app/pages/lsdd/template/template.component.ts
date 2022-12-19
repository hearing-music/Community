import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
	@Input() list: any;
  constructor(public common: CommonService) { }

  ngOnInit(): void {
  }
	audioSrc = '';
	playAudio(url:string,i:number){
		this.list.forEach((item:any,index:number)=>{
			if(index == i){
				item.isPlay = !item.isPlay
			}else{
				item.isPlay = false;
			}
		})
		this.audioSrc = url;
	}
}
