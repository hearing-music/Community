import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
import { NzMessageService  } from 'ng-zorro-antd/message';
@Component({
  selector: 'ngx-douyin-listenDaren',
  templateUrl: './douyin-listenDaren.component.html',
  styleUrls: ['./douyin-listenDaren.component.scss']
})
export class DouyinListenDarenComponent implements OnInit {
constructor(public api: ApiService,public common: CommonService,private message: NzMessageService) {
  }
  ngOnInit(): void {
	  this.userId = localStorage.getItem('userId') || '0'
	  this.douyin_getListenDaren()
  }
  userId='0'
  loading=false;
  searchValue:any=''
  searchHolder:any = '请搜索抖音达人名字'
  list:any=[]
  
  page=1;
  pageSize=10;
  pageTotal = 0;
  search(e:any){
	  this.searchValue = e;
	  this.page = 1;
	  this.douyin_getListenDaren()
  }
  type=true;
  // 开关切换
  ngModelChange(){
	  this.type = !this.type
	  this.page = 1;
	  this.douyin_getListenDaren()
  }
  douyin_getListenDaren(){
	  this.loading = true;
	  this.api.douyin_getListenDaren({page:this.page,keyword:this.searchValue,type:this.type?'我的':'全部'})
	  .subscribe((res: any) => {
	  	console.log(res)
		res.result.forEach((item:any)=>{
			item.homeUrl='https://www.douyin.com/user/'+item.SecUid
			item.expand = false;
		})
	  	this.loading = false;
		this.list=res.result;
		this.pageTotal=res.total;
	  }, (err: any) => {
	  	console.log(err)
	  	this.loading = false;
	  })
  }
  nzPageIndexChange(e:any){
	  this.page = e;
	  this.douyin_getListenDaren()
  }
	goHomeUrl(url:string){
		window.open(url)
	}
	
}