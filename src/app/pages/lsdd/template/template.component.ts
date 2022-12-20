import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { CommonService } from "../../../services/common.service";
@Component({
	selector: 'ngx-template',
	templateUrl: './template.component.html',
	styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
	@Input() list: any;
	constructor(public common: CommonService) { }
	ngOnInit(): void {
	}
	audioSrc = '';
	playAudio(url: string, i: number) {
		this.audioSrc = url;
		let audio: any = document.getElementById('audio')
		setTimeout(() => {
			this.list.forEach((item: any, index: number) => {
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
		var i = this.list.findIndex((e: any) => e.mp3url == element.srcElement.currentSrc)
		if (i !== -1) {
			this.list[i].isPlay = true;
		}
	}
	pause() {
		this.list.forEach((item: any) => {
			item.isPlay = false;
		})
	}
	// 切换回来 哪首歌正在播放 显示播放
	ngOnChanges(change: SimpleChanges) {
		var i = change.list.currentValue.findIndex((e: any) => e.mp3url == this.audioSrc)
		let audio: any = document.getElementById('audio')
		if (i !== -1&&!audio.paused) {
			this.list[i].isPlay = true;
		}
	}
}
