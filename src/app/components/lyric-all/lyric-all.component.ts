import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'ngx-lyric-all',
  templateUrl: './lyric-all.component.html',
  styleUrls: ['./lyric-all.component.scss']
})
export class LyricAllComponent implements OnInit {
 @Input() lyricData: any;
 @Input() lyricReadly: any;
  constructor() { }

  ngOnInit(): void {
  }
}
