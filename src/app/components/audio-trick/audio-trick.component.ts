import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../services/common.service";
@Component({
  selector: 'ngx-audio-trick',
  templateUrl: './audio-trick.component.html',
  styleUrls: ['./audio-trick.component.scss']
})
export class AudioTrickComponent implements OnInit {
  @Input("url") url: string = ""
  @Input("nameCn") nameCn: string = ""
  @Input("nameEn") nameEn: string = ""
  @Input("folderName") folderName: string = ""
  constructor(public common: CommonService) { }
	value1=10;
	disable1=false;
	
	value2=10;
	disable2=true;
	
	
	stopCurrentTime=false;
	// 总时长
	duration = 0;
	// 当前播放时间
	currentTime = 0;
	// 是否播放
	isPlay = false;
	// 是否静音
	isMute = false;
	// 音量大小 (除以100)
	volume = 100;
	// 隐藏显示音量调节
	volumeShow =false;
  ngOnInit(): void {
  }
  // 下载音频
  download(downloadUrl:string){
  	this.common.download(downloadUrl,this.folderName)
  }
  // 播放进度调节
  currentTimeChange(e:any){
	  this.stopCurrentTime = false;
  	let audio: any = document.getElementById(this.nameEn)
  	this.currentTime = parseInt(e);
  	audio.currentTime = this.currentTime
  }
  // 当调节播放进度条时 禁止修改currentTime
  currentTimeStop(){
	  this.stopCurrentTime = true;
  }
  // 音量调节
  volumeChange(e:any){
	  let audio: any = document.getElementById(this.nameEn)
	  this.volume = e;
	  audio.volume = this.volume/100
  }
  // 音量调节显示 隐藏
  volumemouseenter(){
	  this.volumeShow = true;
  }
  volumemouseleave(){
	  this.volumeShow = false;
  }
  // 音乐开始加载
	  loadstart(e:any){
		this.currentTime = parseInt(e.srcElement.currentTime);
		setTimeout(()=>{
			this.duration = parseInt(e.srcElement.duration);
		},100)
		
	  }
	// 静音按钮
	muteMusic(){
		this.isMute = !this.isMute;
		let audio: any = document.getElementById(this.nameEn)
		audio.muted = this.isMute;
	}
	playForce(){
		let audio: any = document.getElementById(this.nameEn)
		audio.play()
		this.isPlay = true;
	}
	pauseForce(){
		let audio: any = document.getElementById(this.nameEn)
		audio.pause()
		this.isPlay = false;
	}
	// 播放按钮
	playMusic(){
		let audio: any = document.getElementById(this.nameEn)
		if(!this.isPlay){
			audio.play()
		}else{
			audio.pause()
		}
		this.isPlay = !this.isPlay;
	}
	play(){
	}
	pause(){
		
	}
	// 进度变化
	timeupdate(e:any){
		if(!this.stopCurrentTime){
			this.currentTime = parseInt(e.srcElement.currentTime);
			this.duration = parseInt(e.srcElement.duration);
		}
	}
	
	
	
	
}
