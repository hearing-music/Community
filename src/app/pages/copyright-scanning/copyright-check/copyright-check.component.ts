import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-copyright-check',
  templateUrl: './copyright-check.component.html',
  styleUrls: ['./copyright-check.component.scss']
})
export class CopyrightCheckComponent implements OnInit {

  constructor(public api: ApiService,public common: CommonService) { }
  
  ngOnInit(): void {
  }
  file:any = {};
  copyrightList:any[] = [];
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
	  this.copyrightCheck()
  }
  copyrightCheck() {
  	this.loading = true;
  	this.api.copyrightCheck({
  		file: this.file,
		name:this.file.name
  	}).subscribe((res: any) => {
  		console.log(res)
  		this.loading = false;
		let arr:any[] = [];
		if(res.success){
			res.result.forEach((item:any)=>{
				if(item.results){
					arr.push(item)
				}
			})
			this.copyrightList = arr;
			if(this.copyrightList.length == 0){
				this.copyrightList = [res.res1];
			}
		}
  	}, (err: any) => {
  		console.log(err)
  		this.loading = false;
  	})
  }

}
