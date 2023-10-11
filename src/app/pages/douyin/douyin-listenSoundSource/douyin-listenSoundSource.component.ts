import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";

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
  constructor(public api: ApiService, public common: CommonService) {}

  ngOnInit(): void {
	this.userId = localStorage.getItem("userId") || "0";
    this.username = localStorage.getItem("username");
	this.getDouyinListenSourdSource();
  }
  ngModelChange() {
    this.type = !this.type;
    this.dataSet = [];
    this.getDouyinListenSourdSource();
  }
  getDouyinListenSourdSource() {
    this.api.getDouyinListenSourdSource({ userId: this.userId, type: this.type })
      .subscribe((res: any) => {
		  let today = this.common.timeFormat(new Date().getTime())
		  let yesterday = this.common.timeFormat(new Date().getTime()-24*60*60*1000)
        for (let i = 0; i < res.result.length; i++) {
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
}
