import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-copyright-link',
  templateUrl: './copyright-link.component.html',
  styleUrls: ['./copyright-link.component.scss']
})
export class CopyrightLinkComponent implements OnInit {

  constructor(public api: ApiService,public common: CommonService) { }
  
  ngOnInit(): void {
  }
  searchValue = '';
  searchHolder = '搜索链接';
  copyrightList:any[] = [];
  pageSize = 20;
  pageCurrent = 1;
  pageTotal = 20;
  loading = false;
  
  search(value: string) {
  	console.log(value)
  	this.searchValue = value;
  	this.copyrightSearchLink()
  }
  nzPageIndexChange(e: string | number) {
  	console.log(e)
  }
  copyrightSearchLink() {
  	this.loading = true;
  	this.api.copyrightSearchLink({
  		keyword: this.searchValue
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
