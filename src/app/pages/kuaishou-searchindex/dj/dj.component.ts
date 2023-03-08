import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'ngx-dj',
  templateUrl: './dj.component.html',
  styleUrls: ['./dj.component.scss']
})
export class DjComponent implements OnInit {
  dataValue: any = []
  loading = false;
  page: number = 1
  pageSize: number = 10
  audioSrc = '';
  isSurePlay: boolean = false
  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.loading = true;
    this.api.getkuaishouDj({ page: this.page, pageSize: this.pageSize })
      .subscribe((res: any) => {
        this.loading = false
        if (res.success) {
          res.result.forEach((ele, index) => {
            ele.isPlay = false
            if (ele.name.split("]").length > 1) {
              ele.name = ele.name.split("]")[1]
            }
            ele.createdAt = ele.createdAt.split("T")[0]
          })
          console.log(res, '123456')
          this.dataValue = [...this.dataValue, ...res.result]
        }
      })
  }
  playAudio(url: string, i: number) {
    this.isSurePlay = true
    this.audioSrc = url;
    let audio: any = document.getElementById('audio')
    setTimeout(() => {
      this.dataValue.forEach((item: any, index: number) => {
        if (index == i) {
          item.isPlay = !item.isPlay
          if (item.isPlay) {
            audio.play()
          } else {
            audio.pause()
          }
        } else {
          item.isPlay = false;
        }
      })
    }, 50)
  }
  pause() {
    this.dataValue.forEach((item: any) => {
      item.isPlay = false;
    })
  }
  play(element: any) {
    console.log(element.srcElement.currentSrc)
    var i = this.dataValue.findIndex((e: any) => e.mp3url == element.srcElement.currentSrc)
    if (i !== -1) {
      this.dataValue[i].isPlay = true;
    }
  }
  djPageNext() {
    if (this.dataValue.length == 0) {
      return
    }
    this.page += 1;
    this.getData()
  }
}
