import { Component, OnInit, Input } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { CommonService } from "../../../../services/common.service";
@Component({
  selector: "ngx-chatTemp",
  templateUrl: "./chatTemp.component.html",
  styleUrls: ["./chatTemp.component.scss"],
})
export class ChatTempComponent implements OnInit {
  constructor(public message: NzMessageService, public common: CommonService) {}
  ngOnInit(): void {}
  @Input() chatItem: any = {};
  @Input() myInfo: any = {};
  defaultAvatar = "../../../assets/img/avatar.jpg";
}
