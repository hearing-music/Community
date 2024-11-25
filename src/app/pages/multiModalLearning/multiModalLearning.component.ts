import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-multiModalLearning",
  templateUrl: "./multiModalLearning.component.html",
  styleUrls: ["./multiModalLearning.component.scss"],
})
export class MultiModalLearningComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {
  }
  tagList: any = [{ name: "计算器" }, { name: "我的评估" }];
  selectItem = "计算器";
  onSelect(e: any) {
    this.selectItem = e.name;
  }
  
}
