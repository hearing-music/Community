import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-fufu-search',
  templateUrl: './fufu-search.component.html',
  styleUrls: ['./fufu-search.component.scss']
})
export class FufuSearchComponent implements OnInit {
  constructor(public api: ApiService, private message: NzMessageService,public common: CommonService,) { }
  fufuleidaList: any = []
loading=false
searchValue=''
pageSize=10;
pageTotal=0;
page=1;
  ngOnInit(): void {
    
  }
  search(value: string) {
  	console.log(value)
  	this.searchValue = value;
	this.page = 1;
	this.getfufuleidaQuerySongs()
  }
  nzPageIndexChange(e:any){
  	  this.page = e;
  	  this.getfufuleidaQuerySongs()
  }
  getfufuleidaQuerySongs() {
  	  this.loading = true;
    this.api.getfufuleidaQuerySongs({keyword:this.searchValue,page:this.page}).subscribe((res: any) => {
      this.fufuleidaList = res.data
  			this.pageTotal = res.total
      console.log(res)
  	  this.loading = false;
    }, (err: any) => {
  			console.log(err)
  			this.loading = false;
  		})
  }
}
