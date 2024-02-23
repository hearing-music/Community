import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
import { environment } from '../../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'ngx-segmentation',
  templateUrl: './segmentation.component.html',
  styleUrls: ['./segmentation.component.scss']
})
export class SegmentationComponent implements OnInit {
  constructor(public api: ApiService,public common: CommonService,public message:NzMessageService) { }
  ngOnInit(): void {
  }
 
	file:any = '';
	loading=false;
	host = environment.downloadUrl2;
	downloadName = ''
	downloadUrl = ''
	downloadUrl2 = ''
	//下载zip 直接a链接 不然 这个方法是 先下载完 在出来下载按钮
	download(){
		window.open(this.downloadUrl)
	}
	download2(){
		window.open(this.downloadUrl2)
	}
	onFile(file:any): void{
		console.log(file)
		// console.log(this.host)
		this.file = file;
		this.Segmentation()
	}
	onFile2(file:any): void{
		console.log(file)
		// console.log(this.host)
		this.file = file;
		this.Segmentation2()
	}
	Segmentation(): void {
		this.loading = true;
		this.api.musicSegmentation({
			file: this.file,
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
				res.result = res.result.replace('/usr/local/openresty/nginx/www/audioTools/','')
				this.downloadUrl = this.host + res.result;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	Segmentation2(): void {
		this.loading = true;
		this.api.musicSegmentationNew({
			file: this.file,
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
				res.result = res.result.replace('/usr/local/openresty/nginx/www/audioTools/','')
				this.downloadUrl2 = this.host + res.result;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
