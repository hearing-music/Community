import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
	selector: 'ngx-songControl',
	templateUrl: './songControl.component.html',
	styleUrls: ['./songControl.component.scss']
})
export class SongControlComponent implements OnInit {

	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) { }
	ngOnInit(): void {
	}
	loading = false;
}
