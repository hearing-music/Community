import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'ngx-fufuleida',
  templateUrl: './fufuleida.component.html',
  styleUrls: ['./fufuleida.component.scss']
})
export class FufuleidaComponent implements OnInit {
  fufuleidaList: any = []
	update:any=''
  isSurePlay: boolean = false
  audioSrc = '';
  constructor(public api: ApiService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.getFufuList()
  }
  getFufuList() {
    this.api.getfufuleida().subscribe((res: any) => {
      this.fufuleidaList = res.data
			this.update = res.update
      console.log(res)
    })
  }
  openkg(hash: any, albumId: any) {
    window.open("https://www.kugou.com/song/#hash=" + hash + "&album_audio_id=" + albumId)
  }
  copy(songName: string) {
    var textarea = document.createElement("textarea");
    textarea.value = songName;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    this.message.create('success', `${songName}复制成功`);
  }
}
