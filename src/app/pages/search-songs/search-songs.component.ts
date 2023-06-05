import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";

@Component({
	selector: 'ngx-search-songs',
	templateUrl: './search-songs.component.html',
	styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit {
	constructor(public api: ApiService,public common: CommonService) { }
	@ViewChild('lyric')
	lyric:any;
	ismobile:any=null;
	tagListPhone = [{
		name: 'QQ音乐',
		holder: 'qq搜索'
	}, {
		name: '酷狗V3',
		holder: '酷狗V3搜索'
	},{
		name: '酷我音乐',
		holder: '酷我搜索'
	},
	{
		name: '网易云',
		holder: '网易云搜索'
	},
	{
		name: '腾讯音乐人',
		holder: '腾讯音乐人搜索'
	}]
	tagList = [{
		name: 'QQ音乐',
		holder: 'qq搜索'
	}, {
		name: '酷狗V3',
		holder: '酷狗V3搜索'
	}, {
		name: '酷我音乐',
		holder: '酷我搜索'
	}, {
		name: '网易云',
		holder: '网易云搜索'
	}, {
		name: '铃声多多',
		holder: '铃声多多搜索'
	},{
		name: '唱将音乐',
		holder: '唱将音乐搜索'
	}]
	selectItem = 'QQ音乐';
	searchValue = '';
	loading = false;
	searchHolder = "qq搜索";
	wangyiyunList: any[] = []
	wangyiyunPage = 1
	kuwoList: any[] = []
	kuwoPage = 1

	lsddPage = 1;
	lsddList: any[] = []
	qqList: any[] = []
	kugouV3List: any[] =[]
	qqPage = 1;
	kugouV3Page = 1;
	
	audioSrc = '';
	lyricData:any = [];
	isPlay = false;
	
	musicianTxPage = 1;
	musicianTxList: any[] = []
	
	enlightenmentPage = 1;
	enlightenmentTotal = 0;
	enlightenmentList : any[]=[]
	enlightenmentPageNext(e: any) {
		this.enlightenmentPage = e;
		this.searchEnlightenmentSongs()
	}
	searchEnlightenmentSongs(){
		this.loading = true;
		this.api.searchEnlightenmentSongs2({
			keyword: this.searchValue,
			page: this.enlightenmentPage
		}).subscribe((res: any) => {
			this.loading = false;
			res.result.forEach((item: any) => {
				item.isPlay = false;
				item.priceShow = false;
				item.priceList = this.common.filterPrice(item)
			})
			this.enlightenmentList = res.result;
			this.enlightenmentTotal = res.total;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	searchMusicianTx(): void{
		this.api.getMusicianTx({
			keyword: this.searchValue,
			page: this.musicianTxPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			// res.data.results.forEach((item:any)=>{
			// 	item.topinfo = item.topinfo || {}
			// })
			if (res.success) {
				if (this.musicianTxPage == 1) {
					this.musicianTxList = res.result;
				} else {
					this.musicianTxList = [...this.musicianTxList, ...res.result];
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	musicianTxPageNext(): void{
		if (this.musicianTxList.length == 0) {
			return
		}
		this.musicianTxPage += 1;
		this.loading = true;
		this.searchMusicianTx()
	}
	ngModelChange(e:any){
		let O = this.tagListPhone.find((an:any)=>an.name == e)
		this.selectItem = e;
		this.searchHolder = O.holder
	}
	// 歌曲进度
	timeupdate(e:any){
		this.lyric.lyricUp(e.srcElement.currentTime);
	}
	// 获取歌词
	getLyric(songmid:string,i:number){
		this.api.getQQLyric({
			songmid: songmid,
		}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				this.qqList[i].lyricText = res.result.lyric
				this.qqList[i].lyricData = this.common.parseLRC(res.result.lyric)
				this.lyricData = this.qqList[i].lyricData
			}
		}, (err: any) => {
			console.log(err)
		})
	}
	// qq传参
	qqSrcChange(params: any) {
		this.isPlay =true;
		let { src, i } = params;
		if(!this.qqList[i].lyricText){
			this.getLyric(this.qqList[i].mid,i)
		}else{
			this.qqList[i].lyricData = this.common.parseLRC(this.qqList[i].lyricText)
			this.lyricData = this.qqList[i].lyricData
		}
		this.audioSrc = src;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.qqList.forEach((item: any, index: number) => {
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
	
	// 铃声多多传参
	lsddSrcChange(params: any) {
		this.isPlay =true;
		let { src, i } = params;
		this.audioSrc = src;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.lsddList.forEach((item: any, index: number) => {
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
		console.log(element)
		if (this.selectItem == 'QQ音乐') {
			var i = this.qqList.findIndex((e: any) => e.musicUrl == element.srcElement.currentSrc)
			if (i !== -1) {
				this.qqList[i].isPlay = true;
			}
		} else if (this.selectItem == '铃声多多') {
			var i = this.lsddList.findIndex((e: any) => e.src == element.srcElement.currentSrc)
			if (i !== -1) {
				this.lsddList[i].isPlay = true;
				this.lyricData = [];
			}
		}
	}
	pause() {
		this.lsddList.forEach((item: any) => {
			item.isPlay = false;
		})
		this.qqList.forEach((item: any) => {
			item.isPlay = false;
		})
	}
	onSelect(item: any) {
		this.selectItem = item.name;
		this.searchHolder = item.holder;
		// this.searchValue = '';
	}
	search(value: string) {
		console.log(value)
		this.searchValue = value;
		this.qqPage = 1;
		this.kugouV3Page = 1;
		this.kuwoPage = 1;
		this.wangyiyunPage = 1;
		this.lsddPage = 1;
		this.enlightenmentPage =1;
		this.loading = true;
		if (this.selectItem == 'QQ音乐') {
			this.searchQQ()
		}
		if (this.selectItem == '酷狗V3') {
			this.searchV3()
		}
		if (this.selectItem == '酷我音乐') {
			this.searchKuwo()
		}
		if (this.selectItem == '网易云') {
			this.searchWangyiyun()
		}
		if (this.selectItem == '铃声多多') {
			this.searchLsdd()
		}
		if(this.selectItem == '腾讯音乐人'){
			this.searchMusicianTx()
		}
		if(this.selectItem == '唱将音乐'){
			this.searchEnlightenmentSongs()
		}
	}
	searchKuwo() {
		this.api.getKuwo({
			keyword: this.searchValue,
			page: this.kuwoPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			res.result.forEach((item: any) => {
				item.payInfo.feeType = item.payInfo.feeType || {}
			})
			if (this.kuwoPage == 1) {
				this.kuwoList = res.result;
			} else {
				this.kuwoList = [...this.kuwoList, ...res.result];
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	searchWangyiyun() {
		this.api.getWangyiyun({
			keyword: this.searchValue,
			page: this.wangyiyunPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if (this.wangyiyunPage == 1) {
				this.wangyiyunList = res.result;
			} else {
				this.wangyiyunList = [...this.wangyiyunList, ...res.result];
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	searchQQ() {
		this.api.getQQ({
			keyword: this.searchValue,
			page: this.qqPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if(res.success){
				res.result.forEach((item: any) => {
					item.topinfo = item.topinfo || {}
					item.playinfo = item.playinfo || {}
					item.isPlay = false;
				})
			}
			if (this.qqPage == 1) {
				this.qqList = res.result;
			} else {
				this.qqList = [...this.qqList, ...res.result];
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}

	searchV3() {
		this.api.getV3({
			keyword: this.searchValue,
			page: this.kugouV3Page
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				if (this.kugouV3Page == 1) {
					this.kugouV3List = res.result;
				} else {
					this.kugouV3List = [...this.kugouV3List, ...res.result];
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	searchLsdd() {
		this.api.getLsdd({
			keyword: this.searchValue,
			page: this.lsddPage,
			pageSize: 10
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				res.result.forEach((item: any) => {
					item.isPlay = false;
				})
				if (this.lsddPage == 1) {
					this.lsddList = res.result;
				} else {
					this.lsddList = [...this.lsddList, ...res.result];
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	qqPageNext() {
		if (this.qqList.length == 0) {
			return
		}
		this.qqPage += 1;
		this.loading = true;
		this.searchQQ()
	}
	kuwoPageNext() {
		if (this.kuwoList.length == 0) {
			return
		}
		this.kuwoPage += 1;
		this.loading = true;
		this.searchKuwo()
	}
	wangyiyunPageNext() {
		if (this.wangyiyunList.length == 0) {
			return
		}
		this.wangyiyunPage += 1;
		this.loading = true;
		this.searchWangyiyun()
	}
	kugouV3PageNext() {
		if (this.kugouV3List.length == 0) {
			return
		}
		this.kugouV3Page += 1;
		this.loading = true;
		this.searchV3()
	}
	lsddPageNext() {
		if (this.lsddList.length == 0) {
			return
		}
		this.lsddPage += 1;
		this.loading = true;
		this.searchLsdd()
	}
	ngOnInit(): void {
		this.ismobile = this.common.isMobile()
			
	}
}
