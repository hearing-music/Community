import { Component, Input, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'ngx-mcsc-search-hk',
  templateUrl: './mcsc-search-hk.component.html',
  styleUrls: ['./mcsc-search-hk.component.scss']
})
export class McscSearchHKComponent implements OnInit {
  constructor( private message: NzMessageService) { }
  @Input() McscSearchHKList: any;
  ngOnInit(): void {
    
  }

}
