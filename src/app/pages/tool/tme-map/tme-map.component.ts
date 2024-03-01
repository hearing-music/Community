import { Component, OnInit } from "@angular/core";
import { differenceInCalendarDays } from "date-fns";
import { NzMessageService } from "ng-zorro-antd/message";
import { ApiService } from "../../../../../src/app/services/api.service";
const xlsx = require("xlsx");
@Component({
  selector: "ngx-tme-map",
  templateUrl: "./tme-map.component.html",
  styleUrls: ["./tme-map.component.scss"],
})
export class TmeMapComponent implements OnInit {
  tagList: any[] = [
    {
      title: "月报",
    },
    {
      title: "歌曲",
    },
  ];
  selectItem: any = "月报";
  selectedValue = 0;
  selectedValue2 = 0;
  typeOf: number = 0;
  typeOf2: number = 0;
  date = null;
  today = null;
  pageValue: number = 1;
  pageValue2: number = 1;
  optionList = {
    月报: [
      { label: "歌曲热度", value: 1, api: "queryHotTrackMonthReportList" },
      { label: "热度飙升", value: 2, api: "queryRiseTrackMonthReportList" },
      { label: "新歌热度", value: 3, api: "queryNewTrackMonthReportList" },
    ],
    歌曲: [
      { label: "最热", value: 1, api: "HOT" },
      { label: "最新", value: 2, api: "PUBLIC_TIME" },
      { label: "飙升", value: 3, api: "RISE" },
    ],
  };
  listOfData: any = [];
  monthData: any = [];
  rankData: any = [];
  base64Data: any = "";
  base64Data2: any = "";
  loading = false;
  isCandown = false;
  isCandown2: boolean = false;
  constructor(public api: ApiService, private message: NzMessageService) {}
  ngOnInit(): void {
    this.today = new Date();
  }
  onSelect(item: any): void {
    this.selectItem = item.title;
    if (item.title == "月报") {
      this.listOfData = this.monthData;
    }
    if (item.title == "歌曲") {
      this.listOfData = this.rankData;
    }
    // this.selectedValue = 0;
    // this.date = null;
  }
  changeTypeOf(value: any): void {
    this.typeOf = value;
  }
  changeTypeOf2(value: any): void {
    this.typeOf2 = value;
  }
  disabledDate = (current: Date): boolean =>
    differenceInCalendarDays(current, this.today) > 0;
  downLoad() {
    if (this.selectItem == "月报") {
      this.isCandown = false;
      if (this.selectedValue != 0 && this.date != null && this.pageValue) {
        this.loading = true;
        let date = new Date(this.date);
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, "0");
        let formattedDate = `${year}${month}`;
        this.api
          .GetMonthlyReport({
            reportMonth: formattedDate,
            pages: this.pageValue,
            type: this.optionList[this.selectItem][this.typeOf - 1].api,
          })
          .subscribe((res: any) => {
            this.loading = false;
            if (res.success) {
              const binaryData = window.atob(res.data.split(",")[1]);
              const workbook = xlsx.read(binaryData, { type: "binary" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const jsonData = xlsx.utils.sheet_to_json(worksheet);
              this.monthData = jsonData;
              this.listOfData = jsonData;
              this.base64Data = res.data;
              this.isCandown = true;
            } else {
              this.message.error(res.message);
            }
          });
      } else {
        this.message.error("请选择筛查类型");
      }
    }
    if (this.selectItem == "歌曲") {
      if (this.selectedValue != 0 && this.pageValue) {
        this.isCandown2 = false;
        this.loading = true;
        this.api
          .GetRankSong({
            pages: this.pageValue2,
            type: this.optionList[this.selectItem][this.typeOf2 - 1].api,
          })
          .subscribe((res: any) => {
            this.loading = false;
            if (res.success) {
              const binaryData = window.atob(res.data.split(",")[1]);
              const workbook = xlsx.read(binaryData, { type: "binary" });
              const sheetName = workbook.SheetNames[0];
              const worksheet = workbook.Sheets[sheetName];
              const jsonData = xlsx.utils.sheet_to_json(worksheet);
              this.rankData = jsonData;
              this.listOfData = jsonData;
              this.base64Data2 = res.data;
              this.isCandown2 = true;
            } else {
              this.message.error(res.message);
            }
          });
      } else {
        this.message.error("请选择筛查类型");
      }
    }
  }
  downLoadSource() {
    if (this.isCandown) {
      let date = new Date(this.date);
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, "0");
      let formattedDate = `${year}${month}`;
      const now = new Date();
      let yearNow = now.getFullYear();
      let monthNow = (now.getMonth() + 1).toString().padStart(2, "0");
      let formattedDateNew = `${yearNow}${monthNow}`;
      let filename = `${formattedDate}-${formattedDateNew}.xlsx`;
      let a = document.createElement("a");
      a.href = this.base64Data;
      a.download = filename; // 如果为空，默认文件名为：下载.xxx（后缀名与base64MIME部分指定）
      a.click();
      a = null; // a标签下载作用用完了，解除对它的引用即释放内存
    }
  }
  downLoadSource2() {
    if (this.isCandown2) {
      const now = new Date();
      let yearNow = now.getFullYear();
      let monthNow = (now.getMonth() + 1).toString().padStart(2, "0");
      let formattedDateNew = `${yearNow}${monthNow}`;
      let filename = `${formattedDateNew}.xlsx`;
      let a = document.createElement("a");
      a.href = this.base64Data2;
      a.download = filename; // 如果为空，默认文件名为：下载.xxx（后缀名与base64MIME部分指定）
      a.click();
      a = null; // a标签下载作用用完了，解除对它的引用即释放内存
    }
  }
}
