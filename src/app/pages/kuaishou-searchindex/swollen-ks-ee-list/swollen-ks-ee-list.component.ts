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
		  let yesterday = this.common.timeFormat(new Date().getTime()-24*60*60*1000)
		  let qtday = this.common.timeFormat(new Date().getTime()-24*60*60*1000*2)
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
		  let BgmUtilizationRateZT = ''
		  let BgmUtilizationRateQT = ''
		  let BgmColor = ''
		  let BgmTitle = ''
		  res.result[i].BgmUtilizationRate = res.result[i].BgmUtilizationRate || {res:[]}
		  for(let j=0;j<res.result[i].BgmUtilizationRate.res.length;j++){
			 let data2 = res.result[i].BgmUtilizationRate.res[j]
			 let now = this.common.timeFormat(data2.time*1000)
			 if(now==qtday){
				 BgmUtilizationRateQT = data2.data[data2.data.length-1]
			 }
			 if(now == yesterday){
				 BgmUtilizationRateZT = data2.data[data2.data.length-1]
			 }
			 BgmColor = data2.colors
			 BgmTitle = data2.title
		  }
		  res.result[i].BgmUtilizationRateZT=BgmUtilizationRateZT;
		  res.result[i].BgmUtilizationRateQT=BgmUtilizationRateQT;
		  res.result[i].BgmColor=BgmColor;
		  res.result[i].BgmTitle=BgmTitle;
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
  mouseenter2(item: any) {
    item.show2 = true;
  }
  mouseleave2(item: any) {
    item.show2 = false;
  }
}
