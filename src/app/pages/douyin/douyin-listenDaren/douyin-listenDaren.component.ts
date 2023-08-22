import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
import { NzMessageService  } from 'ng-zorro-antd/message';
@Component({
  selector: 'ngx-douyin-listenDaren',
  templateUrl: './douyin-listenDaren.component.html',
  styleUrls: ['./douyin-listenDaren.component.scss']
})
export class DouyinListenDarenComponent implements OnInit {
constructor(public api: ApiService,public common: CommonService,private message: NzMessageService,private  changeDetectorRef:ChangeDetectorRef) {
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
		if(res.success){
			res.result.forEach((item:any)=>{
				item.homeUrl='https://www.douyin.com/user/'+item.SecUid
				item.expand = false;
			})
			this.list=res.result;
			this.pageTotal=res.total;
		}
	  	this.loading = false;
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
	
	tableshow=true;
	isVisible=false;
	editItem:any = {}
	sexList:any=[{value:'男',label:'男'},{value:'女',label:'女'}]
	popUpEdit(item:any){
		this.editItem = {...item};
		this.isVisible=true;
	}
	// 点击录入
	handleOk(): void {
		let {dy_Monitoring_ID,dy_BloggerInfo_ID,Sex,Information,Home,Type,Style,Characteristics,Vocals,Split,Original,OriginalShare,Fees,Note,SecUid}=this.editItem;
		this.loading = true;
		this.api.douyin_listenDarenEdit({dy_Monitoring_ID,dy_BloggerInfo_ID,Sex,Information,Home,Type,Style,Characteristics,Vocals,Split,Original,OriginalShare,Fees,Note,SecUid}).subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			if(res.success){
				this.message.success('修改成功')
				let index = this.list.findIndex((e:any)=>e.dy_BloggerInfo_ID==this.editItem.dy_BloggerInfo_ID);
				this.list[index] = {...this.editItem}
				this.tableshow =false;
				setTimeout(()=>{
					this.tableshow=true;
				},1)
				this.isVisible = false;
			}
			this.editItem={}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
			this.message.error('修改失败')
			this.editItem={}
		})
	}
	// 点击取消
	handleCancel(): void {
		this.isVisible = false;
	}
}
