import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
@Component({
  selector: "ngx-comprehensiveRanking",
  templateUrl: "./comprehensiveRanking.component.html",
  styleUrls: ["./comprehensiveRanking.component.scss"],
})
export class ComprehensiveRankingComponent implements OnInit {
  constructor(public api: ApiService, public common: CommonService) {}
  async ngOnInit() {}
  @Input() ComprehensiveRankingList: any = [];
  OpenLink(link: any) {
    window.open(link);
  }
}
