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
		this.todayTIME = new Date().getFullYear() + ' ' + new Date().getMonth() + ' ' +new Date().getDate()
		// this.DevTipListWeChatMini()
		this.isAdmin = this.common.checkAdmin()
		this.userId = localStorage.getItem('userId')
		this.switch = !this.isAdmin;
		this.getSurvillanceSongsTag()
	}
	userId='0';
	loading = false;
	switch = false;
	isAdmin = false;
	list = [];
	data = [[],[]];
	selectIndex = 0;
	selectIndex2 = 0;
	type = '';
	// tableWidth = '0px';
	audioSrc = '';
	isPlay = false;
	listenData=[];
	todayTIME = '';
	
	tagList:any=[];
	page=1;
	pageSize=30;
	pageTotal=0;
	
	
	mouseenter(arr:any){
		this.listenData = arr;
	}
	onSelect(item : any, index : number) {
		this.selectIndex = index;
		this.page = 1;
		this.selectIndex2=0
		this.SurveillanceSongsInfo(item.ID,this.page,this.pageSize)
	}
	onSelect2(index:any){
		this.selectIndex2 = index;
		this.page = 1;
		this.SurveillanceSongsInfo(this.tagList[this.selectIndex].ID,this.page,this.pageSize)
	}
	// ngModelChange(e : any) {
	// 	this.switch = e;
	// 	this.SurveillanceSongsInfo()
	// }


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
	// 获取标签
	getSurvillanceSongsTag(){
		this.api.getSurvillanceSongsTag().subscribe((res : any) => {
			this.loading = false;
			if (res.success) {
				this.tagList = res.result;
				this.SurveillanceSongsInfo(res.result[0].ID,this.page,this.pageSize)
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
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

	// 按人名分组
	songsInfoGroup(data:any){
		data = data || []
		const groupedByA = data.reduce((acc:any, obj:any) => {
		  // 如果 acc 中还没有该 key，则初始化为一个空数组
		  if (!acc[obj.username]) {
		    acc[obj.username] = [];
		  }
		  // 将对象添加到对应的 key 数组中
		  acc[obj.username].push(obj);
		  return acc;
		}, {});
		let values:any = Object.values(groupedByA)
		let keys = Object.keys(groupedByA)
		let newData = []
		for(let i = 0;i<keys.length;i++){
			// 监控中
			let newValue = values[i].filter((e:any)=>e.State.data[0] == 0)
			// 未监控
			let newValue2 = values[i].filter((e:any)=>e.State.data[0] == 1)
			// 签约
			let newValue3 = values[i].filter((e:any)=>e.State.data[0] == 1&&e.Contract==true)
			newData.push([keys[i],[newValue,newValue2,newValue3],[1,1,1]])
		}
		return newData
	}
	// 全部分组
	songsInfoGroupAll(data:any){
		data = data || []
		const groupedByA = data.reduce((acc:any, obj:any) => {
		  // 如果 acc 中还没有该 key，则初始化为一个空数组
		  if (!acc[obj.username]) {
		    acc[obj.username] = [];
		  }
		  // 将对象添加到对应的 key 数组中
		  acc[obj.username].push(obj);
		  return acc;
		}, {});
		let values:any = Object.values(groupedByA)
		let keys = Object.keys(groupedByA)
		// 监控中
		let data1 = data.filter((e:any)=>e.State.data[0] == 0)
		// 未监控
		let data2 = data.filter((e:any)=>e.State.data[0] == 1)
		// 签约
		let data3 = data.filter((e:any)=>e.State.data[0] == 1&&e.Contract==true)
		let newData = [['全部',[data1,data2,data3],[1,1,1]]]
		for(let i = 0;i<keys.length;i++){
			// 监控中
			let newValue = values[i].filter((e:any)=>e.State.data[0] == 0)
			// 未监控
			let newValue2 = values[i].filter((e:any)=>e.State.data[0] == 1)
			// 签约
			let newValue3 = values[i].filter((e:any)=>e.State.data[0] == 1&&e.Contract==true)
			newData.push([keys[i],[newValue,newValue2,newValue3],[1,1,1]])
		}
		return newData
	}
	SurveillanceSongsInfo(ID:any,page:any,pageSize:any) {
		let Contract = false;
		let State = false;
		if(this.selectIndex2==1 || this.selectIndex2 == 2){
			State=true
		}
		if(this.selectIndex2==2){
			Contract=true
		}
		this.loading = true;
		// ID=0 = 全部
		this.api.kgSurveillanceSongsInfo({ ID,page,pageSize,Contract,State }).subscribe((res : any) => {
			this.loading = false;
			if (res.success) {
				
				if (res.data.length > 0) {
					res.data.forEach((iitem : any) => {
						let singerNames = ''
						iitem.Singer.forEach((citem : any) => {
							singerNames += citem.author_name
						})
						iitem.singerNames = singerNames
						// 添加 截至到今日没有的日期
						iitem.IndexKG = this.computedIndex(iitem.Index.KG);
						if(iitem.Index.QQ.length>0){
							iitem.IndexQQ = this.quchong(iitem.Index.QQ,'Time');
							iitem.IndexQQ = this.computedIndexQQ(iitem.IndexQQ);
						}else{
							iitem.IndexQQ = iitem.Index.QQ
						}
						// 将评论按指数时间 对上
						iitem.CountKG = this.computedCount(iitem.Count.KG, iitem.IndexKG);
						// 将listen分组 一天为一组
						iitem.ListenKG = this.computedListen(iitem.Listen.KG, iitem.IndexKG);
						this.setOptionIndex(iitem)
						this.setOptionListen(iitem)
						iitem.TIME = new Date(iitem.AddDate-0).getFullYear() + ' ' + new Date(iitem.AddDate-0).getMonth() + ' ' +new Date(iitem.AddDate-0).getDate()
					})
				}
				this.list = res.data;
				this.pageTotal = res.pageTotal;
				console.log(this.list)
			}
		}, (err : any) => {
			console.log(err)
			this.loading = false;
		})
	}
	cancel(){}
	// 取消监控 + 是否签约
	cancelMonitor(obj:any,contract:any){
		this.loading = true;
		this.api.SurveillanceSongsInfoCancel({ID:obj.ID,contract}).subscribe((res:any)=>{
			this.loading = false;
			if(res.success){
				let i = this.list.findIndex((e:any)=>e.ID == obj.ID)
					if(i!=-1){
						this.list.splice(i,1);
					}
				if(contract){
					this.toast.success('签约成功')
				}else{
					this.toast.success('取消成功')
				}
				
			}
		},(err:any)=>{
			this.loading = false;
		})
	}
	PageNext(page:any){
		this.page = page;
		this.SurveillanceSongsInfo(this.tagList[this.selectIndex].ID,this.page,this.pageSize)
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
	// 添加中间没录入的日期
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
		// 统计中间没有的时间
		let IArr = []
		for(let i = 0;i<IndexArrNow.length;i++){
			if(i+1>=IndexArrNow.length) break;
			if((IndexArrNow[i].Time - 0) + (1*24*60*60*1000) != (IndexArrNow[i+1].Time - 0)){
				IArr.push({i:i+1,value:{
					Time: (IndexArrNow[i].Time - 0) + (1*24*60*60*1000), Index: ""
				}})
			}
		}
		for(let i = 0;i<IArr.length;i++){
			IndexArrNow.splice(IArr[i].i+i,0,IArr[i].value)
		}
		return IndexArrNow
	}
	// 添加中间没录入的日期 qq
	computedIndexQQ(IndexArr : any) {
		let IndexArrNow = JSON.parse(JSON.stringify(IndexArr));
		// 统计中间没有的时间
		let IArr = []
		for(let i = 0;i<IndexArrNow.length;i++){
			if(i+1>=IndexArrNow.length) break;
			if((IndexArrNow[i].Time - 0) + (1*24*60*60*1000) != (IndexArrNow[i+1].Time - 0)){
				IArr.push({i:i+1,value:{
					Time: (IndexArrNow[i].Time - 0) + (1*24*60*60*1000), Index: ""
				}})
			}
		}
		for(let i = 0;i<IArr.length;i++){
			IndexArrNow.splice(IArr[i].i+i,0,IArr[i].value)
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