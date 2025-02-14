import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { environment } from '../../../../environments/environment';
import { differenceInCalendarDays } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
let downloadUrl = environment.downloadUrl;
@Component({
	selector: 'ngx-userControl',
	templateUrl: './userControl.component.html',
	styleUrls: ['./userControl.component.scss']
})
export class UserControlComponent implements OnInit {

	constructor(public api : ApiService, public common : CommonService,private toast: ToastrService) { }
	tagList:any=[{name:'新网站'},{name:'老网站'},{name:'克隆网站'},{name:'看见歌单'}]
	selectItem:any='新网站'
	onSelect(e:any){
		this.selectItem = e.name
	}
	timeStart=0;
	timeEnd=0;
	nzDefaultPickerValue = null
	
	timeStart2=0;
	timeEnd2=0;
	nzDefaultPickerValue2 = null
	
	timeStart3=0;
	timeEnd3=0;
	nzDefaultPickerValue3 = null
	
	timeStart4=0;
	timeEnd4=0;
	nzDefaultPickerValue4 = null
	
	dateStart = '2024-05-07 00:00:00'; //新网站默认开始日期
	dateStart2 = '2024-05-21 00:00:00' // 老网站默认开始日期
	dateStart3 = '2024-09-13 00:00:00' // 克隆网站默认开始日期
	dateStart4 = '2025-02-14 00:00:00' // 克隆网站默认开始日期
	ngOnInit() : void {
		// 设置默认时间
		this.initDate()
		
		this.get_webUsersName()
		this.get_webUsersName2()
		this.get_webUsersName3()
		this.get_webUsersName4()
		this.SearchUserBehaviour()
		this.SearchUserBehaviour2()
		this.SearchUserBehaviour3()
		this.SearchUserBehaviour4()
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
	
	
	behaviourList3 : any = [];
	user3 = '0';
	userList3 : any = [{
		id: '0',
		username: "全部"
	}];
	page3 = 1;
	pageSize3 = 25;
	total3 = 0;
	
	
	behaviourList4 : any = [];
	user4 = '0';
	userList4 : any = [{
		id: '0',
		username: "全部"
	}];
	page4 = 1;
	pageSize4 = 25;
	total4 = 0;
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
	nzPageIndexChange3(e:any){
		this.page3 = e;
		this.SearchUserBehaviour3();
	}
	nzPageIndexChange4(e:any){
		this.page4 = e;
		this.SearchUserBehaviour4();
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
	SearchUserBehaviour3() {
		this.loading = true;
		let ids = [this.user3];
		if (this.user3 == '0') ids = []
		// 0=全部数据   >0  分页
		this.api.SearchUserBehaviour3({timeStart:this.timeStart3,timeEnd:this.timeEnd3, ids,Offset:this.page3,pageSize:this.pageSize3 }).subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				res.data.forEach((item : any) => {
					item.apiKey = Object.keys(item.Parameters)
					item.apiValue = Object.values(item.Parameters)
					item.headerKey = Object.keys(item.Headers)
					item.headerValue = Object.values(item.Headers)
				})
				this.behaviourList3 = res.data;
				this.total3 = res.total;
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}
	SearchUserBehaviour4() {
		this.loading = true;
		let ids = [this.user4];
		if (this.user4 == '0') ids = []
		// 0=全部数据   >0  分页
		this.api.SearchUserBehaviourKJSongList({timeStart:this.timeStart4,timeEnd:this.timeEnd4, ids,Offset:this.page4,pageSize:this.pageSize4 }).subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				res.data.forEach((item : any) => {
					item.apiKey = Object.keys(item.Parameters)
					item.apiValue = Object.values(item.Parameters)
					item.headerKey = Object.keys(item.Headers)
					item.headerValue = Object.values(item.Headers)
				})
				this.behaviourList4 = res.data;
				this.total4 = res.total;
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
		
		this.timeStart3 = new Date(this.dateStart3).getTime()
		this.timeEnd3 = new Date().getTime()
		this.nzDefaultPickerValue3 = [new Date(this.dateStart3),new Date()]
		
		this.timeStart4 = new Date(this.dateStart4).getTime()
		this.timeEnd4 = new Date().getTime()
		this.nzDefaultPickerValue4 = [new Date(this.dateStart4),new Date()]
	}
	disabledDate = (current: Date): boolean =>{
		// 明天之后 和 5.21之前 不可选
		return (differenceInCalendarDays(current, new Date()) > 0||differenceInCalendarDays(current, new Date(this.dateStart)) < 0);
	}
	disabledDate2 = (current: Date): boolean =>{
		// 明天之后 和 5.21之前 不可选
		return (differenceInCalendarDays(current, new Date()) > 0||differenceInCalendarDays(current, new Date(this.dateStart2)) < 0);
	}
	disabledDate3 = (current: Date): boolean =>{
		// 明天之后 和 5.21之前 不可选
		return (differenceInCalendarDays(current, new Date()) > 0||differenceInCalendarDays(current, new Date(this.dateStart3)) < 0);
	}
	disabledDate4 = (current: Date): boolean =>{
		// 明天之后 和 5.21之前 不可选
		return (differenceInCalendarDays(current, new Date()) > 0||differenceInCalendarDays(current, new Date(this.dateStart4)) < 0);
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
	  onChange3(result: Date[]): void {
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
	  		  this.timeStart3 = timeStart;
	  		  this.timeEnd3 = timeEnd;
	  		  this.SearchUserBehaviour3()
	  }
	  onChange4(result: Date[]): void {
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
	  		  this.timeStart4 = timeStart;
	  		  this.timeEnd4 = timeEnd;
	  		  this.SearchUserBehaviour4()
	  }
	  // 新用户行为导出表格
	  UserBehaviourExcel(){
		  if(this.timeStart==0||this.timeEnd==0){
		  	this.toast.info("请选择日期区间")
		  	return;
		  }
		  this.loading = true;
		  this.api.UserBehaviourExcel({timeStart:this.timeStart,timeEnd:this.timeEnd,userId:this.user=="0"?"":this.user}).subscribe((res : any) => {
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
	// 老用户行为导出表格
	UserBehaviourExcel2(){
		if(this.timeStart2==0||this.timeEnd2==0){
			this.toast.info("请选择日期区间")
			return;
		}
		this.loading = true;
		this.api.UserBehaviourExcel2({timeStart:this.timeStart2,timeEnd:this.timeEnd2,userId:this.user2=="0"?"":this.user2}).subscribe((res : any) => {
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
	// 克隆用户行为导出表格
	UserBehaviourExcel3(){
		if(this.timeStart3==0||this.timeEnd3==0){
			this.toast.info("请选择日期区间")
			return;
		}
		this.loading = true;
		this.api.UserBehaviourExcel3({timeStart:this.timeStart3,timeEnd:this.timeEnd3,userId:this.user3=="0"?"":this.user3}).subscribe((res : any) => {
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
	// 看见歌单用户行为导出表格
	UserBehaviourExcel4(){
		if(this.timeStart4==0||this.timeEnd4==0){
			this.toast.info("请选择日期区间")
			return;
		}
		this.loading = true;
		this.api.UserBehaviourExcel4({timeStart:this.timeStart4,timeEnd:this.timeEnd4,userId:this.user4=="0"?"":this.user4}).subscribe((res : any) => {
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
	get_webUsersName3() {
		this.loading = true;
		this.api.get_webUsersName3().subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				this.userList3.push(...res.result);
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}
	get_webUsersName4() {
		this.loading = true;
		this.api.SearchKJSongListUser({}).subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				this.userList4.push(...res.result);
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
	ngModelUser3(e : any) {
		this.page3 = 1;
		this.SearchUserBehaviour3();
	}
	ngModelUser4(e : any) {
		this.page4 = 1;
		this.SearchUserBehaviour4();
	}
	
}