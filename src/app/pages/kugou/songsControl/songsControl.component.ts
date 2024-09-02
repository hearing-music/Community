import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'ngx-songsControl',
	templateUrl: './songsControl.component.html',
	styleUrls: ['./songsControl.component.scss']
})
export class SongsControlComponent implements OnInit {
	constructor(public common : CommonService, public api : ApiService, private toast: ToastrService,) { }

	ngOnInit() : void {
		// this.DevTipListWeChatMini()
		this.isAdmin = this.common.checkAdmin()
		this.switch = !this.isAdmin;
		this.SurveillanceSongsInfo()
	}
	loading = false;
	switch = false;
	isAdmin = false;
	list = [];
	data = [];
	selectIndex = 0;
	type = '';
	// tableWidth = '0px';
	audioSrc = '';
	isPlay = false;
	listenData=[];
	mouseenter(arr:any){
		this.listenData = arr;
	}
	onSelect(item : any, index : number) {
		this.selectIndex = index;
		this.data = item[1];
	}
	ngModelChange(e : any) {
		this.switch = e;
		this.SurveillanceSongsInfo()
	}


	openAlbum(item : any) {
		if (!item.AlbumID) return
		window.open('http://www2.kugou.kugou.com/yueku/v8/album/single/' + item.AlbumID + '-0-1.html')
	}
	moreVersion(item : any) {
		if (item.IndexKG.length == 0) {
			this.toast.info("暂无数据")
			return
		};
		item.isMore = item.isMore ? false : true;
		// this.getWidth();
	}
	// getWidth(){
	// 	var item1 = document.querySelector("#list-item0");
	// 	var item1_w = window.getComputedStyle(item1).getPropertyValue("width");
	// 	this.tableWidth = item1_w;
	// }
	openSongDetail(EMixSongID : string) {
		window.open('https://www.kugou.com/song/#' + EMixSongID)
	}
	playAudio(item : any, i : number) {
		if (item.AudioUrl) {
			this.playAudioFun({ src: item.AudioUrl, i })
		} else {
			this.getKugouSongUrl(item, i)
		}
	}
	playAudioFun(params : any) {
		this.isPlay = true;
		let { src, i } = params;
		this.audioSrc = src;
		let audio : any = document.getElementById('audio')
		setTimeout(() => {
			this.list[this.selectIndex][1].forEach((item : any, index : number) => {
				if (index == i) {
					item.isPlay = !item.isPlay
					if (item.isPlay) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					item.isPlay = false;
				}
			})
		}, 50)
	}
	play(element : any) {
		this.pause();
		this.list.forEach((item : any) => {
			var i = item[1].findIndex((e : any) => e.AudioUrl == element.srcElement.currentSrc)
			if (i !== -1) {
				item[1][i].isPlay = true;
			}
		})
	}
	pause() {
		this.list.forEach((item : any) => {
			item[1].forEach((iitem : any) => {
				iitem.isPlay = false;
			})
		})

	}
	audioError(ele : any) {
		if (this.isPlay) {
			this.toast.error("播放歌曲错误")
			for (let i = 0; i < this.list.length; i++) {
				let item = this.list[i];
				let index = item[1].findIndex((e : any) => e.AudioUrl == ele.srcElement.currentSrc)
				item[1][index].isPlay = false;
				this.getKugouSongUrl(item[1][index], index)
				break;
			}
		}
	}
	getKugouSongUrl(item : any, i : number) {
		this.loading = true;
		this.api.getKugouSongUrl({ EMixSongID: item.EMixSongID }).subscribe((res : any) => {
			console.log(res)
			if (res.success) {
				item.AudioUrl = res.result[0];
				this.playAudio(item, i)
			}
			this.loading = false;
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}



	SurveillanceSongsInfo() {
		this.loading = true;
		this.api.kgSurveillanceSongsInfo({ isAll: !this.switch }).subscribe((res : any) => {
			console.log(res)
			this.loading = false;
			if (res.success) {
				this.type = res.message;
				this.selectIndex = 0;
				if (res.message != '查看全部') {
					res.data = [['', res.data]]
				}
				if (res.data.length > 0) {
					res.data.forEach((item : any) => {
						item[1].forEach((iitem : any) => {
							let singerNames = ''
							iitem.Singer.forEach((citem : any) => {
								singerNames += citem.author_name
							})
							iitem.singerNames = singerNames
							// 添加 截至到今日没有的日期
							iitem.IndexKG = this.computedIndex(iitem.Index.KG);
							if(iitem.Index.QQ.length>0){
								iitem.IndexQQ = this.quchong(iitem.Index.QQ,'Time');
							}else{
								iitem.IndexQQ = iitem.Index.QQ
							}
							// 将评论按指数时间 对上
							iitem.CountKG = this.computedCount(iitem.Count.KG, iitem.IndexKG);
							// 将listen分组 一天为一组
							iitem.ListenKG = this.computedListen(iitem.Listen.KG, iitem.IndexKG);
							this.setOptionIndex(iitem)
							this.setOptionListen(iitem)
						})
					})
					this.data = res.data[0][1];
				}
				this.list = res.data;
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}
	// 将listen分组 一天为一组
	computedListen(listenArr : any, IndexArr : any) {
		let newListenArr = []
		for (let i = 0; i < IndexArr.length; i++) {
			let time = IndexArr[i].Time - 0;
			let year = new Date(time).getFullYear();
			let month = new Date(time).getMonth() + 1;
			let day = new Date(time).getDate();
			let startTime = new Date(year + '/' + month + '/' + day + " 00:00:00").getTime();
			let endTime = startTime + 24 * 60 * 60 * 1000;
			let arr = listenArr.filter((e : any) => e.Time >= startTime && e.Time < endTime)
			newListenArr.push(arr)
		}
		return newListenArr
	}
	// 将评论按指数时间 对上
	computedCount(CountArr : any, IndexArr : any) {
		let newCountArr = []
		for (let i = 0; i < IndexArr.length; i++) {
			let time = IndexArr[i].Time-0;
			let year = new Date(time).getFullYear();
			let month = new Date(time).getMonth() + 1;
			let day = new Date(time).getDate();
			let startTime = new Date(year + '/' + month + '/' + day + " 00:00:00").getTime();
			let endTime = startTime + 24 * 60 * 60 * 1000;
			let arr = CountArr.filter((e : any) => e.Time >= startTime && e.Time < endTime)
			if (arr.length > 0) {
				newCountArr.push(arr[0])
			} else {
				newCountArr.push({})
			}
		}
		return newCountArr
	}
	// 添加 截至到今日没有的日期 + 去重
	computedIndex(IndexArr : any) {
		let IndexArrNow = JSON.parse(JSON.stringify(IndexArr));
		IndexArrNow = this.quchong(IndexArrNow,'Time')
		let time = IndexArrNow[IndexArrNow.length - 1].Time - 0;
		let year = new Date(time).getFullYear();
		let month = new Date(time).getMonth() + 1;
		let day = new Date(time).getDate();
		let startTime = new Date(year + '/' + month + '/' + day + " 00:00:00").getTime();

		let yearToday = new Date().getFullYear();
		let monthToday = new Date().getMonth() + 1;
		let dayToday = new Date().getDate();
		let startTimeToday = new Date(yearToday + '/' + monthToday + '/' + dayToday + " 00:00:00").getTime();
		let needAddCount = (startTimeToday - startTime) / (24 * 60 * 60 * 1000);
		for (let i = 0; i < needAddCount; i++) {
			IndexArrNow.push({ Time: startTime + (i + 1) * (24 * 60 * 60 * 1000), Index: "" })
		}
		return IndexArrNow
	}
	// 去重
	removeDuplicates(array:any) {  
	    const uniqueArray = [];  
	    for (let i = 0; i < array.length; i++) {  
	        if (uniqueArray.indexOf(array[i]) === -1) {  
	            uniqueArray.push(array[i]);  
	        }  
	    }  
	    return uniqueArray;  
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
	// 指数 qq 酷狗
	setOptionIndex(iitem:any){
		let dateListNow = [...iitem.IndexKG,...iitem.IndexQQ];
		dateListNow = dateListNow.sort((a:any,b:any)=>a.Time-b.Time)
		dateListNow = dateListNow.map((e:any)=>this.common.getDate(e.Time))
		dateListNow = this.removeDuplicates(dateListNow);
		let dataList = iitem.IndexKG.map((e : any) => e.Index);// 酷狗指数数据
		let dataList2 = iitem.IndexQQ.map((e : any) => e.Index);// QQ指数数据
		// 补齐qq缺失的时间 比qq第1个time 小的时间 补齐
		if(iitem.IndexQQ.length>0){
			iitem.IndexKG.forEach((item:any)=>{
				if(this.common.getDate(iitem.IndexQQ[0].Time) > this.common.getDate(item.Time)){
					dataList2.unshift("")
				}
			})
			// let lengthCount = parseInt((iitem.IndexQQ[0].Time - iitem.IndexKG[0].Time) / (60*60*24*1000)+"")
			// for(let i = 0;i<lengthCount;i++){
			// 	dataList2.unshift("")
			// }
		}
		let color = ['#00A9FF', '#31c27c']
		iitem.optionsIndex = {
			color: color,
			legend: {},
			tooltip: {
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
					type: 'category',
					data: dateListNow,
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value',
				}
			],
			series: [
				{
					type: "line",
					name: '酷狗指数',
					data: dataList,
					smooth: true
				},
				{
					type: "line",
					name: 'QQ指数',
					data: dataList2,
					smooth: true
				},
			],
			height: 150
		};
	}
	// 收听 qq 酷狗
	setOptionListen(iitem : any) {
		let dateListNow = [...iitem.Listen.KG,...iitem.Listen.QQ];
		dateListNow = dateListNow.sort((a:any,b:any)=>a.Time-b.Time)
		dateListNow = dateListNow.map((e:any)=>this.common.getTime(e.Time))
		dateListNow = this.removeDuplicates(dateListNow);
		let dataList = iitem.Listen.KG.map((e : any) => e.Count);// 酷狗收听数据
		let dataList2 = iitem.Listen.QQ.map((e : any) => e.Count);// QQ收听数据
		// 补齐qq缺失的时间
		if(iitem.Listen.QQ.length>0){
			iitem.Listen.KG.forEach((item:any)=>{
				if(this.common.getTime(iitem.Listen.QQ[0].Time) > this.common.getTime(item.Time)){
				// let i = iitem.Listen.QQ.findIndex((e:any)=>this.common.getTime(e.Time) == this.common.getTime(item.Time))
				// if(i==-1){
					dataList2.unshift("")
				}
			})
			// let lengthCount = parseInt((iitem.Listen.QQ[0].Time - iitem.Listen.KG[0].Time) / (60*60*1000)+"")
			// for(let i = 0;i<lengthCount;i++){
			// 	dataList2.unshift("")
			// }
		}
		
		let color = ['#00A9FF', '#31c27c']
		iitem.optionsListen = {
			color: color,
			legend: {},
			tooltip: {
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
					type: 'category',
					data: dateListNow,
					axisTick: {
						alignWithLabel: true
					}
				},
			],
			yAxis: [
				{
					type: 'value',
					
				}
			],
			series: [
				{
					type: "line",
					name: '酷狗收听',
					data: dataList,
					smooth: true
				},
				{
					type: "line",
					name: 'QQ收听',
					data: dataList2,
					smooth: true
				},
			],
			height: 150
		};
	}

}