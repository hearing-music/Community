import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { NzMessageService } from "ng-zorro-antd/message";
import * as XLSX from "xlsx";
import { type } from "os";
@Component({
  selector: "ngx-douyin-daren",
  templateUrl: "./douyin-daren.component.html",
  styleUrls: ["./douyin-daren.component.scss"],
})
export class DouyinDarenComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private message: NzMessageService
  ) {}
  ngOnInit(): void {
    // setTimeout(() => {
    // 	this.isVisible = true;
    // }, 2000)
  }
  fallback =
    "data:image/png;base64,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";
  loading = false;
  searchValue: any = "";
  searchHolder: any = "请搜索抖音达人名字";
  list: any = [];

  page = 1;
  information: any = "";
  // <!-- 艺人主页 Home -->
  Home: any = "";
  // <!-- 艺人类型 Type -->
  Type: any = "";
  // <!-- 艺人风格 Style -->
  Style: any = "";
  // <!-- 嗓音特点 Characteristics -->
  Characteristics: any = "";
  // <!-- 翻唱唱酬 Vocals -->
  Vocals: any = "";
  VocalsShow:any="";
  // <!-- 翻唱分成 Split -->
  Split: any = "";
  // <!-- 原创唱酬 Original -->
  Original: any = "";
  // <!-- 原创分成 OriginalShare -->
  OriginalShare: any = "";
  // <!-- 翻唱视频费用 Fees -->
  Fees: any = "";
  FeesShow:any="";
  // <!-- 备注  Note -->
  Note: any = "";
  Sex: any = "";
  ToExle = {
    name: "选择excel文件",
    isSelect: true,
  };
  sexList: any = [
    { value: "男", label: "男" },
    { value: "女", label: "女" },
  ];
  changeToExel(item: any) {
    if (this.ToExle.isSelect) {
      this.ToExle.name = "前往搜索";
      this.ToExle.isSelect = !this.ToExle.isSelect;
    } else {
      this.ToExle.name = "选择excel文件";
      this.ToExle.isSelect = !this.ToExle.isSelect;
    }
  }
  listContent = [];
  listKeys = [];
  awemeArr=[]
  linkToDy = 0;
  secUidIndex = 0;
	seeVideoIndex=0;
  selectExle() {
	  
    var inputElement = document.createElement("input");
    // 设置input的type为file
    inputElement.setAttribute("type", "file");
    inputElement.setAttribute(
      "accept",
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    );
    inputElement.setAttribute("multiple", "true");
    inputElement.click();
    inputElement.addEventListener("change", (e: any) => {
      const target: any = e.target;
      const files = target.files;
      this.loading = true;
      this.api.dyDaRenExle({ files }).subscribe((res: any) => {
        this.loading = false;
        if (res.success) {
					res.keys.filter((item: any, index: any) => {
					  if (item == "主页链接") {
					    this.linkToDy = index;
					  }
					  if (item == "secUid") {
					    this.secUidIndex = index;
					  }
						if(item=='查看视频'){
							this.seeVideoIndex=index;
						}
					});
			let awemeArr = []
			res.XlsxArr.forEach((item:any)=>{
				awemeArr.push(item[this.seeVideoIndex])
				item.splice(this.seeVideoIndex,1)
			})
		  this.awemeArr = awemeArr;
          this.listContent = res.XlsxArr;
          this.listKeys = res.keys;
        }
      });
    });
  }
  excelPage=1;
  nzPageIndexChange(e:any){
	  this.excelPage = e;
  }
  seeVideo(item:any,i:any){
	  let index = ((this.excelPage-1)*10)+i
	  let arr = this.awemeArr[index]
	  let secUid = item[this.secUidIndex]
	  if(item.isShow){
		  item.expand=!item.expand
	  }else{
		  this.loading = true;
		  this.api.getAwemeMusicVideo({secUid,arr}).subscribe((res: any) => {
		    this.loading = false;
		    if (res.success) {
		  			item.video = res.result;
		  			item.isShow = 1
		  			item.expand=!item.expand
		    }
		  });
	  }
  }
  copy(text: any) {
    var textareaC = document.createElement("textarea");
    textareaC.setAttribute("readonly", "readonly"); //设置只读属性防止手机上弹出软键盘
    textareaC.value = text;
    document.body.appendChild(textareaC); //将textarea添加为body子元素
    textareaC.select();
    document.execCommand("copy");
    document.body.removeChild(textareaC); //移除DOM元素
    this.message.create("success", `复制成功`);
  }
  ToSee(item: any) {
    if (typeof item == "object") {
		this.common.copy(item.hyperlink || item.text)
      // window.open(item.hyperlink || item.text);
    } else {
      // window.open(item);
	  this.common.copy(item)
    }
  }
  // 获取视频详情 以及 达人最新信息
  async getVideoDetail(item: any) {
    item.loadingFinished = false;
    item.seeVideo = true;
    let res: any = await this.getDouYinBloggerVideoOne(item.secUid);
    if (res) {
		if(res.nickName){
			let diggCountAll = 0;
			res.BloggerVideo.forEach((items: any) => {
			  diggCountAll += items.VideoDetails.diggCount;
			});
			let min = Math.min(...res.BloggerVideo.map((obj:any) => obj.VideoDetails.diggCount));
			item.diggCountMin=min;
			item.diggCountAve = parseInt(diggCountAll / res.BloggerVideo.length + "");
			item.urlList = res.urlList;
			item.Nickname = res.nickName;
			item.signature = res.signature;
			item.followerCount = res.followerCount;
			item.totalFavorited = res.totalFavorited;
			item.BloggerVideo = res.BloggerVideo;
			item.isShowRadio = true;
		}
		item.loadingFinished = true;
		item.BloggerVideoErr = false;
		
    } else {
      item.BloggerVideoErr = true;
      item.loadingFinished = true;
    }
  }
  openVideoView(item: any) {
    if (item.seeVideo) {
      item.isShowRadio = item.isShowRadio ? false : true;
    } else {
      this.getVideoDetail(item);
    }
  }
  // 获取抖音博主7条视频
  getDouYinBloggerVideoOne(secUid: any) {
    return new Promise((resolve: any) => {
      this.api.getDouYinBloggerVideoOne({ secUid }).subscribe(
        (res: any) => {
          if (res.success) {
            resolve(res.result);
          } else {
            resolve(false);
          }
        },
        (err: any) => {
          console.log(err);
          resolve(false);
        }
      );
    });
  }

  ToRadio(aweme_id: any, secUid: any) {
    window.open(
      "https://www.douyin.com/user/" + secUid + "?modal_id=" + aweme_id
    );
  }

  search(e: any) {
    this.searchValue = e;
    this.page = 1;
    this.douyin_darenSearch();
  }
  pageNext() {
    this.page += 1;
    this.douyin_darenSearch();
  }
  isVisible = false;
  selectIndex: any = "";
  // 监控达人
  listenDaren(item: any, index: number) {
    this.douyin_isListen(item);
    this.selectIndex = index;
  }

  // 是否被监控
  douyin_isListen(item: any) {
    this.loading = true;
    this.api.douyin_isListen({ SecUid: item.secUid }).subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
        item.isListen = res.result;
        this.isVisible = true;
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
  // 点击录入
  handleOk(): void {
    this.douyin_listenDaren();
  }
  // 点击取消
  handleCancel(): void {
    this.isVisible = false;
  }
  // 添加监控达人
  douyin_listenDaren() {
    let obj = this.list[this.selectIndex];
    var information = this.information;
    var home = this.Home;
    var type = this.Type;
    var style = this.Style;
    var characteristics = this.Characteristics;
    var vocals = this.Vocals;
    var vocalsShow = this.VocalsShow;
    var split = this.Split;
    var original = this.Original;
    var originalShare = this.OriginalShare;
    var fees = this.Fees;
    var feesShow = this.FeesShow;
    var note = this.Note;
    var sex = this.Sex;
    let signature = obj.signature;
    let urlList = obj.urlList;
    // if (!sex||!information || !home || !type || !style || !characteristics || !vocals || !split || !original || !originalShare || !fees) {
    // 	this.message.info('缺少必填参数')
    // 	return
    // }
    var nickname = obj.nickName;
    var secUid = obj.secUid;
    var uniqueId = obj.uniqueId;
	vocalsShow = vocalsShow==''?'':vocalsShow-0
	feesShow = feesShow==''?'':feesShow-0
	if(!Number.isInteger(vocalsShow)&&vocals){
		this.message.info('翻唱唱酬最低价格必须为数字')
		return
	}
	if(!Number.isInteger(feesShow)&&fees){
		this.message.info('翻唱视频费用最低价格必须为数字')
		return
	}
	vocalsShow = vocalsShow-0
	feesShow = feesShow-0
    this.loading = true;
    this.api
      .douyin_listenDaren({
		  feesShow,
		  vocalsShow,
        signature,
        urlList,
        nickname,
        sex,
        secUid,
        uniqueId,
        information,
        clicklike: obj.totalFavorited,
        fans: obj.followerCount,
        home,
        type,
        style,
        characteristics,
        vocals,
        split,
        original,
        originalShare,
        fees,
        note,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.loading = false;
          if (res.success) {
            this.message.success("添加监控成功");
            this.isVisible = false;
            this.information = "";
            this.Home = "";
            this.Type = "";
            this.Style = "";
            this.Characteristics = "";
            this.Vocals = "";
            this.Split = "";
            this.Original = "";
            this.OriginalShare = "";
            this.Fees = "";
            this.FeesShow = "";
            this.VocalsShow = "";
            this.Note = "";
            this.Sex = "";
          }
        },
        (err: any) => {
          console.log(err);
          this.loading = false;
          this.information = "";
        }
      );
  }

  // 达人搜索
  douyin_darenSearch() {
	this.loading = true;
    this.api
      .DouYinSearchBigV({ page: this.page, keyword: this.searchValue })
      .subscribe(
        (res: any) => {
          console.log(res);
          this.loading = false;
          res.result.forEach((item: any) => {
            item.homeUrl = "https://www.douyin.com/user/" + item.secUid;
            item.BloggerVideo = item.BloggerVideo.filter(
              (e: any) => e.is_top == 0
            );
            let diggCountAll = 0;
            item.BloggerVideo.forEach((items: any) => {
              diggCountAll += items.VideoDetails.diggCount;
            });
            item.diggCountAve = parseInt(
              diggCountAll / item.BloggerVideo.length + ""
            );
            // try{
            // 	item.Weighting = this.common.strToJson(item.Weighting)
            // 	item.Weighting.clicklike = item.Weighting.clicklike.split(' - ')
            // 	item.Weighting.fans = item.Weighting.fans.split(' - ')
            // 	item.Weighting.follow = item.Weighting.follow.split(' - ')
            // 	item.Weighting.location = item.Weighting.location.split(' - ')
            // 	item.Weighting.location[0] = item.Weighting.location[0].split('IP属地：')
            // 	item.Weighting.location[0] = item.Weighting.location[0][1]
            // 	item.Weighting.valuation = item.Weighting.valuation.split(' - ')
            // 	item.Weighting.works = item.Weighting.works.split(' - ')
            // 	item.Weighting.flow = item.Weighting.flow.split(' - ')
            // 	item.Weighting.index = item.Weighting.index.split(' - ')
            // 	item.Weighting.score = item.Weighting.score.split(' - ')
            // }catch(e){
            // 	//TODO handle the exception
            // 	item.Weighting = {
            // 		fans:['','',''],
            // 		clicklike:['','',''],
            // 		follow:['','',''],
            // 		location:['','',''],
            // 		valuation:['','',''],
            // 		works:['','',''],
            // 		index:['','',''],
            // 		score:['','',''],
            // 		flow:['','',''],
            // 	}
            // }
          });
          if (this.page == 1) {
            this.list = res.result;
          } else {
            this.list = [...this.list, ...res.result];
          }
        },
        (err: any) => {
          console.log(err);
          this.loading = false;
        }
      );
  }
  goHomeUrl(url: string) {
    window.open(url);
  }
}
