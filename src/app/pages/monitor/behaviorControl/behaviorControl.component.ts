import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
	selector: 'ngx-behaviorControl',
	templateUrl: './behaviorControl.component.html',
	styleUrls: ['./behaviorControl.component.scss']
})
export class BehaviorControlComponent implements OnInit {

	constructor(public api : ApiService, public common : CommonService, private message : NzMessageService,	private router: Router,public route: ActivatedRoute) { 
		
		this.route.params.subscribe((res) => {
			if(res.type=='navigate'){
				this.init()
			}
		})
		
	}
	ngOnInit() : void {
		this.SearchSummaryAnalysis()
	}
	loading = false;
	list:any=[]
	SearchSummaryAnalysis() {
		this.loading = true;
		// 0=全部数据   >0  分页
		this.api.SummaryAnalysis().subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				res.data.forEach((item:any)=>{
					item.expand =false;
				})
				this.list = res.data;
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}
	navigate(item:any,ditem:any){
		let keyword = item.keyword;
		let data = {
			username:ditem.name,
			formatted_time:item.formatted_time,
			keyword:item.keyword
		}
		localStorage.setItem('previousUrl','/pages/behaviorControl/navigate')
		if(item.Name=='qq搜索'){
			localStorage.setItem('behaviorControlData',JSON.stringify(data))
			this.router.navigate(['/pages/search-songs/qq/'+keyword]);
		}
		if(item.Name=='酷狗v3'){
			localStorage.setItem('behaviorControlData',JSON.stringify(data))
			this.router.navigate(['/pages/search-songs/v3/'+keyword]);
		}
	}
	init(){
		try{
			let data = localStorage.getItem('behaviorControlData')
			data = JSON.parse(data);
			let interval = setInterval(()=>{
				if(this.list.length>0){
					clearInterval(interval)
					interval = null;
					this.go(data)
				}
			},50)
		}catch(e){
			//TODO handle the exception
		}
	}
	go(data:any){
		let index = this.list.findIndex((e:any)=>e.name==data.username);
		this.list[index].expand = true;
		setTimeout(()=>{
			let index2 = this.list[index].info.findIndex((e:any)=>e.keyword == data.keyword&&e.formatted_time==data.formatted_time)
			let item = this.list[index].info[index2];
			let id = item.keyword + item.formatted_time;
			let ele:any = document.getElementById(id);
			ele.style.color='green'
			ele.scrollIntoView(false)
		},100)
	}
}