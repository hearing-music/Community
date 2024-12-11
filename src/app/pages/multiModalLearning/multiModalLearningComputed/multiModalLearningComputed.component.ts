import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { ToastrService } from "ngx-toastr";
import { NzFormTooltipIcon } from "ng-zorro-antd/form";
import { environment } from '../../../../environments/environment';
@Component({
  selector: "ngx-multiModalLearningComputed",
  templateUrl: "./multiModalLearningComputed.component.html",
  styleUrls: ["./multiModalLearningComputed.component.scss"],
})
export class MultiModalLearningComputedComponent implements OnInit {
  private socket!: WebSocket;
  KGSearchRecommendations: any = [];
  KGSoaringSongs: any = [];
  DyVedioTopFive: any = [];
  ThreePartyInterface: any = [];
  DyVedioTopFiveTime: any = 300;
  DyVedioTopFiveSchedule: any = null;
  isVisibleRecommendations: any = false;
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {
    this.connect();
  }
  async ngOnInit() {
    this.userId = localStorage.getItem("userId") || "0";
    this.getWeekStr();
    this.generateTimeArray();
    this.getHourTime();
    this.getMinuteTime();
  }
  // 建立 WebSocket 连接
  connect(): void {
    this.socket = new WebSocket(environment.websocketUrl);
    // 监听连接打开事件
    this.socket.onopen = () => {
      console.log("连接成功");
    };
    // 监听消息事件
    this.socket.onmessage = (event) => {
      let result: any = JSON.parse(event.data);
      if (result.message == "抖音该词条前五的数据") {
        if (result.data.length > 0) {
          let obg = {
            digg_count: 0,
            share_count: 0,
            comment_count: 0,
            collect_count: 0,
            download_count: 0,
            data: [],
          };
          for (let i = 0; i < result.data.length; i++) {
            obg.digg_count += result.data[i].digg_count;
            obg.share_count += result.data[i].share_count;
            obg.comment_count += result.data[i].comment_count;
            obg.collect_count += result.data[i].collect_count;
            obg.download_count += result.data[i].download_count;
            obg.data.push({
              desc: result.data[i].desc,
              aweme_id: result.data[i].aweme_id,
              original_title:result.data[i].original_title,
              original_count: result.data[i].original_count,
            });
          }
          this.DyVedioTopFive.push(obg);
          if (this.DyVedioTopFiveTime==300) {
            this.DyVedioTopFiveSchedule = setInterval(() => {
              this.DyVedioTopFiveTime -= 1;
              if (this.DyVedioTopFiveTime<=0) {
                this.DyVedioTopFiveTime = 0;
                this.sendMessage({ Functionality: [["ComprehensiveSearchTop5", this.keyword]] })
                clearInterval(this.DyVedioTopFiveSchedule)
              }
            },1000)
          }
        }
      } else if (result.message == "酷狗搜索推荐查询") {
        if (result.data.length > 0) {
          this.KGSearchRecommendations = result.data;
          console.log(this.KGSearchRecommendations)
        }
      } else if (result.message == "酷狗飙升榜查询") {
        if (result.data.length > 0) {
          this.KGSoaringSongs = result.data;
        }
      } else if (result.message == "三方接口(榜单&&热搜词)") {
        if (result.data.length > 0) {
          this.ThreePartyInterface = result.data;
        }
      }
    };
    // 监听连接关闭事件
    this.socket.onclose = (event) => {
      console.log("关闭连接:", event.reason);
    };
    // 监听错误事件
    this.socket.onerror = (error) => {
      console.error("连接错误:", error);
    };
  }
  sendMessage(message: any): void {
    if (this.socket) {
      const jsonMessage = JSON.stringify(message);
      this.socket.send(jsonMessage);
    } else {
      console.error("socket连接断开");
    }
  }
  // 销毁连接
  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: "info-circle",
    theme: "twotone",
  };
  loading = false;
  loadingSpin = false;
  // 新歌老歌
  SongType: string = "新歌";
  // 星期
  Week: string = "星期一";
  WeekArr: any = [
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六",
    "星期日",
  ];
  // 小时时间
  HourTime: string = "00:00";
  HourTimeArr: any = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];
  // 分钟时间
  MinuteTime: string = "00:00";
  MinuteTimeArr: any = [];
  // 昨日播放
  EcologyPlayedYesterday: any = "";
  EcologyPlayedYesterdayErr = false;
  // 24小时雷达播放
  _24HourRadarPlayback: any = "";
  _24HourRadarPlaybackErr = false;
  // 录入歌曲小时播放
  HourlyPlayback: any = "";
  HourlyPlaybackErr = false;
  // 录入歌曲分钟播放
  ScorePlayback: any = "";
  ScorePlaybackErr = false;
  // 录入近一小时总PV搜索数
  _1HTotalPVPlayback: any = "";
  _1HTotalPVPlaybackErr = false;
  // 录入近24小时总PV搜索数
  _24HourTotalPVPlayback: any = "";
  _24HourTotalPVPlaybackErr = false;

  // 预估数据
  Data = [];
  // 双平台数据
  obData: any = {};

  keyword: string = "";
  qqkgData: any = {};
  showSongsList = false;
  chooseQQKGData: any = {};
  qqDataPage = 1;
  kgDataPage = 1;
  isPlay = false;
  audioSrc = "";
  userId: any = "0";
  // 清空keyword 及choose 及展示列表
  reset() {
    this.chooseQQKGData = {};
    this.keyword = "";
    this.qqkgData = {};
    this.qqDataPage = 1;
    this.kgDataPage = 1;
  }
  reset2() {
    this.chooseQQKGData = {};
    this.qqkgData = {};
    this.qqDataPage = 1;
    this.kgDataPage = 1;
  }
  openSongsList() {
    if (!this.qqkgData.qqData || !this.qqkgData.kgData) return;
    this.showSongsList = true;
  }
  handleCancel() {
    this.showSongsList = false;
  }
  handleOk() {
    this.showSongsList = false;
  }
  search(e: any) {
    this.keyword = e;
    this.searchQQKG();
  }
  searchQQ() {
    return new Promise((resolve) => {
      this.api
        .searchQQ_multi({
          keyword: this.keyword,
          page: this.qqDataPage,
          pageSize: 10,
        })
        .subscribe(
          (res: any) => {
            if (res.success) {
              resolve(res.result.qqData);
            } else {
              resolve([]);
              if (this.qqDataPage != 1) {
                this.qqDataPage = this.qqDataPage - 1;
              }
            }
          },
          (err: any) => {
            resolve([]);
            if (this.qqDataPage != 1) {
              this.qqDataPage = this.qqDataPage - 1;
            }
          }
        );
    });
  }
  searchKG() {
    return new Promise((resolve) => {
      this.api
        .searchKG_multi({
          keyword: this.keyword,
          page: this.kgDataPage,
          pageSize: 10,
        })
        .subscribe(
          (res: any) => {
            if (res.success) {
              resolve(res.result.kgData);
            } else {
              if (this.kgDataPage != 1) {
                this.kgDataPage = this.kgDataPage - 1;
              }
              resolve([]);
            }
          },
          (err: any) => {
            resolve([]);
            if (this.kgDataPage != 1) {
              this.kgDataPage = this.kgDataPage - 1;
            }
          }
        );
    });
  }
  // 搜索keyword
  async searchQQKG() {
    if (this.keyword == "") {
      this.toast.error("请输入搜索的关键词");
      return;
    }
    this.loading = true;
    this.qqkgData = {};
    this.chooseQQKGData = {};
    this.qqDataPage = 1;
    this.kgDataPage = 1;
    let res: any = await Promise.all([this.searchQQ(), this.searchKG()]);
    this.loading = false;
    this.qqkgData.qqData = res[0];
    this.qqkgData.kgData = res[1];
    this.openSongsList();
  }
  async qqPageNext() {
    this.loading = true;
    this.qqDataPage = this.qqDataPage + 1;
    let res: any = await this.searchQQ();
    this.loading = false;
    this.qqkgData.qqData = [...this.qqkgData.qqData, ...res];
  }
  async kgPageNext() {
    this.loading = true;
    this.kgDataPage = this.kgDataPage + 1;
    let res: any = await this.searchKG();
    this.loading = false;
    this.qqkgData.kgData = [...this.qqkgData.kgData, ...res];
  }
  blur(item: any) {
    console.log(item);
  }
  // 选择qq数据
  chooseQQ(item: any, i: any) {
    this.qqkgData.qqData.forEach((obj: any, index: any) => {
      if (index != i) {
        obj.isSelect = false;
      }
    });
    item.isSelect = !item.isSelect;
    if (item.isSelect) {
      this.chooseQQKGData.qqData = item;
    } else {
      this.chooseQQKGData.qqData = null;
    }
  }
  // 选择kg数据
  chooseKG(item: any, i: any) {
    this.qqkgData.kgData.forEach((obj: any, index: any) => {
      if (index != i) {
        obj.isSelect = false;
      }
    });
    item.isSelect = !item.isSelect;
    if (item.isSelect) {
      this.chooseQQKGData.kgData = item;
    } else {
      this.chooseQQKGData.kgData = null;
    }
  }
  // 播放qq音乐
  playqq(item: any, i: any, e: any) {
    this.isPlay = true;
    this.audioSrc = item.musicUrl;
    let audio: any = document.getElementById("audio");
    setTimeout(() => {
      this.qqkgData.qqData.forEach((qitem: any, index: number) => {
        if (index == i) {
          qitem.isPlay = !qitem.isPlay;
          if (qitem.isPlay) {
            audio.play();
          } else {
            audio.pause();
          }
        } else {
          qitem.isPlay = false;
        }
      });
    }, 50);
    e.stopPropagation();
  }
  // 播放kg音乐
  playkg(item: any, i: any, e: any) {
    if (item.musicUrl) {
      this.kgPlay({ src: item.musicUrl, i });
    } else {
      this.getKugouSongUrl2(item, i);
    }
    e.stopPropagation();
  }
  getKugouSongUrl2(item: any, i: number) {
    this.loading = true;
    this.api.getKugouSongUrl({ EMixSongID: item.EMixSongID }).subscribe(
      (res: any) => {
        if (res.success) {
          item.musicUrl = res.result[0];
          this.kgPlay({ src: item.musicUrl, i });
        }
        this.loading = false;
      },
      (err: any) => {
        console.log(err);
        this.loading = false;
      }
    );
  }
  kgPlay(params: any) {
    this.isPlay = true;
    let { src, i } = params;
    this.audioSrc = src;
    let audio: any = document.getElementById("audio");
    setTimeout(() => {
      this.qqkgData.kgData.forEach((item: any, index: number) => {
        if (index == i) {
          item.isPlay = !item.isPlay;
          if (item.isPlay) {
            audio.play();
          } else {
            audio.pause();
          }
        } else {
          item.isPlay = false;
        }
      });
    }, 50);
  }

  play(element: any) {
    this.pause();
    var i = this.qqkgData.qqData.findIndex(
      (e: any) => e.musicUrl == element.srcElement.currentSrc
    );
    if (i !== -1) {
      this.qqkgData.qqData[i].isPlay = true;
    }
    var i2 = this.qqkgData.kgData.findIndex(
      (e: any) => e.musicUrl == element.srcElement.currentSrc
    );
    if (i2 !== -1) {
      this.qqkgData.kgData[i].isPlay = true;
    }
  }
  pause() {
    this.qqkgData.qqData.forEach((item: any) => {
      item.isPlay = false;
    });
    this.qqkgData.kgData.forEach((item: any) => {
      item.isPlay = false;
    });
  }

  async begin() {
    if (
      this._1HTotalPVPlayback === "" ||
      !/^\d+$/.test(this._1HTotalPVPlayback) ||
      this._24HourRadarPlayback === "" ||
      !/^\d+$/.test(this._24HourRadarPlayback) ||
      this._24HourTotalPVPlayback === "" ||
      !/^\d+$/.test(this._24HourTotalPVPlayback) ||
      this.EcologyPlayedYesterday === "" ||
      !/^\d+$/.test(this.EcologyPlayedYesterday) ||
      this.HourlyPlayback === "" ||
      !/^\d+$/.test(this.HourlyPlayback) ||
      this.ScorePlayback === "" ||
      !/^\d+$/.test(this.ScorePlayback)
    ) {
      this.toast.info("请检查输入项");
      return;
    }
    if (this.keyword === "") {
      this.toast.info("请填入关键字");
      return;
    }
    this.loadingSpin = true;
    let res: any = await this.TJMusicMultiModalLearning();
    this.Data = res.res;
    let res2: any = {};
    if (this.chooseQQKGData.qqData && this.chooseQQKGData.kgData) {
      res2 = await this.ObservationalData();
      this.obData = res2.res;
    }
    this.DyVedioTopFive = [];
    this.KGSearchRecommendations = [];
    this.KGSoaringSongs = [];
    this.ThreePartyInterface = [];
    this.DyVedioTopFiveTime = 300;
    this.DyVedioTopFiveSchedule = null;
    this.sendMessage({
      Functionality: [
        ["GetSoaringHistories", this.keyword],
        ["DevTipListInfo", this.keyword],
        ["ComprehensiveSearchTop5", this.keyword],
        ["TripartiteInterfaceBuzzword", this.keyword],
      ],
    });
    this.loadingSpin = false;
    // 存入数据
    this.ObservationDataStorage(res.data, res2.data || {});
  }
  // 获取平台数据 双平台
  ObservationalData() {
    console.log(this.chooseQQKGData);
    let QMid = [this.chooseQQKGData.qqData.mid];
    let Qid = [this.chooseQQKGData.qqData.id];
    let KScid = [this.chooseQQKGData.kgData.Scid];
    let KQbjId = [
      {
        MixSongID: this.chooseQQKGData.kgData.MixSongID,
        FileHash: this.chooseQQKGData.kgData.FileHash,
      },
    ];
    let KMixSongID = [this.chooseQQKGData.kgData.MixSongID];
    let KEMixSongID = [this.chooseQQKGData.kgData.EMixSongID];
    let obj = {
      QMid,
      Qid,
      KScid,
      KQbjId,
      KMixSongID,
      KEMixSongID,
    };
    return new Promise((resolve: any) => {
      this.api.ObservationalData(obj).subscribe(
        (res: any) => {
          if (res.success) {
            res.data.KG[0].KExponents = res.data.KG[0].KExponents || {
              data: {},
            };
            resolve({ res: res.data, data: obj });
          } else {
            resolve({});
          }
        },
        (err: any) => {
          resolve({});
          this.loadingSpin = false;
        }
      );
    });
  }
  // 预估
  TJMusicMultiModalLearning() {
    this.obData = {
      qq: [],
      kg: [],
    };
    let data = {
      "1HTotalPVPlayback": this._1HTotalPVPlayback - 0,
      "24HourRadarPlayback": this._24HourRadarPlayback - 0,
      "24HourTotalPVPlayback": this._24HourTotalPVPlayback - 0,
      EcologyPlayedYesterday: this.EcologyPlayedYesterday - 0,
      HourTime: this.HourTime + ":00",
      HourlyPlayback: this.HourlyPlayback - 0,
      MinuteTime: this.MinuteTime + ":00",
      ScorePlayback: this.ScorePlayback - 0,
      Week: this.Week,
      SongType: this.SongType,
    };
    return new Promise((resolve: any) => {
      this.api.TJMusicMultiModalLearning(data).subscribe(
        (res: any) => {
          if (res.success) {
            res.data[0][1] = Math.ceil(res.data[0][1]);
            res.data[1][1] = Math.ceil(res.data[1][1]);
            res.data[2][1] = Math.ceil(res.data[2][1]);
            res.data[3][1] = Math.ceil(res.data[3][1]);
            res.data[4][1] = Math.ceil(res.data[4][1]);
            res.data[5][1] = Math.ceil(res.data[5][1]);
            res.data[6][1] = Math.ceil(res.data[6][1]);
            res.data[7][1] = Math.ceil(res.data[7][1]);
            resolve({ res: res.data, data });
          } else {
            resolve({ res: [] });
          }
        },
        (err: any) => {
          resolve({ res: [] });
          this.loadingSpin = false;
        }
      );
    });
  }
  // 输入监听
  childInput(e: any) {
    this.keyword = e;
    this.reset2();
  }
  // 存入数据
  ObservationDataStorage(MeasuredParameter: any, PlatformParameter: any) {
	  return
    if (this.Data.length == 0) {
      console.log("获取预估数据错误 不存入");
      return;
    }
    if (
      this.chooseQQKGData.kgData &&
      this.chooseQQKGData.qqData &&
      !(this.obData.QQ && this.obData.KG)
    ) {
      console.log("获取双平台数据错误 不存入");
      return;
    }
    this.api
      .ObservationDataStorage({
        UserId: this.userId,
        KeyWord: this.keyword,
        MeasuredParameter: MeasuredParameter,
        MeasurementResults: this.Data,
        PlatformData: this.obData,
        PlatformParameter: PlatformParameter,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
        },
        (err: any) => {}
      );
  }

  getWeekStr() {
    let week = new Date().getDay();
    switch (week) {
      case 1:
        this.Week = "星期一";
        break;
      case 2:
        this.Week = "星期二";
        break;
      case 3:
        this.Week = "星期三";
        break;
      case 4:
        this.Week = "星期四";
        break;
      case 5:
        this.Week = "星期五";
        break;
      case 6:
        this.Week = "星期六";
        break;
      case 0:
        this.Week = "星期日";
        break;
    }
  }
  getHourTime() {
    let hourTime: any = new Date().getHours();
    if (hourTime < 10) hourTime = "0" + hourTime;
    this.HourTime = hourTime + ":00";
  }
  getMinuteTime() {
    let hourTime: any = new Date().getHours();
    if (hourTime < 10) hourTime = "0" + hourTime;
    let minuteTime: any = new Date().getMinutes();
    minuteTime = minuteTime - (minuteTime % 5);
    if (minuteTime < 10) minuteTime = "0" + minuteTime;
    this.MinuteTime = hourTime + ":" + minuteTime;
  }

  generateTimeArray() {
    let timeArray = [];
    let currentTime = new Date(); // 创建一个当前时间的Date对象，但稍后我们会设置具体的时间
    currentTime.setHours(0, 0, 0, 0);
    for (let i = 0; i < (24 * 60) / 5; i++) {
      let minutes = ("0" + currentTime.getMinutes()).slice(-2); // 格式化分钟为两位数字符串
      let timeString =
        currentTime.getHours().toString().padStart(2, "0") + ":" + minutes; // 构建时间字符串

      timeArray.push(timeString); // 将时间字符串添加到数组中

      // 增加五分钟
      currentTime.setMinutes(currentTime.getMinutes() + 5);

      // 如果时间超过了59分钟，需要处理小时和分钟的进位（但在这个每隔五分钟的循环中其实不需要，因为直接加5不会超）
      // 然而，为了代码的健壮性，这里还是保留了对小时和分钟的处理逻辑（虽然在这个特定例子中不会用到）
      // if (currentTime.getMinutes() >= 60) {
      //   currentTime.setHours(currentTime.getHours() + 1);
      //   currentTime.setMinutes(0);
      // }
    }
    // 设置所选小时的分数
    this.MinuteTimeArr = timeArray;
  }
  cancel() { }
  openDetail(item: any) {
    window.open("https://www.douyin.com/discover?modal_id=" + item);
  }
  openLink(id: string | number) {
    window.open('https://www.kugou.com/singer/' + id + '.html')
  }
  handleCancelRecommendations(): void {
    this.isVisibleRecommendations = false;
  }
  showKGSearchRecommendations() {
    this.isVisibleRecommendations = true;
  }
  openSongs(item:any) {
    // https://www.kugou.com/song/#j410q60
    if (item.eMixSongID) {
      window.open('https://www.kugou.com/song/#' + item.eMixSongID)
    }
  }
}
