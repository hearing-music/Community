import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { CommonService } from "../../../services/common.service";
@Component({
	selector: "ngx-riseRanking",
	templateUrl: "./riseRanking.component.html",
	styleUrls: ["./riseRanking.component.scss"],
})
export class RiseRankingComponent implements OnInit {
	constructor(
		public api: ApiService,
		private message: NzMessageService,
		public common: CommonService
	) { }
	ngOnInit(): void {this.getRanking() }
	// 打开公司
	openCompay(id: string | number) {
		window.open('https://y.qq.com/portal/company_detail.html?id=' + id + '#sort=1&type=album')
	}
	
	tagList = [{
		name: '由你',
		holder: ''
	}, {
		name: '酷狗',
		holder: ''
	}, {
		name: '酷我',
		holder: ''
	},{
		name: 'Q音',
		holder: ''
	},]
	selectItem = '由你';
	onSelect(item:any){
		this.selectItem=item.name;
	}
	list:any=[]
	loading:any=false
	
	getRanking(){
		this.loading = true;
		this.api.GetMusicLimitHundred().subscribe((res: any) => {
			if (res.success) {
				res.result.forEach((item:any)=>{
					item.yesterday = item.yesterday ||{indexes:1000000}
				})
				this.list = res.result;
			} 
			this.loading = false;
		}, (err: any) => {
			this.loading = false;
		})

	}
	
	
}
