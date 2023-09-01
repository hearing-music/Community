import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
@Component({
  selector: 'ngx-original-audio',
  templateUrl: './original-audio.component.html',
  styleUrls: ['./original-audio.component.scss']
})
export class OriginalAudioComponent implements OnInit {
  page=1;
  pagesize=10;
  listOfData:any[] = [];
  total=10;
  loading=false
  audioSrc=""
  constructor(private api:ApiService,private common:CommonService) { }
  ngOnInit(): void {
    this.search()
  }
  search() {
    this.loading=true
    this.api.GetOriginalAudio({page:((this.page-1)*this.pagesize),pagesize:this.pagesize}).subscribe((res:any)=>{
      this.loading=false
      if(res.success){
        console.log(res)
        this.listOfData=res.result
        this.total=res.totalRows
      }
    })
  }
  play(data:any){
    let audioSrc=data.region+data.theme_name+"/"+data.style_name+"/"+data.name+data.ext
    this.audioSrc=audioSrc
  }
  download(data:any){
    let audioSrc=data.region+data.theme_name+"/"+data.style_name+"/"+data.name+data.ext
    this.common.download(audioSrc,data.name+data.ext)
  }
  changePage(event:any){
    this.page=event
    this.search()
  }
}
