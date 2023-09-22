import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
	selector: 'ngx-douyin-listenDaren',
	templateUrl: './douyin-listenDaren.component.html',
	styleUrls: ['./douyin-listenDaren.component.scss']
})
export class DouyinListenDarenComponent implements OnInit {
	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService, private changeDetectorRef: ChangeDetectorRef) {
	}
	ngOnInit(): void {
		this.userId = localStorage.getItem('userId') || '0'
		let highUserList = localStorage.getItem('highUserList') == 'undefined' ? false : localStorage.getItem('highUserList')
		this.highUserList = highUserList || ['1', '2', '3', '4', '5', '8', '11', '13', '17', '26', '34']
		this.douyin_getListenDaren()
	}
	highUserList: any = []
	fallback = 'data:image/png;base64,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'
	userId = '0'
	loading = false;
	searchValue: any = ''
	searchHolder: any = '请搜索抖音达人名字'
	list: any = []

	page = 1;
	pageSize: any = 10;
	pageSizeOptions: any[] = [10, 100, 250, 500, 1000, 9999999]
	pageTotal = 0;


	// 条件
	diggCountAve: any = '全部'
	diggCountAveMax: any = ''
	diggCountAveMin: any = ''
	activity: any = '全部'
	activityNum: any = ''
	activityList: any = [{ value: '全部' }, { value: 0 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: '7及以上' }]
	diggCountAveList: any = [{
		value: '全部'
	}, {
		value: '2000-5000'
	}, {
		value: '5001-10000'
	}, {
		value: '10001-15000'
	}, {
		value: '15001-20000'
	}, {
		value: '20000以上'
	}]

	fees: any = '全部'
	feesMax: any = ''
	feesMin: any = ''
	feesList: any = [{
		value: '全部'
	}, {
		value: '0'
	}, {
		value: '1-300'
	}, {
		value: '301-500'
	}, {
		value: '501-800'
	}, {
		value: '801-1000'
	}, {
		value: '1001-2000'
	}, {
		value: '2001-3000'
	}, {
		value: '3001-5000'
	}, {
		value: '5001-10000'
	}, {
		value: '10000以上'
	}]

	vocals: any = '全部'
	vocalsMax: any = ''
	vocalsMin: any = ''
	vocalsList: any = [{
		value: '全部'
	}, {
		value: '0'
	}, {
		value: '1-1000'
	}, {
		value: '1001-3000'
	}, {
		value: '3001-5000'
	}, {
		value: '5001-10000'
	}, {
		value: '10000以上'
	}]

	minimum: any = '全部'
	minimumMax: any = ''
	minimumMin: any = ''
	minimumList: any = [{
		value: '全部'
	}, {
		value: '2000以下'
	}, {
		value: '2000-5000'
	}, {
		value: '5001-10000'
	}, {
		value: '10001-15000'
	}, {
		value: '15001-20000'
	}, {
		value: '20000以上'
	}]
	ngModelFees(e: any) {
		switch (e) {
			case '全部':
				this.feesMax = ''
				this.feesMin = ''
				break;
			case '0':
				this.feesMax = 0
				this.feesMin = 0
				break;
			case '1-300':
				this.feesMax = 300
				this.feesMin = 1
				break;
			case '301-500':
				this.feesMax = 500
				this.feesMin = 301
				break;
			case '501-800':
				this.feesMax = 800
				this.feesMin = 501
				break;
			case '801-1000':
				this.feesMax = 1000
				this.feesMin = 801
				break;
			case '1001-2000':
				this.feesMax = 2000
				this.feesMin = 1001
				break;
			case '2001-3000':
				this.feesMax = 3000
				this.feesMin = 2001
				break;
			case '3001-5000':
				this.feesMax = 5000
				this.feesMin = 3001
				break;
			case '5001-10000':
				this.feesMax = 10000
				this.feesMin = 5001
				break;
			case '10000以上':
				this.feesMax = 99999999
				this.feesMin = 10000
				break
			default:
				this.feesMax = ''
				this.feesMin = ''
				break;
		}
		this.page = 1;
		this.douyin_getListenDaren()
	}
	ngModelVocals(e: any) {
		switch (e) {
			case '全部':
				this.vocalsMax = ''
				this.vocalsMin = ''
				break;
			case '0':
				this.vocalsMax = 0
				this.vocalsMin = 0
				break;
			case '1-1000':
				this.vocalsMax = 1000
				this.vocalsMin = 1
				break;
			case '1001-3000':
				this.vocalsMax = 3000
				this.vocalsMin = 1001
				break;
			case '3001-5000':
				this.vocalsMax = 5000
				this.vocalsMin = 3001
				break;
			case '5001-10000':
				this.vocalsMax = 10000
				this.vocalsMin = 5001
				break;
			case '10000以上':
				this.vocalsMax = 99999999
				this.vocalsMin = 10000
				break
			default:
				this.vocalsMax = ''
				this.vocalsMin = ''
				break;
		}
		this.page = 1;
		this.douyin_getListenDaren()
	}

	ngModelAve(e: any) {
		switch (e) {
			case '全部':
				this.diggCountAveMax = ''
				this.diggCountAveMin = ''
				break;
			case '2000-5000':
				this.diggCountAveMax = 5000
				this.diggCountAveMin = 2000
				break;
			case '5001-10000':
				this.diggCountAveMax = 10000
				this.diggCountAveMin = 5001
				break;
			case '10001-15000':
				this.diggCountAveMax = 15000
				this.diggCountAveMin = 10001
				break;
			case '15001-20000':
				this.diggCountAveMax = 20000
				this.diggCountAveMin = 15001
				break;
			case '20000以上':
				this.diggCountAveMax = 99999999
				this.diggCountAveMin = 20000
				break
			default:
				this.diggCountAveMax = ''
				this.diggCountAveMin = ''
				break;
		}
		this.page = 1;
		this.douyin_getListenDaren()
	}
	ngModelMin(e: any) {
		switch (e) {
			case '全部':
				this.minimumMax = ''
				this.minimumMin = ''
				break;
			case '2000以下':
				this.minimumMax = 2000
				this.minimumMin = 0
				break;
			case '2000-5000':
				this.minimumMax = 5000
				this.minimumMin = 2000
				break;
			case '5001-10000':
				this.minimumMax = 10000
				this.minimumMin = 5001
				break;
			case '10001-15000':
				this.minimumMax = 15000
				this.minimumMin = 10001
				break;
			case '15001-20000':
				this.minimumMax = 20000
				this.minimumMin = 15001
				break;
			case '20000以上':
				this.minimumMax = 99999999
				this.minimumMin = 20000
				break
			default:
				this.minimumMax = ''
				this.minimumMin = ''
				break;
		}
		this.page = 1;
		this.douyin_getListenDaren()
	}
	ngModelActivity(e: any) {
		if (e == '全部') {
			this.activityNum = '';
		} else if (e == '7及以上') {
			this.activityNum = 7
		} else {
			this.activityNum = e;
		}
		this.page = 1;
		this.douyin_getListenDaren()
	}


	// 获取视频详情 以及 达人最新信息
	openVideoView(item: any) {
		if (item.seeVideo) {
			item.isShowRadio = item.isShowRadio ? false : true;
			item.isShowRadio2 = false;
		} else {
			this.getVideoDetail(item)
	
		}
	}
	async getVideoDetail(item: any) {
		item.loadingFinished = false;
		item.seeVideo = true;
		let res: any = await this.getDouYinBloggerVideoOne(item.SecUid)
		if (res) {
			let res2:any = await this.getDouMoreVideos(item.SecUid,res)
			item.NewFans = []
			if(res2){
				for(let i = 0;i<res.BloggerVideo.length;i++){
					let o = res2.find((e:any)=>e.item_id == res.BloggerVideo[i].aweme_id)
					if(o){
						item.NewFans.push(o)
					}else{
						item.NewFans.push({net_new_fans:0})
					}
				}
			}
			if (res.nickName) {
				item.urlList = res.urlList
				item.Nickname = res.nickName
				item.signature = res.signature
				item.followerCount = res.followerCount
				item.totalFavorited = res.totalFavorited
				item.BloggerVideo = res.BloggerVideo
				item.isShowRadio = true;
				item.isShowRadio2 = false;
			}
			console.log(item)
			item.loadingFinished = true
			item.BloggerVideoErr = false
		} else {
			item.BloggerVideoErr = true
			item.loadingFinished = true
		}
	}
	// 更多视频
	openVideoView2(item: any) {
		if (item.seeVideo2) {
			item.isShowRadio2 = item.isShowRadio2 ? false : true;
			item.isShowRadio = false
		} else {
			this.getVideoDetail2(item)
	
		}
	}
	async videoToMore(obj:any){
		let {secUid}=obj
		let item = this.list.find((e:any)=>e.SecUid==secUid)
		item.isMoreLoadingFinished=false
		await this.getVideoDetailFun(item,item.NewFans2)
		item.isMoreLoadingFinished=true
	}
	async getVideoDetail2(item:any){
		item.loadingFinished2 = false;
		item.seeVideo2 = true;
		let res:any = await this.getDouMoreVideos2(item.SecUid)
		item.NewFans2PageTotal = res.length;
		item.NewFans2Page = 0;
		item.NewFans2PageSize = 4;
		await this.getVideoDetailFun(item,res)
	}
	async getVideoDetailFun(item:any,res:any){
		let newArr = []
		if (res) {
			if(res.length!=0){
				let NewFans2 = res;
				item.NewFans2Page=item.NewFans2Page+1;
				let aweme_idArr = NewFans2.map((e:any)=>e.item_id)
				aweme_idArr = aweme_idArr.splice((item.NewFans2Page-1)*item.NewFans2PageSize,item.NewFans2PageSize)
				let res2:any = await this.DouYinSearchVideoDetailsList(aweme_idArr)
				if(res2){
					let VideoDetails = res2
					let music_idArr = VideoDetails.map((e:any)=>e.music_id)
					let res3 = await this.getMusicInfo(music_idArr,item.SecUid)
					if(res3){
						let VideoFollowUp = res3
						for(let i = 0;i<res2.length;i++){
							newArr.push({VideoDetails:VideoDetails[i],VideoFollowUp:VideoFollowUp[i]})
						}
						item.NewFans2 = NewFans2
						item.BloggerVideo2 = [...item.BloggerVideo2,...newArr];
						item.isShowRadio = false
						item.isShowRadio2 = true
					}
				}
				console.log(item)
			}
			item.loadingFinished2 = true
			item.BloggerVideoErr2 = false
		} else {
			item.BloggerVideoErr2 = true
			item.loadingFinished2 = true
		}
	}
	getMusicInfo(music_idArr:any,secUid:any){
		return new Promise((resolve)=>{
			this.api.getMusicInfo({arr:music_idArr,secUid})
			.subscribe((res: any) => {
					if (res.success) {
						resolve(res.result)
					}else{
						resolve(false)
					}
				}, (err: any) => {
					console.log(err)
					resolve(false)
				})
		})
	}
	DouYinSearchVideoDetailsList(aweme_idArr:any){
		return new Promise((resolve)=>{
			this.api.DouYinSearchVideoDetailsList({arr:aweme_idArr,type:'ID'})
			.subscribe((res: any) => {
					if (res.success) {
						resolve(res.result)
					}else{
						resolve(false)
					}
				}, (err: any) => {
					console.log(err)
					resolve(false)
				})
		})
	}
	
	
	ToRadio(aweme_id: any, secUid: any) {
		window.open(
			"https://www.douyin.com/user/" + secUid + "?modal_id=" + aweme_id
		);
	}
	search(e: any) {
		this.searchValue = e;
		this.page = 1;
		this.douyin_getListenDaren()
	}
	type = true;
	// 开关切换
	ngModelChange() {
		this.type = !this.type
		this.page = 1;
		this.douyin_getListenDaren()
	}
	douyin_getListenDaren() {
		this.loading = true;
		this.api.douyin_getListenDaren({ vocalsMax: this.vocalsMax, vocalsMin: this.vocalsMin, feesMax: this.feesMax, feesMin: this.feesMin, minimumMax: this.minimumMax, minimumMin: this.minimumMin, diggCountAveMax: this.diggCountAveMax, diggCountAveMin: this.diggCountAveMin, activityNum: this.activityNum, pageSize: this.pageSize, page: this.page, keyword: this.searchValue, type: this.type ? '我的' : '全部' })
			.subscribe((res: any) => {
				console.log(res)
				if (res.success) {
					res.result.forEach((item: any) => {
						item.homeUrl = 'https://www.douyin.com/user/' + item.SecUid
						item.expand = false;
						item.BloggerVideo = []
						item.BloggerVideo2 = []
						item.seeVideo = false;
						item.seeVideo2 = false;
						item.NewFans2PageTotal = 0;
						item.isMoreLoadingFinished=true
						item.diggCountAve = parseInt(item.diggCountAve)
					})
					// let arr = this.common.spArr(res.result, 10)
					this.list = res.result;
					this.pageTotal = res.total;
					// this.getVideoDetails(arr)
				}
				this.loading = false;
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
	}
	// // 重新加载这10个video
	// async reloadVideo(item:any,index:number){
	// 	let i =  parseInt(index/10+'')
	// 	let iS = i*10;
	// 	let iE = iS + 10;
	// 	let arr = []
	// 	for(let i = iS;i<iE;i++){
	// 		this.list[i].loadingFinished = false
	// 		arr.push(this.list[i])
	// 	}
	// 	let secUidArr = arr.map((e: any) => e.SecUid)
	// 	let res: any = await this.getDouYinBloggerVideo(secUidArr)
	// 	if (res) {
	// 		for (let j = 0; j < res.length; j++) {
	// 			res[j] = res[j].filter((e: any) => e.is_top == 0)
	// 			let diggCountAll = 0
	// 			res[j].forEach((items: any) => {
	// 				diggCountAll += items.VideoDetails.diggCount
	// 			})
	// 			this.list[j + iS].diggCountAve = parseInt(diggCountAll / res[j].length + '')
	// 			this.list[j + iS].BloggerVideo = res[j]
	// 			if(res[j].length>0){
	// 				res[j][0].VideoDetails.BloggerInfo = res[j][0].VideoDetails.BloggerInfo || {}
	// 				this.list[j + iS].avatar = res[j][0].VideoDetails.BloggerInfo.urlList
	// 				this.list[j + iS].signature = res[j][0].VideoDetails.BloggerInfo.signature
	// 				this.list[j + iS].followerCount = res[j][0].VideoDetails.BloggerInfo.followerCount
	// 				this.list[j + iS].totalFavorited = res[j][0].VideoDetails.BloggerInfo.totalFavorited
	// 			}
	// 			this.list[j + iS].loadingFinished = true
	// 			this.list[j + iS].BloggerVideoErr = false
	// 		}
	// 	}else{
	// 		for (let j = 0; j < 10; j++) {
	// 			this.list[j + iS].BloggerVideoErr = true
	// 			this.list[j + iS].loadingFinished = true
	// 		}
	// 	}
	// }

	// async getVideoDetails(arr: any) {
	// 	for (let i = 0; i < arr.length; i++) {
	// 		// 只加载前十
	// 		if(i==0){
	// 			let secUidArr = arr[i].map((e: any) => e.SecUid)
	// 			let res: any = await this.getDouYinBloggerVideo(secUidArr)
	// 			if (res) {
	// 				for (let j = 0; j < res.length; j++) {
	// 					res[j] = res[j].filter((e: any) => e.is_top == 0)
	// 					let diggCountAll = 0
	// 					res[j].forEach((items: any) => {
	// 						diggCountAll += items.VideoDetails.diggCount
	// 					})
	// 					this.list[j + (i * 10)].diggCountAve = parseInt(diggCountAll / res[j].length + '')
	// 					this.list[j + (i * 10)].BloggerVideo = res[j]
	// 					if(res[j].length>0){
	// 						res[j][0].VideoDetails.BloggerInfo = res[j][0].VideoDetails.BloggerInfo || {}
	// 						this.list[j + (i * 10)].avatar = res[j][0].VideoDetails.BloggerInfo.urlList
	// 						this.list[j + (i * 10)].signature = res[j][0].VideoDetails.BloggerInfo.signature
	// 						this.list[j + (i * 10)].followerCount = res[j][0].VideoDetails.BloggerInfo.followerCount
	// 						this.list[j + (i * 10)].totalFavorited = res[j][0].VideoDetails.BloggerInfo.totalFavorited
	// 					}
	// 					this.list[j + (i * 10)].loadingFinished = true
	// 				}
	// 			}else{
	// 				for (let j = 0; j < 10; j++) {
	// 					this.list[j + (i * 10)].BloggerVideoErr = true
	// 					this.list[j + (i * 10)].loadingFinished = true
	// 				}
	// 			}
	// 		}else{
	// 			for (let j = 0; j < 10; j++) {
	// 				this.list[j + (i * 10)].BloggerVideoErr = true
	// 				this.list[j + (i * 10)].loadingFinished = true
	// 			}
	// 		}

	// 	}
	// 	console.log(this.list)
	// }
	// // 获取抖音博主7条视频
	// getDouYinBloggerVideo(secUidArr: any) {
	// 	return new Promise((resolve: any) => {
	// 		this.api.getDouYinBloggerVideo({ secUidArr })
	// 			.subscribe((res: any) => {
	// 				if (res.success) {
	// 					resolve(res.result)
	// 				} else {
	// 					resolve(false)
	// 				}
	// 			}, (err: any) => {
	// 				console.log(err)
	// 				resolve(false)
	// 			})
	// 	})
	// }
	// 获取抖音博主7条视频
	getDouYinBloggerVideoOne(secUid: any) {
		return new Promise((resolve: any) => {
			this.api.getDouYinBloggerVideoOne({ secUid })
				.subscribe((res: any) => {
					if (res.success) {
						resolve(res.result)
					} else {
						resolve(false)
					}
				}, (err: any) => {
					console.log(err)
					resolve(false)
				})
		})
	}
	nzPageIndexChange(e: any) {
		this.page = e;
		this.douyin_getListenDaren()
	}
	nzPageSizeChange(e: any) {
		this.page = 1;
		this.pageSize = e;
		this.douyin_getListenDaren()
	}
	goHomeUrl(url: string) {
		window.open(url)
	}
	// 涨粉量
	getDouMoreVideos(sec_uid:any,result:any) {
		return new Promise((resolve: any) => {
			let item_id = []
			let max_cursor = new Date().getTime()
			// 30天前0点
			let min_cursor = new Date(this.common.timeFormat(max_cursor-30*60*60*1000*24)).setHours(0, 0, 0, 0)
			for(let i=0;i<result.BloggerVideo.length;i++){
				item_id.push(result.BloggerVideo[i].aweme_id)
			}
			this.api.getDouMoreVideos({ item_id, sec_uid, min_cursor, max_cursor }).subscribe((res: any) => {
				if (res.success) {
					resolve(res.result)
				}else{
					resolve(false)
				}
			}, (err: any) => {
				console.log(err)
				resolve(false)
			})
		})
	}
	// 更多视频
	getDouMoreVideos2(sec_uid:any) {
		return new Promise((resolve: any) => {
			let max_cursor = new Date().getTime()
			// 30天前0点
			let min_cursor = new Date(this.common.timeFormat(max_cursor-30*60*60*1000*24)).setHours(0, 0, 0, 0)
			this.api.getDouMoreVideos({ item_id:[], sec_uid, min_cursor, max_cursor }).subscribe((res: any) => {
				if (res.success) {
					resolve(res.result)
				}else{
					resolve(false)
				}
			}, (err: any) => {
				console.log(err)
				resolve(false)
			})
		})
	}
	tableshow = true;
	isVisible = false;
	editItem: any = {}
	sexList: any = [{ value: '男', label: '男' }, { value: '女', label: '女' }]
	popUpEdit(item: any) {
		this.editItem = { ...item };
		this.isVisible = true;
	}
	// 点击录入
	handleOk(): void {
		let { dy_Monitoring_ID, dy_BloggerInfo_ID, Sex, Information, Home, Type, Style, Characteristics, Vocals, Split, Original, OriginalShare, Fees, Note, SecUid, FeesShow, VocalsShow } = this.editItem;

		VocalsShow = VocalsShow == '' ? '' : VocalsShow - 0
		FeesShow = FeesShow == '' ? '' : FeesShow - 0
		if (!Number.isInteger(VocalsShow) && Vocals) {
			this.message.info('翻唱唱酬最低价格必须为数字')
			return
		}
		if (!Number.isInteger(FeesShow) && Fees) {
			this.message.info('翻唱视频费用最低价格必须为数字')
			return
		}
		VocalsShow = VocalsShow - 0
		FeesShow = FeesShow - 0
		// if(VocalsShow==0&&Vocals){
		// 	this.message.info('翻唱唱酬最低价格必须为数字0')
		// 	return
		// }
		// if(FeesShow==0&&Fees){
		// 	this.message.info('翻唱视频费用最低价格不能为0')
		// 	return
		// }
		this.loading = true;
		this.api.douyin_listenDarenEdit({ dy_Monitoring_ID, dy_BloggerInfo_ID, Sex, Information, Home, Type, Style, Characteristics, Vocals, Split, Original, OriginalShare, Fees, Note, SecUid, FeesShow, VocalsShow }).subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			if (res.success) {
				this.message.success('修改成功')
				let index = this.list.findIndex((e: any) => e.dy_BloggerInfo_ID == this.editItem.dy_BloggerInfo_ID);
				this.list[index] = { ...this.editItem }
				this.tableshow = false;
				setTimeout(() => {
					this.tableshow = true;
				}, 1)
				this.isVisible = false;
			}
			this.editItem = {}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
			this.message.error('修改失败')
			this.editItem = {}
		})
	}
	// 点击取消
	handleCancel(): void {
		this.isVisible = false;
	}
}
