import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "ngx-douyin-listenSoundSource",
  templateUrl: "./douyin-listenSoundSource.component.html",
  styleUrls: ["./douyin-listenSoundSource.component.scss"],
})
export class DouyinListenSoundSourceComponent implements OnInit {
  total = 0;
  type = true;
  dataSet = [];
  username = "";
  userId:any='0'
  index = [];
	highUserList:any=[];
  constructor(public api: ApiService, public common: CommonService,private toast: ToastrService,) {}

  ngOnInit(): void {
	this.userId = localStorage.getItem("userId") || "0";
    this.username = localStorage.getItem("username");
		let highUserList = localStorage.getItem('highUserList') == 'undefined' ? false : localStorage.getItem('highUserList')
		this.highUserList = highUserList || ['1', '2', '3', '4', '5', '8', '11', '13', '17', '26', '34']
	this.getDouyinListenSourdSource();
  }
  ngModelChange() {
    this.type = !this.type;
    this.dataSet = [];
    this.getDouyinListenSourdSource();
  }
  updateItem:any = {};
  isVisible = false;
  isOkLoading = false;
  newOriginalVoice = ""
  handleOk(){
	  this.isOkLoading = true;
	  this.updateDouyinListenSourdSourceName()
  }
  handleCancel(){
	  this.isVisible = false;
  }
  openModel(item:any){
	  this.updateItem = item;
	  this.isVisible = true;
  }
  originalVoiceData = []
  mouseenterOriginalVoice(data:any){
	  this.originalVoiceData = data.originalVoice;
  }
  // 修改最新声源名字
  updateDouyinListenSourdSourceName(){
	  this.api.updateDouyinListenSourdSourceName({ID:this.updateItem.ID,originalVoice:this.newOriginalVoice}).subscribe((res: any) => {
		if(res.success){
			this.toast.success(res.message)
			this.isVisible = false;
			this.isOkLoading = false;
			this.updateItem.originalVoice.push(this.updateItem.originalVoiceName)
			this.updateItem.originalVoiceName = this.newOriginalVoice;
			this.newOriginalVoice = '';
			this.updateItem = {}
		}
      });
  }
  
  
  loading:any=false;
  getDouyinListenSourdSource() {
	  this.loading=true;
    this.api.getDouyinListenSourdSource({ userId: this.userId, type: this.type })
      .subscribe((res: any) => {
		  this.loading=false;
		  let today = this.common.timeFormat(new Date().getTime())
		  let yesterday = this.common.timeFormat(new Date().getTime()-24*60*60*1000)
        for (let i = 0; i < res.result.length; i++) {
			// 最新声源名称
			res.result[i].originalVoiceName = res.result[i].originalVoice[res.result[i].originalVoice.length-1]
			
			res.result[i].originalVoice.splice(res.result[i].originalVoice.length-1,1)
		 let data:any = res.result[i].utilisation.data || []
		 for(let j = data.length-1;j>=0;j--){
			let now = this.common.timeFormat(data[j].GetTime*1000)
			if(now == today){
				res.result[i].todayCount = data[j].UserCount
				break
			}
		 }
		 for(let j = data.length-1;j>=0;j--){
		 	let now = this.common.timeFormat(data[j].GetTime*1000)
		 	if(now == yesterday){
		 		res.result[i].yesterdayCount = data[j].UserCount
		 		break
		 	}
		 }
		 if(data.length==0){
			 let now = this.common.timeFormat(res.result[i].utilisation.GetTime*1000)
			 if(now == today){
				 res.result[i].todayCount = res.result[i].utilisation.UserCount
			 }
			 if(yesterday == now){
				 res.result[i].yesterdayCount = res.result[i].utilisation.UserCount
			 }
		 }
		 // res.result[i].utilisation.data = res.result[i].utilisation.data.reverse()
        }
		console.log(res.result)
        this.dataSet = res.result;
        this.total = res.result.length;
      });
  }
  mouseenter(item: any) {
    item.show = true;
  }
  mouseleave(item: any) {
    item.show = false;
  }
  isPlay:any=false
  audioSrc:any=''
  playMusic(item: any) {
    this.isPlay = true;
    this.audioSrc = item.originalSound;
    setTimeout(() => {
      this.dataSet.forEach((item: any) => {
        item.isplay = false;
      });
      item.isplay = true;
      this.play();
    }, 50);
  }
  pauseMusic(item: any) {
    this.pause();
  }
  error(e:any){
  	if(this.audioSrc){
  		this.audioErr = true;
  	}
  }
  audioErr=false;
  reloadAudio(item:any){
  	this.loading = true;
  	this.api.getDouyinAudioForMusic_id({music_id:item.music_id})
  	.subscribe((res: any) => {
  		console.log(res)
  		item.originalSound = res.result;
  		this.audioSrc = res.result;
  		this.audioErr = false;
  		this.loading = false;
  		this.play()
  		setTimeout(()=>{
  			let audio: any = document.getElementById('audio')
  			audio.play()
  		},2000)
  	}, (err: any) => {
  		console.log(err)
  		this.loading = false;
  	})
  }
  play() {
    let audio: any = document.getElementById("audio");
    audio.play();
    this.dataSet.forEach((item: any) => {
      if (item.originalSound == this.audioSrc) {
        item.isplay = true;
      }
    });
  }
  pause() {
    let audio: any = document.getElementById("audio");
    audio.pause();
    this.dataSet.forEach((item: any) => {
      item.isplay = false;
    });
  }
  getMusicInfo(item:any){
	  this.loading=true;
	  this.api.getMusicInfo({secUid:item.secUid,arr:[item.music_id]}).subscribe((res: any) => {
		  this.loading=false;
		 console.log(res)
		 if(res.success){
			 item.todayCount =res.result[0].user_count
		 }
      },(err:any)=>{
		  this.loading=false;
	  });
  }
}
