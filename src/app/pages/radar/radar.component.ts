import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
	selector: 'ngx-radar',
	templateUrl: './radar.component.html',
	styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {

	constructor(public api: ApiService, public common: CommonService, public message: NzMessageService) { }
	ngOnInit(): void {
	}
	// 平台
	tabsActive:any = '';
	tabs:any=[{desc:'抖音',value:'1'},{desc:"网易云",value:"2"},{desc:"热搜",value:"3"}]
	ngModelChange(e:any){
		if(e === '1'){
			this.nowList = this.douyinList;
		}else{
			this.nowList = [];
		}
		this.tabsActive = e;
	}
	// 日期
	date=null;
	time:any = null;
	onChange(result: Date): void {
		this.time = new Date(result).getTime()
	}
	//榜单
	listActive:any='';
	nowList:any = [];
	douyinList:any=[{desc:'飙升榜',value:'1'},{desc:'热歌榜',value:'2'}]
	ngModelChange2(e:any){
		this.listActive = e;
	}
}
