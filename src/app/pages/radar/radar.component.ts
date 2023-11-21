import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import { differenceInCalendarDays } from 'date-fns';
@Component({
	selector: 'ngx-radar',
	templateUrl: './radar.component.html',
	styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {
	listOfData: any = [];
	loading = false
	constructor(public api: ApiService, public common: CommonService, public message: NzMessageService) { }
	async ngOnInit() {
		this.time = new Date().getTime()
		this.date = new Date()
		let timeList = await this.getRadarTime()
		this.timeList = timeList;
		
		this.tabsActive = 3
		this.getRadarList("热搜飙升榜", this.time, this.pageCurrent)
	}
	// 不可选择日期
	today: any = new Date()
	start: any = new Date('2023/05/06')
	disabledDate = (current: Date): boolean =>
		differenceInCalendarDays(current, this.today) > 0 || differenceInCalendarDays(current, this.start) < 0
	// 平台
	tabsActive: any = '';
	tabs: any = [{ desc: '抖音', value: 1 }, { desc: "网易云", value: 2 }, { desc: "热搜", value: 3 }]
	ngModelChange(e: any) {
		if (e === 1) {
			this.nowList = this.douyinList;
		} else {
			this.nowList = [];
		}
		this.pageCurrent = 1
		this.tabsActive = e;
		this.isGetDate()
	}
	// 日期
	date = null;
	time: any = null;
	onChange(result: Date): void {
		this.pageCurrent = 1
		this.time = new Date(result).getTime()
		this.isGetDate()
	}
	//榜单
	
	listActive: any = '';
	nowList: any = [];
	douyinList: any = [{ desc: '飙升榜', value: 1 }, { desc: '热歌榜', value: 2 }]
	ngModelChange2(e: any) {
		this.pageCurrent = 1
		this.listActive = e;
		this.isGetDate()
	}
	timeId:any='';
	timeList:any=[]
	// 时间段
	ngModelChange3(e:any){
		this.timeId = e;
		this.isGetDate()
		
	}
	getRadarList(platform: string, time: number, page: number) {
		this.loading = true
		this.api.getRadarList({ platform: platform, time: time, page: page,timeId:this.timeId }).subscribe((res: any) => {
			this.listOfData = res.result
			this.loading = false
			this.pageTotal = res.pageTotal
			console.log(res)
		})
	}
	isGetDate() {
		if (this.tabsActive == 1 && this.time && this.listActive) {
			if (this.listActive == 1) {
				this.getRadarList("抖音飙升榜", this.time, this.pageCurrent)
			} else {
				this.getRadarList("抖音热歌榜", this.time, this.pageCurrent)
			}
		} else if (this.tabsActive == 2 && this.time) {
			this.getRadarList("网易云飙升榜", this.time, this.pageCurrent)

		} else if (this.tabsActive == 3 && this.time) {
			this.getRadarList("热搜飙升榜", this.time, this.pageCurrent)
		}
	}
	pageCurrent = 1
	pageSize = 20
	pageTotal = 0
	nzPageIndexChange(e: any) {
		this.pageCurrent = e;
		this.isGetDate()
	}
	
	getRadarTime(){
		return new Promise((resolve)=>{
			this.api.getRadarTime().subscribe((res: any) => {
				// 设置初始默认时间
				this.setTimes(res.result)
				resolve(res.result)
			})
		})
	}
	setTimes(timeArr:any){
		let hour:any = new Date(this.time).getHours()
		if(hour<10) hour = '0'+hour;
		hour =  hour+':00';
		for(let i =timeArr.length-1;i>=0;i--){
			if(parseInt(timeArr[i].record) <= parseInt(hour)){
				this.timeId = timeArr[i].ID
				break;
			}
		}
	}
}
