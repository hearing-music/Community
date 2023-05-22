import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
	selector: 'ngx-enlightenment-songs',
	templateUrl: './enlightenment-songs.component.html',
	styleUrls: ['./enlightenment-songs.component.scss']
})
export class EnlightenmentSongsComponent implements OnInit {

	constructor(public api: ApiService, public common: CommonService, public message: NzMessageService) { }
	@Input() songsListFree:any;
	@Input() songsListPay:any;
	priceList:any = []
	lll:any = [1,2]
	ngOnInit(){
		
	}
	goBack(){
	}
	downloadUrl(url:string){
		window.open(url)
	}
	mouseenter(item:any){
		this.priceList = item.priceList;
		item.pricemouseShow = true;
	}
	mouseleave(item:any){
		item.pricemouseShow = false;
	}
	nowIndex = 0;
	isPlay=false;
	audioSrc = ''
	// playAudio(url: string, i: number) {
	// 	this.isPlay = true;
	// 	this.nowIndex = i;
	// 	this.audioSrc = url;
	// 	let audio: any = document.getElementById('audio')
	// 	setTimeout(() => {
	// 		this.songsList.forEach((item: any, index: number) => {
	// 			if (index == i) {
	// 				item.isPlay = !item.isPlay
	// 				if (item.isPlay) {
	// 					audio.play()
	// 				} else {
	// 					audio.pause()
	// 				}
	// 			} else {
	// 				item.isPlay = false;
	// 			}
	// 		})
	// 	}, 100)
	// }
	// play(element: any) {
	// 	this.songsList[this.nowIndex].isPlay = true;
	// }
	// pause() {
	// 	this.songsList.forEach((item: any) => {
	// 		item.isPlay = false;
	// 	})
	// }
	// ended(){
	// 	console.log('完成播放')
	// 	this.songsList.forEach((item: any) => {
	// 		item.isPlay = false;
	// 	})
	// }
	
}
