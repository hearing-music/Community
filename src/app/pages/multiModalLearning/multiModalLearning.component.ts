import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { ToastrService } from 'ngx-toastr';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
@Component({
	selector: 'ngx-multiModalLearning',
	templateUrl: './multiModalLearning.component.html',
	styleUrls: ['./multiModalLearning.component.scss']
})
export class MultiModalLearningComponent implements OnInit {

	constructor(public api : ApiService, public common : CommonService, private toast : ToastrService,) { }
	async ngOnInit() {
		this.getWeekStr();
		this.getHourTime();
	}
	captchaTooltipIcon : NzFormTooltipIcon = {
		type: 'info-circle',
		theme: 'twotone'
	};
	loading = false;

	// 新歌老歌
	SongType : string = "新歌"
	// 星期
	Week : string = "星期一"
	WeekArr : any = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日",]
	// 小时时间
	HourTime : string = "00:00"
	HourTimeArr : any = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
	// 分钟时间
	MinuteTime : string = "00:00"
	MinuteTimeArr : any = []
	// 昨日播放
	EcologyPlayedYesterday : any = '';
	EcologyPlayedYesterdayErr=false;
	// 24小时雷达播放
	_24HourRadarPlayback : any = '';
	_24HourRadarPlaybackErr=false;
	// 录入歌曲小时播放
	HourlyPlayback : any = '';
	HourlyPlaybackErr=false;
	// 录入歌曲分钟播放
	ScorePlayback : any = '';
	ScorePlaybackErr=false;
	// 录入近一小时总PV搜索数
	_1HTotalPVPlayback : any = '';
	_1HTotalPVPlaybackErr=false;
	// 录入近24小时总PV搜索数
	_24HourTotalPVPlayback : any = '';
	_24HourTotalPVPlaybackErr=false;


	Data=[];
	// 预估
	TJMusicMultiModalLearning() {
		if(this._1HTotalPVPlayback==='' || !/^\d+$/.test(this._1HTotalPVPlayback)||this._24HourRadarPlayback==='' || !/^\d+$/.test(this._24HourRadarPlayback)||this._24HourTotalPVPlayback==='' || !/^\d+$/.test(this._24HourTotalPVPlayback)||this.EcologyPlayedYesterday==='' || !/^\d+$/.test(this.EcologyPlayedYesterday)||this.HourlyPlayback==='' || !/^\d+$/.test(this.HourlyPlayback)||this.ScorePlayback==='' || !/^\d+$/.test(this.ScorePlayback)){
			this.toast.info("请检查输入项");
			return
		}
		
		this.loading = true;
		this.api.TJMusicMultiModalLearning({
			"1HTotalPVPlayback": this._1HTotalPVPlayback-0,
			"24HourRadarPlayback": this._24HourRadarPlayback-0,
			"24HourTotalPVPlayback": this._24HourTotalPVPlayback-0,
			"EcologyPlayedYesterday": this.EcologyPlayedYesterday-0,
			"HourTime": this.HourTime + ":00",
			"HourlyPlayback": this.HourlyPlayback-0,
			"MinuteTime": this.MinuteTime + ":00",
			"ScorePlayback": this.ScorePlayback-0,
			"Week": this.Week,
			"SongType": this.SongType
		}).subscribe((res : any) => {
			this.loading = false;
			if (res.success) {
				res.data[0][1] = Math.ceil(res.data[0][1])
				res.data[1][1] = Math.ceil(res.data[1][1])
				res.data[2][1] = Math.ceil(res.data[2][1])
				res.data[3][1] = Math.ceil(res.data[3][1])
				res.data[4][1] = Math.ceil(res.data[4][1])
				res.data[5][1] = Math.ceil(res.data[5][1])
				res.data[6][1] = Math.ceil(res.data[6][1])
				res.data[7][1] = Math.ceil(res.data[7][1])
				this.Data = res.data;
			} 
		}, (err : any) => {
			this.loading = false;
		})
	}


	getWeekStr() {
		let week = new Date().getDay();
		switch (week) {
			case 1:
				this.Week = "星期一";
				break;
			case 2:
				this.Week = "星期二";
				break;
			case 3:
				this.Week = "星期三";
				break;
			case 4:
				this.Week = "星期四";
				break;
			case 5:
				this.Week = "星期五";
				break;
			case 6:
				this.Week = "星期六";
				break;
			case 0:
				this.Week = "星期日";
				break;
		}
	}
	getHourTime() {
		let hourTime : any = new Date().getHours();
		if (hourTime < 10) hourTime = "0" + hourTime
		this.HourTime = hourTime + ":00"
		// 设置分钟
		this.generateTimeArray(hourTime);
		
	}
	getMinuteTime(Date:any) {
		let hourTime : any = Date.getHours();
		if (hourTime < 10) hourTime = "0" + hourTime
		let minuteTime : any = Date.getMinutes();
		minuteTime = minuteTime - (minuteTime % 5);
		if (minuteTime < 10) minuteTime = "0" + minuteTime
		this.MinuteTime = hourTime + ":" + minuteTime;
	}
	
	
	generateTimeArray(hourStr:string) {
	  let timeArray = [];
	  let currentTime = new Date("2024-03-04 "+hourStr+":00:00"); // 创建一个当前时间的Date对象，但稍后我们会设置具体的时间
	 
	  for (let i = 0; i < (60 / 5); i++) {
	    let minutes = ('0' + (currentTime.getMinutes())).slice(-2); // 格式化分钟为两位数字符串
	    let timeString = currentTime.getHours().toString().padStart(2, '0') + ':' + minutes; // 构建时间字符串
	 
	    timeArray.push(timeString); // 将时间字符串添加到数组中
	 
	    // 增加五分钟
	    currentTime.setMinutes(currentTime.getMinutes() + 5);
	 
	    // 如果时间超过了59分钟，需要处理小时和分钟的进位（但在这个每隔五分钟的循环中其实不需要，因为直接加5不会超）
	    // 然而，为了代码的健壮性，这里还是保留了对小时和分钟的处理逻辑（虽然在这个特定例子中不会用到）
	    // if (currentTime.getMinutes() >= 60) {
	    //   currentTime.setHours(currentTime.getHours() + 1);
	    //   currentTime.setMinutes(0);
	    // }
	  }
	  // 设置所选小时的分数
	 this.MinuteTimeArr = timeArray;
	 // 获取当前分钟 设置分钟
	 let minutesStr = new Date().getMinutes();
	 this.getMinuteTime(new Date(`2024-03-04 ${hourStr}:${minutesStr}:00`))
	}
	ngModelChangeHour(e:any){
		let hourStr = e.replace(":00","")
		this.generateTimeArray(hourStr)
	}
}