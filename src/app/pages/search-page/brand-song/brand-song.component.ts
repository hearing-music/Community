import { Component, OnInit, Input } from "@angular/core";
import { CommonService } from "../../../services/common.service";
import { Router } from "@angular/router";
@Component({
  selector: "ngx-brand-song",
  templateUrl: "./brand-song.component.html",
  styleUrls: ["./brand-song.component.scss"],
})
export class BrandSongComponent implements OnInit {
  @Input() brandSongList: any;
  audioSrc: string = "";
  audio: any;
  constructor(public common: CommonService, private router: Router) {}
  ngOnInit(): void {
    this.audio = document.getElementById("audio");
  }
  toSearchQQ(item: any) {
    this.router.navigate(["/pages/search-songs/qq/" + item.name]);
  }
  listenMusic(items: any, i) {
    let audio: any = document.getElementById("audio");
    this.audioSrc = items.audio_url;
    setTimeout(() => {
      this.brandSongList.forEach((item: any, index: number) => {
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
}
