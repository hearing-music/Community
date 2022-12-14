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
	identList = [];
	loading=false;
	onFile(file:any){
		console.log(file)
		this.file = file;
		this.getIdentification()
	}
	getIdentification() {
		this.api.getIdentification({
			file: this.file
		}).subscribe((res: any) => {
			console.log(res)
		}, (err: any) => {
			console.log(err)
		})
	}
}
