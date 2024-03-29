import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
	selector: 'ngx-enlightenment',
	templateUrl: './enlightenment.component.html',
	styleUrls: ['./enlightenment.component.scss']
})
export class EnlightenmentComponent implements OnInit {

	constructor(public api: ApiService, public common: CommonService, public message: NzMessageService) { }
	ngOnInit(): void {
		this.getVenusTags()
	}
	fallback = 'data:image/png;base64,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'
	@ViewChild('lyric')
	lyric: any;
	loading = false;
	page = 1;
	pageSize = 10;
	pageTotal = 0;
	keyword = ''
	list: any = [];
	lyricData: any = ''
	isPlay = false;
	audioIndex = 0
	audioArr = []
	audioSrc = ''
	nowIndex = 0;
	level = '全部'
	granularity = '全部'
	tag = '全部'
	identity = '全部'
	levelList: any = []
	granularityList: any = []
	identityList: any = []
	tagList: any = []
	searchHolder = '搜索歌手名字'
	searchValue = ''
	search(e: any) {
		this.searchValue = e;
		this.page = 1;
		this.getVenusList()
	}
	input(e: any) {
		this.searchValue = e;
	}
	ngModelChange1(e: any) {
		this.identity = e;
		this.page = 1;
		this.getVenusList()
	}
	ngModelChange2(e: any) {
		this.level = e;
		this.page = 1;
		this.getVenusList()
	}
	ngModelChange3(e: any) {
		this.tag = e;
		this.page = 1;
		this.getVenusList()
	}
	ngModelChange4(e: any) {
		this.granularity = e;
		this.page = 1;
		this.getVenusList()
	}
	getVenusTags() {
		this.loading = true;
		this.api.getVenusTags({}).subscribe((res: any) => {
			this.levelList = res.result.levelArr;
			this.identityList = res.result.identityArr;
			this.granularityList = res.result.toneArr;
			this.tagList = res.result.toneArr;
			this.getVenusList()
		}, (err: any) => {
			console.log(err)
		})
	}
	getVenusList() {
		this.loading = true;
		this.api.getVenusList({
			page: this.page,
			keyword: this.searchValue,
			level: this.level,//等级评分
			granularity: this.granularity,//音色
			tag: this.tag,//听感
			identity: this.identity//身份
		}).subscribe(async (res: any) => {
			this.loading = false;
			console.log(res)
			res.result.forEach((item: any) => {
				item.isPlay = false;
				item.musicUrl = '';
				item.scoreParse = (item.score - 0).toFixed(2)
				item.singerId = item.homepageUrl.substr(item.homepageUrl.lastIndexOf('/') + 1)
				item.isSongs = false;
				item.songsPageFree = 1;
				item.songsPagePay = 1;
				item.songsListFree = [];
				item.songsListPay = [];
				item.songsPageTotalFree = 0;
				item.songsPageTotalPay = 0;
				this.getVenusSongsAllIndex(item)
			})
			this.list = res.result;
			this.pageTotal = res.total;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	playMusicClick(item: any, i: number) {
		if (!item.singerSongs) {
			this.getqq_singerSongs(item, i)
		} else {
			this.audioArr = item.singerSongs;
			this.playMusic(this.audioArr[this.audioIndex].url, i)
		}
	}
	getqq_singerSongs(item: any, i: number) {
		this.loading = true;
		this.api.getqq_singerSongs({
			singerId: item.singerId,
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			item.singerSongs = res.result;
			this.audioArr = res.result;
			this.audioIndex = 0;
			this.playMusic(this.audioArr[this.audioIndex].url, i)
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	playMusic(src: string, i: number) {
		this.nowIndex = i;
		this.isPlay = true;
		this.audioSrc = src;
		this.lyricData = this.common.parseLRC(this.audioArr[this.audioIndex].lyric)
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.list.forEach((item: any, index: number) => {
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
		}, 100)
	}

	openDouyin(url: string) {
		window.open(url)
	}
	openSongDetail(url: string) {
		window.open(url)
	}
	nzPageIndexChange(e: any) {
		this.page = e;
		this.getVenusList()
	}

	play(element: any) {
		this.list[this.nowIndex].isPlay = true;
	}
	pause() {
		this.list.forEach((item: any) => {
			item.isPlay = false;
		})
	}
	ended() {
		console.log('完成播放下一首')
		if (this.audioIndex == this.audioArr.length - 1) {
			this.audioIndex = 0;
		} else {
			this.audioIndex += 1;
		}
		this.playMusic(this.audioArr[this.audioIndex].url, this.nowIndex)
	}
	// 歌曲进度
	timeupdate(e: any) {
		this.lyric.lyricUp(e.srcElement.currentTime);
	}


	openSongs(item: any,index:number): void {
		if(item.isSongs == true){
			item.isSongs = false;
			return
		}
		item.isSongs = true;
		item.songsPageFree = 1;
		item.songsPagePay = 1;
		// if(item.songsListPay.length==0&&item.songsListFree.length==0){
			this.getVenusSongs(item,0,1)
			this.getVenusSongs(item,1,1)
		// }
	}
	songsPageSize=20;
	getVenusSongs(item:any,type:any,page:any) {
		this.loading = true;
		this.api.getVenusSongs({ page: page, id:item.changJiangId,type }).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			res.result.forEach((item: any) => {
				item.isPlay = false;
				item.priceShow = false;
				item.priceList = this.common.filterPrice(item)
			})
			if(type == 0){
				item.songsListFree = res.result;
				item.songsPageTotalFree = res.total;
			}
			if(type==1){
				item.songsListPay = res.result;
				item.songsPageTotalPay = res.total;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	// 获取 付费 免费 播放指数总和
	getVenusSongsAllIndex(item:any){
				this.api.getVenusSongsAllIndex({changJiangId:item.changJiangId }).subscribe((res: any) => {
					item.payIndexAll = res.payIndexAll?res.payIndexAll.toFixed(2):'0.00';
					item.freeIndexAll = res.freeIndexAll?res.freeIndexAll.toFixed(2):'0.00'
				}, (err: any) => {
					console.log(err)
				})
		
	}
	nzSongsPageIndexChange1(e: any,item:any) {
		console.log(e)
		item.songsPageFree = e;
		this.getVenusSongs(item,0,item.songsPageFree)
	}
	nzSongsPageIndexChange2(e: any,item:any) {
		console.log(e)
		item.songsPagePay = e;
		this.getVenusSongs(item,1,item.songsPagePay)
	}

	// 用户画像
	visible = false;
	singerName:any = ''
	singerData: any = {}
	singerDataLoading = false;
	openData(item: any): void {
		this.visible = true;
		this.singerName = item.changJiangName
		this.singerData = {}
		this.getVenusSingerData(item.changJiangId)
	}
	closeData(): void {
		this.visible = false;
	}
	
	
	
	getVenusSingerData(id: any) {
		this.singerDataLoading = true;
		this.api.getVenusSingerData({ id }).subscribe((res: any) => {
			this.singerDataLoading = false;
			console.log(res)
			if (res.result.addTime) {
				var name1 = '女';
				var value1 = res.result.sex.girlCnt;
				var name2 = '男';
				var value2 = res.result.sex.boyCnt;
				this.setDataOption1(name1, name2, value1, value2)
				var age0Cnt = (res.result.ages.age0Cnt * 100).toFixed(2)
				var age1Cnt = (res.result.ages.age1Cnt * 100).toFixed(2)
				var age2Cnt = (res.result.ages.age2Cnt * 100).toFixed(2)
				var age3Cnt = (res.result.ages.age3Cnt * 100).toFixed(2)
				var age4Cnt = (res.result.ages.age4Cnt * 100).toFixed(2)
				var age5Cnt = (res.result.ages.age5Cnt * 100).toFixed(2)
				var age6Cnt = (res.result.ages.age6Cnt * 100).toFixed(2)
				var age7Cnt = (res.result.ages.age7Cnt * 100).toFixed(2)
				var age8Cnt = (res.result.ages.age8Cnt * 100).toFixed(2)
				this.setDataOption2({ '1-12': age0Cnt, '13-15': age1Cnt, '16-18': age2Cnt, '19-22': age3Cnt, '23-30': age4Cnt, '31-40': age5Cnt, '41-50': age6Cnt, '50以上': age7Cnt, '未知': age8Cnt })
				var city0Cnt = res.result.citys.city0Cnt
				var city1Cnt = res.result.citys.city1Cnt
				var city2Cnt = res.result.citys.city2Cnt
				var city3Cnt = res.result.citys.city3Cnt
				var city4Cnt = res.result.citys.city4Cnt
				var city5Cnt = res.result.citys.city5Cnt
				var city6Cnt = res.result.citys.city6Cnt
				this.setDataOption3({ '一线城市': city0Cnt, '二线城市': city1Cnt, '三线城市': city2Cnt, '四线城市': city3Cnt, '五线城市': city4Cnt, '新一线城市': city5Cnt, '其他': city6Cnt })
				this.singerData = res.result;
			}
		}, (err: any) => {
			console.log(err)
			this.singerDataLoading = false;
		})
	}
	// #1890ff  #00b887 #ff3d71 #ffaa00 #274bdb  #b4b4db #db8b00
	circleOption: any = {};
	setDataOption1(name1: string, name2: string, value1: string, value2: string) {
		this.circleOption = {
			title: {
				text: '性别分布',
				left: 'center',
				top: 'top'
			},
			color: ['#1890ff', '#00b887'],
			legend: {
				orient: 'horizontal',
				x: 'center',
				y: 'bottom',
				data: [name1, name2]
			},
			series: [
				{
					type: 'pie',
					label: {
						show: true,
						formatter: '{b}: {d}%'
					},
					data: [
						{
							value: value1,
							name: name1,
						},
						{
							value: value2,
							name: name2
						},

					],
					radius: ['40%', '70%']
				}
			]
		}
	}
	barOption = {};
	setDataOption2(params: any) {
		let names = Object.keys(params)
		let values = Object.values(params)
		this.barOption = {
			title: {
				text: '年龄分布',
				left: 'center',
				top: 'top'
			},
			xAxis: {
				data: names,
			},
			itemStyle: { color: '#1890ff' },
			yAxis: { //y轴设置
				type: 'value',
				axisLabel: { //y轴设置为%
					show: true,
					interval: 'auto',
					formatter: '{value} %',
				},
			},
			series: [
				{
					type: 'bar',
					data: values
				}
			],
			tooltip: { // 鼠标悬浮提示框显示 X和Y 轴数据
				trigger: 'axis',
				backgroundColor: 'rgba(32, 33, 36,.7)',
				textStyle: { // 文字提示样式
					color: '#fff',
					fontSize: '12'
				},
			}
		}
	}

	circleOption2 = {};
	setDataOption3(params: any) {
		let names = Object.keys(params)
		let values = Object.values(params)
		let arr: any = []
		for (let i = 0; i < names.length; i++) {
			arr.push({ value: values[i], name: names[i] })
		}
		this.circleOption2 = {
			title: {
				text: '城市分布',
				left: 'center',
				top: 'top'
			},
			color: ['#1890ff', '#00b887', '#ff3d71', '#ffaa00', '#274bdb', '#b4b4db', '#db8b00'],
			legend: {
				orient: 'horizontal',
				x: 'center',
				y: 'bottom',
				data: names
			},
			series: [
				{
					label: {
					        show: false,
					        position: 'center',
							formatter: '{b}: {d}%'
					      },
					      labelLine: {
					        show: false
					      },
					      emphasis: {
					        label: {
					          show: true,
					          fontSize: '14',
					          fontWeight: 'bold'
					        }
					      },
					type: 'pie',
					data: arr,
					radius: ['40%', '70%']
				}
			]
		}
	}
}
