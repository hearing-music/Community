import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
import { environment } from '../../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'ngx-volumeNormalisation',
  templateUrl: './volumeNormalisation.component.html',
  styleUrls: ['./volumeNormalisation.component.scss']
})
export class VolumeNormalisationComponent implements OnInit {
  constructor(public api: ApiService,public common: CommonService,public message:NzMessageService) { }
  ngOnInit(): void {
  }
 
	file:any = '';
	loading=false;
	host = environment.downloadUrl2;
	downloadName = ''
	downloadUrl = ''
	waveform=''
	spectrogram=''
	//下载zip 直接a链接 不然 这个方法是 先下载完 在出来下载按钮
	download(){
		this.common.downloadServer(this.downloadUrl)
	}
	
	onFile(file:any): void{
		console.log(file)
		// console.log(this.host)
		this.file = file;
		this.musicVolumeNormalisation()
	}
	musicVolumeNormalisation(): void {
		this.loading = true;
		this.api.musicVolumeNormalisation({
			file: this.file,
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
				res.result = res.result.replace('/usr/local/openresty/nginx/www/audioTools/','')
				res.spectrogram = res.spectrogram.replace('/usr/local/openresty/nginx/www/audioTools/','')
				res.waveform = res.waveform.replace('/usr/local/openresty/nginx/www/audioTools/','')
				this.downloadUrl = this.host + res.result;
				this.waveform = this.host + res.waveform;
				this.spectrogram = this.host + res.spectrogram;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
