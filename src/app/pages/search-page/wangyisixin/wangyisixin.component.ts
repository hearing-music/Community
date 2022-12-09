import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-wangyisixin',
  templateUrl: './wangyisixin.component.html',
  styleUrls: ['./wangyisixin.component.scss']
})
export class WangyisixinComponent implements OnInit {

 @Input() wangyisixinList: any;
 	constructor(public common: CommonService) { }
   ngOnInit(): void {
 	  
   }
	openWeibo(url:string){
		window.open(url)
	}
}
