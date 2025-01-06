import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
@Component({
	selector: "ngx-multiModalLearningShow",
	templateUrl: "./multiModalLearningShow.component.html",
	styleUrls: ["./multiModalLearningShow.component.scss"],
})
export class MultiModalLearningShowComponent implements OnInit {
  @Input() searchFilter: any;
  GetObservationDataArr: any = [];
  // @Output() reloadObservationDataArr: EventEmitter<any> = new EventEmitter<any>();
  // reloadObservationDataArrs(item: any) {
  //   this.reloadObservationDataArr.emit({ item: item });
  // }
	loading = false;
	params = {
		UserId: localStorage.getItem("userId") || "0",
		Limit: 10,
		Offset: 1,
		KeyWord:""
	};
	total = 0;
	constructor(public api : ApiService, public common : CommonService) { }
	async ngOnInit() {
		this.GetObservationData();
  }
  filterSearch() {
	this.params.Offset = 1;
    this.params.KeyWord = this.searchFilter;
    this.GetObservationData()
  }
  GetObservationData() {
		this.loading = true;
		this.api.GetObservationData(this.params).subscribe((res : any) => {
				this.loading = false;
				if (res.success) {
					for (let i = 0; i < res.data.res.length; i++) {
						let data = res.data.res[i];
						if(data.PlatformData.KG){
							if(data.PlatformData.KG.length==0){
								delete data.PlatformData.KG
							}
						}
						if(data.PlatformData.QQ){
							if(data.PlatformData.QQ.length==0){
								delete data.PlatformData.QQ
							}
						}
						// 歌手飙升
						if(data.PlatformData.SingerSoaring){
							data.PlatformData.SingerSoaring = this.SoaringKgSinger(data.PlatformData.SingerSoaring);
							this.setOptionIndexSingerSoaring(data.PlatformData);
						}
						if (data.PlatformData.KG && data.PlatformData.KG.length > 0) {
							data.isMore = false;
							//酷狗数据拆分
							data.PlatformData = this.splitKG(data.PlatformData);
						}
						if (data.PlatformData.QQ && data.PlatformData.QQ.length > 0) {
							data.PlatformData.QQ.forEach((item:any)=>{
								item.record = item.record || []
							})

							data.PlatformData.KG.forEach((item:any)=>{
								item.record = item.record || []
							})
							data.isMore = false;
							//QQ数据拆分
							data.PlatformData = this.splitQQ(data.PlatformData);
							this.fillMissingDates(data.PlatformData.IndexKG, data.PlatformData.IndexQQ);


							this.fillMissingDates(data.PlatformData.IndexKG, data.PlatformData.ListenKG);
							this.fillMissingDates(data.PlatformData.IndexKG, data.PlatformData.ListenQQ);
							this.fillMissingDates(data.PlatformData.IndexKG, data.PlatformData.indexRateQQ);
							this.fillMissingDates(data.PlatformData.IndexKG, data.PlatformData.indexRateKG);

							// this.fillMissingDates(data.PlatformData.ListenKG, data.PlatformData.ListenQQ);
							// this.fillMissingDates(data.PlatformData.indexRateKG, data.PlatformData.indexRateQQ);
							this.fillMissingDates(data.PlatformData.RankKG, data.PlatformData.RankQQ);
							this.fillMissingDates(data.PlatformData.RankDiffKG, data.PlatformData.RankDiffQQ);
							this.fillMissingDates(data.PlatformData.commentKG, data.PlatformData.commentQQ);
						}
						res.data.res[i] = data;
						if (data.PlatformData.KG) {
							this.setOptionIndex(res.data.res[i].PlatformData);
						}
					}
          this.GetObservationDataArr = res.data.res;
					this.total = res.data.count;
				}
			},
			(err : any) => {
				this.loading = false;
			}
		);
	}
	SoaringKgSinger(item : any) {
		const result = Object.values(
			item.reduce((acc : any, item : any) => {
				// 使用 Name 作为 key
				const key = item.Name;
				// 如果 key 不存在，则初始化
				if (!acc[key]) {
					acc[key] = { Name: key, other: [] };
				}

				// 将当前 item 放到 other 数组中
				acc[key].other.push({
					Ran: item.Ran,
					Strend: item.Strend,
					Trend: item.Trend,
					SingerId: item.SingerId,
					Href: item.Href,
					Time: item.Time,
				});

				return acc;
			}, {})
		);
		return result;
	}
	moreVersion(item : any) {
		item.isMore = item.isMore ? false : true;
	}
	changeIndex(index : any) {
		this.params.Offset = index;
		this.GetObservationData();
	}
	// 歌手飙升
	setOptionIndexSingerSoaring(data:any){
		let color = [
			"#14195d",
			"#535bc7",
			"#a9ade3",
		];
		let dateListNow = []
		let series = []
		data.SingerSoaring.forEach((item:any)=>{
			let ran = item.other.map((e:any)=>e.Ran)
			let serie = {
					type:"line",
					name:item.Name,
					data:ran,
					smooth: true,
				}
			series.push(serie)
			let date = item.other.map((e:any)=>{
				return this.common.getDate(e.Time)
			})
			dateListNow.push(...date)
		})
		dateListNow = this.removeDuplicates(dateListNow)
		data.SingerSoaringOptions = {
			color: color,
			legend: {
				show:true
			},
			tooltip: {
				confine: true,
				trigger: "axis", // 触发方式为坐标轴触发
			},
			grid: {
				left: 60,
				right: 60,
				top: 60,
				bottom: 20,
			},
			xAxis: [
				{
					type: "category",
					data: dateListNow,
					axisTick: {
						alignWithLabel: true,
					},
				},
			],
			yAxis: [
				{
					type: "value",
				},
			],
			series: series,
			height: 150,
		};
	}
	// 指数 收听 排名
	setOptionIndex(iitem : any) {
		let dateListNow = [
			...iitem.IndexKG,
			...iitem.IndexQQ,
			...iitem.ListenKG,
			...iitem.ListenQQ,
			...iitem.indexRateKG,
			...iitem.indexRateQQ,
		];

		iitem.ListenKG.forEach((item:any)=>{
			item.Time = this.common.getDate(item.Time);
		})
		iitem.ListenQQ.forEach((item:any)=>{
			item.Time = this.common.getDate(item.Time);
		})
		iitem.indexRateKG.forEach((item:any)=>{
			item.Time = this.common.getDate(item.Time);
		})
		iitem.indexRateQQ.forEach((item:any)=>{
			item.Time = this.common.getDate(item.Time);
		})

		iitem.IndexKG.forEach((item:any)=>{
			item.Time = this.common.getDate(item.Time);
		})
		iitem.IndexKG = this.quchong(iitem.IndexKG,'Time')
		iitem.IndexQQ.forEach((item:any)=>{
			item.Time = this.common.getDate(item.Time);
		})
		iitem.IndexQQ = this.quchong(iitem.IndexQQ,'Time')
		dateListNow = dateListNow.sort((a : any, b : any) => a.Time - b.Time);
		dateListNow = dateListNow.map((e : any) => e.Time);
		dateListNow = this.removeDuplicates(dateListNow);
		let dataList = iitem.IndexKG.map((e : any) => e.Index); // 酷狗指数数据
		let dataList2 = iitem.IndexQQ.map((e : any) => e.Index); // QQ指数数据
		let dataList3 = iitem.ListenKG.map((e : any) => e.Count); // 酷狗收听数据
		let dataList4 = iitem.ListenQQ.map((e : any) => e.Count); // QQ收听数据
		let dataList7 = iitem.indexRateKG.map((e : any) => e.indexRate); // 酷狗指数上涨
		let dataList8 = iitem.indexRateQQ.map((e : any) => e.indexRate); // QQ指数上涨

		let dateListNow1 = [
			...iitem.RankKG,
			...iitem.RankQQ,
			...iitem.RankDiffKG,
			...iitem.RankDiffQQ,
			...iitem.commentKG,
			...iitem.commentQQ,
		];
		dateListNow1 = dateListNow1.sort((a : any, b : any) => a.Time - b.Time);
		dateListNow1 = dateListNow1.map((e : any) => this.common.getDate(e.Time));
		dateListNow1 = this.removeDuplicates(dateListNow1);
		let dataList5 = iitem.RankKG.map((e : any) => e.Rank); // 酷狗排名
		let dataList6 = iitem.RankQQ.map((e : any) => e.Rank); // QQ排名
		let dataList9 = iitem.RankDiffKG.map((e : any) => e.rankDiff); // 酷狗排名上涨
		let dataList10 = iitem.RankDiffQQ.map((e : any) => e.rankDiff); // QQ排名上涨
		let dataList11 = iitem.commentKG.map((e : any) => e.count); // 酷狗评论
		let dataList12 = iitem.commentQQ.map((e : any) => e.count); // QQ评论

		// 补齐qq缺失的时间 比qq第1个time 小的时间 补齐
		if (iitem.IndexQQ.length > 0) {
			iitem.IndexKG.forEach((item : any) => {
				if (this.common.getDate(iitem.IndexQQ[0].Time) > this.common.getDate(item.Time)) {
					dataList2.unshift("");
				}
			});
		}
		if (iitem.RankQQ.length > 0) {
			iitem.RankKG.forEach((item : any) => {
				if (this.common.getDate(iitem.RankQQ[0].Time) > this.common.getDate(item.Time)) {
					dataList6.unshift("");
				}
			});
		}
		let color = [
			"#14195d",
			"#145d24",
			"#535bc7",
			"#28b948",
			"#a9ade3",
			"#94dca4",
		];
		let series = [
			{
				type: "line",
				name: "酷狗指数",
				data: dataList,
				smooth: true,
			},
			{
				type: "line",
				name: "QQ指数",
				data: dataList2,
				smooth: true,
			},
			{
				type: "line",
				name: "酷狗收听",
				data: dataList3,
				smooth: true,
			},
			{
				type: "line",
				name: "QQ收听",
				data: dataList4,
				smooth: true,
			},
			{
				type: "line",
				name: "酷狗指数上涨",
				data: dataList7,
				smooth: true,
			},
			{
				type: "line",
				name: "QQ指数上涨",
				data: dataList8,
				smooth: true,
			},
			{
				type: "line",
				name: "酷狗排名",
				data: dataList5,
				smooth: true,
			},
			{
				type: "line",
				name: "QQ排名",
				data: dataList6,
				smooth: true,
			},
			{
				type: "line",
				name: "酷狗排名上涨",
				data: dataList9,
				smooth: true,
			},
			{
				type: "line",
				name: "QQ排名上涨",
				data: dataList10,
				smooth: true,
			},
			{
				type: "line",
				name: "酷狗评论",
				data: dataList11,
				smooth: true,
			},
			{
				type: "line",
				name: "QQ评论",
				data: dataList12,
				smooth: true,
			},
		];
		let selected = {
			酷狗指数: true, // 默认显示
			QQ指数: true, // 默认显示
			酷狗收听: false, // 默认隐藏
			QQ收听: false, // 默认隐藏
			酷狗指数上涨: false, // 默认隐藏
			QQ指数上涨: false, // 默认隐藏
			酷狗排名: false, // 默认隐藏
			QQ排名: false, // 默认隐藏
			酷狗排名上涨: false, // 默认隐藏
			QQ排名上涨: false,
			酷狗评论: false, // 默认隐藏
			QQ评论: false,
		};
		iitem.optionsIndex = {
			color: color,
			legend: {
				selected: selected,
			},
			tooltip: {
				confine: true,
				trigger: "axis", // 触发方式为坐标轴触发
			},
			grid: {
				left: 60,
				right: 60,
				top: 60,
				bottom: 20,
			},
			xAxis: [
				{
					type: "category",
					data: dateListNow,
					axisTick: {
						alignWithLabel: true,
					},
				},
			],
			yAxis: [
				{
					type: "value",
				},
			],
			series: series,
			height: 150,
		};
		// iitem.optionsIndex1 = {
		// 	color: color,
		// 	legend: {
		// 		selected: selected1,
		// 	},
		// 	tooltip: {
		// 		confine: true,
		// 		trigger: "axis", // 触发方式为坐标轴触发
		// 	},
		// 	grid: {
		// 		left: 60,
		// 		right: 60,
		// 		top: 60,
		// 		bottom: 20,
		// 	},
		// 	xAxis: [
		// 		{
		// 			type: "category",
		// 			data: dateListNow1,
		// 			axisTick: {
		// 				alignWithLabel: true,
		// 			},
		// 		},
		// 	],
		// 	yAxis: [
		// 		{
		// 			type: "value",
		// 		},
		// 	],
		// 	series: series1,
		// 	height: 150,
		// };
	}
	quchong(tempArr:any,key:string) {
	    let result = [];
	    let obj = {};
	    for (let i = 0; i < tempArr.length; i++) {
	        if (!obj[tempArr[i][key]]) {
	            result.push(tempArr[i]);
	            obj[tempArr[i][key]] = true;
	        };
	    };
	    return result;
	}
	// 去重
	removeDuplicates(array : any) {
		const uniqueArray = [];
		for (let i = 0; i < array.length; i++) {
			if (uniqueArray.indexOf(array[i]) === -1) {
				uniqueArray.push(array[i]);
			}
		}
		return uniqueArray;
	}
	openQqSongDetail(songMid : string, e : any) {
		window.open("https://y.qq.com/n/ryqq/songDetail/" + songMid);
	}
	openKGSongDetail(KEMixSongID : string, e : any) {
		window.open("https://www.kugou.com/song/#" + KEMixSongID);
	}
	splitKG(item : any) {
		let data = item;
		data.ListenKG = [];
		data.IndexKG = [];
		data.RankKG = [];
		data.indexRateKG = [];
		data.RankDiffKG = [];
		data.commentKG = [];

		let Kg = data.KG;
		if (Kg[0].KShareExponents && Kg[0].KShareExponents.length > 0) {
			for (let j = 0; j < Kg[0].KShareExponents.length; j++) {
				data.IndexKG.push({
					Index: Kg[0].KShareExponents[j].exponent,
					Time: Kg[0].KShareExponents[j].date * 1000,
				});
			}
		}
		for (let i = 0; i < Kg.length; i++) {
			Kg[i].KExponents = Kg[i].KExponents || {}
			Kg[i].KExponents.data = Kg[i].KExponents.data||{}
			if(i>0){
				if (Kg[i].KShareExponents && Kg[i].KShareExponents.length > 0) {
					for (let j = 0; j < Kg[i].KShareExponents.length; j++) {
						data.IndexKG.push({
							Index: Kg[i].KShareExponents[j].exponent,
							Time: Kg[i].KShareExponents[j].date * 1000,
						});
					}
				}
			}

			if (Kg[i].KExponents && Kg[i].KExponents.data.exponent) {
				data.IndexKG.push({
					Index: Kg[i].KExponents.data.exponent,
					Time: new Date(Kg[i].KExponents.data.date).getTime(),
				});
				data.ListenKG.push({
					Count: Kg[i].listenPeopleCount.count || 0,
					Time: new Date(Kg[i].KExponents.data.date).getTime(),
				});
				data.RankKG.push({
					Rank: Kg[i].KExponents.data.rank || 0,
					Time: new Date(Kg[i].KExponents.data.date).getTime(),
				});
				data.indexRateKG.push({
					indexRate: Kg[i].KExponents.data.exponent_diff || 0,
					Time: new Date(Kg[i].KExponents.data.date).getTime(),
				});
				data.RankDiffKG.push({
					rankDiff: Kg[i].KExponents.data.rank_diff || 0,
					Time: new Date(Kg[i].KExponents.data.date).getTime(),
				});
				data.commentKG.push({
					count: Kg[i].comment.cnt || 0,
					Time: new Date(Kg[i].KExponents.data.date).getTime(),
				});
			}
		}
		return data;
	}
	splitQQ(item : any) {
		let data = item;
		data.ListenQQ = [];
		data.IndexQQ = [];
		data.RankQQ = [];
		data.indexRateQQ = [];
		data.RankDiffQQ = [];
		data.commentQQ = [];
		let qq = data.QQ;

		if (qq[0].QShareExponents && qq[0].QShareExponents.length > 0) {
			for (let j = 0; j < qq[0].QShareExponents.length; j++) {
				data.IndexQQ.push({
					Index: qq[0].QShareExponents[j].exponent,
					Time: qq[0].QShareExponents[j].date*1000,
				});
			}
		}
		for (let i = 0; i < qq.length; i++) {
			const date = new Date(qq[i].realtimeData.updateTime);
			const zeroHourTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 1).getTime();
			
			
			
			data.IndexQQ.push({
				Index: qq[i].realtimeData.yesterdayIndex,
				Time: zeroHourTimestamp,
			});
			data.ListenQQ.push({
				Count: qq[i].nowListenUsers.cnt,
				Time: zeroHourTimestamp,
			});
			data.RankQQ.push({
				Rank: qq[i].realtimeData.todayRank,
				Time: zeroHourTimestamp,
			});
			data.indexRateQQ.push({
				indexRate: qq[i].realtimeData.yesterdayIndex * qq[i].realtimeData.indexRate,
				Time: zeroHourTimestamp,
			});
			data.RankDiffQQ.push({
				rankDiff: qq[i].realtimeData.rankDiff,
				Time: zeroHourTimestamp,
			});
			data.commentQQ.push({
				count: qq[i].comment.count,
				Time: zeroHourTimestamp,
			});
		}
		return data;
	}
	fillMissingDates(array1 : any[], array2 : any[]) {
		const getDateString = (timestamp : number) : string => {
			const date = new Date(timestamp);
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
		};
		const dateSet1 = new Set(array1.map((item) => getDateString(item.Time)));
		const dateSet2 = new Set(array2.map((item) => getDateString(item.Time)));
		const allDates = Array.from(new Set([...dateSet1, ...dateSet2]));
		allDates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
		allDates.forEach((dateStr) => {
			const timestamp = new Date(dateStr).getTime();
			if (!dateSet1.has(dateStr)) {
				array1.push({ Time: this.common.getDate(timestamp) });
			}
			if (!dateSet2.has(dateStr)) {
				array2.push({ Time: this.common.getDate(timestamp) });
			}
		});
		array1 = array1.sort((a, b) => new Date(a.Time).getTime() - new Date(b.Time).getTime());
		array2 = array2.sort((a, b) => new Date(a.Time).getTime() - new Date(b.Time).getTime());
	}
	GetTime(params : any) {
		var date = new Date(params);  // 参数需要毫秒数，所以这里将秒数乘于 1000
		let Y = date.getFullYear() + '-';
		let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		let D = date.getDate() + ' ';
		let h = date.getHours() + ':';
		let m = date.getMinutes() + ':';
		let s = date.getSeconds();
		return Y + M + D + h + m + s;
	}
}
