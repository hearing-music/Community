import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";

@Component({
  selector: "ngx-swollen-ks-ee-list",
  templateUrl: "./swollen-ks-ee-list.component.html",
  styleUrls: ["./swollen-ks-ee-list.component.scss"],
})
export class SwollenKsEeListComponent implements OnInit {
  total = 0;
  type = true;
  dataSet = [];
  username = "";
	userId:any='0'
  index = [];
  searchValue:any=''
  loading=false;
  constructor(public api: ApiService, public common: CommonService) {}
search(e:any){
	this.searchValue=e;
	this.SwollenKsEeList()
}
  ngOnInit(): void {
    this.username = localStorage.getItem("username");
		this.userId = localStorage.getItem("userId") || "0";
		this.SwollenKsEeList();
  }
  ngModelChange() {
    this.type = !this.type;
    this.dataSet = [];
    this.SwollenKsEeList();
  }
  SwollenKsEeList() {
	  this.loading=true;
    this.api
      .SwollenKsEeList({ userId: this.userId, type: this.type,keyword:this.searchValue })
      .subscribe((res: any) => {
		  this.loading=false;
        for (let i = 0; i < res.result.length; i++) {
          res.result[i].yesterday = 0;
          res.result[i].show = false;
          for (let j = 0; j < res.result[i].utilisation.res.length; j++) {
            var currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0); // 设置时间为0点0分0秒0毫秒
            if (
              res.result[i].utilisation.res[j].time >
                currentDate.getTime() / 1000 &&
              res.result[i].utilisation.res[j].time <
                currentDate.getTime() / 1000 + 86400
            ) {
              res.result[i].todayindex =
                res.result[i].utilisation.res[j].usageCount;
            } else if (
              res.result[i].utilisation.res[j].time <
                currentDate.getTime() / 1000 &&
              res.result[i].utilisation.res[j].time >
                currentDate.getTime() / 1000 - 86400
            ) {
              res.result[i].yesterdayindex =
                res.result[i].utilisation.res[j].usageCount;
            }
          }
        }
        this.dataSet = res.result;
        this.total = res.result.length;
      },(err:any)=>{
		  this.loading=false;
	  });
  }
  mouseenter(item: any) {
    item.show = true;
  }
  mouseleave(item: any) {
    item.show = false;
  }
}
