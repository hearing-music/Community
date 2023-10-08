import { Component, OnInit, Input, Output, EventEmitter,SimpleChanges } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { CommonService } from "../../../../services/common.service";
@Component({
	selector: "ngx-riseRankingTemp",
	templateUrl: "./riseRankingTemp.component.html",
	styleUrls: ["./riseRankingTemp.component.scss"],
})
export class RiseRankingTempComponent implements OnInit {
	@Input() list: any=[];
	@Input() type:any='由你';
	ngOnChanges(changes: SimpleChanges) {
		// 切换类别 排序
		if(changes.type){
			if(changes.type.previousValue){
				this.changeOrderByT()
				this.changeOrderByE()
			}
		}
	 }
	constructor(
		public api: ApiService,
		private message: NzMessageService,
		public common: CommonService
	) { }
	ngOnInit(): void { }
	// 打开公司
	openCompay(id: string | number) {
		window.open('https://y.qq.com/portal/company_detail.html?id=' + id + '#sort=1&type=album')
	}
	estimateOrderby:any=''
	todayOrderby:any=''
	orderbyEstimate(){
		let s1 =''
		let s2 = ''
		if(this.type=='由你'){
			s1 = 'predictionIndexes'
			s2 = 'indexes'
		}
		if(this.type=='酷我'){
			s1 = 'predictionKwIndexes'
			s2 = 'kwIndexes'
		}
		if(this.type=='酷狗'){
			s1 = 'predictionKgIndexes'
			s2 = 'kgIndexes'
		}
		if(this.type=='Q音'){
			s1 = 'predictionQyIndexes'
			s2 = 'qyIndexes'
		}
		let list = [...this.list]
		if(this.estimateOrderby=='desc'){
			this.estimateOrderby = 'asc'
			this.list = list.sort((a:any,b:any)=> (a[s1] - a.yesterday[s2]) - (b[s1] - b.yesterday[s2]))
		}else{
			this.estimateOrderby = 'desc'
			this.list = list.sort((a:any,b:any)=> (b[s1] - b.yesterday[s2]) - (a[s1] - a.yesterday[s2]))
		}
		this.todayOrderby = ''
	}
	orderbyToday(){
		let s1 =''
		let s2 = ''
		if(this.type=='由你'){
			s1 = 'todayIndexes'
			s2 = 'indexes'
		}
		if(this.type=='酷我'){
			s1 = 'todayKwIndexes'
			s2 = 'kwIndexes'
		}
		if(this.type=='酷狗'){
			s1 = 'todayKgIndexes'
			s2 = 'kgIndexes'
		}
		if(this.type=='Q音'){
			s1 = 'todayQyIndexes'
			s2 = 'qyIndexes'
		}
		let list = [...this.list]
		if(this.todayOrderby=='desc'){
			this.todayOrderby = 'asc'
			this.list = list.sort((a:any,b:any)=> (a[s1] - a.yesterday[s2]) - (b[s1] - b.yesterday[s2]))
		}else{
			this.todayOrderby = 'desc'
			this.list = list.sort((a:any,b:any)=> (b[s1] - b.yesterday[s2]) - (a[s1] - a.yesterday[s2]))
		}
		this.estimateOrderby = ''
	}
	
	changeOrderByT(){
		let s1 =''
		let s2 = ''
		if(this.type=='由你'){
			s1 = 'todayIndexes'
			s2 = 'indexes'
		}
		if(this.type=='酷我'){
			s1 = 'todayKwIndexes'
			s2 = 'kwIndexes'
		}
		if(this.type=='酷狗'){
			s1 = 'todayKgIndexes'
			s2 = 'kgIndexes'
		}
		if(this.type=='Q音'){
			s1 = 'todayQyIndexes'
			s2 = 'qyIndexes'
		}
		let list = [...this.list]
		if(this.todayOrderby=='desc'){
			this.list = list.sort((a:any,b:any)=> (b[s1] - b.yesterday[s2]) - (a[s1] - a.yesterday[s2]))
		}else if(this.todayOrderby=='asc'){
			this.list = list.sort((a:any,b:any)=> (a[s1] - a.yesterday[s2]) - (b[s1] - b.yesterday[s2]))
		}
	}
	changeOrderByE(){
		let s1 =''
		let s2 = ''
		if(this.type=='由你'){
			s1 = 'predictionIndexes'
			s2 = 'indexes'
		}
		if(this.type=='酷我'){
			s1 = 'predictionKwIndexes'
			s2 = 'kwIndexes'
		}
		if(this.type=='酷狗'){
			s1 = 'predictionKgIndexes'
			s2 = 'kgIndexes'
		}
		if(this.type=='Q音'){
			s1 = 'predictionQyIndexes'
			s2 = 'qyIndexes'
		}
		let list = [...this.list]
		if(this.estimateOrderby=='desc'){
			this.list = list.sort((a:any,b:any)=> (b[s1] - b.yesterday[s2]) - (a[s1] - a.yesterday[s2]))
		}else if(this.estimateOrderby=='asc'){
			this.list = list.sort((a:any,b:any)=> (a[s1] - a.yesterday[s2]) - (b[s1] - b.yesterday[s2]))
		}
	}
}
