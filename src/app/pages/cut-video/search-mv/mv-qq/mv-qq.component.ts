import { Component, Input, OnInit } from "@angular/core";
import { CommonService } from "../../../../services/common.service";
import { ApiService } from "../../../../services/api.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: "ngx-mv-qq",
	templateUrl: "./mv-qq.component.html",
	styleUrls: ["./mv-qq.component.scss"],
})
export class MvQqComponent implements OnInit {
	constructor(public common : CommonService, public api : ApiService, private router : Router, private toast : ToastrService,) { }
	ngOnInit() : void {

	}
	@Input() data : any = null;
	loading = false;
	isVisible = false;

	enterData : any = {}
	reqData : any = {
		"Mid": "",
		"SongName": "",
		"Releases": "",
		"SingerName": [],
		"LyricsAuthorName": [],
		"SongAuthorName": [],
		"ReleaseDate": 0,
		"PlatformName": "QQ"
	}
	LyricsAuthorName:any=''
	SongAuthorName:any=''
	ReleaseDate:any=''
	openSinger(mid : string) {
		window.open("https://y.qq.com/n/ryqq/singer/" + mid)
	}
	openMv(mid : string) {
		window.open("https://y.qq.com/n/ryqq/mv/" + mid)
	}
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
			"PlatformName": "QQ"
		}
		this.reqData.Mid = this.data.mid;
		let enterData = this.data;
		let singerNames:any = ''
		enterData.singers.forEach((item : any) => {
			singerNames += item.name + ','
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
					"PlatformName": "QQ"
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
}