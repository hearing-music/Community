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
		  let yesterday = this.common.timeFormat(new Date().getTime()-24*60*60*1000*0)
		  let qtday = this.common.timeFormat(new Date().getTime()-24*60*60*1000*1)
		  let yesterday2 = this.common.timeFormat(new Date().getTime()-24*60*60*1000*1)
		  let qtday2 = this.common.timeFormat(new Date().getTime()-24*60*60*1000*2)
		  var currentDate = new Date();
		  currentDate.setHours(0, 0, 0, 0);
        for (let i = 0; i < res.result.length; i++) {
          res.result[i].show = false;
		  res.result[i].toadyindex = '';
		  let last = 0;
		  if(res.result[i].utilisation.res.length>1){
			  last = res.result[i].utilisation.res.length - 2;
		  }
		  if(res.result[i].utilisation.res.length==1){
			  last = -1
		  }
		  res.result[i].lastindex = last==-1?0:res.result[i].utilisation.res[last].usageCount;
          for (let j = 0; j < res.result[i].utilisation.res.length; j++) {
			res.result[i].utilisation.res[j].usageCount = res.result[i].utilisation.res[j].usageCount || 0
            if (res.result[i].utilisation.res[j].time > currentDate.getTime() / 1000 && res.result[i].utilisation.res[j].time < currentDate.getTime() / 1000 + 86400) {
                res.result[i].todayindex = res.result[i].utilisation.res[j].usageCount;
            } 
						// else if (
      //         res.result[i].utilisation.res[j].time <
      //           currentDate.getTime() / 1000 &&
      //         res.result[i].utilisation.res[j].time >
      //           currentDate.getTime() / 1000 - 86400
      //       ) {
      //         res.result[i].lastindex =
      //           res.result[i].utilisation.res[j].usageCount;
      //       }
          }
		  let BgmUtilizationRateZT = ''
		  let BgmUtilizationRateQT = ''
		  let BgmColor = ''
		  let BgmTitle = ''
		  let BgmUtilizationRateArr = []
		  res.result[i].BgmUtilizationRate = res.result[i].BgmUtilizationRate || {res:[{data:[]}]}
		  res.result[i].BgmUtilizationRate.res = res.result[i].BgmUtilizationRate.res || [{data:[]}]
		  if(res.result[i].BgmUtilizationRate.res.length==0){
			  res.result[i].BgmUtilizationRate.res = [{data:[]}]
		  }
		  let BgmUtilizationRateData = res.result[i].BgmUtilizationRate.res[res.result[i].BgmUtilizationRate.res.length-1].data
		  BgmColor = res.result[i].BgmUtilizationRate.res[res.result[i].BgmUtilizationRate.res.length-1].colors
		  BgmTitle = res.result[i].BgmUtilizationRate.res[res.result[i].BgmUtilizationRate.res.length-1].title
		  for(let j=0;j<BgmUtilizationRateData.length;j++){
			 let data2 = BgmUtilizationRateData[j]
			 let now = this.common.timeFormat(data2[0])
			 if(now==qtday2){
				 BgmUtilizationRateQT = data2
			 }
			 if(now == yesterday2){
				 BgmUtilizationRateZT = data2
			 }
			 if(BgmUtilizationRateArr.length>0){
				 let countSum = BgmUtilizationRateArr[BgmUtilizationRateArr.length-1].count;
				 BgmUtilizationRateArr.push({time:data2[0],count:data2[1] + countSum})
			 }else{
				 BgmUtilizationRateArr.push({time:data2[0],count:data2[1]})
			 }
		  }
		  res.result[i].BgmUtilizationRateZT=BgmUtilizationRateZT;
		  res.result[i].BgmUtilizationRateQT=BgmUtilizationRateQT;
		  res.result[i].BgmColor=BgmColor;
		  res.result[i].BgmTitle=BgmTitle;
		  res.result[i].BgmUtilizationRateArr=BgmUtilizationRateArr;
		  res.result[i].BgmUtilizationRateZTAll='';
		 let BgmUtilizationRateAllIndex = BgmUtilizationRateArr.findIndex((e:any)=> this.common.timeFormat(e.time) == yesterday2)
		  if(BgmUtilizationRateAllIndex!=-1){
			  res.result[i].BgmUtilizationRateZTAll = BgmUtilizationRateArr[BgmUtilizationRateAllIndex].count;
		  }
        }
        this.dataSet = res.result;
		console.log(this.dataSet)
        this.total = res.result.length;
      },(err:any)=>{
		  this.loading=false;
	  });
  }
  orderby=''
  isShow=true;
  orderByIndex(){
	  this.loading=true;
	  this.isShow = false;
	  let dataSet = []
	  this.orderby = this.orderby=='desc'?'asc':'desc'
	  if(this.orderby=='desc'){
		  dataSet = this.dataSet.sort((a,b)=> (b.todayindex - b.lastindex) - (a.todayindex - a.lastindex))
	  }else{
		  dataSet = this.dataSet.sort((a,b)=> (a.todayindex - a.lastindex) - (b.todayindex - b.lastindex))
	  }
	  this.dataSet = dataSet
	  setTimeout(()=>{
		  this.orderby2=''
		  this.loading=false;
		  this.isShow = true;
	  },100)
  }
  orderby2=''
  orderByBgm(){
	  this.loading=true;
	  this.isShow = false;
	  let dataSet = []
	  this.orderby2 = this.orderby2=='desc'?'asc':'desc'
	  if(this.orderby2=='desc'){
	  		  dataSet = this.dataSet.sort((a,b)=> b.BgmUtilizationRateZTAll - a.BgmUtilizationRateZTAll)
	  }else{
	  		  dataSet = this.dataSet.sort((a,b)=> a.BgmUtilizationRateZTAll - b.BgmUtilizationRateZTAll)
	  }
	  this.dataSet = dataSet
	  setTimeout(()=>{
		  this.orderby=''
	  		  this.loading=false;
	  		  this.isShow = true;
	  },100)
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
  mouseenter3(item: any) {
    item.show3 = true;
  }
  mouseleave3(item: any) {
    item.show3 = false;
  }
}
