import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'ngx-fufu-billboard',
  templateUrl: './fufu-billboard.component.html',
  styleUrls: ['./fufu-billboard.component.scss']
})
export class FufuBillboardComponent implements OnInit {
  constructor(public api: ApiService, private message: NzMessageService) { }
  fufuleidaList: any = []
  	update:any=''
  isSurePlay: boolean = false
  audioSrc = '';
loading=false
  ngOnInit(): void {
    this.getFufuList()
  }
  getFufuList() {
	  this.loading = true;
    this.api.getfufuleida().subscribe((res: any) => {
      this.fufuleidaList = res.data
			this.update = res.update
      console.log(res)
	  this.loading = false;
    }, (err: any) => {
			console.log(err)
			this.loading = false;
		})
  }
  openkg(hash: any, mixsongid: any) {
    window.open("https://www.kugou.com/song/#hash=" + hash + "&album_audio_id=" + mixsongid)
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
