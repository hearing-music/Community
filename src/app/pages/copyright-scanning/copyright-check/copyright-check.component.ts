import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-copyright-check',
  templateUrl: './copyright-check.component.html',
  styleUrls: ['./copyright-check.component.scss']
})
export class CopyrightCheckComponent implements OnInit {

  constructor(public api: ApiService) { }
  
  ngOnInit(): void {
  }
  file = '';
  copyrightList = [];
  pageSize = 20;
  pageCurrent = 1;
  pageTotal = 20;
  loading = false;
  
  nzPageIndexChange(e: string | number) {
  	console.log(e)
  }
  onFile(file:any){
	  console.log(file)
	  this.file = file;
  }
  copyrightCheck() {
  	this.loading = true;
  	// this.api.copyrightSearch({
  	// 	keyword: this.searchValue
  	// }).subscribe((res: any) => {
  	// 	console.log(res)
  	// 	this.loading = false;
  	// 	this.copyrightList = res.result;
  	// }, (err: any) => {
  	// 	console.log(err)
  	// 	this.loading = false;
  	// })
  }

}
