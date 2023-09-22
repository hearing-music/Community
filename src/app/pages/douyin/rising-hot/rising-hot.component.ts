import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import * as echarts from "echarts";
import { toNumber } from "ng-zorro-antd/core/util";
import { colorSets } from "@swimlane/ngx-charts";
@Component({
  selector: "ngx-rising-hot",
  templateUrl: "./rising-hot.component.html",
  styleUrls: ["./rising-hot.component.scss"],
})
export class RisingHotComponent implements OnInit {
  constructor(private api: ApiService) {}

  searchValue: any = "";
  searchHolder: any = "实时热点搜索";
  hotValue: any = [];
  page = 1;
  total = 10;
  loading = false;
  ngOnInit(): void {
    this.douRiseSearch();
  }
  douRiseSearch() {
    this.loading = true;
    this.api
      .DouRiseSearch({
        keyword: this.searchValue,
        page: this.page,
        pageSize: 10,
      })
      .subscribe((res: any) => {
        this.loading = false;
        if (res.success) {
          for (let i = 0; i < res.result.length; i++) {
            let dateList = []; // 用于存放formattedDatetime的数组
            let hotScoreList = []; // 用于存放hot_score的数组
            for (let g = 0; g < res.result[i].trends.length; g++) {
              let trend = res.result[i].trends[g];
              let datetime = trend.datetime;
              let formattedDatetime = `${datetime.slice(0, 4)}-${datetime.slice(
                4,
                6
              )}-${datetime.slice(6, 8)} ${datetime.slice(
                8,
                10
              )}:${datetime.slice(10, 12)}:${datetime.slice(12, 14)}`;
              dateList.push(formattedDatetime); // 添加到x轴数据
              hotScoreList.push(trend.hot_score); // 添加到y轴数据
            }
            res.result[i].options = {
              visualMap: [
                {
                  show: false, // 是否显示该可视化映射
                  type: "continuous", // 可视化映射类型（连续色彩渐变）
                  seriesIndex: 0, // 与第一个系列关联
                  min: 0, // 颜色映射的最小值
                  max: 400, // 颜色映射的最大值
                },
              ],
              tooltip: {
                trigger: "axis", // 触发方式为坐标轴触发
              },
              grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              },
              xAxis: [
                {
                  data: dateList, // x 轴数据
                  show: false, // 隐藏第一个 x 轴
                },
              ],
              yAxis: [
                {
                  show: false, // 隐藏第一个 y 轴
                },
              ],
              series: [
                {
                  type: "line", // 系列类型为折线图
                  showSymbol: false, // 不显示数据点标志
                  data: hotScoreList, // 系列的数据
                },
              ],
              width: 165, // 宽度为600像素
            };
          }

          this.total = res.total;
          this.hotValue = res.result;
        }
      });
  }

  onExpandChange(data: any): void {
    data.isexpand = !data.isexpand;
    if (data.isexpand && !data.sentenceDetail) {
      this.douSentenceDetail(data);
    }
  }
  search(e: any) {
    this.searchValue = e;
    this.douRiseSearch();
  }
  pageChange(e: any) {
    this.page = e;
    this.douRiseSearch();
  }
  douSentenceDetail(data: any) {
    this.loading = true;
    this.api
      .DouSentenceDetail({ sentence_id: data.sentence_id })
      .subscribe((res: any) => {
        this.loading = false;
        if (res.success) {
          res.result.Top30Video = res.result.Top30Video || [];
			data.sentence_rank = res.result.DouSentenceTimeline[0].max_rank
			data.type = res.result.DouSentenceTimeline[0].billBoard_type
          data.sentenceDetail = res.result;
        }
      });
  }
}
