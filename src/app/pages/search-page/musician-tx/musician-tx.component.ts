import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-musician-tx',
  templateUrl: './musician-tx.component.html',
  styleUrls: ['./musician-tx.component.scss']
})
export class MusicianTxComponent implements OnInit {
@Input() musicianTxList: any;
	constructor(public common: CommonService) { }
  ngOnInit(): void {
	  
  }
	
}
