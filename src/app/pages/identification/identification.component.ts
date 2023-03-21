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
	files:any = []
	file:any = {};
	fileName = '';
	fileNameArr = [];
	identList :any[]= [];
	loading=false;
	pageCurrent=1;
	pageSize=20;
	pageTotal=20;
	onFile(files:any): void{
		this.files = Object.values(files);
		this.getIdentification()
	}
	getIdentification(): void {
		this.loading = true;
		this.api.getIdentification({
			files: this.files
		}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.fileNameArr = []
				for(let i = 0;i<this.files.length;i++){
					this.fileNameArr.push(this.files[i].name)
				}
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
