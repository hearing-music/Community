import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'ngx-layers',
  templateUrl: './layers.component.html',
  styleUrls: ['./layers.component.scss']
})
export class LayersComponent implements OnInit {
  loading = false;
  kugouLayers = []
  qqLayers = []
  allLyers = []
  array = ['1号骗子', '2号骗子', '3号骗子', '4号骗子'];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this.getLayersQ()
      .subscribe((res: any) => {
        this.kugouLayers = res.result
        this.allLyers = [...this.kugouLayers, ...this.qqLayers]
      }, (err: any) => {
        this.loading = false;
        console.log(err)
      })
    this.getLayersK()
      .subscribe((res: any) => {
        this.qqLayers = res.result
        this.allLyers = [...this.kugouLayers, ...this.qqLayers]
      }, (err: any) => {
        this.loading = false;
        console.log(err)
      })
  }
  // xianshi() {
  //   console.log(this.allLyers)
  // }
  //获取酷狗骗子
  getLayersK() {
    return this.http.get("http://communitiesmusiclist.tingjianmusic.cn/kugou/getLiarUserInfo?page=1&pageSize=10")
  }
  //获取qq音乐骗子
  getLayersQ() {
    return this.http.get("http://communitiesmusiclist.tingjianmusic.cn/qq/getLiarUserInfo?page=1&pageSize=10")
  }
}
