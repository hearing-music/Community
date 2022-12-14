import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
@Component({
  selector: 'ngx-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

  constructor(public api: ApiService) { }
  ngOnInit(): void {
  }
  pageCurrent = 1;
  pageSize=20;
  pageTotal = 20;
  file = '';
  converterList:any[] = [];
  loading=false;
  onFile(file:any){
  	console.log(file)
  }
  nzPageIndexChange(e:any):void{
	  console.log(e)
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
