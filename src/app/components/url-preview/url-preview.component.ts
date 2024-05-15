import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {CommonService} from "../../services/common.service";
@Component({
  selector: 'ngx-url-preview',
  templateUrl: './url-preview.component.html',
  styleUrls: ['./url-preview.component.scss']
})
export class UrlPreviewComponent implements OnInit {
 @Input() data: any;
 @Input() songName: any;
 @Input() loading: any=false;
  constructor(public common: CommonService,) { }
	mousemove(e:any){
		e.stopPropagation();
	}
	previewClick(e:any){
		e.stopPropagation();
	}
  ngOnInit(): void {
  }
}
