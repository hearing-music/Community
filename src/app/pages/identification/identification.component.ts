import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
@Component({
	selector: 'ngx-identification',
	templateUrl: './identification.component.html',
	styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

	constructor(public api: ApiService,public common: CommonService) { }
	ngOnInit(): void {
	}
	file:any = {};
	fileName = '';
	identList :any[]= [];
	loading=false;
	pageCurrent=1;
	pageSize=20;
	pageTotal=20;
	onFile(file:any): void{
		console.log(file)
		this.file = file;
		this.getIdentification()
	}
	getIdentification(): void {
		this.loading = true;
		this.api.getIdentification({
			file: this.file
		}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.fileName = this.file.name;
				this.identList = res.result;
			}
			console.log(res)
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	nzPageIndexChange(e:any): void{
		console.log(e)
	}
}
