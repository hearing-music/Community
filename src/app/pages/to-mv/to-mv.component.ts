  import { Component } from '@angular/core';
  import { ApiService } from '../../services/api.service';
  import { CommonService } from '../../services/common.service';
  import { environment } from '../../../environments/environment';
  @Component({
    selector: 'ngx-to-mv',
    templateUrl: './to-mv.component.html',
    styleUrls: ['./to-mv.component.scss']
  })
  export class ToMvComponent {
    constructor(public api: ApiService, public common: CommonService) { }
	downloadUrl = environment.downloadUrl
    fileList: any = '';
    loading = false;
    onFile(fileList: any): void {
      this.fileList = fileList;
      this.creatMv()
    }
    downloadList: any = []
		
		
		type:any= 'ktv'
    creatMv(): void { 
      this.loading = true;
      this.api.createMV({ zip: this.fileList,type:this.type }).subscribe((res: any) => {
          this.loading = false;
          this.downloadList = [...this.downloadList,...res.result]
      })
    }
    download(item: any) {
      if (item.success) {
        this.common.downloadServer(this.downloadUrl+'/'+item.type+"/"+item.result)
      }
    }
  }
