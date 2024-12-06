import { Component, Input, OnInit,EventEmitter,Output } from "@angular/core";
import { CommonService } from "../../../../services/common.service";
import { ApiService } from "../../../../services/api.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: "ngx-mv-kg",
	templateUrl: "./mv-kg.component.html",
	styleUrls: ["./mv-kg.component.scss"],
})
export class MvKgComponent implements OnInit {
	constructor(public common : CommonService, public api : ApiService, private router : Router,private toast: ToastrService,) { }
	ngOnInit() : void {
		
	}
	@Input() data:any=null;
	@Input() item:any=null;
	@Output() getKgSong: EventEmitter<any> = new EventEmitter<any>();
	loading=false;
	isVisible = false;
	audioSrc=""
	isPlay=false;
	enterData : any = {}
	reqData : any = {
		"Mid": "",
		"SongName": "",
		"Releases": "",
		"SingerName": [],
		"LyricsAuthorName": [],
		"SongAuthorName": [],
		"ReleaseDate": 0,
		"PlatformName": "KG"
	}
	LyricsAuthorName:any=''
	SongAuthorName:any=''
	ReleaseDate:any=''
  
	onDateChange(e:any){
	}
	enter() {
		this.reqData = {
			"Mid": "",
			"SongName": "",
			"Releases": "",
			"SingerName": [],
			"LyricsAuthorName": [],
			"SongAuthorName": [],
			"ReleaseDate": 0,
			"PlatformName": "KG"
		}
		this.reqData.Mid = this.data.id;
		let enterData = this.data;
		let singerNames:any = ''
		enterData.authors.forEach((item : any) => {
			singerNames += item.singername + ','
		})
		singerNames = singerNames.substr(0, singerNames.length - 1)
		enterData.singerNames = singerNames;
		this.reqData.SingerName = singerNames.split(',')
		this.enterData = enterData;
		this.isVisible = true;
	}
	handleOk() {
		if(!this.ReleaseDate || !this.reqData.SongName){
			this.toast.info("歌曲名字和发行时间必填")
			return
		}
		this.reqData.LyricsAuthorName = this.LyricsAuthorName.replaceAll("，",",")
		this.reqData.LyricsAuthorName = this.reqData.LyricsAuthorName.split(',');
		this.reqData.SongAuthorName = this.SongAuthorName.replaceAll("，",",");
		this.reqData.SongAuthorName = this.reqData.SongAuthorName.split(',');
		this.reqData.ReleaseDate = new Date(this.ReleaseDate).setHours(0, 0, 0, 0);
		this.loading = true;
		this.api.EnterMvInfo(this.reqData).subscribe((res:any)=>{
			this.loading = false;
			if(res.success){
				this.toast.success("录入成功")
				this.LyricsAuthorName='';
				this.SongAuthorName='';
				this.ReleaseDate='';
				this.reqData = {
					"Mid": "",
					"SongName": "",
					"Releases": "",
					"SingerName": [],
					"LyricsAuthorName": [],
					"SongAuthorName": [],
					"ReleaseDate": 0,
					"PlatformName": "KG"
				}
				this.isVisible = false;
			}
		},(err:any)=>{
			this.loading = false;
		})
	
	}
	handleCancel() {
		this.isVisible = false;
	}
  
  
  
  
	getKgSongEmit(){
		this.getKgSong.emit();
	}
  
	openMv(id:string){
		window.open("https://www.kugou.com/mv/"+id+"/")
	}
	openSongDetail(EMixSongID: string) {
		window.open('https://www.kugou.com/song/#'+EMixSongID)
	}
	openExponentLink(item: any) {
		window.open('https://h5.kugou.com/achievement/v-a34ccad0/index.html?audio_id=' + item.scid + '&hash=' + item.FileHash + '&mixsongid=' + item.MixSongID)
	}
	openAlbum(item: any) {
		if(!item.albumID) return
		window.open('http://www2.kugou.kugou.com/yueku/v8/album/single/' + item.albumID + '-0-1.html')
	}
	goToSeeSinger(url: any) {
		window.open(url)
	}
	goSingerHome(id:any){
		window.open(`https://www.kugou.com/singer/${id}.html`)
	}
	
	
	
	
	
	
	// 播放kg音乐
	playkg() {
		if (this.item.musicUrl) {
			this.kgPlay();
		} else {
			this.getKugouSongUrl2();
		}
	}
	getKugouSongUrl2() {
		this.loading = true;
		this.api.getKugouSongUrl({ EMixSongID: this.item.EMixSongID }).subscribe(
			(res : any) => {
				if (res.success) {
					this.item.musicUrl = res.result[0];
					this.kgPlay();
				}
				this.loading = false;
			},
			(err : any) => {
				console.log(err);
				this.loading = false;
			}
		);
	}
	kgPlay() {
		this.isPlay = true;
		this.audioSrc = this.item.musicUrl;
		let audio : any = document.getElementById("audio");
		setTimeout(() => {
			this.item.isPlay = !this.item.isPlay;
			if (this.item.isPlay) {
				audio.play();
			} else {
				audio.pause();
			}
		}, 50);
	}
	
	play(element : any) {
		this.pause();
		this.item.isPlay = true;
	}
	pause() {
		this.item.isPlay = false;
	}
	
	copy(FileHash:string){
		this.common.copy(FileHash)
	}
	copyScid(scid: string | number) {
		this.common.copy(scid + '')
	}
	// 获取歌词
	getLyric(item: any) {
		this.api.getKugouLyric({
			hash: item.FileHash,
		}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				item.lyricText = res.result || '无'
				item.lyricData2 = this.common.parseLRC3(item.lyricText)
				item.lyricReadly = true;
			}
		}, (err: any) => {
			console.log(err)
		})
	
	}
	mouseenter(item: any) {
		item.lyricShow = true;
		if (item.lyricText) {
			item.lyricData2 = this.common.parseLRC3(item.lyricText)
			item.lyricReadly = true;
		} else {
			item.lyricReadly = false;
			this.getLyric(item)
		}
	}
	mouseleave(item: any) {
		item.lyricShow = false;
	}
	refreshListenPeopleNum(item: any) {
		this.api.getV3ListenPeopleNum({
			mixsongid: item,
		}).subscribe((res: any) => {
			if (res.success) {
				item.listenPeopleCount = res.result.listenPeopleCount
				item.listenPeopleArr = res.result.listenPeopleArr
			}
		}, (err: any) => {
			console.log(err)
		})
	}
	refreshSingingPeopleNum(item: any) {
		this.api.getV3SingingPeople({
			songname: this.common.deleteEM(item),
		}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				item.singingPeople = res.result.singingPeople
			}
		}, (err: any) => {
			console.log(err)
		})
	}
}
