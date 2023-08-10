import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-copyright',
  templateUrl: './copyright.component.html',
  styleUrls: ['./copyright.component.scss']
})

export class CopyrightComponent implements OnInit {
  constructor(public api: ApiService, private message: NzMessageService,public common: CommonService,) { }
  @Input() copyrightList: any;
  audioSrc = ''
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  playAudio(url: string, i: number) {
  	this.audioSrc = url;
  	this.change.emit({src:this.audioSrc,i});
  }
  ngOnInit(): void {
    
  }
  dowloadLyric(src:any){
	  window.open(src)
  }
}
