import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'ngx-audioProcessing',
  templateUrl: './audioProcessing.component.html',
  styleUrls: ['./audioProcessing.component.scss']
})
export class AudioProcessingComponent implements OnInit {
  constructor(public api: ApiService,public common: CommonService) { }
	
  ngOnInit(): void {
  }
  loading=false;
  tagList: any[] = [
    {
      title: "音轨分离",
    },
	{
	  title: "音频降噪",
	},
	{
	  title: "音量归一",
	},
	{
	  title: "音频分段",
	},
  ];
  selectItem = "音轨分离";
  onSelect(item: any): void {
    this.selectItem = item.title;
  }
}
