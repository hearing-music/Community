import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
	selector: 'ngx-userControl',
	templateUrl: './userControl.component.html',
	styleUrls: ['./userControl.component.scss']
})
export class UserControlComponent implements OnInit {

	constructor(public api : ApiService, public common : CommonService, private message : NzMessageService) { }
	ngOnInit() : void {
		this.get_webUsersName()
		this.SearchUserBehaviour()
	}
	loading = false;
	behaviourList : any = [];
	behaviourListNow:any = [];
	user = '0';
	userList : any = [{
		ID: '0',
		username: "全部"
	}];
	isVisible = false;
	visibleItem:any = {};
	page = 1;
	pageSize = 20;
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
		let behaviourList = JSON.parse(JSON.stringify(this.behaviourList));
		this.behaviourListNow = behaviourList.splice(((this.page-1)*this.pageSize),this.pageSize)
	}
	SearchUserBehaviour() {
		this.loading = true;
		let ids = [this.user];
		if (this.user == '0') ids = []
		this.api.SearchUserBehaviour({ ids }).subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				res.data.forEach((item : any) => {
					item.apiKey = Object.keys(item.Parameters)
					item.apiValue = Object.values(item.Parameters)
					item.headerKey = Object.keys(item.Headers)
					item.headerValue = Object.values(item.Headers)
				})
				this.behaviourList = JSON.parse(JSON.stringify(res.data));
				this.behaviourListNow = res.data.splice(0,this.pageSize)
				this.page = 1;
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

	ngModelUser(e : any) {
		this.SearchUserBehaviour();
	}
}