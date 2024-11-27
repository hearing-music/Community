import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-douyin-comprehensiveSearch",
  templateUrl: "./douyin-comprehensiveSearch.component.html",
  styleUrls: ["./douyin-comprehensiveSearch.component.scss"],
})
export class DouyinComprehensiveSearchComponent implements OnInit {
  searchValue = "";
  searchHolder = "请输入搜索关键字";
  result: any = [[], [], []];
  Data: any = [];
  loading: boolean = false;
  index0: any = 0;
  index1: any = 0;
  index2: any = 0;
  constructor(public api: ApiService, private toast: ToastrService) {}
  ngOnInit(): void {}
  search(value: any) {
    this.ComprehensiveSearch(value, 0);
  }
  ComprehensiveSearch(KeyWord: any, which: any, dataIndex: number = 0) {
    this.loading = true;
    this.api.ComprehensiveSearch({ KeyWord }).subscribe((res: any) => {
      this.loading = false;
      if (res.success) {
        let data = {
          digg: 0,
          share: 0,
          comment: 0,
          collect: 0,
          download: 0,
          time: 0,
          result: [],
        };
        for (let i = 0; i < res.data.length; i++) {
          data.digg += res.data[i].digg_count;
          data.share += res.data[i].share_count;
          data.comment += res.data[i].comment_count;
          data.collect += res.data[i].collect_count;
          data.download += res.data[i].download_count;
        }
        data.result = res.data;
        if (which == 0) {
          let obj = {
            data: [{ time: 0 }, { time: 60 }, { time: 300 }],
            shedule1: null,
            shedule5: null,
          };
          obj.data[0] = data;
          this.Data.push(obj);
          let index = this.Data.length - 1;

          this.Data[index]["shedule1"] = setInterval(() => {
            this.Data[index].data[1].time -= 1;
            if (this.Data[index].data[1].time == 1) {
              this.ComprehensiveSearch(KeyWord, 1, index);
              clearInterval(this.Data[index].shedule1);
              this.Data[index].shedule1 = null;
            }
          }, 1000);

          this.Data[index]["shedule5"] = setInterval(() => {
            this.Data[index].data[2].time -= 1;
            if (this.Data[index].data[2].time == 1) {
              this.ComprehensiveSearch(KeyWord, 2, index);
              clearInterval(this.Data[index].shedule5);
              this.Data[index].shedule5 = null;
            }
          }, 1000);
        }

        if (which != 0) {
          this.Data[dataIndex].data[which] = data;
        }
      }
    });
  }
  openDetail(item: any) {
    window.open("https://www.douyin.com/discover?modal_id=" + item);
  }
}
