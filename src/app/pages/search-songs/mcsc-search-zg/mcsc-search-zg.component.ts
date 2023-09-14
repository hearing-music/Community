import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from "../../../services/common.service";
@Component({
  selector: 'ngx-mcsc-search-zg',
  templateUrl: './mcsc-search-zg.component.html',
  styleUrls: ['./mcsc-search-zg.component.scss']
})
export class McscSearchZGComponent implements OnInit {
  constructor( private message: NzMessageService,public common: CommonService) { }
  @Input() McscSearchZGList: any;
  ngOnInit(): void {
    
  }
}
