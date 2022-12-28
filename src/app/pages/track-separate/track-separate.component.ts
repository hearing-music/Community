import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
import { environment } from '../../../environments/environment';
@Component({
  selector: 'ngx-track-separate',
  templateUrl: './track-separate.component.html',
  styleUrls: ['./track-separate.component.scss']
})
export class TrackSeparateComponent implements OnInit {

  constructor(public api: ApiService,public common: CommonService) { }

  ngOnInit(): void {
  }
	file:any = '';
	loading=false;
	downloadZip = ''
	host = environment.downloadUrl;
	onFile(file:any): void{
		console.log(file)
		console.log(this.host)
		this.file = file;
		this.trackSeparate()
	}
	trackSeparate(): void {
		this.loading = true;
		this.api.trackSeparate({
			file: this.file
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if(res.success){
				this.downloadZip = this.host + res.result.url;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
