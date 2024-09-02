import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "ngx-volumeOfUse",
  templateUrl: "./volumeOfUse.component.html",
  styleUrls: ["./volumeOfUse.component.scss"],
})
export class VolumeOfUseComponent implements OnInit {
  loading = false;
  constructor(public api: ApiService, private toast: ToastrService) {}

  ngOnInit(): void {}
  result: any = {};
  searchValue = "";
  searchHolder = "请输入音频链接";
  getData() {
    this.loading = true;
    // 使用正则表达式提取musicId的值
    var regex = /musicId=([^&]+)/;
    var match = this.searchValue.match(regex);
    if (match) {
      this.api
        .getkuaishouVolumeOfUse({ keyword: match[1] })
        .subscribe((res: any) => {
          this.loading = false;
          if (res.success) {
            res.result.coverUrls = res.result.coverUrls || {};
            res.result.coverUrls[0] = res.result.coverUrls[0] || { url: "" };
            this.result = res.result;
          }
        });
    } else {
      this.toast.error("链接中没有musicId");
      this.loading = false;
    }
  }
  search(value: string) {
    this.searchValue = value;
    this.getData();
  }
}
