import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-kugouSongs",
  templateUrl: "./kugouSongs.component.html",
  styleUrls: ["./kugouSongs.component.scss"],
})
export class kugouSongsComponent implements OnInit {
  constructor(public common: CommonService,public api: ApiService,private toast: ToastrService) {}
  tagList = [
    {
      name: "实时待完善歌曲",
      value: "KgAllChineseActivitySongsInfo",
    },
    {
      name: "实时免费歌曲",
      value: "KgAllActivitySongsInfo",
    },
  ];
  //选择的搜索表
  choseValue: any = "KgAllChineseActivitySongsInfo";
  loading = false;
  // 搜索标签
  selectItem = "实时待完善歌曲";
  isPlay: any = false;
  audioSrc: any = "";
  pageSize = 50;
  perfectedSongsList: any = {
    KgAllActivitySongsInfo: {
      data: [],
      pageCurrent: 1,
      pageTotal: 0,
      type: "default",
      orderBy: "desc",
      exponentOrderby: "",
      publish_timeOrderby: "",
    },
    KgAllChineseActivitySongsInfo: {
      data: [],
      pageCurrent: 1,
      pageTotal: 0,
      type: "default",
      orderBy: "desc",
      exponentOrderby: "",
      publish_timeOrderby: "",
    },
  };
  list: any = [];
  ngOnInit(): void {
    this.GetList();
  }
  onSelect(item: any) {
    this.selectItem = item.name;
    this.choseValue = item.value;
    if (this.perfectedSongsList[this.choseValue].data.length == 0) {
      this.GetList();
    } else {
      this.list = this.perfectedSongsList[this.choseValue].data;
    }
  }

  playMusic(params: any) {
    let { item, i } = params;
    if (item.musicUrl) {
      this.playMusicFun(item, i);
    } else {
      if (!item.EMixSongID) {
        this.toast.info("暂无EMixSongID");
        return;
      }
      this.loading = true;
      this.api.getKugouSongUrl({ EMixSongID: item.EMixSongID }).subscribe(
        (res: any) => {
          this.loading = false;
          if (res.success) {
            item.musicUrl = res.result[0];
            this.playMusicFun(item, i);
          }
        },
        (err: any) => {
          console.log(err);
          this.loading = false;
        }
      );
    }
  }
  playMusicFun(item: any, i: number) {
    if (item.musicUrl == "") {
      this.toast.info("未获取到音源");
      return;
    }
    this.isPlay = true;
    this.audioSrc = item.musicUrl;
    let audio: any = document.getElementById("audio");
    setTimeout(() => {
      this.list.forEach((item: any, index: number) => {
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
  publish_timeClick() {
    this.perfectedSongsList[this.choseValue].exponentOrderby = "";
    this.perfectedSongsList[this.choseValue].type = "publish_timeOrderby";
    if (this.perfectedSongsList[this.choseValue].publish_timeOrderby == "desc") {
      this.perfectedSongsList[this.choseValue].publish_timeOrderby = "asc";
      this.perfectedSongsList[this.choseValue].orderBy = "asc";
    } else {
      this.perfectedSongsList[this.choseValue].publish_timeOrderby = "desc";
      this.perfectedSongsList[this.choseValue].orderBy = "desc";
    }
    this.perfectedSongsList[this.choseValue].pageCurrent = 1;
    this.GetList();
  }
  exponentClick() {
    this.perfectedSongsList[this.choseValue].publish_timeOrderby = "";
    this.perfectedSongsList[this.choseValue].type = "exponentOrderby";
    if (this.perfectedSongsList[this.choseValue].exponentOrderby == "desc") {
      this.perfectedSongsList[this.choseValue].exponentOrderby = "asc";
      this.perfectedSongsList[this.choseValue].orderBy = "asc";
    } else {
      this.perfectedSongsList[this.choseValue].exponentOrderby = "desc";
      this.perfectedSongsList[this.choseValue].orderBy = "desc";
    }
    this.perfectedSongsList[this.choseValue].pageCurrent = 1;
    this.GetList();
  }
  play() {
    this.pause();
    this.list.forEach((item: any) => {
      if (item.musicUrl == this.audioSrc) {
        item.isPlay = true;
      }
    });
  }
  pause() {
    this.list.forEach((item: any) => {
      item.isPlay = false;
    });
  }
  nzPageIndexChange(e: any) {
    this.perfectedSongsList[this.choseValue].pageCurrent = e;
    this.GetList();
  }

  GetList() {
    this.loading = true;
    this.api.AllActivityShow({
        type: this.perfectedSongsList[this.choseValue].type,
        limit: this.pageSize,
        offset: this.perfectedSongsList[this.choseValue].pageCurrent,
        tables: this.choseValue,
        orderBy: this.perfectedSongsList[this.choseValue].orderBy,
      }).subscribe((res: any) => {
        this.loading = false;
        if (res.success) {
          this.updateImageField(res.data.result)
          this.perfectedSongsList[this.choseValue].data = res.data.result;
          this.list = res.data.result;
          this.perfectedSongsList[this.choseValue].pageTotal = res.data.count;
        }
      });
  }
  //检查图片重新赋值
  updateImageField(data:any) {
    data.forEach((song:any) => {
        if (!song.Image) {
            if (song.Alternative && song.Alternative.length > 0) {
                const alt = song.Alternative[0];
                if (alt.cover) {
                    song.Image = alt.cover;
                } else if (alt.union_cover) {
                    song.Image = alt.union_cover;
                } else if (alt.avatar) {
                    song.Image = alt.avatar;
                }
            }
        }
    });
  }
  reloadExponent(params: any) {
    let { item } = params;
    this.loading = true;
    this.api.getKugou_exponent({
        scid: item.Scid,
      }).subscribe((res: any) => {
          this.loading = false;
          if (res.success) {
            item.newExponent = res.result;
          }
        },(err: any) => {
          this.loading = false;
      });
  }
}
