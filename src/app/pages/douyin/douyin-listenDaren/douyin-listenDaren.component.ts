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
		this.douyin_getListenDaren()
	}
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
	// 获取视频详情 以及 达人最新信息
	async getVideoDetail(item:any){
		item.loadingFinished=false;
		item.seeVideo=true;
		let res: any = await this.getDouYinBloggerVideoOne(item.SecUid)
		if(res){
			item.urlList = res.urlList
			item.Nickname = res.nickName
			item.signature = res.signature
			item.followerCount = res.followerCount
			item.totalFavorited = res.totalFavorited
			item.BloggerVideo = res.BloggerVideo
			item.loadingFinished = true
			item.BloggerVideoErr = false
			item.isShowRadio = true;
		}else{
			item.BloggerVideoErr = true
			item.loadingFinished = true
		}
	}
	
	openVideoView(item:any){
		if(item.seeVideo){
			item.isShowRadio = item.isShowRadio?false:true;
		}else{
			this.getVideoDetail(item)
			
		}
	}
	
	ToRadio(aweme_id: any,secUid:any) {
	  window.open(
	    "https://www.douyin.com/user/"+secUid+"?modal_id=" +aweme_id
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
		this.api.douyin_getListenDaren({ pageSize: this.pageSize, page: this.page, keyword: this.searchValue, type: this.type ? '我的' : '全部' })
			.subscribe((res: any) => {
				console.log(res)
				if (res.success) {
					res.result.forEach((item: any) => {
						item.homeUrl = 'https://www.douyin.com/user/' + item.SecUid
						item.expand = false;
						item.BloggerVideo = []
						item.seeVideo = false;
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
		let { dy_Monitoring_ID, dy_BloggerInfo_ID, Sex, Information, Home, Type, Style, Characteristics, Vocals, Split, Original, OriginalShare, Fees, Note, SecUid } = this.editItem;
		this.loading = true;
		this.api.douyin_listenDarenEdit({ dy_Monitoring_ID, dy_BloggerInfo_ID, Sex, Information, Home, Type, Style, Characteristics, Vocals, Split, Original, OriginalShare, Fees, Note, SecUid }).subscribe((res: any) => {
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
