import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { CommonService } from "../../../../services/common.service";
import { ApiService } from "../../../../services/api.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-perfected-songs",
  templateUrl: "./perfected-songs.component.html",
  styleUrls: ["./perfected-songs.component.scss"],
})
export class PerfectedSongsComponent implements OnInit {
  @Input() list: any;
  @Input() exponentOrderby: any;
  @Input() publish_timeOrderby: any;
  @Output() playMusic: EventEmitter<any> = new EventEmitter<any>();
  ModifyTime: any = 0;
  playAudio(item: any, i: number) {
    if (item.EMixSongID) {
      this.playMusic.emit({ item: item, i });
    } else {
      this.toast.info("未找到歌曲");
    }
  }
  @Output() exponentClick: EventEmitter<any> = new EventEmitter<any>();
  exponentOrder() {
    this.exponentClick.emit();
  }
  @Output() publish_timeClick: EventEmitter<any> = new EventEmitter<any>();
  publish_timeOrder() {
    this.publish_timeClick.emit();
  }
  @Output() reloadExponent: EventEmitter<any> = new EventEmitter<any>();
  reloadExponents(item:any) {
    this.reloadExponent.emit({item:item});
  }
  constructor(public common: CommonService,public api: ApiService,private toast: ToastrService) {}
  ngOnInit(): void {
    this.ModifyTime = new Date().getTime();
  }
  openLink(item: any) {
    if (item.EMixSongID) {
      window.open("https://www.kugou.com/song/#" + item.EMixSongID);
    } else {
      this.toast.info("未找到歌曲");
    }
  }
  copy(text: string) {
    this.common.copy(text);
  }
  gotoCopyright(name: any, event: any) {
    event.stopPropagation();
    let linkName = name.replaceAll("(", "（").replaceAll(")", "）");
    const url = `/pages/search-songs/copyright/${linkName}`;
    this.common.openInNewWindow(url);
  }
  openSingerHome(id: any) {
    if (!id || id == "0") {
      this.toast.info("没找到该歌手id😭");
      return;
    }
    window.open(`https://www.kugou.com/singer/${id}.html`);
  }
  splitEm(inputString: any) {
    let cleanedString = inputString.replace(/<em>|<\/em>/g, "");
    return cleanedString;
  }
}
