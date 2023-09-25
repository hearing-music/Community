import { Component, HostListener, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import * as echarts from "echarts";

@Component({
  selector: "ngx-douyin-popular-accounts",
  templateUrl: "./douyin-popular-accounts.component.html",
  styleUrls: ["./douyin-popular-accounts.component.scss"],
})
export class DouyinPopularAccountsComponent implements OnInit, OnDestroy {
  page: number = 1;
  pagesize: any = 10;
  popularValue = [];
  loading = false;
  private scrollEventListener: EventListener | null = null;
  constructor(private api: ApiService, public common: CommonService) {}
  ngOnInit(): void {
    this.getDouMonitorUse();
    echarts.registerMap("china", this.common.geoCoordMap);
  }
  ngOnDestroy(): void {
    this.removeScrollListener();
  }
  private removeScrollListener(): void {
    if (this.scrollEventListener) {
      let tbody = document.getElementsByClassName("ant-table-body");
      if (tbody.length > 0) {
        tbody[0].removeEventListener("scroll", this.scrollEventListener);
        this.scrollEventListener = null;
      }
    }
  }
  onTableScroll(event: any): void {
    if (
      event.target.scrollTop + event.target.clientHeight >=
      event.target.scrollHeight
    ) {
      this.page = this.page + 1;
      this.getDouMonitorUse();
    }
  }
  getDouMonitorUse() {
    this.removeScrollListener(); // 移除旧的滚动事件监听器
    this.api
      .getDouMonitorUser({ page: this.page, pageSize: this.pagesize })
      .subscribe((res: any) => {
        if (res.success) {
          for (let i = 0; i < res.result.length; i++) {
            let DateTimeList = [];
            let ValueList = [];
            for (let g = 0; g < res.result[i].fans_trends.length; g++) {
              let datetime = res.result[i].fans_trends[g].DateTime;
              let Value = res.result[i].fans_trends[g].Value;
              DateTimeList.push(datetime);
              ValueList.push(Value);
            }
            res.result[i].options = {
              visualMap: [
                {
                  show: false,
                  type: "continuous",
                  seriesIndex: 0,
                  min: 0,
                  max: 400,
                },
              ],
              tooltip: {
                trigger: "axis",
              },
              grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              },
              xAxis: [
                {
                  data: DateTimeList,
                  show: false,
                },
              ],
              yAxis: [
                {
                  show: false,
                },
              ],
              series: [
                {
                  type: "line",
                  showSymbol: false,
                  data: ValueList,
                },
              ],
              width: 165,
            };
          }
          this.popularValue = [...this.popularValue, ...res.result];
          let tbody = document.getElementsByClassName("ant-table-body");
          if (tbody.length > 0) {
            this.scrollEventListener = (e: any) => {
              this.onTableScroll(e);
            };
            tbody[0].addEventListener("scroll", this.scrollEventListener);
          }
        }
      });
  }
  onExpandChange(data: any): void {
    data.isexpand = !data.isexpand;
    if (data.isexpand && !data.author) {
      this.douSentenceDetail(data);
    }
  }
  douSentenceDetail(data: any) {
    this.loading = true;
    this.api
      .getDouAuthorInfo({ sec_uid: data.user_id })
      .subscribe((res: any) => {
        this.loading = false;
        if (res.success) {
          // res.result.Top30Video = res.result.Top30Video || [];
          // data.sentence_rank = res.result.DouSentenceTimeline[0].max_rank;
          // data.type = res.result.DouSentenceTimeline[0].billBoard_type;
          data.author = res.result;
        }
      });
  }
}
