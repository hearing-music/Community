import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-enlightenment-top20',
  templateUrl: './enlightenment-top20.component.html',
  styleUrls: ['./enlightenment-top20.component.scss']
})
export class EnlightenmentTop20Component implements OnInit {
	@Input() enlightenmentList: any;
  constructor(public common: CommonService,public api: ApiService) { }
  priceList:any = []
	goChangJiangHome(url:string){
		window.open(url)
	}
	
	mouseenter(item:any){
		this.priceList = item.priceList;
		item.pricemouseShow = true;
	}
	mouseleave(item:any){
		item.pricemouseShow = false;
	}
  ngOnInit(): void {
  }

}
