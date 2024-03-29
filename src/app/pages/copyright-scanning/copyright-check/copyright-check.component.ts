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
  checkReload(copyrightItem:any){
	  this.loading = true;
	  this.api.copyrightCheck_reload({
	  	id: copyrightItem.id
	  }).subscribe((res: any) => {
	  	console.log(res)
	  	this.loading = false;
	  	let arr:any[] = [];
	  	if(res.success){
	  		res.result.forEach((item:any)=>{
	  			if(item.results){
	  				item.results = item.results.music[0]
	  				arr.push(item)
	  			}
	  		})
			if(arr.length != 0){
				this.copyrightList = arr;
			}
	  	}
	  }, (err: any) => {
	  	console.log(err)
	  	this.loading = false;
	  })
  }
  copyrightCheck() {
  	this.loading = true;
  	this.api.copyrightCheck({
  		file: this.file,
		name:this.file.name,
		type:this.file.type
  	}).subscribe((res: any) => {
  		console.log(res)
  		this.loading = false;
		let arr:any[] = [];
		if(res.success){
			res.result.forEach((item:any)=>{
				if(item.results){
					item.results = item.results.music[0]
					arr.push(item)
				}
			})
			this.copyrightList = arr;
			if(this.copyrightList.length == 0){
				res.res1.results = res.res1.results || {result:{album:{},artists:[{}],genres:[],external_metadata:{}}}
				this.copyrightList = [res.res1];
			}
		}
  	}, (err: any) => {
  		console.log(err)
  		this.loading = false;
  	})
  }

}
