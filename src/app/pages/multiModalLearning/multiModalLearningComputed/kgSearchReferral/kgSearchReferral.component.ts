import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-kgSearchReferral",
  templateUrl: "./kgSearchReferral.component.html",
  styleUrls: ["./kgSearchReferral.component.scss"],
})
export class KgSearchReferralComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  @Input() KGSearchRecommendations:any=[]
  @Input() loading=true;
  async ngOnInit() {}
  
  
  
isVisibleRecommendations=false;


handleCancelRecommendations(): void {
    this.isVisibleRecommendations = false;
  }
  showKGSearchRecommendations() {
    this.isVisibleRecommendations = true;
  }
  //酷狗歌曲页
  openSongs(item: any) {
    // https://www.kugou.com/song/#j410q60
    if (item.eMixSongID) {
      window.open("https://www.kugou.com/song/#" + item.eMixSongID);
    }
  }
}
