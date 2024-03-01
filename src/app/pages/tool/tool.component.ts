import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/common.service";
@Component({
  selector: "ngx-tool",
  templateUrl: "./tool.component.html",
  styleUrls: ["./tool.component.scss"],
})
export class ToolComponent implements OnInit {
  tagList: any[] = [
    {
      title: "银行",
      holder: "搜索银行",
    },
    {
      title: "转换文件",
      holder: "转换文件",
    },
    {
      title: "json格式化",
      holder: "json格式化",
    },
    {
      title: "监测",
      holder: "监测",
    },
    {
      title: "PDF转WORD",
      holder: "",
    },
    {
      title: "云图",
      holder: "",
    },
    {
      title: "由你录入",
      holder: "",
    },
  ];
  selectItem = "银行";
  constructor(public common: CommonService) {}

  ngOnInit(): void {
    if (!this.common.checkAdmin()) {
      let menu: any = localStorage.getItem("menu");
      menu = JSON.parse(menu);
      let menu_list: any = menu || { top: [], left: [] };
      let tagList = [];
      for (let i = 0; i < menu_list.top.length; i++) {
        if (menu_list.top[i].parent_id == 24) {
          tagList.push(menu_list.top[i].menu);
        }
      }
      this.tagList = tagList;
    }
  }
  onSelect(item: any): void {
    this.selectItem = item.title;
  }
}
