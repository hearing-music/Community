import { Component, OnInit, ViewChild } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { ToastrService } from "ngx-toastr";
import { MultiModalLearningShowComponent } from "./multiModalLearningShow/multiModalLearningShow.component";
@Component({
  selector: "ngx-multiModalLearning",
  templateUrl: "./multiModalLearning.component.html",
  styleUrls: ["./multiModalLearning.component.scss"],
})
export class MultiModalLearningComponent implements OnInit {
  @ViewChild(MultiModalLearningShowComponent) childComponent!: MultiModalLearningShowComponent;
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {}
  tagList: any = [{ name: "计算器" }, { name: "我的评估" }];
  selectItem = "计算器";
  onSelect(e: any) {
    this.selectItem = e.name;
  }
  searchFilter: any = "";
  focus(e: any) {
    e.preventDefault();
    document.onkeydown = (event_e: any) => {
      if (event_e.keyCode === 13) {
        this.childComponent.filterSearch();
      }
    };
  }
  blur() {
    document.onkeydown = null;
  }
}
