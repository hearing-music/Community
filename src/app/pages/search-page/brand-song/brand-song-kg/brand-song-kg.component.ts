import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { CommonService } from "../../../../services/common.service";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-brand-song-kg",
  templateUrl: "./brand-song-kg.component.html",
  styleUrls: ["./brand-song-kg.component.scss"],
})
export class BrandSongKgComponent implements OnInit {
  @Input() brandSongList: any;
  audioSrc: string = "";
  audio: any;
  constructor(public common: CommonService, private router: Router) {}
  ngOnInit(): void {
    this.audio = document.getElementById("audio");
  }
  toSearchKg(item: any) {
    this.router.navigate(["/pages/search-songs/v3/" + item.songName]);
  }
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  listenMusic(url: string, i: number) {
    this.audioSrc = url;
    this.change.emit({ src: this.audioSrc, i });
  }
}
