import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser'; 
@Component({
  selector: "ngx-script-prompts",
  templateUrl: "./script-prompts.component.html",
  styleUrls: ["./script-prompts.component.scss"],
})
export class ScriptPromptsComponent implements OnInit {
  selectItem2 = "";
  selectItem = "";
  expandIconPosition: any = "right";
  loading = false;
  tagNow: any = "";
  tagList = [];
  right: "left" | "right";
  problemList = [];
  problemAllList = [];
  constructor(private api: ApiService, private toast: ToastrService,private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.GetModelInfo();
    this.GetAllInformation();
  }
	safeStyle:SafeStyle
  GetAllInformation() {
    this.api.GetAllInformation().subscribe((res: any) => {
      let arr = [];
      if (res.success) {
        let data = this.mergeItems(res.data);
        this.problemAllList = data;
        let searchList = [];
        for (let i = 0; i < data.length; i++) {
          searchList.push({
            ...data[i],
            label: data[i].Issues,
            value: i,
          });
        }
		console.log(data)
        this.searchList = searchList;
        console.log(this.problemAllList);
        arr = this.filterData(this.problemAllList);
      }
      this.problemList = arr;
      this.loading = false;
    });
  }
  mergeItems(data: any) {
    const mergedData = [];
    const mergedMap = new Map();
    data.forEach((item) => {
      const key = item.Module + item.TypeId + item.Issues;
      if (mergedMap.has(key)) {
        mergedMap.get(key).Answer.push(item.Answer.replace(/\r?\n/g, "<br>"));
      } else {
        mergedMap.set(key, {
          ...item,
          Answer: [item.Answer.replace(/\r?\n/g, "<br>")],
        });
      }
    });
    mergedMap.forEach((value) => {
      value.Scenario.Take = value.Scenario.Take.replace(/\r?\n/g, "<br>");
      value.Scenario.Cautions = value.Scenario.Cautions.replace(/\r?\n/g, "<br>");
      mergedData.push(value);
    });
    return mergedData;
  }

  filterData(arr: any) {
    let data = arr.filter(
      (item: any) =>
        item.Module == this.selectItem && item.TypeId == this.selectItem2
    );
    for (let i = 0; i < data.length; i++) {
      data[i].active = false;
    }
    return data;
  }
  GetModelInfo() {
    this.loading = true;
    this.api.GetModelInfo().subscribe((res: any) => {
      if (res.success) {
        this.tagList = res.data;
        this.tagNow = this.tagList[0];
        this.selectItem2 = this.tagList[0].TypeId[0];
        this.selectItem = this.tagList[0].Module;
      }
      this.loading = false;
    });
  }
  addTentIcon(isAsk: boolean): string {
    let img = "";
    // 这里假设你的帐篷图标是一个 img 标签
    if (isAsk) {
      img = '<img src="assets/img/ask.jpg" alt="Tent Icon">';
    } else {
      img = '<img src="assets/img/reqest.jpg" alt="Tent Icon">';
    }
    return img;
  }

  onSelect(item: any) {
    this.selectItem = item.Module;
    this.tagNow = item;
    this.selectItem2 = item.TypeId[0];
    this.problemList = this.filterData(this.problemAllList);
  }
  onSelect2(citem: any) {
    this.selectItem2 = citem;
    this.problemList = this.filterData(this.problemAllList);
  }
  copy(item: any) {
    var aux = document.createElement("input");
    let text = item.replace(/<br>/g, "\n");
    text = text.replace(/\[.*?\]/g, "");
    text = text.replace(/^\d+\.\s*/gm, "");
    text = text.replace(/\（.*?\）/g, "");
    aux.setAttribute("value", text);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    this.toast.success(`复制成功`);
  }

  // right
  searchValue: any = null;
  searchList: any = [];
  nowAnswer: any = {};
  searchChange(e: any) {
    this.nowAnswer = this.searchList[e];
  }
}
