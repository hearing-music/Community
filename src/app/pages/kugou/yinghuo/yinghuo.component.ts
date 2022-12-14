import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
	selector: 'ngx-yinghuo',
	templateUrl: './yinghuo.component.html',
	styleUrls: ['./yinghuo.component.scss']
})
export class YinghuoComponent implements OnInit {
	constructor(public common: CommonService, public api: ApiService) { }

	ngOnInit(): void {
		this.getYinghuoTag()
	}
	loading = false;
	page = 1;
	pageSize = 20;
	pageTotal = 20;
	list:any=[];

	searchValue = '';
	searchHolder = '搜索';

	genderValue = '全部';
	characteristicValue = '全部';
	styleValue = '全部';
	tagDataArr = []
	// 性别
	gender = ['全部', '男', '女'];
	// 声音特点
	characteristic = ['全部', '烟嗓', '甜美', '磁性', '戏腔', '民族', '抒情', '清亮', '低沉', '伤感', '粤语', '御姐音', '成熟', '欧巴音', '公子音', '复古感'];
	// 音乐风格
	style = ['全部', '流行', '国风', '说唱', '摇滚', 'R&B', '网络情歌', '欧美', '电子', 'Funk', 'Disco'];
	ngModelChange(value: any) {
		console.log(value)
		this.getKugouYinghuo()
	}
	search(value: any) {
		console.log(value)
		this.searchValue = value;
		this.getKugouYinghuo()
	}
	nzPageIndexChange(page:any){
		this.page = page;
		this.getKugouYinghuo()
	}
	getYinghuoTag(){
		this.loading = true;
		this.api.getKugou_yinghuoTag().subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if(res.success){
				this.tagDataArr = res.result.data;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	getKugouYinghuo() {
		this.loading = true;
		this.api.getKugou_yinghuo({
			keyword: this.searchValue,
			page: this.page,
			pageSize: this.pageSize
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if(res.success){
				this.list = res.result;
				this.pageTotal = res.totalCount;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
