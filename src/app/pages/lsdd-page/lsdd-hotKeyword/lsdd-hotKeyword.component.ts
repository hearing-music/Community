import { Component, OnInit, Input } from "@angular/core";
@Component({
  selector: "ngx-lsdd-hotKeyword",
  templateUrl: "./lsdd-hotKeyword.component.html",
  styleUrls: ["./lsdd-hotKeyword.component.scss"],
})
export class LsddKeywordComponent implements OnInit {
  @Input() list: any;
  constructor() {}
  ngOnInit(): void {
    console.log(this.list);
  }
  selectItem = "上升";
  tagList = [
    {
      name: "上升",
    },
    {
      name: "下降",
    },
    {
      name: "未变",
    },
    {
      name: "新上",
    },
  ];
  onSelect(item: any) {
    this.selectItem = item.name;
    if (item.name == "上升") {
      this.list.trend = this.list.hot.filter(
        (item: any) => item.trend && Number(item.trend) > 0
      );
    } else if (item.name == "下降") {
      this.list.trend = this.list.hot.filter(
        (item: any) => item.trend && Number(item.trend) < 0
      );
    } else if (item.name == "新上") {
      this.list.trend = this.list.hot.filter(
        (item: any) => item.trend == "new"
      );
    } else if (item.name == "未变") {
      this.list.trend = this.list.hot.filter((item: any) => !item.trend);
    }
    this.list.trend.forEach((item: any) => {
      item.sort = this.list.hot.findIndex((e: any) => e.txt == item.txt);
    });
    console.log(this.list.trend);
  }
}
