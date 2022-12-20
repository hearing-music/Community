import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from "../../../services/common.service";
@Component({
	selector: 'ngx-lsdd',
	templateUrl: './lsdd.component.html',
	styleUrls: ['./lsdd.component.scss']
})
export class LsddComponent implements OnInit {
	@Input() lsddList: any;
	constructor(public common: CommonService) { }

	ngOnInit(): void {
	}
	audioSrc = ''
	playAudio(url: string, i: number) {
		this.audioSrc = url;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.lsddList.forEach((item: any, index: number) => {
				if (index == i) {
					item.isPlay = !item.isPlay
					if (item.isPlay) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					item.isPlay = false;
				}
			})
		}, 50)
	}
	play(element: any) {
		console.log(element.srcElement.currentSrc)
		var i = this.lsddList.findIndex((e: any) => e.src == element.srcElement.currentSrc)
		if (i !== -1) {
			this.lsddList[i].isPlay = true;
		}
	}
	pause() {
		this.lsddList.forEach((item: any) => {
			item.isPlay = false;
		})
	}
}
