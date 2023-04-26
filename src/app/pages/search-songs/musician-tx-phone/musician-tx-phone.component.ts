import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-musician-tx-phone',
  templateUrl: './musician-tx-phone.component.html',
  styleUrls: ['./musician-tx-phone.component.scss']
})
export class MusicianTxPhoneComponent implements OnInit {
@Input() musicianTxList: any;
	constructor(public common: CommonService) { }
  ngOnInit(): void {
	  
  }
	
}
