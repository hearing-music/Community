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
}
