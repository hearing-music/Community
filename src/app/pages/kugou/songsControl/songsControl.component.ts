import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
	selector: 'ngx-songsControl',
	templateUrl: './songsControl.component.html',
	styleUrls: ['./songsControl.component.scss']
})
export class SongsControlComponent implements OnInit {
	constructor(public common : CommonService, public api : ApiService, public message : NzMessageService) { }

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
	data=[];
	selectIndex = 0;
	type='';
	// tableWidth = '0px';
	audioSrc = '';
	isPlay=false;
	onSelect(item:any,index:number){
		this.selectIndex = index;
		this.data = item[1];
	}
	ngModelChange(e: any) {
		this.switch = e;
		this.SurveillanceSongsInfo()
	}
	
	
	openAlbum(item: any) {
		if(!item.AlbumID) return
		window.open('http://www2.kugou.kugou.com/yueku/v8/album/single/' + item.AlbumID + '-0-1.html')
	}
	moreVersion(item:any){
		if(item.IndexKG.length==0) {
			this.message.info("暂无数据")
			return
		};
		item.isMore = item.isMore?false:true;
		// this.getWidth();
	}
	// getWidth(){
	// 	var item1 = document.querySelector("#list-item0");
	// 	var item1_w = window.getComputedStyle(item1).getPropertyValue("width");
	// 	this.tableWidth = item1_w;
	// }
	openSongDetail(EMixSongID: string) {
		window.open('https://www.kugou.com/song/#'+EMixSongID)
	}
	playAudio(item: any, i: number) {
		if(item.AudioUrl){
			this.playAudioFun({src:item.AudioUrl,i})
		}else{
			this.getKugouSongUrl(item,i)
		}
	}
	playAudioFun(params:any){
		this.isPlay =true;
		let { src, i } = params;
		this.audioSrc = src;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.list[this.selectIndex][1].forEach((item:any,index:number)=>{
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
	play(element: any) {
		this.pause();
		this.list.forEach((item:any)=>{
			var i = item[1].findIndex((e: any) => e.AudioUrl == element.srcElement.currentSrc)
			if (i !== -1) {
				item[1][i].isPlay = true;
			}
		})
	}
	pause() {
		this.list.forEach((item:any)=>{
			item[1].forEach((iitem:any)=>{
				iitem.isPlay = false;
			})
		})
		
	}
	audioError(ele:any){
		if(this.isPlay){
			this.message.error("播放歌曲错误")
			for(let i = 0;i<this.list.length;i++){
				let item = this.list[i];
				let index = item[1].findIndex((e:any)=>e.AudioUrl == ele.srcElement.currentSrc)
				item[1][index].isPlay = false;
				this.getKugouSongUrl(item[1][index],index)
				break;
			}
		}
	}
	getKugouSongUrl(item:any,i:number){
		this.loading = true;
		this.api.getKugouSongUrl({EMixSongID:item.EMixSongID}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				item.AudioUrl = res.result[0];
				this.playAudio(item,i)
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	
	
	SurveillanceSongsInfo() {
		this.loading = true;
		this.api.kgSurveillanceSongsInfo({isAll:!this.switch}).subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			if(res.success){
				this.type = res.message;
				this.selectIndex = 0;
				if(res.message!='查看全部'){
					res.data = [['',res.data]]
				}
				if(res.data.length>0){
					res.data.forEach((item:any)=>{
						item[1].forEach((iitem:any)=>{
							let singerNames=''
							iitem.Singer.forEach((citem)=>{
								singerNames+=citem.author_name
							})
							iitem.singerNames = singerNames
							iitem.IndexKG = iitem.Index.KG;
							iitem.IndexQQ = iitem.Index.QQ;
							this.setOption(iitem)
						})
					})
					this.data = res.data[0][1];
				}
				this.list = res.data;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	setOption(iitem:any){
		let dateList = iitem.IndexKG.map((e:any)=>this.common.getTime(e.Time));
		let dataList = iitem.IndexKG.map((e:any)=>e.Index);
		let dataList2 = iitem.IndexQQ.map((e:any)=>e.Index);
				iitem.options = {
				visualMap: [
					{
						show: false, // 是否显示该可视化映射
						type: "continuous", // 可视化映射类型（连续色彩渐变）
						seriesIndex: 0, // 与第一个系列关联
						min: 0, // 颜色映射的最小值
						max: 400, // 颜色映射的最大值
					},
				],
				tooltip: {
					trigger: "axis", // 触发方式为坐标轴触发
				},
				grid: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0,
				},
				xAxis: [
					{
						data: dateList, // x 轴数据
						show: false, // 隐藏第一个 x 轴
					},
				],
				yAxis: [
					{
						show: false, // 隐藏第一个 y 轴
					},
				],
				series: [
					{
						type: "line", // 系列类型为折线图
						showSymbol: false, // 不显示数据点标志
						data: dataList, // 系列的数据
						lineStyle: {  
							color: 'blue' // 设置折线颜色为红色，你可以根据需要更改这个颜色  
						},
					},
					{
						type: "line", // 系列类型为折线图
						showSymbol: false, // 不显示数据点标志
						data: dataList2, // 系列的数据
						lineStyle: {
							color: 'green', // 设置折线颜色为红色，你可以根据需要更改这个颜色  
						},
					},
				],
				height:150
			};
		}
	
}