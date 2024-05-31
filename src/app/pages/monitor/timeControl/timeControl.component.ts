import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
	selector: 'ngx-timeControl',
	templateUrl: './timeControl.component.html',
	styleUrls: ['./timeControl.component.scss']
})
export class TimeControlComponent implements OnInit {

	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) { }
	ngOnInit(): void {
		this.getTimed_task_lists();
		this.getqq_kugouInfoAll();
	}
	loading = false;
	tagList = [{
		name: '监测歌曲',
	},{
		name:'酷狗免费歌曲'
	},{
		name:'QQ免费歌曲'
	},{
		name:'云图'
	},{
		name:'抖音视频'
	},{
		name:'抖音达人'
	},{
		name:'抖音声源'
	}]
	selectItem = '监测歌曲';
	onSelect(item: any) {
		this.selectItem = item.name;
		if(this.selectItem=="监测歌曲"&&this.songControlList.length==0){
			this.getqq_kugouInfoAll();
		}
		if(this.selectItem=="酷狗免费歌曲"&&!this.freeSongsKGGet){
			this.freeSongsControlKG();
		}
		if(this.selectItem=="QQ免费歌曲"&&!this.freeSongsQQGet){
			this.freeSongsControlQQ();
		}
		if(this.selectItem=="云图"&&this.tme_mapList.length==0){
			this.GetMusicLimitHundred();
		}
		if(this.selectItem=="抖音视频"&&this.douyinVideoList.length==0){
			this.douyinVideoControl();
		}
		if(this.selectItem=="抖音达人"&&this.douyinDarenList.length==0){
			this.douyinDarenControl();
		}
		if(this.selectItem=="抖音声源"&&this.douyinSoundSourceList.length==0){
			this.douyinSoundSourceControl();
		}
	}
	songControlList:any = [];
	qq_kugouNowTime:any = null;
	qq_kugouEndTime:any = null;
	qq_kugouPercent = 0;
	qq_kugouTotal = 0;
	// 监测歌曲
	getqq_kugouInfoAll(){
		this.loading = true;
		this.api.getqq_kugouInfoAll().subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if(res.success){
				this.songControlList = res.result;
				this.qq_kugouTotal = res.total;
				this.getTimeQK();
				this.computeQK();
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	getTimeQK(){
		// 取当天0点时间戳
		this.qq_kugouNowTime = new Date(this.common.getDate(new Date().getTime())+" 00:00:00").getTime();
		this.qq_kugouEndTime = this.qq_kugouNowTime + 24 * 60 * 60 * 1000;
	}
	computeQK(){
		let isFinishedCount = 0;
		let listCount = this.songControlList.length;
		this.songControlList.forEach((item:any)=>{
			if(item.kgTime>this.qq_kugouNowTime&&item.kgTime<this.qq_kugouEndTime&&item.qqTime>this.qq_kugouNowTime&&item.qqTime<this.qq_kugouEndTime){
				isFinishedCount+=1;
			}else{
				console.log(item)
			}
		})
		this.qq_kugouPercent = parseInt(isFinishedCount/listCount*100+"")
	}
	
	
	
	timed_task_lists:any=[]
	// 获取监控定时描述
	getTimed_task_lists(){
		this.api.getTimed_task_lists().subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.timed_task_lists = res.result;
			}
		}, (err: any) => {
			console.log(err)
		})
	}
	freeSongsKGPercent:any = 0;
	freeSongsKGGet:any = false;
	freeSongsKGTotal = 0;
	// 酷狗免费歌曲更新 进度
	freeSongsControlKG(){
		this.loading = true;
		this.api.freeSongsControlKG().subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.freeSongsKGGet = true;
				this.freeSongsKGPercent = res.result;
				this.freeSongsKGTotal = res.total;
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	
	
	
	freeSongsQQPercent:any = 0;
	freeSongsQQGet:any = false;
	freeSongsQQTotal = 0;
	// qq免费歌曲更新 进度
	freeSongsControlQQ(){
		this.loading = true;
		this.api.freeSongsControlQQ().subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.freeSongsQQGet = true;
				this.freeSongsQQPercent = res.result;
				this.freeSongsQQTotal = res.total;
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	
	tme_mapPercent:any=0;
	tme_mapList:any=[];
	tme_mapTotal:any=0;
	// 云图
	GetMusicLimitHundred(){
		this.loading = true;
		this.api.GetMusicLimitHundred2().subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.tme_mapList = res.result;
				this.tme_mapTotal = res.result.length;
				this.tme_mapCompute();
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	tme_mapCompute(){
		// 取当天10, 13, 17, 22点时间戳
		let timeNow = new Date().getTime();
		let time10 = new Date(this.common.getDate(timeNow)+" 10:00:00").getTime();
		let time13 = new Date(this.common.getDate(timeNow)+" 13:00:00").getTime();
		let time17 = new Date(this.common.getDate(timeNow)+" 17:00:00").getTime();
		let time22 = new Date(this.common.getDate(timeNow)+" 22:00:00").getTime();
		let isFinishedCount = 0;
		let listCount = this.tme_mapList.length;
		if(timeNow>=time10&&timeNow<time13){
			this.tme_mapList.forEach((item:any)=>{
				if(item.updateTime>=time10){
					isFinishedCount+=1;
				}
			})
		}
		if(timeNow>=time13&&timeNow<time17){
			this.tme_mapList.forEach((item:any)=>{
				if(item.updateTime>=time13){
					isFinishedCount+=1;
				}
			})
		}
		if(timeNow>=time17&&timeNow<time22){
			this.tme_mapList.forEach((item:any)=>{
				if(item.updateTime>=time17){
					isFinishedCount+=1;
				}
			})
		}
		if(timeNow>=time22){
			this.tme_mapList.forEach((item:any)=>{
				if(item.updateTime>=time22){
					isFinishedCount+=1;
				}
			})
		}
		this.tme_mapPercent = parseInt(isFinishedCount/listCount*100+"")
		
	}
	
	
	douyinSoundSourceList:any=[];
	douyinSoundSourceTotal = 0;
	douyinSoundSourcePercent = 0;
	// 抖音声源
	douyinSoundSourceControl(){
		this.loading = true;
		this.api.douyinSoundSourceControl().subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.douyinSoundSourceList = res.result;
				this.douyinSoundSourceTotal = res.total;
				this.douyinSoundSourceCompute();
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	douyinSoundSourceCompute(){
		let year = new Date().getFullYear();
		let month = new Date().getMonth()+1;
		let date = new Date().getDate();
		let hour = new Date().getHours();
		let time = new Date(year+'-'+month+'-'+date+' '+hour+":00:00").getTime();
		let isFinishedCount = 0;
		let listCount = this.douyinSoundSourceList.length;
		this.douyinSoundSourceList.forEach((item:any)=>{
			if(item.time >= time){
				isFinishedCount+=1;
			}
		})
		this.douyinSoundSourcePercent = parseInt(isFinishedCount/listCount*100+"")
	}
	
	
	
	douyinVideoList:any= [];
	douyinVideoTotal = 0;
	douyinVideoPercent = 0;
	// 抖音监控视频进度
	douyinVideoControl(){
		this.loading = true;
		this.api.douyinVideoControl().subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.douyinVideoList = res.result;
				this.douyinVideoTotal = res.total;
				this.douyinVideoCompute();
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	douyinVideoCompute(){
		let year = new Date().getFullYear();
		let month = new Date().getMonth()+1;
		let date = new Date().getDate();
		let time = new Date(year+'-'+month+'-'+date+" 00:00:00").getTime();
		let isFinishedCount = 0;
		let listCount = this.douyinSoundSourceList.length;
		this.douyinSoundSourceList.forEach((item:any)=>{
			if(item.updateTime >= time){
				isFinishedCount+=1;
			}
		})
		this.douyinVideoPercent = parseInt(isFinishedCount/listCount*100+"")
	}
	
	
	// 抖音达人
	douyinDarenTotal=0;
	douyinDarenPercent = 0;
	douyinDarenList:any = [];
	douyinDarenControl(){
		this.loading = true;
		this.api.douyinDarenControl().subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.douyinDarenList = res.result;
				this.douyinDarenTotal = res.total;
				this.douyinDarenCompute();
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	douyinDarenCompute(){
		let year = new Date().getFullYear();
		let month = new Date().getMonth()+1;
		let date = new Date().getDate();
		let time = new Date(year+'-'+month+'-'+date+" 00:00:00").getTime();
		let isFinishedCount = 0;
		let listCount = this.douyinDarenList.length;
		this.douyinDarenList.forEach((item:any)=>{
			if(item.updateTime >= time){
				isFinishedCount+=1;
			}
		})
		this.douyinDarenPercent = parseInt(isFinishedCount/listCount*100+"")
	}
}
