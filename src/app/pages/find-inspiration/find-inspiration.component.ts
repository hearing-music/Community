import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'ngx-find-inspiration',
  templateUrl: './find-inspiration.component.html',
  styleUrls: ['./find-inspiration.component.scss']
})
export class FindInspirationComponent implements OnInit {
  constructor(public api: ApiService, private message: NzMessageService) { }
  ngOnInit(): void {
	  this.getAudioStorage()
  }
  loading=false;
  searchValue='';
  searchHolder='请搜索视频关键字';
  myAudioList:any=[]
  videoList:any=[]
  audioNow = ''
  search(e:any){
	  this.searchValue = e;
	  this.getVideoStorage()
  }
  ngModelAudio(e:any){
	  console.log(e)
  }
  // 上传音频
  onFile(file:any){
	  console.log(file)
	  let type=''
	  if (file.type.match('audio')) {
	      type = 'mp3'
	    } else if (file.type.match('video')) {  
	      type = 'mp4'
	    } else {  
	  	  this.message.error('文件类型错误')
	  	return
	    }  
	  const audio = new Audio(URL.createObjectURL(file))
	  // 由于音频需要加载完成才能获取到正确的时长信息，因此需要监听`canplaythrough`事件，该事件表示音频已加载完毕并可以播放。在事件回调函数中进行后续操作。
	  audio.addEventListener('canplaythrough', () => {
	    const duration = parseInt(audio.duration+'') // 在音频加载完成后，通过`audio.duration`获取音频的时长
	    // 由于音频需要加载完成才能获取到正确的时长信息，因此在监听事件之前可能无法获取到时长。
	    console.log('duration----', duration)
		this.loading=true;
		this.api.synthesis_setAudioStorage({audio:file,type:type,duration}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
					this.message.success('上传成功！')
					this.loading = false;
					this.getAudioStorage()
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
		
	  })
  }
  // 获取音频
  getAudioStorage(){
	  this.loading=true;
	  this.api.getAudioStorage().subscribe((res: any) => {
			console.log(res)
			this.myAudioList = res.result;
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
  }
  // 查询视频
  getVideoStorage(){
	  this.loading=true;
	  this.api.getVideoStorage({keyword:this.searchValue}).subscribe((res: any) => {
	  			console.log(res)
	  			this.loading = false;
	  		}, (err: any) => {
	  			console.log(err)
	  			this.loading = false;
	  		})
  }
}
