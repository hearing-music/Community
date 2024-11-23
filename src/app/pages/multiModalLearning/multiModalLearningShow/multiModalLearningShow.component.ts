import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-multiModalLearningShow",
  templateUrl: "./multiModalLearningShow.component.html",
  styleUrls: ["./multiModalLearningShow.component.scss"],
})
export class multiModalLearningShowComponent implements OnInit {
  GetObservationDataArr: any = [];
  loading = false;
  params = {
    UserId: localStorage.getItem("userId") || "0",
    Limit: 10,
    Offset: 1,
  };
  total = 0;
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {
    this.GetObservationData();
  }
  GetObservationData() {
    this.loading = true;
    this.api.GetObservationData(this.params).subscribe((res: any) => {
      this.loading = false;
      if (res.success) {
        for (let i = 0; i < res.data.res.length; i++) {
          res.data.res[i].isMore = false;
          if (res.data.res[i].PlatformData.KG) {
            res.data.res[i].PlatformData.ListenKG = [];
            res.data.res[i].PlatformData.ListenQQ = [];

            res.data.res[i].PlatformData.IndexQQ = [];
            res.data.res[i].PlatformData.IndexKG = [];

            res.data.res[i].PlatformData.RankQQ = [];
            res.data.res[i].PlatformData.RankKG = [];

            res.data.res[i].PlatformData.indexRateQQ = [];
            res.data.res[i].PlatformData.indexRateKG = [];

            res.data.res[i].PlatformData.RankDiffKG = [];
            res.data.res[i].PlatformData.RankDiffQQ = [];

            res.data.res[i].PlatformData.commentKG = [];
            res.data.res[i].PlatformData.commentQQ = [];

            let Kg = res.data.res[i].PlatformData.KG;
            let qq = res.data.res[i].PlatformData.QQ;
            for (let j = 0; j < Kg.length; j++) {
              res.data.res[i].PlatformData.IndexKG.push({
                Index: Kg[j].KExponents.data.exponent,
                Time: new Date(Kg[j].KExponents.data.date).getTime(),
              });
              res.data.res[i].PlatformData.ListenKG.push({
                Count: Kg[j].listenPeopleCount.count,
                Time: new Date(Kg[j].KExponents.data.date).getTime(),
              });
              res.data.res[i].PlatformData.RankKG.push({
                Rank: Kg[j].KExponents.data.rank,
                Time: new Date(Kg[j].KExponents.data.date).getTime(),
              });
              res.data.res[i].PlatformData.indexRateKG.push({
                indexRate: Kg[j].KExponents.data.exponent_diff,
                Time: new Date(Kg[j].KExponents.data.date).getTime(),
              });
              res.data.res[i].PlatformData.RankDiffKG.push({
                rankDiff: Kg[j].KExponents.data.rank_diff,
                Time: new Date(Kg[j].KExponents.data.date).getTime(),
              });
              res.data.res[i].PlatformData.commentKG.push({
                count: Kg[j].comment.cnt,
                Time: new Date(Kg[j].KExponents.data.date).getTime(),
              });
            }
            for (let j = 0; j < qq.length; j++) {
              const date = new Date(qq[j].realtimeData.updateTime);
              const zeroHourTimestamp = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() - 1
              ).getTime();
              res.data.res[i].PlatformData.IndexQQ.push({
                Index: qq[j].realtimeData.yesterdayIndex,
                Time: zeroHourTimestamp,
              });
              res.data.res[i].PlatformData.ListenQQ.push({
                Count: qq[j].nowListenUsers.cnt,
                Time: zeroHourTimestamp,
              });
              res.data.res[i].PlatformData.RankQQ.push({
                Rank: qq[j].realtimeData.todayRank,
                Time: zeroHourTimestamp,
              });
              res.data.res[i].PlatformData.indexRateQQ.push({
                indexRate:
                  qq[j].realtimeData.yesterdayIndex *
                  qq[j].realtimeData.indexRate,
                Time: zeroHourTimestamp,
              });
              res.data.res[i].PlatformData.RankDiffQQ.push({
                rankDiff: qq[j].realtimeData.rankDiff,
                Time: zeroHourTimestamp,
              });
              res.data.res[i].PlatformData.commentQQ.push({
                count: qq[j].comment.count,
                Time: zeroHourTimestamp,
              });
            }
            this.setOptionIndex(res.data.res[i].PlatformData);
          }
        }
        this.GetObservationDataArr = res.data.res;
        this.total = res.data.count;
      }
    });
  }
  moreVersion(item: any) {
    item.isMore = item.isMore ? false : true;
  }
  changeIndex(index: any) {
    this.params.Offset = index;
    this.GetObservationData();
  }

  // 指数 qq 酷狗
  setOptionIndex(iitem: any) {
    let dateListNow = [
      ...iitem.IndexKG,
      ...iitem.IndexQQ,
      ...iitem.ListenKG,
      ...iitem.ListenQQ,
      ...iitem.RankKG,
      ...iitem.RankQQ,
      ...iitem.indexRateKG,
      ...iitem.indexRateQQ,
      ...iitem.RankDiffKG,
      ...iitem.RankDiffQQ,
      ...iitem.commentKG,
      ...iitem.commentQQ,
    ];
    dateListNow = dateListNow.sort((a: any, b: any) => a.Time - b.Time);
    dateListNow = dateListNow.map((e: any) => this.common.getDate(e.Time));
    dateListNow = this.removeDuplicates(dateListNow);
    let dataList = iitem.IndexKG.map((e: any) => e.Index); // 酷狗指数数据
    let dataList2 = iitem.IndexQQ.map((e: any) => e.Index); // QQ指数数据
    let dataList3 = iitem.ListenKG.map((e: any) => e.Count); // 酷狗收听数据
    let dataList4 = iitem.ListenQQ.map((e: any) => e.Count); // QQ收听数据
    let dataList5 = iitem.RankKG.map((e: any) => e.Rank); // 酷狗排名
    let dataList6 = iitem.RankQQ.map((e: any) => e.Rank); // QQ排名
    let dataList7 = iitem.indexRateKG.map((e: any) => e.indexRate); // 酷狗指数上涨
    let dataList8 = iitem.indexRateQQ.map((e: any) => e.indexRate); // QQ指数上涨
    let dataList9 = iitem.RankDiffKG.map((e: any) => e.rankDiff); // 酷狗排名上涨
    let dataList10 = iitem.RankDiffQQ.map((e: any) => e.rankDiff); // QQ排名上涨
    let dataList11 = iitem.commentKG.map((e: any) => e.count); // 酷狗评论
    let dataList12 = iitem.commentQQ.map((e: any) => e.count); // QQ评论
    // 补齐qq缺失的时间 比qq第1个time 小的时间 补齐
    if (iitem.IndexQQ.length > 0) {
      iitem.IndexKG.forEach((item: any) => {
        if (
          this.common.getDate(iitem.IndexQQ[0].Time) >
          this.common.getDate(item.Time)
        ) {
          dataList2.unshift("");
        }
      });
      iitem.ListenKG.forEach((item: any) => {
        if (
          this.common.getTime(iitem.ListenQQ[0].Time) >
          this.common.getTime(item.Time)
        ) {
          dataList4.unshift("");
        }
      });
      iitem.RankKG.forEach((item: any) => {
        if (
          this.common.getTime(iitem.RankQQ[0].Time) >
          this.common.getTime(item.Time)
        ) {
          dataList6.unshift("");
        }
      });
      iitem.indexRateKG.forEach((item: any) => {
        if (
          this.common.getTime(iitem.indexRateQQ[0].Time) >
          this.common.getTime(item.Time)
        ) {
          dataList6.unshift("");
        }
      });
      iitem.RankDiffKG.forEach((item: any) => {
        if (
          this.common.getTime(iitem.RankDiffQQ[0].Time) >
          this.common.getTime(item.Time)
        ) {
          dataList6.unshift("");
        }
      });
      iitem.commentKG.forEach((item: any) => {
        if (
          this.common.getTime(iitem.commentQQ[0].Time) >
          this.common.getTime(item.Time)
        ) {
          dataList6.unshift("");
        }
      });
    }
    let color = [
      "#bbbbd4",
      "#1a1863",
      "#bbd2d4",
      "#185f63",
      "#bbd4c8",
      "#18633f",
      "#c3d4bb",
      "#326318",
      "#d4bbc8",
      "#631840",
      "#7e9a5f",
      "#24370e",
    ];
    iitem.optionsIndex = {
      color: color,
      legend: {
        selected: {
          酷狗指数: true, // 默认显示
          QQ指数: true, // 默认显示
          酷狗收听: false, // 默认隐藏
          QQ收听: false, // 默认隐藏
          酷狗排名: false, // 默认隐藏
          QQ排名: false, // 默认隐藏
          酷狗指数增长: false, // 默认隐藏
          QQ指数增长: false, // 默认隐藏
          酷狗排名上涨: false, // 默认隐藏
          QQ排名上涨: false,
          酷狗评论: false, // 默认隐藏
          QQ评论: false,
        },
      },
      tooltip: {
        trigger: "axis", // 触发方式为坐标轴触发
      },
      grid: {
        left: 60,
        right: 60,
        top: 60,
        bottom: 20,
      },
      xAxis: [
        {
          type: "category",
          data: dateListNow,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          type: "line",
          name: "酷狗指数",
          data: dataList,
          smooth: true,
        },
        {
          type: "line",
          name: "QQ指数",
          data: dataList2,
          smooth: true,
        },
        {
          type: "line",
          name: "酷狗收听",
          data: dataList3,
          smooth: true,
        },
        {
          type: "line",
          name: "QQ收听",
          data: dataList4,
          smooth: true,
        },
        {
          type: "line",
          name: "酷狗排名",
          data: dataList5,
          smooth: true,
        },
        {
          type: "line",
          name: "QQ排名",
          data: dataList6,
          smooth: true,
        },
        {
          type: "line",
          name: "酷狗指数增长",
          data: dataList7,
          smooth: true,
        },
        {
          type: "line",
          name: "QQ指数增长",
          data: dataList8,
          smooth: true,
        },
        {
          type: "line",
          name: "酷狗排名上涨",
          data: dataList9,
          smooth: true,
        },
        {
          type: "line",
          name: "QQ排名上涨",
          data: dataList10,
          smooth: true,
        },
        {
          type: "line",
          name: "酷狗评论",
          data: dataList11,
          smooth: true,
        },
        {
          type: "line",
          name: "QQ评论",
          data: dataList12,
          smooth: true,
        },
      ],
      height: 150,
    };
  }
  // 去重
  removeDuplicates(array: any) {
    const uniqueArray = [];
    for (let i = 0; i < array.length; i++) {
      if (uniqueArray.indexOf(array[i]) === -1) {
        uniqueArray.push(array[i]);
      }
    }
    return uniqueArray;
  }
}
