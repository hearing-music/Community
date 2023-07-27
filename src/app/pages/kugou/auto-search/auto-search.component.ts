import { Component, ElementRef, OnInit } from "@angular/core";
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { resolve } from "dns";
@Component({
  selector: "ngx-auto-search",
  templateUrl: "./auto-search.component.html",
  styleUrls: ["./auto-search.component.scss"],
})
export class AutoSearchComponent implements OnInit {
  songName = "";
  singerName = "";
  playLink = "";
  playTime = "";
  playCount: number;
  loading = false;
  messageFalse = 0;
  requestMessage = [];
  isFinish = false;
  completionProgress = 0;
  constructor(
    public common: CommonService,
    public api: ApiService,
    private el: ElementRef
  ) {}
  ngOnInit(): void {
    this.scrollToBottom();
  }
  async kuGouAutoSearch(arr: any) {
    this.isFinish = true;
    let promise = arr.map((item: any) => {
      return new Promise((resolve) => {
        this.api
          .kuGouAutoSearch({
            songName: this.songName,
            singerName: this.singerName,
            playLink: this.playLink,
            playTime: this.playTime,
          })
          .subscribe(
            (res: any) => {
              console.log(res);
              if (res.success) {
				  if(res.result.proxy){
					  res.result.proxy = res.result.proxy.substr(7)
					  res.result.proxy = res.result.proxy.substr(0,res.result.proxy.length-1)
				  }
                this.loading = false;
                this.requestMessage.push(res);
                this.completionProgress = Math.ceil(
                  (this.requestMessage.length / this.playCount) * 100
                );
                console.log(this.requestMessage.length);
                console.log(this.playCount);
                if (this.requestMessage.length == this.playCount) {
                  this.isFinish = false;
                  this.songName = "";
                  this.singerName = "";
                  this.playLink = "";
                  this.playTime = "";
                }
                resolve(res);
              } else {
                this.kuGouAutoSearch([1]);
                resolve(false);
              }
            },
            (err: any) => {
              this.kuGouAutoSearch([1]);
              resolve(false);
              console.log(err);
              this.loading = false;
            }
          );
      });
    });
    return Promise.all(promise);
  }
  async requestNum() {
    let arr = [];
    for (let i = 0; i < this.playCount; i++) {
      arr.push(1);
    }
    let resArr = await this.kuGouAutoSearch(arr);
    console.log(resArr);
  }
  scrollToBottom(): void {
    try {
      this.el.nativeElement.querySelector(".terminal").scrollTop =
        this.el.nativeElement.querySelector(".terminal").scrollHeight;
    } catch (err) {}
  }
  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}
