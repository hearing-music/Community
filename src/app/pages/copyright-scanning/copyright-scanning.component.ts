import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-copyright-scanning',
  templateUrl: './copyright-scanning.component.html',
  styleUrls: ['./copyright-scanning.component.scss']
})
export class CopyrightScanningComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }
	tagList :any[]= [
		'搜索版权',
		'检查文件版权'
	]
	activeTag = '搜索版权'
	
	onSelect(item:string){
		this.activeTag = item;
	}
}
