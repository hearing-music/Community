import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-qqkgRank",
  templateUrl: "./qqkgRank.component.html",
  styleUrls: ["./qqkgRank.component.scss"],
})
export class QqkgRankComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {
  }
  @Input() loading=true;
@Input() obData:any={}
}
