import { Component, OnInit,ViewChild  } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute } from '@angular/router'
@Component({
	selector: 'ngx-search-songs',
	templateUrl: './search-songs.component.html',
	styleUrls: ['./search-songs.component.scss']
})
export class SearchSongsComponent implements OnInit {
	constructor(public api: ApiService,public common: CommonService,public message:NzMessageService,public route: ActivatedRoute) {
		this.route.params.subscribe((res) => {
			console.log(res)
			var path=res.path;
			var value=res.value;
			this.pathRedirectTo(path,value)
		})
	}
	// 参数跳转
	pathRedirectTo(path:any,value:any){
		// 词曲版权
		if(path=='copyright'){
			this.selectItem="词曲版权"
			value = decodeURIComponent(value)
			this.searchValue = value;
			this.search(this.searchValue)
		}
		if(path=='qq'){
			this.selectItem="QQ音乐"
			value = decodeURIComponent(value)
			this.searchValue = value;
			this.search(this.searchValue)
		}
		if(path=='v3'){
			this.selectItem="酷狗V3"
			value = decodeURIComponent(value)
			this.searchValue = value;
			this.search(this.searchValue)
		}
		
	}
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
		child:[
			{
				name:'酷狗V3',
				holder: '酷狗V3搜索'
			},
			{
				name:'多版本',
				holder:'酷狗多版本搜索'
			}
		]
	}, {
		name: '酷我音乐',
		holder: '酷我搜索'
	}, {
		name: '网易云',
		holder: '网易云搜索'
	},
	// {
	// 	name: '铃声多多',
	// 	holder: '铃声多多搜索'
	// },
	{
		name: '唱将音乐',
		holder: '唱将音乐搜索'
	},{
		name: '雷达音乐',
		holder: '雷达音乐搜索'
	},{
		name: '雷达热搜',
		holder: '雷达热搜搜索'
	},{
		name: '雷达艺人',
		holder: '雷达艺人搜索'
	},{
		name: '词曲版权',
		holder: '词曲版权搜索'
	},{
		name: '音著协',
		child:[
			{
				name:'大陆音著协',
				holder: '大陆音著协搜索'
			},
			{
				name:'港台音著协',
				holder:'港台音著协搜索'
			},
			{
				name:'中国音集协',
				holder:'中国音集协搜索'
			}
		]
	},{
		name: '云图',
		child:[
			{
				name:'最热',
				holder: '云图最热搜索'
			},
			{
				name:'最新',
				holder:'云图最新搜索'
			},
			{
				name:'飙升',
				holder:'云图飙升搜索'
			}
		]
	},{
		name: 'ISRC',
		holder: 'ISRC搜索'
	}]
	selectItem = 'QQ音乐';
	searchValue:any = '';
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
	
	fufuPage=1;
	fufuTotal=0;
	fufuList : any[]= []
	
	
	fufuHotPage=1;
	fufuHotTotal=0;
	fufuHotList : any[]= []
	
	fufuSingerPage=1;
	fufuSingerTotal=0;
	fufuSingerList : any[]= []
	
	copyrightPage=1;
	copyrightTotal=0;
	copyrightList : any[]= []
	
	kugouNewV3Page=1;
	kugouNewV3List:any[]=[]

	searchkeyword={keyword:"",acsa:""};
	McscSearchHKList:any[]=[]
	McscSearchCNList:any[]=[]
	McscSearchZGList:any[]=[]
	McscSearchZGPage=1
	McscSearchZGTotal=0
	McscSearchZGPageSize=100
	
	//HOT PUBLIC_TIME RISE
	tmeMapHotPage=1
	tmeMapHotList:any[]=[]
	tmeMapHotTotal=0
	
	tmeMapNewPage=1
	tmeMapNewList:any[]=[]
	tmeMapNewTotal=0
	
	tmeMapRisePage=1
	tmeMapRiseList:any[]=[]
	tmeMapRiseTotal=0

	artists:any=false
	
	ISRCPage=1;
	ISRCPageSize=100;
	ISRCTotal=1;
	ISRCList:any[] = []
	
	McscSearchZGPageNext(e:any){
		this.McscSearchZGPage = e;
		this.searchMcscSearchZG()
	}
	searchMcscSearchZG(){
		this.loading = true;
		this.api.searchMcscSearchZG({page:this.McscSearchZGPage,keyword:this.searchValue}).subscribe((res: any) => {
			this.loading = false;
			this.McscSearchZGList = res.result;
			this.McscSearchZGTotal = res.total;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	ISRCPageNext(e:any){
		this.ISRCPage = e;
		this.getISRC()
	}
	getISRC(){
		this.loading = true;
		this.api.search_ISRC({
			keyword:this.searchValue,
			page:this.ISRCPage,
			pageSize:this.ISRCPageSize,
		}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.ISRCList = res.result;
				this.ISRCTotal = res.total;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	
	tmeMapRisePageNext(e:any){
		this.tmeMapRisePage = e;
		this.searchTmeMapRise()
	}
	searchTmeMapRise(){
		this.loading = true;
		this.api.searchTmeMap({
			keyword:this.searchValue,
			page:this.tmeMapRisePage,
			pageSize:5,
			operate:'RISE'
		}).subscribe((res: any) => {
			this.loading = false;
			this.tmeMapRiseList = res.result;
			this.tmeMapRiseTotal = res.totalCount;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	tmeMapHotPageNext(e:any){
		this.tmeMapHotPage = e;
		this.searchTmeMapHot()
	}
	searchTmeMapHot(){
		this.loading = true;
		this.api.searchTmeMap({
			keyword:this.searchValue,
			page:this.tmeMapHotPage,
			pageSize:5,
			operate:'HOT'
		}).subscribe((res: any) => {
			this.loading = false;
			this.tmeMapHotList = res.result;
			this.tmeMapHotTotal = res.totalCount;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	tmeMapNewPageNext(e:any){
		this.tmeMapNewPage = e;
		this.searchTmeMapNew()
	}
	searchTmeMapNew(){
		this.loading = true;
		this.api.searchTmeMap({
			keyword:this.searchValue,
			page:this.tmeMapNewPage,
			pageSize:5,
			operate:'PUBLIC_TIME'
		}).subscribe((res: any) => {
			this.loading = false;
			this.tmeMapNewList = res.result;
			this.tmeMapNewTotal = res.totalCount;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	searchNewV3() {
		this.loading = true;
		this.api.getV3_2({
			keyword: this.searchValue,
			page: this.kugouNewV3Page
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				res.result.forEach((item:any)=>{
					let names:any = ''
					item.singers.forEach((sitem:any)=>{
						names+=this.common.deleteEM(sitem.name)+'、'
					})
					names=names.substr(0,names.length-1)
					item.singerNames = names
				})
				if (this.kugouNewV3Page == 1) {
					this.kugouNewV3List = res.result;
				} else {
					this.kugouNewV3List = [...this.kugouNewV3List, ...res.result];
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	copyrightPageNext(e:any){
		  this.copyrightPage = e;
		  this.getCopyright()
	}
	getCopyright(){
		this.loading = true;
		this.api.getCopyright({keyword:this.searchValue,page:this.copyrightPage}).subscribe((res: any) => {
			res.result.forEach((item:any)=>{
				item.lyricAuthors=''
				item.musicAuthors=''
				item.lyricAuthor.forEach((litem:any,lindex:number)=>{
					if(lindex==item.lyricAuthor.length-1){
						item.lyricAuthors+=litem;
					}else{
						item.lyricAuthors+=litem+'、';
					}
				})
				item.musicAuthor.forEach((litem:any,lindex:number)=>{
					if(lindex==item.musicAuthor.length-1){
						item.musicAuthors+=litem;
					}else{
						item.musicAuthors+=litem+'、';
					}
				})
				
				item.lyricCompanyName.forEach((litem:any,lindex:number)=>{
					let o = item.musicCompanyName.find((e:any)=>e.companyId == litem.companyId)||{}
					litem.lyricPercent = o.lyricPercent || 0;
				})
			})
		  this.copyrightList = res.result;
		this.copyrightTotal = res.total
		  console.log(res)
				  this.loading = false;
		}, (err: any) => {
				console.log(err)
				this.loading = false;
				})
	}
	
	
	fufuSingerPageNext(e:any){
		  this.fufuSingerPage = e;
		  this.getfufuleidaQuerySingers()
	}
	getfufuleidaQuerySingers(){
		this.loading = true;
		this.api.getfufuleidaQuerySingers({keyword:this.searchValue,page:this.fufuSingerPage}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.fufuSingerList = res.data
				this.fufuSingerTotal = res.total
			}
		  console.log(res)
		}, (err: any) => {
				console.log(err)
				this.loading = false;
				})
	}
	
	
	fufuHotPageNext(e:any){
		  this.fufuHotPage = e;
		  this.getfufuleidaQueryHotSongs()
	}
	getfufuleidaQueryHotSongs(){
		this.loading = true;
		this.api.getfufuleidaQueryHotSongs({keyword:this.searchValue,page:this.fufuHotPage}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.fufuHotList = res.data
				this.fufuHotTotal = res.total
			}
		  console.log(res)
		}, (err: any) => {
				console.log(err)
				this.loading = false;
				})
	}
	
	fufuPageNext(e:any){
		  this.fufuPage = e;
		  this.getfufuleidaQuerySongs()
	}
	getfufuleidaQuerySongs() {
		  this.loading = true;
	  this.api.getfufuleidaQuerySongs({keyword:this.searchValue,page:this.fufuPage}).subscribe((res: any) => {
		  this.loading = false;
		  if(res.success){
			  this.fufuList = res.data
			  this.fufuTotal = res.total
		  }
	    console.log(res)
	  }, (err: any) => {
		console.log(err)
		this.loading = false;
		})
	}
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
	// 词曲版权传参
	copyrightSrcChange(params:any){
		this.isPlay =true;
		let { src, i } = params;
		this.audioSrc = src;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.copyrightList.forEach((item: any, index: number) => {
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
		} else if (this.selectItem == '词曲版权') {
			var i = this.copyrightList.findIndex((e: any) => e.src == element.srcElement.currentSrc)
			if (i !== -1) {
				this.copyrightList[i].isPlay = true;
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
		this.copyrightList.forEach((item: any) => {
			item.isPlay = false;
		})
	}
	tagNow:any = ''
	selectItem2 = ''
	onSelect(item: any) {
		this.selectItem = item.name;
		if(item.child){
			this.tagNow=item
			this.searchHolder = item.child[0].holder;
			this.selectItem2 = item.child[0].name;
		}else{
			this.tagNow=''
			this.selectItem2=''
			this.searchHolder = item.holder;
		}
		// this.searchValue = '';
	}
	onSelect2(citem:any){
		this.selectItem2 = citem.name;
		this.searchHolder = citem.holder;
	}
	traditionalArr:any=[]
	// 输入监听
	childInput(e:any){
		this.searchValue = e;
	}
	// 切换繁体字
	changeCC(){
		this.api.change_text({keyword:this.searchValue}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.traditionalArr = res.result.split('');
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	// 替换文字
	changeZi(z:any,i:any){
		let searchValue:any = this.searchValue.split('');
		searchValue[i] = z;
		this.searchValue = searchValue.join('');
		
	}
	search(value: string) {
		if(this.loading) return
		console.log(value)
		this.searchValue = value;
		this.qqPage = 1;
		this.kugouV3Page = 1;
		this.kuwoPage = 1;
		this.wangyiyunPage = 1;
		this.lsddPage = 1;
		this.enlightenmentPage =1;
		this.fufuPage =1;
		this.fufuHotPage=1;
		this.fufuSingerPage=1;
		this.copyrightPage=1;
		this.kugouNewV3Page=1;
		this.tmeMapHotPage=1;
		this.tmeMapNewPage=1;
		this.tmeMapRisePage=1;
		this.ISRCPage=1;
		this.McscSearchZGPage=1;
		this.loading = true;
		if(this.tagNow){
			if (this.selectItem2 == '酷狗V3') {
				this.searchV3()
			}
			if (this.selectItem2 == '多版本') {
				this.searchNewV3()
			}
			if(this.selectItem2 == '大陆音著协'){
				// this.getCopyright()
			}
			if(this.selectItem2 == '港台音著协'){
				this.searchMcscSearchHK()
			}
			if(this.selectItem2 == '中国音集协'){
				this.searchMcscSearchZG()
			}
			if(this.selectItem2=='最热'&&this.selectItem=='云图'){
				this.searchTmeMapHot()
			}
			if(this.selectItem2=='最新'&&this.selectItem=='云图'){
				this.searchTmeMapNew()
			}
			if(this.selectItem2=='飙升'&&this.selectItem=='云图'){
				this.searchTmeMapRise()
			}
			return
		}
		if (this.selectItem == 'QQ音乐') {
			this.searchQQ()
		}
		if (this.selectItem == '酷狗V3') {
			this.searchV3()
		}
		if (this.selectItem == '多版本') {
			this.searchNewV3()
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
		if(this.selectItem == '雷达音乐'){
			this.getfufuleidaQuerySongs()
		}
		if(this.selectItem == '雷达热搜'){
			this.getfufuleidaQueryHotSongs()
		}
		if(this.selectItem == '雷达艺人'){
			this.getfufuleidaQuerySingers()
		}
		if(this.selectItem == '词曲版权'){
			this.getCopyright()
		}
		if(this.selectItem == 'ISRC'){
			this.getISRC()
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
					let names:any = ''
					item.singers.forEach((sitem:any)=>{
						names+=sitem.name+'、'
					})
					names=names.substr(0,names.length-1)
					item.singerNames = names
					item.topinfo = item.topinfo || {}
					item.playinfo = item.playinfo || {}
					item.isPlay = false;
					let historyArrS = []
					let historyArrI = []
					let history=[]
					for(let i = 0;i<item.VS.length;i++){
						if(item.VS[i]){
							historyArrS.push({id:item.VS[i],name:''})
							history.push(item.VS[i])
						}
					}
					for(let i = 0;i<item.VI.length;i++){
						if(item.VI[i]){
							historyArrI.push({id:item.VI[i],name:''})
							history.push(item.VI[i])
						}
					}
					item.historyS = historyArrS
					item.historyI = historyArrI
					item.history = history
					item.GrpData.forEach((citem:any)=>{
						let names:any = ''
						citem.singers.forEach((sitem:any)=>{
							names+=sitem.name+'、'
						})
						names=names.substr(0,names.length-1)
						citem.singerNames = names
						citem.topinfo = citem.topinfo || {}
						citem.playinfo = citem.playinfo || {}
						citem.isPlay = false;
						let historyArrS = []
						let historyArrI = []
						let history=[]
						for(let i = 0;i<citem.VS.length;i++){
							if(citem.VS[i]){
								historyArrS.push({id:citem.VS[i],name:''})
								history.push(citem.VS[i])
							}
						}
						for(let i = 0;i<citem.VI.length;i++){
							if(citem.VI[i]){
								historyArrI.push({id:citem.VI[i],name:''})
								history.push(citem.VI[i])
							}
						}
						citem.historyS = historyArrS
						citem.historyI = historyArrI
						citem.history = history
					})
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
				res.result.forEach((item:any)=>{
					let names:any = ''
					item.singers.forEach((sitem:any)=>{
						names+=this.common.deleteEM(sitem.name)+'、'
					})
					names=names.substr(0,names.length-1)
					item.singerNames = names
				})
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
	searchMcscSearchCN(){
		this.loading=true;
		if(this.searchkeyword.keyword){
			this.api.searchMcscSearchCN({
				keyword: this.searchkeyword.keyword,
				acsa:this.searchkeyword.acsa
			}).subscribe((res: any) => {
				this.loading = false;
				this.McscSearchCNList=res.result;
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
		}else{
			this.loading=false;
			this.message.create("error", `搜索的歌曲名不能为空`);
		}
	}
	searchMcscSearchHK(){
		this.api.searchMcscSearchHK({
			keyword: this.searchValue,
		}).subscribe((res: any) => {
			this.loading = false;
			this.McscSearchHKList=res.result;
			console.log(res)
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	focus(e:any){
		e.preventDefault();
		document.onkeydown =  (event_e:any)=>{
			if(event_e.keyCode === 13){
				this.loading=true;
				this.searchMcscSearchCN()
			}
		}
	}
	ngOnInit(): void {
		this.ismobile = this.common.isMobile()
		if(!this.common.checkAdmin()){
			let menu:any = localStorage.getItem('menu')
			menu = JSON.parse(menu);
			let menu_list:any = menu || {top:[],left:[]};
			let tagList = []
			for(let i = 0;i<menu_list.top.length;i++){
				if(menu_list.top[i].parent_id == 1){
					tagList.push(menu_list.top[i].menu)
				}
			}
			this.tagList = tagList
		}
	}
}
