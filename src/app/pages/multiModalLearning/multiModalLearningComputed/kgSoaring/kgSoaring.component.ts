import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-kgSoaring",
  templateUrl: "./kgSoaring.component.html",
  styleUrls: ["./kgSoaring.component.scss"],
})
export class KgSoaringComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {
  }
@Input() KGSoaringSongs:any=[]
@Input() ThreePartyInterface:any=[]
//酷狗歌手页
  openLink(id: string | number) {
    window.open("https://www.kugou.com/singer/" + id + ".html");
  }
}
