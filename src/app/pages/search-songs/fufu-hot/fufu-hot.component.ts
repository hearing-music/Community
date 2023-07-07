import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-fufu-hot',
  templateUrl: './fufu-hot.component.html',
  styleUrls: ['./fufu-hot.component.scss']
})

export class FufuHotComponent implements OnInit {
  constructor(public api: ApiService, private message: NzMessageService,public common: CommonService,) { }
  @Input() fufuHotList: any;
  ngOnInit(): void {
    
  }
}
