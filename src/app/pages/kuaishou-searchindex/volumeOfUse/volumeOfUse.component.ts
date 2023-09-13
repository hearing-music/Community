import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'ngx-volumeOfUse',
  templateUrl: './volumeOfUse.component.html',
  styleUrls: ['./volumeOfUse.component.scss']
})
export class VolumeOfUseComponent implements OnInit {
  loading = false;
  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }
  result:any={}
  searchValue=''
  searchHolder='请输入音频id'
  getData() {
    this.loading = true;
    this.api.getkuaishouVolumeOfUse({ keyword: this.searchValue})
      .subscribe((res: any) => {
        this.loading = false
        if (res.success) {
			res.result.coverUrls =res.result.coverUrls ||{}
			res.result.coverUrls[0]=res.result.coverUrls[0]||{url:''}
         this.result = res.result
        }
      })
  }
  search(value: string) {
  	this.searchValue = value;
	this.getData()
  }
  
}
