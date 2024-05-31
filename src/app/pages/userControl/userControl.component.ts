import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import { environment } from '../../../environments/environment';
import { differenceInCalendarDays } from 'date-fns';
let downloadUrl = environment.downloadUrl;
@Component({
	selector: 'ngx-userControl',
	templateUrl: './userControl.component.html',
	styleUrls: ['./userControl.component.scss']
})
export class UserControlComponent implements OnInit {

	constructor(public api : ApiService, public common : CommonService, private message : NzMessageService) { }
	timeStart=0;
	timeEnd=0;
	nzDefaultPickerValue = null
	timeStart2=0;
	timeEnd2=0;
	nzDefaultPickerValue2 = null
	
	dateStart = '2024-05-07 00:00:00'; //新网站默认开始日期
	dateStart2 = '2024-05-21 00:00:00' // 老网站默认开始日期
	ngOnInit() : void {
		// 设置默认时间
		this.initDate()
		
		this.get_webUsersName()
		this.get_webUsersName2()
		this.SearchUserBehaviour()
		this.SearchUserBehaviour2()
	}
	loading = false;
	behaviourList : any = [];
	user = '0';
	userList : any = [{
		ID: '0',
		username: "全部"
	}];
	isVisible = false;
	visibleItem:any = {};
	page = 1;
	pageSize = 25;
	total = 0;
	
	behaviourList2 : any = [];
	user2 = '0';
	userList2 : any = [{
		id: '0',
		name: "全部"
	}];
	page2 = 1;
	pageSize2 = 25;
	total2 = 0;
	seeHeader(item : any) {
		this.isVisible = true;
		this.visibleItem = item;
	}
	showModal() : void {
		this.isVisible = true;
	}
	handleOk() : void {
		this.isVisible = false;
	}
	handleCancel() : void {
		this.isVisible = false;
	}
	
	nzPageIndexChange(e:any){
		this.page = e;
		this.SearchUserBehaviour();
	}
	nzPageIndexChange2(e:any){
		this.page2 = e;
		this.SearchUserBehaviour2();
	}
	SearchUserBehaviour() {
		this.loading = true;
		let ids = [this.user];
		if (this.user == '0') ids = []
		// 0=全部数据   >0  分页
		this.api.SearchUserBehaviour({timeStart:this.timeStart,timeEnd:this.timeEnd, ids,Offset:this.page,pageSize:this.pageSize }).subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				res.data.forEach((item : any) => {
					item.apiKey = Object.keys(item.Parameters)
					item.apiValue = Object.values(item.Parameters)
					item.headerKey = Object.keys(item.Headers)
					item.headerValue = Object.values(item.Headers)
				})
				this.behaviourList = res.data;
				this.total = res.total;
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}
	SearchUserBehaviour2() {
		this.loading = true;
		let ids = [this.user2];
		if (this.user2 == '0') ids = []
		// 0=全部数据   >0  分页
		this.api.SearchUserBehaviour2({timeStart:this.timeStart2,timeEnd:this.timeEnd2, ids,Offset:this.page2,pageSize:this.pageSize2 }).subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				res.data.forEach((item : any) => {
					item.apiKey = Object.keys(item.Parameters)
					item.apiValue = Object.values(item.Parameters)
					item.headerKey = Object.keys(item.Headers)
					item.headerValue = Object.values(item.Headers)
				})
				this.behaviourList2 = res.data;
				this.total2 = res.total;
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	
	// 初始化日期
	initDate(){
		this.timeStart = new Date(this.dateStart).getTime()
		this.timeEnd = new Date().getTime()
		this.nzDefaultPickerValue = [new Date(this.dateStart),new Date()]
		
		this.timeStart2 = new Date(this.dateStart2).getTime()
		this.timeEnd2 = new Date().getTime()
		this.nzDefaultPickerValue2 = [new Date(this.dateStart2),new Date()]
	}
	disabledDate = (current: Date): boolean =>{
		// 明天之后 和 5.21之前 不可选
		return (differenceInCalendarDays(current, new Date()) > 0||differenceInCalendarDays(current, new Date(this.dateStart)) < 0);
	}
	disabledDate2 = (current: Date): boolean =>{
		// 明天之后 和 5.21之前 不可选
		return (differenceInCalendarDays(current, new Date()) > 0||differenceInCalendarDays(current, new Date(this.dateStart2)) < 0);
	}
	// 日期change
	onChange(result: Date[]): void {
			  var start = result[0].getTime();
			  let year = new Date(start).getFullYear();
			  let month = new Date(start).getMonth()+1;
			  let date = new Date(start).getDate();
			  let timeStart = new Date(year+'-'+month+'-'+date + " 00:00:00").getTime();
			  var end = result[1].getTime();
			  let year2 = new Date(end).getFullYear();
			  let month2 = new Date(end).getMonth()+1;
			  let date2 = new Date(end).getDate();
			  let timeEnd = new Date(year2+'-'+month2+'-'+date2 + " 23:59:59").getTime();
			  this.timeStart = timeStart;
			  this.timeEnd = timeEnd;
			  this.SearchUserBehaviour()
	}
	  onChange2(result: Date[]): void {
		  var start = result[0].getTime();
		  let year = new Date(start).getFullYear();
		  let month = new Date(start).getMonth()+1;
		  let date = new Date(start).getDate();
		  let timeStart = new Date(year+'-'+month+'-'+date + " 00:00:00").getTime();
		  var end = result[1].getTime();
		  let year2 = new Date(end).getFullYear();
		  let month2 = new Date(end).getMonth()+1;
		  let date2 = new Date(end).getDate();
		  let timeEnd = new Date(year2+'-'+month2+'-'+date2 + " 23:59:59").getTime();
		  this.timeStart2 = timeStart;
		  this.timeEnd2 = timeEnd;
		  this.SearchUserBehaviour2()
	  }
	// 老用户行为导出表格
	UserBehaviourExcel2(){
		if(this.timeStart==0||this.timeEnd==0){
			this.message.info("请选择日期区间")
			return;
		}
		this.loading = true;
		this.api.UserBehaviourExcel2({timeStart:this.timeStart,timeEnd:this.timeEnd,userId:this.user2=="0"?"":this.user2}).subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				let fileURL = res.data[0];
				setTimeout(()=>{
					this.common.download(downloadUrl+fileURL,res.data[1])
				},1000)
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}
	get_webUsersName() {
		this.loading = true;
		this.api.get_webUsersName().subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				this.userList.push(...res.result);
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}
	get_webUsersName2() {
		this.loading = true;
		this.api.get_webUsersName2().subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				this.userList2.push(...res.result);
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}

	ngModelUser(e : any) {
		this.page = 1;
		this.SearchUserBehaviour();
	}
	ngModelUser2(e : any) {
		this.page2 = 1;
		this.SearchUserBehaviour2();
	}
	
}