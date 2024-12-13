import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
	selector: "ngx-qishuiHotSearch",
	templateUrl: "./qishuiHotSearch.component.html",
	styleUrls: ["./qishuiHotSearch.component.scss"],
})
export class QishuiHotSearchComponent implements OnInit {
	constructor(private api : ApiService, public common : CommonService, private toast : ToastrService) { }
	ngOnInit() {
		this.reqList();
	}
	loading = false;
	selectIndex = 0;
	list : any = [];
	onSelect(item : any, i : any) {
		this.selectIndex = i;
		this.reqDetails(item)
	}
	reqList() {
		this.loading = true;
		this.api.HotSearchRecommended().subscribe((res : any) => {
			this.loading = false;
			if (res.success) {
				this.list = res.data;
				this.onSelect(this.list[0], 0)
			}
		}, (err : any) => {
			this.loading = false;
		})
	}
	reqDetails(item : any) {
		if (item.length == 3) return;
		this.loading = true;
		let track_id_arr : any = item[1].filter((e : any) => e.deeplink || e.media_id);
		track_id_arr = track_id_arr.map((e : any) => e.deeplink || e.media_id)
		
		if(track_id_arr.length==0){
			this.loading = false;
			item.push(1)
			return
		}
		
		this.api.HotSearchRecommendedAdditional({ track_id_arr }).subscribe((res : any) => {
			this.loading = false;
			if (res.success) {
				res.data.forEach((d : any) => {
					d.songTeam.lyricists = d.songTeam.lyricists || []
					d.songTeam.composers = d.songTeam.composers || []
					d.lyricistNames = d.songTeam.lyricists.map((e:any)=>e.name)
					d.singerNames = d.singer.map((e:any)=>e.name)
					d.composerNames = d.songTeam.composers.map((e:any)=>e.name)
					let i = item[1].findIndex((e : any) => e.deeplink == d.songId || e.media_id == d.songId)
					if (i != -1) {
						item[1][i].details = d;
					}
				})
				item.push(1)
				console.log(this.list)
			}
		}, (err : any) => {
			this.loading = false;
		})
	}
	isPlay = false;
	audioSrc = ""
	lyricData='';
	playSongTime=0;
	playSongInterval:any=null;
	playMusic(details : any, cIndex : any) {
		this.isPlay = true;
		this.audioSrc = details.video_list[0].backup_url;
		this.lyricData = details.lyric || "";
		let audio : any = document.getElementById('audio')
		setTimeout(() => {
			this.list.forEach((item : any, index : number) => {
				item[1].forEach((citem : any, cindex : any) => {
					if (citem.details) {
						if (cIndex == cindex && index == this.selectIndex) {
							citem.details.isPlay = !citem.details.isPlay
							if (citem.details.isPlay) {
								audio.play()
							} else {
								audio.pause()
							}
						} else {
							citem.details.isPlay = false;
						}
					}
				})
			})
		}, 50)
	}
	play(element : any) {
		this.pause();
		this.list.forEach((item : any) => {
			item[1].forEach((citem : any, cindex : any) => {
				if (citem.details) {
					if (citem.details.video_list[0].backup_url == element.srcElement.currentSrc) {
						citem.details.isPlay = true;
					}
				}
			})
		})
	}
	pause() {
		this.list.forEach((item : any) => {
			item[1].forEach((citem : any, cindex : any) => {
				if (citem.details) {
					citem.details.isPlay = false;
				}
			})
		})
		clearInterval(this.playSongInterval)
		this.playSongInterval = null;

	}
	audioError() {
		if (this.isPlay) {
			this.toast.error("播放歌曲错误")
			this.pause()
		}
	}
	timeupdate(e : any) {
		this.playSongTime = e.target.currentTime*1000-50;
		if(!this.playSongInterval){
			this.playSongTime = e.target.currentTime*1000-50;
			this.playSongInterval = setInterval(()=>{
				this.playSongTime+=50
			},50)
		}
	}
	openLink(url:string){
		window.open(url)
	}
}