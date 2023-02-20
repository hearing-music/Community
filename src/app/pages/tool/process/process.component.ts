import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {
  selectedValue = null;
  file: any;
  testTrue: { [key: string]: boolean } = {
    flieTrue: false,
    choseTrue: false,
  }
  percent = 0;
  choseJsonExle = [
    { value: ".json", label: '.json' },
    { value: ".xlsx", label: '.xlsx' }
  ]
  message: string;
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);
  fileType: any;
  location: any = '';
  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }
  onFile(file: any): void {
    this.percent = 0
    console.log(file)
    this.file = file;
    this.testTrue.flieTrue = true
    this.fileType = file.type
    this.message = ""
    if (this.fileType !== "application/json" && this.fileType !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      this.message = "不能上传json和exel以外的文档类型"
      this.testTrue.flieTrue = false
      this.location = ''
    } else {
      this.testTrue.flieTrue = true
    }
    console.log(this.testTrue.flieTrue)
  }
  changeExelJson() {
    if (this.testTrue.flieTrue && this.testTrue.choseTrue) {
      this.api.exceljsonChange({
        file: this.file
      }).subscribe((res: any) => {
        if (res.success) {
          this.location = res.data.url
          this.percent = 100
        }
      }, (err: any) => {
        console.log(err)
      })
    }
  }
  changeJsonExel(value: { label: string; value: string; }): void {
    this.percent = 0
    this.message = ""
    if (this.fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && value.value === ".xlsx") {
      this.message = "不能选择相同的类型"
      this.testTrue.choseTrue = false
      this.location = ''
    }
    if (this.fileType === "application/json" && value.value === ".json") {
      this.message = "不能选择相同的类型"
      this.testTrue.choseTrue = false
      this.location = ''
    }
    if (this.fileType === "application/json" && value.value === ".xlsx") {
      this.message = ""
      this.testTrue.choseTrue = true
    }
    if (this.fileType === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && value.value === ".json") {
      this.message = ""
      this.testTrue.choseTrue = true
    }
  }
  downLoad() {
    let url = 'http://api.jinzhoushaokao.top/' + this.location
    window.open(url);
    this.percent = 0
  }

}
