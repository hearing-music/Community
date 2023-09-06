import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-lyric-all',
  templateUrl: './lyric-all.component.html',
  styleUrls: ['./lyric-all.component.scss']
})
export class LyricAllComponent implements OnInit {
 @Input() lyricData: any;
 @Input() lyricReadly: any;
 @Input() songName: any;
 @Input() isphone: any=false;
 @Input() rankList: any = [];
 @Input() top: any = '50%';
 @Output() closeLyric=new EventEmitter();
 close(e:any) {
 	this.closeLyric.emit()
	e.stopPropagation();
 }
  constructor() { }
mousemove(e:any){
	e.stopPropagation();
}
  ngOnInit(): void {
  }
}
