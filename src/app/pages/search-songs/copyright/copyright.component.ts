import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from 'ngx-toastr';
import { CommonService } from "../../../services/common.service";
@Component({
  selector: "ngx-copyright",
  templateUrl: "./copyright.component.html",
  styleUrls: ["./copyright.component.scss"],
})
export class CopyrightComponent implements OnInit {
  constructor(
    public api: ApiService,
	private toast: ToastrService,
    public common: CommonService
  ) {}
  @Input() copyrightList: any;
  audioSrc = "";
  @Output() change: EventEmitter<any> = new EventEmitter<any>();
  playAudio(url: string, i: number) {
    if (!url) {
      this.toast.error("没找到歌曲地址😜");
      return;
    }
    this.audioSrc = url;
    this.change.emit({ src: this.audioSrc, i });
  }
  ngOnInit(): void {}
  dowloadLyric(src: any) {
    window.open(src);
  }
	// 打开公司
	openCompay(id:string|number){
		window.open('https://y.qq.com/portal/company_detail.html?id='+id+'#sort=1&type=album')
	}
  showRadio(item: any) {
    if (item.DyCoverSong.length > 0 || item.isShowRadio) {
      if (item.isShowRadio) {
        item.isShowRadio = !item.isShowRadio;
      } else {
        item.isShowRadio = item.isShowRadio;
        item.isShowRadio = true;
      }
    }
  }
  ToRadio(id: any) {
    window.open(
      "https://www.douyin.com/user/MS4wLjABAAAAO6NdD0RP94L8g6NQmtqeNlRGs9khX2ROkSV0vWXUyas?modal_id=" +
        id
    );
  }
}
