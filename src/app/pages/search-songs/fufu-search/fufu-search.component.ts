import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-fufu-search',
  templateUrl: './fufu-search.component.html',
  styleUrls: ['./fufu-search.component.scss']
})
export class FufuSearchComponent implements OnInit {
  constructor(public api: ApiService, private message: NzMessageService,public common: CommonService,) { }
  @Input() fufuList: any;
  ngOnInit(): void {
    
  }
  
}
