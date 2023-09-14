import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { CommonService } from "../../../services/common.service";
@Component({
  selector: "ngx-ISRC",
  templateUrl: "./ISRC.component.html",
  styleUrls: ["./ISRC.component.scss"],
})
export class ISRCComponent implements OnInit {
  constructor(
    public api: ApiService,
    private message: NzMessageService,
    public common: CommonService
  ) {}
  ngOnInit(): void {}
  @Input() ISRCList: any;
 
}
