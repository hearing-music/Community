import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-fufu-singer',
  templateUrl: './fufu-singer.component.html',
  styleUrls: ['./fufu-singer.component.scss']
})

export class FufuSingerComponent implements OnInit {
  constructor(public api: ApiService, private message: NzMessageService,public common: CommonService,) { }
  @Input() fufuSingerList: any;
  ngOnInit(): void {
    
  }
}
