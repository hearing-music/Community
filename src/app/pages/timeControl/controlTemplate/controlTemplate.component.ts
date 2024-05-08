import { Component, OnInit,Input,SimpleChanges, OnChanges } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
	selector: 'ngx-controlTemplate',
	templateUrl: './controlTemplate.component.html',
	styleUrls: ['./controlTemplate.component.scss']
})
export class ControlTemplateComponent implements OnInit,OnChanges {
	@Input() percent: any;
	@Input() timed_task: any = {};
	@Input() total: any = 0;
	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) { }
	ngOnInit(): void {
	}
	ngOnChanges(changes: SimpleChanges) { 
		// if(changes.songControlList){
		// 	this.getTime();
		// 	this.compute();
		// }
	  }
}
