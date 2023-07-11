import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-qq-label',
  templateUrl: './qq-label.component.html',
  styleUrls: ['./qq-label.component.scss']
})
export class QqLabelComponent implements OnInit {
  SingerStyle = {
    width: '5%',
    textAlign: 'center'
  };
  singerListStyle = {
    width: '10%',
    textAlign: 'center'
  };
constructor(private api: ApiService,private router:Router) { }
  loading=false
  singer=[]
  song_list=[]
  ngOnInit(): void {
    this.getLabel("singer")
    this.getLabel("song_list")
  }
  getLabel(Label: any) {
    this.loading=true
    if (Label == "singer") {
      this.api.getQq_freeSongsLabel({ label: Label }).subscribe((res: any) => {
        this.singer = res.result
        this.loading=false
      })
    }
    if (Label == "song_list") {
      this.api.getQq_freeSongsLabel({ label: Label }).subscribe((res: any) => {
        this.song_list = res.result
        this.loading=false
      })
    }
  }
  ToSongList(item: any) {
     this.router.navigate(['/pages/qq/qq-label/songListLabel', item.id])
  }
  ToSonger(item: any) {
    console.log(item) 
    this.router.navigate(['/pages/qq/qq-label/singerLabel', item.ID])
  }
}
