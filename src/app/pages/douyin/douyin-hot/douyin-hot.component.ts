import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ngx-douyin-hot',
  templateUrl: './douyin-hot.component.html',
  styleUrls: ['./douyin-hot.component.scss']
})
export class DouyinHotComponent implements OnInit {
 word_list:any[] = [];//热点
 trending_list:any[] = [];//实时热点
 tagList = ['热点','实时热点']
 activeTag = '热点';
 loading=false;
 
 searchValue='';
 // https://v.douyin.com/h6Ds2dW/
 searchHolder = '请输入链接';
 videoData:any = {}
  constructor(public api: ApiService,public common: CommonService,private toast: ToastrService,) {
  }

  ngOnInit(): void {
		this.getDouyinHot()
  }
  downloadUrl(downloadUrl:string,name:string){
	 // downloadUrl = downloadUrl.replace('https','http')
  	this.common.download(downloadUrl,name,false)
  }
  downloadUrlVideo(downloadUrl:string){
	  window.open(downloadUrl,'_blank')
  }
  changeTag(name:string){
	  this.activeTag = name;
  }
  search(value:any){
	  console.log(value)
	  let start = value.indexOf('.com/')
	  if(start === -1){
		  this.toast.error('链接错误')
		  return
	  }
	  let end = value.indexOf('/',start+5)
	  value = value.slice(start+5,end+1)
	  this.searchValue = 'https://v.douyin.com/'+value;
	  this.getDouyinVideo()
  }
  getDouyinVideo(){
	  this.loading = true;
	  this.api.getDouyinVideo({
		  keyword:this.searchValue
	  }).subscribe((res: any) => {
	  	console.log(res)
	  	this.loading = false;
		if(res.success){
			this.videoData = res.result
			// if(res.result.res2.code != -1){
			// 	this.videoData = [res.result.res1,res.result.res2]
			// }else{
			// 	this.toast.error('链接错误')
			// }
		}
	  }, (err: any) => {
	  	console.log(err)
	  	this.loading = false;
	  })
  }
	getDouyinHot(){
		this.loading = true;
		this.api.getDouyinHot()
		.subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			this.trending_list = res.result.data.trending_list
			this.word_list = res.result.data.word_list
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
