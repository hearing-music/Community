import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import {CommonService} from "../../../services/common.service";
@Component({
  selector: "ngx-special-effects-query",
  templateUrl: "./special-effects-query.component.html",
  styleUrls: ["./special-effects-query.component.scss"],
})
export class SpecialEffectsQueryComponent implements OnInit {
  constructor(public api: ApiService, private message: NzMessageService,public common: CommonService) {}
  loading = false;
  isMonitor = false;
  form = {
    author: "",
    phone: "",
    weChat: "",
    QQ: "",
    BGM: "",
  };
  result: any = {}
  searchValue = "";
  searchHolder = "请输入视频链接";
  magicFaceId = "";
  userId = "";
  ngOnInit(): void {
    this.userId = localStorage.getItem("userId") || "0";
  }
  search(event: any) {
    this.searchValue = event;
    this.GetSpecialEffectsSearch();
  }
  GetSpecialEffectsSearch() {
    this.loading = true;
    var regex = /magicFaceId=([^&]+)/;
    var match = this.searchValue.match(regex);
    if (match) {
      this.magicFaceId = match[1];
      this.api
        .GetSpecialEffectsSearch({ magicFaceId: match[1] })
        .subscribe((res: any) => {
          this.loading = false;
          if (res.success) {
			  this.activeBGMIndex = false;
			  this.BGMList=[]
            this.result = res.result;
          }
        });
    } else {
      this.loading = false;
      this.message.error("链接中没有magicFaceId");
    }
  }
  monitor() {
    this.isMonitor = !this.isMonitor;
  }
  
  focus(e:any){
  	e.preventDefault();
  	document.onkeydown =  (event_e:any)=>{
  		if(event_e.keyCode === 13){
  			this.searchBGM()
  		}
  	}
  }
  blur(){
  	document.onkeydown = null
  }
  activeBGMIndex:any=false
  BGMList:any=[]
selectBGM(item:any,i:any){
	this.activeBGMIndex=i;
}
  searchBGM(){
	  if(!this.form.BGM) return
	  this.loading=true;
	  this.api.getkuaishouCenterMusicList({keyword:this.form.BGM}).subscribe((res: any) => {
          console.log(res)
		  this.loading=false;
		  if(res.success){
			  if(res.result.length==0){
				  this.message.info('该关键字没有搜索到BGM。')
			  }
			  this.BGMList = res.result;
		  }
        },(err:any)=>{
			this.loading=false;
		});
  }
  Tomonitor() {
	if(this.activeBGMIndex===false){
		this.message.error("BGM必选");
		return; // 停止向下执行
	}
	let obj = this.BGMList[this.activeBGMIndex];
    if (this.isMonitor && this.form.author && this.form.BGM) {
      if (this.form.phone!=='') {
        var chinesePhoneNumberRegex =
          /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
        if (!chinesePhoneNumberRegex.test(this.form.phone)) {
          this.message.error("手机号输入错误,请检查手机号");
          return; // 停止向下执行
        }
      }
      if (this.form.QQ!=='') {
        var QQRegex = /^[1-9][0-9]\d{4,9}$/;
        if (!QQRegex.test(this.form.QQ)) {
          this.message.error("QQ输入错误,请检查QQ号");
          return; // 停止向下执行
        }
      }
      let time = Math.floor(Date.now() / 1000);
      this.api
        .kuaishouMonitor({
			BgmId:obj.musicId,
			BgmType:obj.musicType,
			BgmUtilizationRate:{"res": []},
          magicFaceId: this.magicFaceId,
          name: this.result.tagName,
          userId: this.userId,
          author: this.form.author,
          phone: this.form.phone,
          weChat: this.form.weChat,
          QQ: this.form.QQ,
          BGM: this.form.BGM,
          time: time,
          usageCount: this.result.usageCount,
          creationTime: time,
          CDN: this.result.coverUrls[0].url,
        })
        .subscribe((res: any) => {
          (this.form.author = ""),
            (this.form.BGM = ""),
            (this.form.QQ = ""),
            (this.form.phone = ""),
            (this.form.weChat = "");
          this.isMonitor = !this.isMonitor;
          if (res.success) {
            this.message.success("添加成功");
          } else {
            this.message.error("添加失败");
          }
        });
    } else {
      this.message.error("缺少上传的参数");
    }
  }
}