import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { ToastrService } from 'ngx-toastr';
import * as echarts from 'echarts';
@Component({
	selector: 'ngx-douyin-assayVideo',
	templateUrl: './douyin-assayVideo.component.html',
	styleUrls: ['./douyin-assayVideo.component.scss']
})
export class DouyinAssayVideoComponent implements OnInit {
	fallback = 'data:image/png;base64,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'
	constructor(public api: ApiService, public common: CommonService, private toast: ToastrService,) {
	}
	ngOnInit(): void {
		echarts.registerMap('china', this.common.geoCoordMap);
	}
	nzSelectedIndex3=0
	nzSelectedIndex2=0
	nzSelectedIndex1=0
	searchValue:any=''
	searchHolder:any='请输入视频链接或id'
	loading: any = false
	visible: any = false;
	result: any ={}
	visiblechange(e: any) {
		// console.log(e)
	}
	// 热榜 视频分析
	getDouHotBear() {
		let aweme_id = this.searchValue;
		if (!aweme_id) return
		this.loading = true;
		this.api.getDouHotBear({ aweme_id }).subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			if (res.success) {
				if (res.result.sentence_type == 5) {
					res.result.type = '挑战榜'
				}
				this.result = res.result;
				// this.setEoptions('点赞')
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	// 作者趋势分析
	getDouAuthorInfo(item: any) {
		let sec_uid = item.author_id;
		if (!item.author && sec_uid) {
			this.loading = true;
			this.api.getDouAuthorInfo({ sec_uid }).subscribe((res: any) => {
				this.loading = false;
				if (res.success) {
					
					this.result.author = res.result
					this.result.authorFinished = true
					console.log(this.result)
					// this.fansprogressCount(res.result.fans_milestone)
					// this.setEoptions3('新增点赞量')
					// this.setEoptions4(this.result)
					// this.setEoptions5(this.result)
					// this.setEoptions6(this.result)
					// this.setEoptions7(this.result)
				}
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
		}
	}
	// 热点详情
	getDouSentenceDetail(item: any) {
		let sentence_id = item.sentence_id
		if (!item.sentenceDetail && sentence_id) {
			this.loading = true;
			this.api.getDouSentenceDetail({ sentence_id }).subscribe((res: any) => {
				console.log(res)
				this.loading = false;
				if (res.success) {
					res.result.Top30Video = res.result.Top30Video || []
					res.result.DouSentenceTimeline = this.common.quchong(res.result.DouSentenceTimeline,'billBoard_type')
					this.result.sentenceDetail = res.result;
					this.result.sentenceDetailFinished = true
					// this.setEoptions2('热度值')
				}
			}, (err: any) => {
				console.log(err)
				this.loading = false;
			})
		}else{
			this.result.sentenceDetailFinished = true
		}
	}
	search(value: any) {
		if (this.loading) return
		let index = value.indexOf('modal_id=')
		let index2 = value.indexOf('https://www.douyin.com/video/')
		if (index != -1) {
			value = value.substr(index + 9)
			let index3 = value.indexOf('&');
			if (index3 != -1) {
				value = value.substr(0, index3)
			}
		} else if (index2 != -1) {
			value = value.substr(index2 + 29)
			let index4 = value.indexOf('?');
			if (index4 != -1) {
				value = value.substr(0, index4)
			}
		}
		if (index == -1 && index2 == -1) {
			if (isNaN(Number(value))) {
				this.toast.error('格式错误')
				return
			}
		}
		this.nzSelectedIndex3=0
		this.nzSelectedIndex2=0
		this.nzSelectedIndex1=0
		this.searchValue = value;
		this.getDouHotBear()
	}
	nzSelectedIndexChange(e: any) {
		if (e == 1) {
			// 热点详情
			this.getDouSentenceDetail(this.result)
		}
		if (e == 2) {
			// 作者趋势
			this.getDouAuthorInfo(this.result)
		}
	}
}
