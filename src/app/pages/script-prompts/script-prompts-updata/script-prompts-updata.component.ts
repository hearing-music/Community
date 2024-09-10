import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from "ngx-toastr";
import { NzCascaderOption } from "ng-zorro-antd/cascader";
@Component({
  selector: "ngx-script-prompts-updata",
  templateUrl: "./script-prompts-updata.component.html",
  styleUrls: ["./script-prompts-updata.component.scss"],
})
export class ScriptPromptsUpdataComponent implements OnInit {
  loading = false;
  visible: any = false;
  values: string[] = [];
  nzOptions: NzCascaderOption[] = [];
  InformationList: any = [];
  question: any = "";
  answerList: any = [];
  constructor(private api: ApiService, private toast: ToastrService) {}
  ngOnInit(): void {
    this.GetAllInformation();
  }
  GetAllInformation() {
    this.loading = true;
    this.api.GetAllInformation().subscribe((res: any) => {
      this.loading = false;
      if (res.success) {
        this.InformationList = res.data;
        this.nzOptions = this.buildNzOptions(res.data);
      }
    });
  }
  buildNzOptions(data: any[]): NzCascaderOption[] {
    const options: NzCascaderOption[] = [];
    data.forEach((item: any) => {
      let moduleOption = options.find((option) => option.value === item.Module);
      if (!moduleOption) {
        moduleOption = {
          value: item.Module,
          label: item.Module,
          children: [],
        };
        options.push(moduleOption);
      }
      let typeOption = moduleOption.children?.find(
        (option) => option.value === item.TypeId
      );
      if (!typeOption) {
        typeOption = {
          value: item.TypeId,
          label: item.TypeId,
          children: [],
        };
        moduleOption.children?.push(typeOption);
      }
      const existingIssue = typeOption.children?.find(
        (option) => option.value === item.Issues
      );
      if (!existingIssue) {
        const issueOption = {
          value: item.Issues,
          label: item.Issues,
          isLeaf: true,
        };
        typeOption.children?.push(issueOption);
      }
    });
    return options;
  }
  onChanges(values: string[]): void {
    let list: any = this.InformationList.filter(
      (item: any) =>
        item.Module == values[0] &&
        item.TypeId == values[1] &&
        item.Issues == values[2]
    );
    for (let i = 0; i < list.length; i++) {
      list[i].Scenario = list[i].Scenario || {};
      list[i].Scenario.Cautions = list[i].Scenario.Cautions || "";
      list[i].Scenario.Take = list[i].Scenario.Take || "";
    }
    this.answerList = list;
    this.question = values[2];
  }
  addSymbol(data: any, index: any) {
    const inputAnswer = document.getElementById("inputAnser" + index);
    const selectedText = this.getSelectedText(inputAnswer);
    if (selectedText) {
      const newText = "[" + selectedText + "]";
      const value = this.replaceSelectedText(inputAnswer, newText);
      data.Answer = value;
    } else {
      data.Answer += "[]";
    }
  }
  getSelectedText(inputElement: any): string {
    return inputElement.value.substring(
      inputElement.selectionStart,
      inputElement.selectionEnd
    );
  }
  replaceSelectedText(inputElement: any, newText: string) {
    const startPos = inputElement.selectionStart;
    const endPos = inputElement.selectionEnd;
    const textBefore = inputElement.value.substring(0, startPos);
    const textAfter = inputElement.value.substring(
      endPos,
      inputElement.value.length
    );
    return textBefore + newText + textAfter;
  }
  async updata() {
    let answer = [];
    let questionBody = {
      ID: this.answerList[0].ID,
      Issues: this.question,
    };
    this.answerList.forEach((item: any) => {
      answer.push({
        ID: item.AnswerId,
        Answer: item.Answer,
        Scenario: {
          Take: item.Scenario.Take,
          Cautions: item.Scenario.Cautions,
        },
      });
    });
    this.loading = true;
    let resA = await this.updateMultipleAnswers(answer);
    this.api.updataScriptPromptsQuestion(questionBody).subscribe((res: any) => {
      resA.push(res)
    });
    this.loading = false;
    this.question = "";
    this.values = [];
    let result = true;
    resA.forEach((item: any, index: any) => {
      if (!item.success) {
        result = false;
      }
    });
    if (result) {
      this.toast.success("修改成功");
    }
    this.GetAllInformation()
  }
  async updateMultipleAnswers(requests: any[]): Promise<any[]> {
    const promises = requests.map((request) =>
      this.api.updataScriptPromptsAnswer(request)
    );
    try {
      const results = await Promise.all(promises);
      return results;
    } catch (error) {
      throw error;
    }
  }
}
