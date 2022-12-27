import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'ngx-lyric',
  templateUrl: './lyric.component.html',
  styleUrls: ['./lyric.component.scss']
})
export class LyricComponent implements OnInit {
 @Input() lyricData: any;
  constructor() { }

  ngOnInit(): void {
  }
	// 当前歌词
	lyricIndex:any = 0;
	// 歌词上滚
	lyricUp(currentTime:any) {
		for(let i = 0;i <this.lyricData.length;i++){
			if (currentTime * 1000 > this.lyricData[i].key) {
				this.lyricIndex = this.lyricData[i].key
			}
		}
	}
}
