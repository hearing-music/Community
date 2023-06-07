import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'ngx-track-separate',
  templateUrl: './track-separate.component.html',
  styleUrls: ['./track-separate.component.scss']
})
export class TrackSeparateComponent implements OnInit {
  constructor(public api: ApiService,public common: CommonService) { }
	@ViewChild('drums') drums:any;
	@ViewChild('other')	other:any;
	@ViewChild('vocals') vocals:any;
	@ViewChild('piano') piano:any;
	@ViewChild('bass') bass:any;
  ngOnInit(): void {
  }
  // 页面卸载 删除文件
  ngOnDestroy():void{
	  console.log('卸载')
	  if(this.downloadName){
		  this.api.removeFile({
		  		 filename:this.downloadName
		  }).subscribe((res: any) => {
		  			console.log(res)
		  		}, (err: any) => {
		  			console.log(err)
		  		})
	  }
  }
	file:any = '';
	loading=false;
	downloadZip = ''
	host = environment.downloadUrl;
	downloadName = ''
	downloadUrl = ''
	isPlay = false;
	// 是否压缩
	compress=false;
	// ccc(){
	// 	// this.api.ccc()
	// 	this.common.download('http://139.224.133.131:3223/music/YJTS.mp3','YJTS.mp3')
	// }
	//下载zip 直接a链接 不然 这个方法是 先下载完 在出来下载按钮
	download(){
		this.common.downloadServer(this.downloadZip)
	}
	// 一起播放
	allPlay(){
		this.isPlay = !this.isPlay;
		if(this.isPlay){
			this.drums.playForce()
			this.other.playForce()
			this.vocals.playForce()
			this.piano.playForce()
			this.bass.playForce()
		}else{
			this.drums.pauseForce()
			this.other.pauseForce()
			this.vocals.pauseForce()
			this.piano.pauseForce()
			this.bass.pauseForce()
		}
	}
	onFile(file:any): void{
		console.log(file)
		// console.log(this.host)
		this.file = file;
		this.trackSeparate()
	}
	trackSeparate(): void {
		this.loading = true;
		this.api.trackSeparate({
			file: this.file,
			compress:this.compress
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if(res.success){
				this.downloadUrl = this.host + res.result.url;
				this.downloadName = res.result.name;
				this.downloadZip = this.downloadUrl + this.downloadName + '.zip';
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
