import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-dyVedioTopFive",
  templateUrl: "./dyVedioTopFive.component.html",
  styleUrls: ["./dyVedioTopFive.component.scss"],
})
export class DyVedioTopFiveComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {
  }
@Input() DyVedioTopFive:any=[]
@Input() loading:any=true;
@Input() DyVedioTopFiveTime=300;
openDetail(item: any) {
    window.open("https://www.douyin.com/discover?modal_id=" + item);
  }
}
