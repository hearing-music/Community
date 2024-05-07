import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
	selector: 'ngx-timeControl',
	templateUrl: './timeControl.component.html',
	styleUrls: ['./timeControl.component.scss']
})
export class TimeControlComponent implements OnInit {

	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) { }
	ngOnInit(): void {
		// this.getqq_kugouInfoAll()
	}
	loading = false;
	tagList = [{
		name: '监测歌曲',
	}]
	selectItem = '监测歌曲';
	onSelect(item: any) {
		this.selectItem = item.name;
	}
	// 监测歌曲
	getqq_kugouInfoAll(){
		this.loading = true;
		this.api.getqq_kugouInfoAll().subscribe((res: any) => {
			this.loading = false;
			console.log(res)
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
