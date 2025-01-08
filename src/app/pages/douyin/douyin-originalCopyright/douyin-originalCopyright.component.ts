import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from "../../../services/common.service";
@Component({
  selector: "ngx-douyin-originalCopyright",
  templateUrl: "./douyin-originalCopyright.component.html",
  styleUrls: ["./douyin-originalCopyright.component.scss"],
})
export class DouyinOriginalCopyrightComponent implements OnInit {
  constructor(public api: ApiService,private toast: ToastrService, public common: CommonService) {}
  ngOnInit(): void {
    this.AcousticCopyrightDisplay()
  }
  loading = false;
  result:any=[];
  lastPage = 1;
  page=1;
  pageSize=20;
  pageTotal=0;
  videoShow=false;
  videoSrc='';
  videoTitle='';
  isPlay:any=false
  audioSrc:any=''
  audioErr=false;
  
  
  openCopyright(item:any){
	  item.copyrightShow = !item.copyrightShow
  }
  playMusic(item: any) {
    this.isPlay = true;
    this.audioSrc = item.play_url;
    setTimeout(() => {
      this.result.forEach((item: any) => {
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
  reloadAudio(item:any){
  	this.loading = true;
  	this.api.getDouyinAudioForMusic_id({music_id:item.musicId})
  	.subscribe((res: any) => {
  		console.log(res)
  		item.play_url = res.result;
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
    this.result.forEach((item: any) => {
      if (item.play_url == this.audioSrc) {
        item.isplay = true;
      }
    });
  }
  pause() {
    let audio: any = document.getElementById("audio");
    audio.pause();
    this.result.forEach((item: any) => {
      item.isplay = false;
    });
  }
  openVideo(item:any){
	  this.videoTitle=item.title;
	  this.videoSrc = item.video_url;
	  this.videoShow=true;
  }
  closeVideo(){
	  this.videoShow=false;
  }
  pageChange(page:any){
	  this.lastPage = this.page;
	  this.page = page;
	  this.AcousticCopyrightDisplay()
  }
	AcousticCopyrightDisplay() {
		this.loading = true;
		this.api.AcousticCopyrightDisplay({page:this.page,pageSize:this.pageSize})
		.subscribe((res : any) => {
			console.log(res);
			this.loading = false;
			if (res.success) {
				res.data.forEach((item:any)=>{
					item.CopyrightInfo.music = item.CopyrightInfo.music || item.CopyrightInfo.humming || item.CopyrightInfo.oriFun || []
				})
				this.result = res.data;
				this.pageTotal = res.count;
			}else{
				this.page = this.lastPage;
			}
		},(err : any) => {
			console.log(err);
			this.page = this.lastPage;
			this.loading = false;
		});
	}
	openAuthorUrl(sec_uid:string){
		window.open('https://www.douyin.com/user/'+sec_uid)
	}
	openMusicUrl(musicId:string){
		window.open("https://www.douyin.com/music/"+musicId)
	}
	openVideoUrl(url:string){
		window.open(url)
	}
  
}
