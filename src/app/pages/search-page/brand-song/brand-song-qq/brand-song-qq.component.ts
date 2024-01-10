import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CommonService } from "../../../../services/common.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-brand-song-qq",
  templateUrl: "./brand-song-qq.component.html",
  styleUrls: ["./brand-song-qq.component.scss"],
})
export class BrandSongQqComponent implements OnInit {
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
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  listenMusic(url: string, i: number) {
    this.audioSrc = url;
    this.change.emit({ src: this.audioSrc, i });
  }
}
