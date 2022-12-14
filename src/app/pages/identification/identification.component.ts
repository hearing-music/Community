import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
@Component({
	selector: 'ngx-identification',
	templateUrl: './identification.component.html',
	styleUrls: ['./identification.component.scss']
})
export class IdentificationComponent implements OnInit {

	constructor(public api: ApiService) { }
	ngOnInit(): void {
	}
	file = '';
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
		this.api.getIdentification({
			file: this.file
		}).subscribe((res: any) => {
			console.log(res)
		}, (err: any) => {
			console.log(err)
		})
	}
	nzPageIndexChange(e:any): void{
		console.log(e)
	}
}
