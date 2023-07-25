import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-auto-search',
  templateUrl: './auto-search.component.html',
  styleUrls: ['./auto-search.component.scss']
})
export class AutoSearchComponent implements OnInit {
	constructor(public common: CommonService, public api: ApiService) { }
	
	ngOnInit(): void {
	}
	loading=false;
	
}
