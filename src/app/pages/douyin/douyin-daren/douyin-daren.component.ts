import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
	selector: 'ngx-douyin-daren',
	templateUrl: './douyin-daren.component.html',
	styleUrls: ['./douyin-daren.component.scss']
})
export class DouyinDarenComponent implements OnInit {
	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) {
	}
	ngOnInit(): void {
		// setTimeout(() => {
		// 	this.isVisible = true;
		// }, 2000)
	}
	fallback = 'data:image/png;base64,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'
	loading = false;
	searchValue: any = ''
	searchHolder: any = '请搜索抖音达人名字'
	list: any = []

	page = 1;
	information: any = ''
	// <!-- 艺人主页 Home -->
	Home: any = ''
	// <!-- 艺人类型 Type -->
	Type: any = ''
	// <!-- 艺人风格 Style -->
	Style: any = ''
	// <!-- 嗓音特点 Characteristics -->
	Characteristics: any = ''
	// <!-- 翻唱唱酬 Vocals -->
	Vocals: any = ''
	// <!-- 翻唱分成 Split -->
	Split: any = ''
	// <!-- 原创唱酬 Original -->
	Original: any = ''
	// <!-- 原创分成 OriginalShare -->
	OriginalShare: any = ''
	// <!-- 翻唱视频费用 Fees -->
	Fees: any = ''
	// <!-- 备注  Note -->
	Note: any = ''

	search(e: any) {
		this.searchValue = e;
		this.page = 1;
		this.douyin_darenSearch()
	}
	pageNext() {
		this.page += 1;
		this.douyin_darenSearch()
	}
	isVisible = false;
	selectIndex: any = ''
	// 监控达人
	listenDaren(item: any, index: number) {
		this.douyin_isListen(item)
		this.selectIndex = index;
	}

	// 是否被监控
	douyin_isListen(item: any) {
		this.loading = true;
		this.api.douyin_isListen({ SecUid: item.SecUid })
			.subscribe((res: any) => {
				console.log(res)
				this.loading = false;
				item.isListen = res.result;
				this.isVisible = true;
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
	}
	// 点击录入
	handleOk(): void {
		this.douyin_listenDaren()
	}
	// 点击取消
	handleCancel(): void {
		this.isVisible = false;
	}
	// 添加监控达人
	douyin_listenDaren() {
		let obj = this.list[this.selectIndex]
		var Information = this.information;
		var Home = this.Home;
		var Type = this.Type;
		var Style = this.Style;
		var Characteristics = this.Characteristics;
		var Vocals = this.Vocals;
		var Split = this.Split;
		var Original = this.Original;
		var OriginalShare = this.OriginalShare;
		var Fees = this.Fees;
		var Note = this.Note;
		if (!Information || !Home || !Type || !Style || !Characteristics || !Vocals || !Split || !Original || !OriginalShare || !Fees) {
			this.message.info('缺少必填参数')
			return
		}
		var Nickname = obj.Nickname;
		var AwemeId = obj.AwemeId;
		var SecUid = obj.SecUid;
		var UniqueId = obj.UniqueId;
		var Clicklike = obj.Weighting.clicklike[0];
		var Fans = obj.Weighting.fans[0];
		var Follow = obj.Weighting.follow[0];
		var Works = obj.Weighting.works[0];
		this.loading = true;
		this.api.douyin_listenDaren({ Nickname, AwemeId, SecUid, UniqueId, Clicklike, Fans, Follow, Works, Information,
		Home,Type,Style,Characteristics,Vocals,Split,Original,OriginalShare,Fees,Note}).subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			this.isVisible = false;
			this.information = ''
			this.message.success('添加监控成功')
		}, (err: any) => {
			console.log(err)
			this.loading = false;
			this.information = ''
		})
	}

	// 达人搜索
	douyin_darenSearch() {
		this.loading = true;
		this.api.douyin_darenSearch({ page: this.page, keyword: this.searchValue })
			.subscribe((res: any) => {
				console.log(res)
				this.loading = false;
				res.result.forEach((item: any) => {
					item.homeUrl = 'https://www.douyin.com/user/' + item.SecUid
					try{
						item.Weighting = this.common.strToJson(item.Weighting)
						item.Weighting.clicklike = item.Weighting.clicklike.split(' - ')
						item.Weighting.fans = item.Weighting.fans.split(' - ')
						item.Weighting.follow = item.Weighting.follow.split(' - ')
						item.Weighting.location = item.Weighting.location.split(' - ')
						item.Weighting.location[0] = item.Weighting.location[0].split('IP属地：')
						item.Weighting.location[0] = item.Weighting.location[0][1]
						item.Weighting.valuation = item.Weighting.valuation.split(' - ')
						item.Weighting.works = item.Weighting.works.split(' - ')
						item.Weighting.flow = item.Weighting.flow.split(' - ')
						item.Weighting.index = item.Weighting.index.split(' - ')
						item.Weighting.score = item.Weighting.score.split(' - ')
					}catch(e){
						//TODO handle the exception
						item.Weighting = {
							fans:['','',''],
							clicklike:['','',''],
							follow:['','',''],
							location:['','',''],
							valuation:['','',''],
							works:['','',''],
							index:['','',''],
							score:['','',''],
							flow:['','',''],
						}
					}
				})
				this.list = [...this.list, ...res.result]
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
	}
	goHomeUrl(url: string) {
		window.open(url)
	}

}
