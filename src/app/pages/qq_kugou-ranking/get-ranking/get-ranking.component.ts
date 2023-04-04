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
	publish_timeOrderby='asc'
	create_timeOrderby='asc'
	orderby = 'create_time'
	plain = 'asc'
	// 排序
	publish_timeClick(){
		if(this.publish_timeOrderby == 'desc'){
			this.publish_timeOrderby = 'asc'
		}else{
			this.publish_timeOrderby = 'desc'
		}
		this.orderby = 'publish_time'
		this.plain = this.publish_timeOrderby
		this.pageCurrent = 1;
		this.getqq_kugouInfo()
	}
	create_timeClick(){
		if(this.create_timeOrderby == 'desc'){
			this.create_timeOrderby = 'asc'
		}else{
			this.create_timeOrderby = 'desc'
		}
		this.orderby = 'create_time'
		this.plain = this.create_timeOrderby
		this.pageCurrent = 1;
		this.getqq_kugouInfo()
	}
	
	refresh(data:any){
		this.loading = true;
		this.api.getqq_kugouKeywordRanking({
			mid:data.qq_mid,
			scid:data.kg_scid,
			keyword:data.keyword
		}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				if(res.result.qqRank != 0){
					data.newqq_rank = res.result.qqRank;
				}
				if(res.result.kugouRank.rank!=0){
					data.newkg_rank = res.result.kugouRank.rank;
				}
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
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
			type: this.switch ? 'my' : '',
			orderby:this.orderby,
			plain:this.plain
		}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				res.result.forEach((item: any) => {
					item.qq_rankingKeys = Object.keys(item.qq_ranking)
					item.qq_rankingValues = Object.values(item.qq_ranking)
					// item.qq_rankingValues.forEach((citem:any,cindex:number)=>{
					// 	citem.time = item.qq_rankingKeys[cindex]
					// })
					// item.qq_rankingKeys.forEach((citem:any,cindex:number)=>{
					// 	citem = this.common.timeFormat(citem-0,'yyyy-mm-dd')
					// })
					item.kg_rankingKeys = Object.keys(item.kg_ranking)
					item.kg_rankingValues = Object.values(item.kg_ranking)
					// item.kg_rankingValues.forEach((citem:any,cindex:number)=>{
					// 	citem.time = item.kg_rankingKeys[cindex]
					// })
					item.qq_rankingValues = item.qq_rankingValues.slice(-7)
					item.qq_rankingKeys = item.qq_rankingKeys.slice(-7)
					item.kg_rankingValues = item.kg_rankingValues.slice(-7)
					item.kg_rankingKeys = item.kg_rankingKeys.slice(-7)
					item.ranking = []
					item.newqq_rank = item.qq_rankingValues[item.qq_rankingValues.length-1].rank;
					item.newkg_rank = item.kg_rankingValues[item.kg_rankingValues.length-1].myRank;
					for (let i = 0; i < item.qq_rankingValues.length; i++) {
						let kgIndex = item.kg_rankingKeys.findIndex((e:any)=>this.common.timeFormat(e,'yyyy-mm-dd')==this.common.timeFormat(item.qq_rankingKeys[i],'yyyy-mm-dd'))
						item.ranking.push({ qq: { time: item.qq_rankingKeys[i], ...item.qq_rankingValues[i] }, kugou: (kgIndex!=-1)?{ time: item.kg_rankingKeys[kgIndex], ...item.kg_rankingValues[kgIndex] }:{}})
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
