import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ngx-enlightenment-top20',
  templateUrl: './enlightenment-top20.component.html',
  styleUrls: ['./enlightenment-top20.component.scss']
})
export class EnlightenmentTop20Component implements OnInit {
	@Input() enlightenmentList: any;
  constructor(public common: CommonService,public api: ApiService,private toast:ToastrService) { }
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
  
  // 打开公司
  openCompay(id:string|number){
  	window.open('https://y.qq.com/portal/company_detail.html?id='+id+'#sort=1&type=album')
  }
  // 打开链接
  openSongDetail(songMid:string){
	  if(!songMid){
		  this.toast.info('暂时没有MID')
		  return
	  }
  	window.open('https://y.qq.com/n/ryqq/songDetail/'+songMid);
  	
  }

}
