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
	pageSize = 50;
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
		this.api.FreeQQKG().subscribe((res : any) => {
			this.loading = false;
			if (res.success) {
				let list = []
				for(let i = 0;i<res.result.Un.length;i++){
					list.push({
						qq:res.result.Qq[i],
						kg:res.result.Kg[i],
						un:res.result.Un[i],
					})
					list[i].active=false;
				}
				this.list = list;
				console.log(this.list);
				// this.pageTotal = res.pageTotal;
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
		if (item.audio_url) {
			this.qqPlayMusicFun(item,i)
		} else {
			if(!item.EMixSongID || item.EMixSongID=='0'){
				this.toast.info('暂无EMixSongID')
				return
			}
			this.loading = true;
			this.api.getKugouSongUrl({ EMixSongID: item.EMixSongID }).subscribe((res : any) => {
				this.loading = false;
				if (res.success) {
					item.audio_url = res.result[0];
					this.unPlayMusicFun(item,i)
				}
			}, (err : any) => {
				console.log(err);
				this.loading = false;
			})
		}
		
	}
	kgPlayAudio(item : any,i:number){
		if (item.audio_url) {
			this.qqPlayMusicFun(item,i)
		} else {
			if(!item.EMixSongID || item.EMixSongID=='0'){
				this.toast.info('暂无EMixSongID')
				return
			}
			this.loading = true;
			this.api.getKugouSongUrl({ EMixSongID: item.EMixSongID }).subscribe((res : any) => {
				this.loading = false;
				if (res.success) {
					item.audio_url = res.result[0];
					this.kgPlayMusicFun(item,i)
				}
			}, (err : any) => {
				console.log(err);
				this.loading = false;
			})
		}
		
	}
	// qq播放歌曲
	qqPlayAudio(item : any,i:number) {
		if (item.audio_url) {
			this.qqPlayMusicFun(item,i)
		} else {
			this.loading = true;
			this.api.getSongMusicUrl({ mid: item.mid }).subscribe((res : any) => {
				this.loading = false;
				if (res.success) {
					item.audio_url = res.result
					this.qqPlayMusicFun(item,i)
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
		this.audioSrc = item.audio_url;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.list.forEach((listitem: any, index: number) => {
				if (index == i) {
					listitem.kg.isPlay = !listitem.kg.isPlay
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
