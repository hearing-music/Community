import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/common.service";
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: "ngx-freeQQKG",
	templateUrl: "./freeQQKG.component.html",
	styleUrls: ["./freeQQKG.component.scss"],
})
export class FreeQQKGComponent implements OnInit {
	nextUpdataTime : number = 0;
	constructor(public common : CommonService, public api : ApiService, private router : Router,private toast: ToastrService,) { }
	ngOnInit() : void {
		this.getQq_freeSongs();
	}
	loading = false;
	pageCurrent = 1;
	pageSize = 30;
	pageTotal = 0;
	list : any = [];
	exponents: any = '全部'
	exponentsMax: any = ''
	exponentsMin: any = ''
	exponentsList: any = [{
		value: '全部'
	}, {
		value: '0'
	}, {
		value: '1-1000'
	}, {
		value: '1001-3000'
	}, {
		value: '3001-5000'
	}, {
		value: '5001-10000'
	}, {
		value: '10000以上'
	}]
	ngModelExponents(e:any){
		switch (e) {
			case '全部':
				this.exponentsMax = ''
				this.exponentsMin = ''
				break;
			case '0':
				this.exponentsMax = 0
				this.exponentsMin = 0
				break;
			case '1-1000':
				this.exponentsMax = 1000
				this.exponentsMin = 1
				break;
			case '1001-3000':
				this.exponentsMax = 3000
				this.exponentsMin = 1001
				break;
			case '3001-5000':
				this.exponentsMax = 5000
				this.exponentsMin = 3001
				break;
			case '5001-10000':
				this.exponentsMax = 10000
				this.exponentsMin = 5001
				break;
			case '10000以上':
				this.exponentsMax = 99999999
				this.exponentsMin = 10000
				break
			default:
				this.exponentsMax = ''
				this.exponentsMin = ''
				break;
		}
		this.pageCurrent = 1;
		this.getQq_freeSongs()
	}
	nzPageIndexChange(e : any) {
		this.pageCurrent = e;
		this.getQq_freeSongs();
	}
	getQq_freeSongs() {
		this.loading = true;
		this.api.FreeQQKG({page:this.pageCurrent,pageSize:this.pageSize}).subscribe((res : any) => {
			this.loading = false;
			if (res.success) {
				for(let i = 0;i<res.result.length;i++){
					res.result[i].qq.active=false;
					res.result[i].kg.active=false;
					res.result[i].un.active=false;
				}
				this.list = res.result;
				this.pageTotal = res.pageTotal;
			}
		}, (err : any) => {
			console.log(err);
			this.loading = false;
		}
		);
	}
	audioSrc : any = "";
	isPlay : any = false;
	play() {
		this.pause()
		this.list.forEach((item : any) => {
			if (item.musicUrl == this.audioSrc) {
				item.isPlay = true;
			}
		});
	}
	pause() {
		this.list.forEach((item : any) => {
			item.isPlay = false;
		});
	}
	
	unPlayAudio(item : any,i:number){
		if (item.un.audio_url) {
			this.qqPlayMusicFun(item.un,i)
		} else {
			if(!item.un.EMixSongID || item.un.EMixSongID=='0'){
				this.toast.info('暂无EMixSongID')
				return
			}
			this.loading = true;
			this.api.getKugouSongUrl({ EMixSongID: item.un.EMixSongID }).subscribe((res : any) => {
				this.loading = false;
				if (res.success) {
					item.un.audio_url = res.result[0];
					this.unPlayMusicFun(item.un,i)
				}
			}, (err : any) => {
				console.log(err);
				this.loading = false;
			})
		}
		
	}
	kgPlayAudio(item : any,i:number){
		if (item.kg.audio_url) {
			this.qqPlayMusicFun(item.kg,i)
		} else {
			if(!item.kg.EMixSongID || item.kg.EMixSongID=='0'){
				this.toast.info('暂无EMixSongID')
				return
			}
			this.loading = true;
			this.api.getKugouSongUrl({ EMixSongID: item.kg.EMixSongID }).subscribe((res : any) => {
				this.loading = false;
				if (res.success) {
					item.kg.audio_url = res.result[0];
					this.kgPlayMusicFun(item.kg,i)
				}
			}, (err : any) => {
				console.log(err);
				this.loading = false;
			})
		}
		
	}
	// qq播放歌曲
	qqPlayAudio(item : any,i:number) {
		if (item.qq.audio_url) {
			this.qqPlayMusicFun(item.qq,i)
		} else {
			this.loading = true;
			this.api.getSongMusicUrl({ mid: item.qq.mid }).subscribe((res : any) => {
				this.loading = false;
				if (res.success) {
					item.qq.audio_url = res.result
					this.qqPlayMusicFun(item.kg,i)
				}
			}, (err : any) => {
				console.log(err);
				this.loading = false;
			})
		}
	}
	qqPlayMusicFun(item : any,i:number) {
		this.isPlay=true;
		this.audioSrc = item.audio_url;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.list.forEach((listitem: any, index: number) => {
				if (index == i) {
					listitem.qq.isPlay = !listitem.qq.isPlay
					listitem.un.isPlay = false
					listitem.kg.isPlay = false
					if (listitem.qq.isPlay) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					listitem.qq.isPlay = false;
				}
			})
		}, 50)
	}
	kgPlayMusicFun(item : any,i:number) {
		this.isPlay=true;
		this.audioSrc = item.kg.audio_url;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.list.forEach((listitem: any, index: number) => {
				if (index == i) {
					listitem.kg.isPlay = !listitem.kg.isPlay
					listitem.qq.isPlay = false
					listitem.un.isPlay = false
					if (listitem.kg.isPlay) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					listitem.kg.isPlay = false;
				}
			})
		}, 50)
	}
	unPlayMusicFun(item : any,i:number) {
		this.isPlay=true;
		this.audioSrc = item.audio_url;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.list.forEach((listitem: any, index: number) => {
				if (index == i) {
					listitem.un.isPlay = !listitem.un.isPlay
					listitem.qq.isPlay = false
					listitem.kg.isPlay = false
					if (listitem.un.isPlay) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					listitem.un.isPlay = false;
				}
			})
		}, 50)
	}
  
  
  // qq 打开链接
  openSongDetail(mid : any) {
  	let url = "https://y.qq.com/n/ryqq/songDetail/" + mid + "/";
  	window.open(url);
  }
  openCompay(id : any) {
  	let url ="https://y.qq.com/portal/company_detail.html?id=" +id +"#sort=1&type=album";
  	window.open(url);
  }
  openSinger(mid : any) {
  	let url = `https://y.qq.com/n/ryqq/singer/${mid}`;
  	window.open(url);
  }
  openAlbum(mid : any) {
  	let url = `https://y.qq.com/n/ryqq/albumDetail/${mid}`;
  	window.open(url);
  }
  
  // kg打开链接
  openSongDetailKG(item:any){
	if(!item.EMixSongID || item.EMixSongID=='0'){
			this.toast.info('暂无EMixSongID')
	  }else{
		  window.open('https://www.kugou.com/song/#'+item.EMixSongID)
	  }
  }
  openSingerKG(id:any){
  	window.open(`https://www.kugou.com/singer/${id}.html`)
  }
  openAlbumKG(item:any){
	  if(!item.album_id) {
		  this.toast.info('暂无album_id')
		  return
	  }
	  window.open('http://www2.kugou.kugou.com/yueku/v8/album/single/' + item.album_id + '-0-1.html')
  }
  
  
}
