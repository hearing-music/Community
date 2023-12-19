import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-tool',
  templateUrl: './tool.component.html',
  styleUrls: ['./tool.component.scss']
})
export class ToolComponent implements OnInit {
  tagList: any[] = [{
    name: '银行',
    holder: '搜索银行'
  },
  {
    name: '转换文件',
    holder: '转换文件'
  },
	{
	  name: 'json格式化',
	  holder: 'json格式化'
	},
    {
      name: '监测',
      holder: '监测'
    },
		{
		  name: 'PDF转WORD',
		  holder: ''
		}
  ]
  selectItem = '银行';
  constructor() { }

  ngOnInit(): void {
  }
  onSelect(item: any): void {
    this.selectItem = item.name;
  }
}
