import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-wy',
  templateUrl: './wy.component.html',
  styleUrls: ['./wy.component.scss']
})
export class WYComponent implements OnInit {
  @Input() listOfData: any;
  constructor() { }

  ngOnInit(): void {
  }
  toWyy(date: any) {
    window.open("https://music.163.com/#/song?id=" + date)
  }
}
