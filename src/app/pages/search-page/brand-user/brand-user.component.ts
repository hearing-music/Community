import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-brand-user',
  templateUrl: './brand-user.component.html',
  styleUrls: ['./brand-user.component.scss']
})
export class BrandUserComponent implements OnInit {

@Input() brandUserList: any;
	constructor(public common: CommonService) { }
  ngOnInit(): void {
  }
  openCompay(id:string|number){
		window.open('https://y.qq.com/portal/company_detail.html?id='+id+'#sort=1&type=album')
	}
}
