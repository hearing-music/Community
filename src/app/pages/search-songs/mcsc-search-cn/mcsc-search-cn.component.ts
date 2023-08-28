import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'ngx-mcsc-search-cn',
  templateUrl: './mcsc-search-cn.component.html',
  styleUrls: ['./mcsc-search-cn.component.scss']
})
export class McscSearchCNComponent implements OnInit {
  constructor( private message: NzMessageService) { }
  @Input() McscSearchCNList: any;
  ngOnInit(): void {
    
  }
}
