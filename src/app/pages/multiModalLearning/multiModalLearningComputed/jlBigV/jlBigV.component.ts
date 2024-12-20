import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-jlBigV",
  templateUrl: "./jlBigV.component.html",
  styleUrls: ["./jlBigV.component.scss"],
})
export class JlBigVComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {}

  @Input() MassiveArithmeticDaRen: any = [];

  //巨量达人跳转主页  || 视频主页
  OpenDy(item: any) {
    window.open(item);
  }
  //巨量达人显示7/30
  ChangeWeek(item: any) {
    item.dayWeek = !item.dayWeek;
  }
  getTimeCode(data: any) {
    const maxCreateTime = data.reduce(
      (max: any, item: any) =>
        item.create_time > max.create_time ? item : max,
      data[0]
    );
    const minCreateTime = data.reduce(
      (min: any, item: any) =>
        item.create_time < min.create_time ? item : min,
      data[0]
    );
    let maxDate = this.formatDate(maxCreateTime.create_time);
    let minDate = this.formatDate(minCreateTime.create_time);
    return minDate + "至" + maxDate;
  }
  formatDate(create_time: any) {
    const year = create_time.substring(0, 4);
    const month = create_time.substring(4, 6);
    const day = create_time.substring(6, 8);
    return `${year}-${month}-${day}`;
  }
  calculateHeight() {
    if (this.MassiveArithmeticDaRen.length>1) {
      const height = 390 / this.MassiveArithmeticDaRen.length;
      return `${height}px`;
    } else {
      return `400px`;
    }
  }
}
