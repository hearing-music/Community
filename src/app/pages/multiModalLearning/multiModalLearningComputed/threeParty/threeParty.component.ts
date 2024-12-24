import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-threeParty",
  templateUrl: "./threeParty.component.html",
  styleUrls: ["./threeParty.component.scss"],
})
export class ThreePartyComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {
  }
@Input() ThreePartyInterface:any=[]
@Input() loading:any=true;

//酷狗歌手页
  openLink(id: string | number) {
    window.open("https://www.kugou.com/singer/" + id + ".html");
  }
}
