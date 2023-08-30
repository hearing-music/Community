import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { CommonService } from "../../../../services/common.service";
@Component({
	selector: "ngx-tme-map_hot",
	templateUrl: "./tme-map_hot.component.html",
	styleUrls: ["./tme-map_hot.component.scss"],
})
export class TmeMap_hotComponent implements OnInit {
	constructor(
		public api: ApiService,
		private message: NzMessageService,
		public common: CommonService
	) { }
	@Input() tmeMapHotList: any;
	ngOnInit(): void { }
	// 打开公司
	openCompay(id: string | number) {
		window.open('https://y.qq.com/portal/company_detail.html?id=' + id + '#sort=1&type=album')
	}
	openDetail(item: any) {
		item.isMore = item.isMore ? false : true;
		this.setE(item)
		this.setE2(item)
		this.setE3(item,'qyIndex')
		this.setE4(item)
	}
	// 歌曲热度指数
	// 歌曲播放指数
	// 歌曲播放来源 qq kg  推荐 搜索 听歌识曲 排行榜  用户主页 其他
	// 歌曲互动数据 歌曲下载率 歌曲收藏率 歌曲分享率
	// 高频搜索分布

	setE(item:any) {
		let dataArr = item.query24HourRealTime.indexes.map((e: any) => e.batchTime)
		let uni = item.query24HourRealTime.indexes.map((e: any) => e.uniIndex)
		let qq = item.query24HourRealTime.qyIndexes.map((e: any) => e.uniIndex)
		let kw = item.query24HourRealTime.kwIndexes.map((e: any) => e.uniIndex)
		let kg = item.query24HourRealTime.kgIndexes.map((e: any) => e.uniIndex)
		item.lineOption1 = {
			color:['red', 'green', 'orange', 'blue'],
			title: {
				// text: '歌曲热度指数'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['平台','qq','酷我','酷狗'],
				x:'right',
				y:'top'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			// toolbox: {
			//   feature: {
			//     saveAsImage: {}
			//   }
			// },
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: dataArr
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: '平台',
					type: 'line',
					showSymbol: false,
					data: uni
				},
				{
					name: 'qq',
					type: 'line',
					showSymbol: false,
					data: qq
				},
				{
					name: '酷我',
					type: 'line',
					showSymbol: false,
					data: kw
				},
				{
					name: '酷狗',
					type: 'line',
					showSymbol: false,
					data: kg
				},

			]
		};

	}
	setE2(item:any) {
		let dataArr = item.queryTrack24HourPlayIndex.qyIncrPlayIndex.map((e: any) => e.batchTime)
		let uni = item.queryTrack24HourPlayIndex.incrPlayIndex.map((e: any) => e.playIndex)
		let qq = item.queryTrack24HourPlayIndex.qyIncrPlayIndex.map((e: any) => e.playIndex)
		let kw = item.queryTrack24HourPlayIndex.kwIncrPlayIndex.map((e: any) => e.playIndex)
		let kg = item.queryTrack24HourPlayIndex.kgIncrPlayIndex.map((e: any) => e.playIndex)
		item.lineOption2 = {
			color:['red', 'green', 'orange', 'blue'],
			title: {
				// text: '歌曲播放指数'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['平台','qq','酷我','酷狗'],
				x:'right',
				y:'top'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: dataArr
			},
			yAxis: {
				type: 'value',
				
			},
			series: [
				{
					name: '平台',
					type: 'line',
					showSymbol: false,
					data: uni
				},
				{
					name: 'qq',
					type: 'line',
					showSymbol: false,
					data: qq
				},
				{
					name: '酷我',
					type: 'line',
					showSymbol: false,
					data: kw
				},
				{
					name: '酷狗',
					type: 'line',
					showSymbol: false,
					data: kg
				},
	
			]
		};
	}
	setE3(item:any,str:any) {
		item.type = str=='kgIndex'?'kg':'qq'
		let dataArr = item.playFromPath[str].map((e: any) => e.batchTime)
		let data2Arr = item.playFromPath[str].map((e: any) => e.recommendPlayProp)//推荐
		let data3Arr = item.playFromPath[str].map((e: any) => e.searchPlayProp)//搜索
		let data4Arr = item.playFromPath[str].map((e: any) => e.listenRecognitionPlayProp)//听歌识曲
		let data5Arr = item.playFromPath[str].map((e: any) => e.chartPlayProp)//排行榜
		let data6Arr = item.playFromPath[str].map((e: any) => e.assetPlayProp)//个人主页
		let data7Arr = item.playFromPath[str].map((e: any) => e.otherPlayProp)//其他
		item.lineOption3 = {
			color:['red', 'blue', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'],
			title: {
				// text: '歌曲播放来源'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['推荐','搜索','听歌识曲','排行榜','用户主页','其他'],
				x:'right',
				y:'top'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: dataArr
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: '推荐',
					type: 'line',
					showSymbol: false,
					data: data2Arr,
				},{
					name: '搜索',
					type: 'line',
					showSymbol: false,
					data: data3Arr,
				},{
					name: '听歌识曲',
					type: 'line',
					showSymbol: false,
					data: data4Arr,
				},{
					name: '排行榜',
					type: 'line',
					showSymbol: false,
					data: data5Arr,
				},{
					name: '用户主页',
					type: 'line',
					showSymbol: false,
					data: data6Arr,
				},{
					name: '其他',
					type: 'line',
					showSymbol: false,
					data: data7Arr,
				},
	
			]
		};
	
	}
	setE4(item:any) {
		let dataArr = item.trend.collect.date;
		let collect =  item.trend.collect.song;
		let download = item.trend.download.song;
		let share = item.trend.share.song;
		item.lineOption4 = {
			color:['red', 'blue', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4'],
			title: {
				// text: '歌曲互动数据'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['歌曲下载率','歌曲收藏率','歌曲分享率'],
				x:'right',
				y:'top'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: dataArr
			},
			yAxis: {
				type: 'value',
				
			},
			series: [
				{
					name: '歌曲下载率',
					type: 'line',
					showSymbol: false,
					data: download,
				},
				{
					name: '歌曲收藏率',
					type: 'line',
					showSymbol: false,
					data: collect,
				},{
					name: '歌曲分享率',
					type: 'line',
					showSymbol: false,
					data: share,
				},
	
			]
		};
	
	}
}
