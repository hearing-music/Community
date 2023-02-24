import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
@Component({
	selector: 'ngx-get-ranking',
	templateUrl: './get-ranking.component.html',
	styleUrls: ['./get-ranking.component.scss']
})
export class GetRankingComponent implements OnInit {

	constructor(public common: CommonService, public api: ApiService) { }
	ngOnInit(): void {
		this.getqq_kugouInfo()
	}
	searchValue = ''
	data: any = []
	loading = false;
	pageCurrent = 1;
	pageSize = 10;
	pageTotal = 0;
	switch = false;
	active = false;
	openqq(mid: string) {
		window.open('https://y.qq.com/n/ryqq/songDetail/' + mid)
	}
	openkg(scid: string | number, hash: string) {
		window.open('https://www.kugou.com/song/#hash=' + hash + '&album_audio_id=' + scid)
	}
	ngModelChange(e: any) {
		this.switch = e;
		this.search('')
	}
	nzPageIndexChange(e: any): void {
		this.pageCurrent = e
		this.getqq_kugouInfo()
		console.log(e)
	}
	search(e: any) {
		console.log(e)
		this.searchValue = e;
		this.pageCurrent = 1
		this.getqq_kugouInfo()
	}
	getqq_kugouInfo() {
		this.loading = true;
		this.api.getqq_kugouInfo({
			page: this.pageCurrent,
			pageSize: this.pageSize,
			keyword: this.searchValue,
			type: this.switch ? 'my' : ''
		}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				res.result.forEach((item: any) => {
					item.qq_rankingValues = Object.values(item.qq_ranking)
					item.qq_rankingKeys = Object.keys(item.qq_ranking)
					item.kg_rankingValues = Object.values(item.kg_ranking)
					item.kg_rankingKeys = Object.keys(item.kg_ranking)
					item.qq_rankingValues = item.qq_rankingValues.slice(-10)
					item.qq_rankingKeys = item.qq_rankingKeys.slice(-10)
					item.kg_rankingValues = item.kg_rankingValues.slice(-10)
					item.kg_rankingKeys = item.kg_rankingKeys.slice(-10)
					item.ranking = []
					for (let i = 0; i < item.qq_rankingValues.length; i++) {
						item.ranking.push({ qq: { time: item.qq_rankingKeys[i], ...item.qq_rankingValues[i] }, kugou: item.kg_rankingKeys[i]?{ time: item.kg_rankingKeys[i], ...item.kg_rankingValues[i] }:{}})
					}
					item.expand = false;
				})
				this.data = res.result;
				this.pageTotal = res.total;
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
