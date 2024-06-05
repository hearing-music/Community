import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { Router } from '@angular/router';
@Component({
	selector: 'ngx-v3-phone',
	templateUrl: './v3-phone.component.html',
	styleUrls: ['./v3-phone.component.scss'],
})
export class V3PhoneComponent implements OnInit {
	@Input() kugouV3List: any;
	constructor(public common: CommonService, public api: ApiService, private router: Router) { }
	ngOnInit(): void {

	}
	openSongDetail(EMixSongID: string) {
		window.open('https://www.kugou.com/song/#'+EMixSongID)
	}
	openExponentLink(item: any) {
		window.open('https://h5.kugou.com/achievement/v-a34ccad0/index.html?audio_id=' + item.scid + '&hash=' + item.FileHash + '&mixsongid=' + item.MixSongID)
	}
	copyScid(scid: string | number) {
		this.common.copy(scid + '')
	}
	addScid(scid: string | number) {
		this.router.navigate(['/pages/set-ranking/', scid]);
	}
	// 获取歌词
	getLyric(item: any) {
		this.api.getKugouLyric({
			hash: item.FileHash,
		}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				item.lyricText = res.result
				item.lyricData2 = this.common.parseLRC3(item.lyricText)
				item.lyricReadly = true;
			}
		}, (err: any) => {
			console.log(err)
		})

	}
	lyricClick(item:any){
		item.lyricShow = true;
		if (item.lyricText) {
			item.lyricReadly = true;
		} else {
			item.lyricReadly = false;
			this.getLyric(item)
		}
	}
	closeLyric(i:any){
		this.kugouV3List[i].lyricShow = false;
	}
	
	refreshListenPeopleNum(item: any, index: any) {
		this.api.getV3ListenPeopleNum({
			mixsongid: item,
		}).subscribe((res: any) => {
			if (res.success) {
				this.kugouV3List[index].listenPeopleCount = res.result.listenPeopleCount
				this.kugouV3List[index].listenPeopleArr = res.result.listenPeopleArr
			}
		}, (err: any) => {
			console.log(err)
		})
	}
	refreshSingingPeopleNum(item: any, index: any) {
		this.api.getV3SingingPeople({
			songname: this.common.deleteEM(item),
		}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				this.kugouV3List[index].singingPeople = res.result.singingPeople
			}
		}, (err: any) => {
			console.log(err)
		})
	}
	goToSeeSinger(url: any, index: any) {
		window.open(url)
	}
}
