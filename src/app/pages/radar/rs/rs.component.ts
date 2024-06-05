import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'ngx-rs',
  templateUrl: './rs.component.html',
  styleUrls: ['./rs.component.scss']
})
export class RSComponent implements OnInit {
  @Input() listOfData: any;
  constructor(public api: ApiService, private message: NzMessageService) { }

  ngOnInit(): void {
  }
  toQq(data: any) {
    if (data != 0) {
      window.open("https://y.qq.com/n/ryqq/songDetail/" + data)
    } else {
      this.message.create("error", `该歌曲没有id请自行查找`);
    }
  }
  toKg(data: any) {
    let keyword = data.SongName + "-" + data.SingerName
    let mixSongId = data.KgMixSongID
    this.api.getKuGouHash({ keyword, mixSongId }).subscribe((res: any) => {
      if (res.result) {
        window.open('https://www.kugou.com/song/#'+data.EMixSongID)
      } else {
        this.message.create("error", `该歌曲没有id请自行查找`);
      }
    })
  }
  toKqIndex(data: any) {
    if (data != 0) {
      window.open("https://h5.kugou.com/achievement/v-a34ccad0/index.html?mixsongid=" + data)
    } else {
      this.message.create("error", `该歌曲没有id请自行查找`);
    }
  }
  toQqIndex(data: any) {
    console.log(data)
    if (data.QqId != 0) {
      let keyword = data.SongName + "-" + data.SingerName
      let songid = data.QqId
      this.api.getQqIdExponent({ keyword, songid }).subscribe((res: any) => {
        if (res.songmid) {
          window.open("https://y.qq.com/m/client/music_index/index.html?mid=" + res.songmid)
        } else {
          this.message.create("error", `该歌曲没有id请自行查找`);
        }
      })
    } else {
      this.message.create("error", `该歌曲没有id请自行查找`);
    }
  }
}
