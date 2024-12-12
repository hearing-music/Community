import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-qqkgInfo",
  templateUrl: "./qqkgInfo.component.html",
  styleUrls: ["./qqkgInfo.component.scss"],
})
export class QqkgInfoComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {
  }
@Input() obData:any={}
}
