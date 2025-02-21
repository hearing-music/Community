import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "ngx-douyin-soundSource",
  templateUrl: "./douyin-soundSource.component.html",
  styleUrls: ["./douyin-soundSource.component.scss"],
})
export class DouyinSoundSourceComponent implements OnInit {
  constructor(public api: ApiService,private toast: ToastrService) {}
  loading = false;
  isMonitor = false;
  result: any = {};
  searchValue = "";
  searchHolder = "请输入视频链接";
  
  type: any = "链接搜索";
  typeList: any = [
  	{ value: "链接搜索", label: "链接搜索",tip:"https://www.douyin.com/discover?modal_id=7369871233967525157" },
  	{ value: "分享链接搜索", label: "分享链接搜索",tip:"https://v.douyin.com/iUnhqDgF/" },
  	{ value: "ID搜索", label: "ID搜索",tip:"7369871233967525157" },
  ];
  typeIndex=0;
  timeArr:any=[]
  timeList:any=[
	  { label: '0点', value: '0' },
    { label: '1点', value: '1'},
    { label: '2点', value: '2' },
    { label: '3点', value: '3' },
    { label: '4点', value: '4' },
    { label: '5点', value: '5' },
    { label: '6点', value: '6' },
    { label: '7点', value: '7' },
    { label: '8点', value: '8' },
    { label: '9点', value: '9' },
    { label: '10点', value: '10',checked: true  },
    { label: '11点', value: '11' },
    { label: '12点', value: '12' },
    { label: '13点', value: '13',checked: true  },
    { label: '14点', value: '14' },
    { label: '15点', value: '15' },
    { label: '16点', value: '16' },
    { label: '17点', value: '17',checked: true  },
    { label: '18点', value: '18' },
    { label: '19点', value: '19' },
    { label: '20点', value: '20' },
    { label: '21点', value: '21' },
    { label: '22点', value: '22',checked: true  },
    { label: '23点', value: '23' },
  ];
  cycle:any=7
  cycleList:any=[{
	  label: '1天', value: 1
  },{
	  label: '2天', value: 2
  },{
	  label: '3天', value: 3
  },{
	  label: '4天', value: 4
  },{
	  label: '5天', value: 5
  },{
	  label: '6天', value: 6
  },{
	  label: '7天', value: 7
  },{
	  label: '20天', value: 20
  },]
  disabled:any=false;
  userId:any='0'
  ngOnInit(): void {
    this.userId = localStorage.getItem("userId") || "0";
  }
  ngModelChangeSelect(e:any){
  	this.typeIndex = this.typeList.findIndex((item:any)=> item.value == e);
  }
  timeChange(e:any){
	  let timeArr = e.filter((e:any)=>e.checked==true)
	  if(timeArr.length == 0){
		  this.toast.info('至少选择一个时间段')
		  this.disabled = true;
	  }else{
		  this.disabled = false;
	  }
  }
  search(event: any) {
    this.searchValue = event;
    this.DouYinSearchVideoDetails();
  }
  listenSoundSource(){
	  let timeArr = this.timeList.filter((e:any)=>e.checked==true)
	 timeArr = timeArr.map((e:any)=>e.value);
	  let monitor_timeArr = timeArr.join()
	  let addTime = new Date().getTime();
	  let endTime = addTime + 24*60*60*1000*this.cycle
	  let params = {
		"music_id": this.result.music_id,
		"secUid":	this.result.BloggerInfo.secUid,
		"originalVoice":this.result.title,
		"nickName":this.result.BloggerInfo.nickName,
		"cdn":this.result.BloggerInfo.urlList,
		"originalSound":this.result.originalSound,
		"audioSize":this.result.shoot_duration,
		"utilisation":{
			"GetTime":parseInt(addTime/1000+''),
			"UserCount":this.result.user_count,
			"data":[]
		},
		"addTime":parseInt(addTime/1000+''),
		"endTime":parseInt(endTime/1000+''),
		"userId":this.userId,
		"monitor_timeArr":monitor_timeArr
	  }
	  this.loading = true;
	  this.api.douyinListenSourdSource(params).subscribe((res: any) => {
  			if (res.success) {
				this.toast.success('添加成功')
  			}
			if(res.update==1){
				this.toast.info('该音源已继承数据完毕')
			}
  			this.loading = false;
  		},
  		(err: any) => {
			this.toast.error('添加失败')
  			console.log(err);
  			this.loading = false;
  		}
  	);
  }
  // 视频搜索
  DouYinSearchVideoDetails() {
  	let v = this.searchValue;
  	if (!v) {
  		this.toast.error("不能空");
  		return;
  	}
  	if (
  		this.type == "分享链接搜索" &&
  		v.indexOf("https://v.douyin.com/") == -1
  	) {
  		this.toast.error("分享链接格式错误");
  		return;
  	}
  	if (this.type == "链接搜索") {
  		let index = v.indexOf("modal_id=");
  		let index2 = v.indexOf("https://www.douyin.com/video/");
  		if (index == -1 && index2 == -1) {
  			this.toast.error("链接格式错误");
  			return;
  		}
  		if (index != -1) {
  			v = v.substr(index + 9);
  			let index3 = v.indexOf("&");
  			if (index3 != -1) {
  				v = v.substr(0, index3);
  			}
  		} else if (index2 != -1) {
  			v = v.substr(index2 + 29);
  			let index4 = v.indexOf("?");
  			if (index4 != -1) {
  				v = v.substr(0, index4);
  			}
  		}
  	}
  	if (this.type == "ID搜索" && isNaN(Number(v))) {
  		this.toast.error("ID格式错误");
  		return;
  	}
  	this.loading = true;
  	this.api
  		.DouYinSearchVideoDetails({ keyword: v, type: this.type })
  		.subscribe(
  			async (res: any) => {
  				console.log(res);
  				if (res.success && res.result.BloggerInfo) {
  					res.result.BloggerInfo.homeUrl =
  						"https://www.douyin.com/user/" + res.result.BloggerInfo.secUid;
  					res.result.videoUrl = `https://www.douyin.com/user/${res.result.BloggerInfo.secUid}?modal_id=${res.result.awemeId}`;
  				}
  				this.result = res.result || {};
  				this.loading = false;
  			},
  			(err: any) => {
  				console.log(err);
  				this.loading = false;
  			}
  		);
  }
  monitor() {
    this.isMonitor = !this.isMonitor;
  }
  
}
