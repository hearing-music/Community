import { Component, OnInit } from "@angular/core";
import { NzMessageService } from "ng-zorro-antd/message";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "ngx-script-prompts-insert",
  templateUrl: "./script-prompts-insert.component.html",
  styleUrls: ["./script-prompts-insert.component.scss"],
})
export class ScriptPromptsInsertComponent implements OnInit {
  loading = false;
  nzOptions: any[] | null = [];
  values = [0, 1];
  tagValue = [];
  choseTag: any = {
    Module: "",
    TypeId: "",
  };
  searchTip: any = [];
  answerList: any = [];
  Issue: any = [];
  searchValue: any = null;
  showTip: boolean = false;
  isNewIssue = true;
  New: any = {
    Issues: {
      ModelId: 0,
      Issues: "",
      UserId: localStorage.getItem("userId") || "0",
    },
  };
  Old: any = {
    Issues: 0,
  };
  Answer: any = [
    {
      Answer: "",
      Scenario: {
        Take: "",
        Cautions: "",
      },
      UserId: localStorage.getItem("userId") || "0",
    },
  ];
  onChanges(item: any) {
    this.choseTag.Module = this.tagValue[this.values[0]].Module;
    this.choseTag.TypeId =
      this.tagValue[this.values[0]].TypeId[this.values[1] - 1];
    this.searchTip = this.Issue.filter(
      (item: any) =>
        item.Module == this.choseTag.Module &&
        item.TypeId == this.choseTag.TypeId
    );
    this.answerList = this.searchTip;
  }
  constructor(private api: ApiService, private message: NzMessageService) {}
  searchChange(e: any) {
    let arr = [];
    for (let i = 0; i < this.searchTip.length; i++) {
      if (this.searchTip[i].Issues.includes(e)) {
        arr.push(this.searchTip[i]);
      }
    }
    this.answerList = arr;
  }
  changeValue(value: any) {
    this.searchValue = value.Issues;
    let arr = [];
    for (let i = 0; i < this.searchTip.length; i++) {
      if (this.searchTip[i].Issues.includes(value.Issues)) {
        arr.push(this.searchTip[i]);
      }
    }
    this.answerList = arr;
  }
  get(item: any) {
    this.showTip = true;
  }
  miss(item: any) {
    this.showTip = false;
    if (this.answerList.length == 1) {
      if (this.searchValue == this.answerList[0].Issues) {
        this.Old.Issues = this.answerList[0].ID;
        this.isNewIssue = false;
      } else {
        this.isNewIssue = true;
        this.New.Issues.Issues = this.searchValue;
      }
    } else {
      this.isNewIssue = true;
      this.New.Issues.Issues = this.searchValue;
    }
  }
  ngOnInit(): void {
    this.GetModelInfo();
    this.GetAllInformation();
  }
  GetModelInfo() {
    this.loading = true;
    this.api.GetModelInfo().subscribe((res: any) => {
      if (res.success) {
        this.tagValue = res.data;
        let arrData = [];
        for (let i = 0; i < res.data.length; i++) {
          arrData.push({
            value: i,
            label: res.data[i].Module,
            children: [],
          });
          for (let j = 0; j < res.data[i].TypeId.length; j++) {
            arrData[i].children.push({
              value: j + 1,
              label: res.data[i].TypeId[j],
              isLeaf: true,
            });
          }
        }
        this.nzOptions = arrData;
        console.log(this.nzOptions);
        this.choseTag.Module = arrData[0].label;
        this.choseTag.TypeId = arrData[0].children[0].label;
      }
      this.loading = false;
    });
  }
  addAnswer() {
    this.Answer.push({
      Answer: "",
      UserId: localStorage.getItem("userId") || "0",
    });
  }
  GetAllInformation() {
    this.api.GetAllInformation().subscribe((res: any) => {
      if (res.success) {
        res.data = this.mergeItems(res.data);
        this.searchTip = res.data.filter(
          (item: any) =>
            item.Module == this.choseTag.Module &&
            item.TypeId == this.choseTag.TypeId
        );
        this.answerList = this.searchTip;
        this.Issue = res.data;
      }
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
      value.Scenario.Cautions = value.Scenario.Cautions.replace(
        /\r?\n/g,
        "<br>"
      );
      mergedData.push(value);
    });
    return mergedData;
  }
  remove(index: any) {
    this.Answer.splice(index, 1);
  }
  addIsue() {
    if (this.isNewIssue) {
      this.New.Issues.ModelId =
        this.nzOptions[this.values[0]].children.length * this.values[0] +
        this.values[1];
      this.New.Answer = this.Answer;
      let params = {
        Mark: {
          State: 1,
          New: this.New,
        },
      };
      this.api.AdditionalDataInfo(params).subscribe((res: any) => {
        if (res.success) {
          this.message.success("添加成功");
          this.Answer = [
            {
              Answer: "",
              Scenario: {
                Take: "",
                Cautions: "",
              },
              UserId: localStorage.getItem("userId") || "0",
            },
          ];
          this.searchValue = "";
        }
      });
    } else {
      this.Old.Answer = this.Answer;
      let params = {
        Mark: { State: 0, Old: this.Old },
      };
      this.api.AdditionalDataInfo(params).subscribe((res: any) => {
        if (res.success) {
          this.message.success("添加成功");
          this.Answer = [
            {
              Answer: "",
              Scenario: {
                Take: "",
                Cautions: "",
              },
              UserId: localStorage.getItem("userId") || "0",
            },
          ];
          this.searchValue = "";
        }
      });
    }
  }
}
