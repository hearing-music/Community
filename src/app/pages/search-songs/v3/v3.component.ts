import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { Router } from '@angular/router';
@Component({
	selector: 'ngx-v3',
	templateUrl: './v3.component.html',
	styleUrls: ['./v3.component.scss'],
})
export class V3Component implements OnInit {
	@Input() kugouV3List: any;
	@Output() change: EventEmitter<any> = new EventEmitter<any>();
	constructor(public common: CommonService, public api: ApiService, private router: Router) { }
	ngOnInit(): void {

	}
	playAudio(item: any, i: number) {
		if(item.MusicUrl){
			this.change.emit({src:item.MusicUrl,i});
		}else{
			this.getKugouSongUrl(item,i)
		}
	}
	loading=false;
	getKugouSongUrl(item:any,i:number){
		this.loading = true;
		this.api.getKugouSongUrl({EMixSongID:item.EMixSongID}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				item.MusicUrl = res.result[0];
				this.change.emit({src:item.MusicUrl,i});
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	// 更多版本
	moreVersion(item:any){
		item.isMore = item.isMore?false:true;
	}
	openSongDetail(scid: string | number, hash: string | number) {
		window.open('https://www.kugou.com/song/#hash=' + hash + '&album_audio_id=' + scid)
	}
	openExponentLink(item: any) {
		window.open('https://h5.kugou.com/achievement/v-a34ccad0/index.html?audio_id=' + item.scid + '&hash=' + item.FileHash + '&mixsongid=' + item.MixSongID)
	}
	openAlbum(item: any) {
		if(!item.albumID) return
		window.open('http://www2.kugou.kugou.com/yueku/v8/album/single/' + item.albumID + '-0-1.html')
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
	mouseenter(item: any) {
		item.lyricShow = true;
		if (item.lyricText) {
			item.lyricData2 = this.common.parseLRC3(item.lyricText)
			item.lyricReadly = true;
		} else {
			item.lyricReadly = false;
			this.getLyric(item)
		}
	}
	mouseleave(item: any) {
		item.lyricShow = false;
	}
	// refreshSearchPeopleNum(item: any, index: any) {
	// 	this.api.getV3SearchNum({
	// 		keyword: this.common.deleteEM(item),
	// 	}).subscribe((res: any) => {
	// 		if (res.success) {
	// 			this.kugouV3List[index].searchPeopleCount = res.result.searchPeopleCount
	// 			this.kugouV3List[index].searchPeopleArr = res.result.searchPeopleArr
	// 		}
	// 	}, (err: any) => {
	// 		console.log(err)
	// 	})
	// }
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
	goSingerHome(id:any){
		window.open(`https://www.kugou.com/singer/${id}.html`)
	}
}
