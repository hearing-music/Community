import { Component, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
@Component({
	selector: "ngx-comprehensiveRanking",
	templateUrl: "./comprehensiveRanking.component.html",
	styleUrls: ["./comprehensiveRanking.component.scss"],
})
export class ComprehensiveRankingComponent implements OnInit, OnChanges {
	constructor(public api : ApiService, public common : CommonService) { }
	async ngOnInit() { }
	ngOnChanges(changes : SimpleChanges) {
		if (changes.ComprehensiveRankingList) {
			this.initData();
		}
	}
	@Input() ComprehensiveRankingList : any = [];
	OpenLink(link : any) {
		window.open(link);
	}

	initData() {
		if (this.ComprehensiveRankingList.length == 0) return;

		this.ComprehensiveRankingList.forEach((item : any) => {
			if (item[0] == "全站音乐榜单") {
				item.push([]);
				if (item[1].length > 1) {
					let history = JSON.parse(JSON.stringify(item[1]));
					let now = history.splice(history.length - 1, 1)
					item[1] = now;
					// history = [...history,...history]
					// history = [...history,...history]
					// history = [...history,...history]
					// history = [...history,...history]
					item[2] = history.reverse();
				}
			}
			if (item[0] == "咪咕铃声榜") {
				item[1].MiGuRingtonesListHistory = []
				if (item[1].MiGuRingtonesList.length > 1) {
					let history = JSON.parse(JSON.stringify(item[1].MiGuRingtonesList));
					let now = history.splice(history.length - 1, 1)
					item[1].MiGuRingtonesList = now;
					// history = [...history,...history]
					// history = [...history,...history]
					// history = [...history,...history]
					// history = [...history,...history]
					item[1].MiGuRingtonesListHistory = history.reverse();
				}
			}
			if (item[0] == "咪咕尖叫新歌榜") {
				item.push([]);
				let his = this.ComprehensiveRankingList[2][1].MiGuChatterNewSongList;
				let history = JSON.parse(JSON.stringify(his));
				// 没有实时数据 从历史拿最新的
				if (item[1].length == 0) {
					if(his.length!=0){
						let now = history.splice(history.length - 1, 1)
						now[0].singerName = ''
						now[0].singerList.forEach((singer:any)=>{
							singer.singer_url= "https://music.migu.cn/v3/music/artist/"+singer.id;
							now[0].singerName+=singer.name+','
						})
						now[0].music_url = "https://music.migu.cn/v3/music/song/" + now[0].copyrightId;
						now[0].singerName = now[0].singerName.substr(0,now[0].singerName.length-1)
						now[0].periodId = this.formatDate(now[0].periodId)
						item[1] = now;
						item[2] = history.reverse();
					}
					
				}else{
					// 有实时数据 处理历史数据
					if(his.length!=0){
						history.forEach((h:any)=>{
							h.periodId = this.formatDate(h.periodId)
						})
						item[2] = history.reverse();
					}
				}
			}

		})

	}
	formatDate(dateStr:any) {
		dateStr = dateStr+''
	    const year = dateStr.slice(0, 4);
	    const month = dateStr.slice(4, 6);
	    const day = dateStr.slice(6, 8);
	    return `${year}-${month}-${day}`;
	}
}