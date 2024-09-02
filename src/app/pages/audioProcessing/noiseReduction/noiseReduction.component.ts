import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {CommonService} from "../../../services/common.service";
import { environment } from '../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ngx-noiseReduction',
  templateUrl: './noiseReduction.component.html',
  styleUrls: ['./noiseReduction.component.scss']
})
export class NoiseReductionComponent implements OnInit {
  constructor(public api: ApiService,public common: CommonService,private toast: ToastrService,) { }
  ngOnInit(): void {
  }
 
	file:any = '';
	loading=false;
	host = environment.downloadUrl2;
	downloadName = ''
	downloadUrl = ''
	waveform = ''
	spectrogram = ''
	//下载zip 直接a链接 不然 这个方法是 先下载完 在出来下载按钮
	download(){
		if(!this.downloadUrl){
			this.toast.info('该音频无需降噪')
		}else{
			this.common.downloadServer(this.downloadUrl)
		}
	}
	
	onFile(file:any): void{
		console.log(file)
		// console.log(this.host)
		this.file = file;
		this.noiseReduction()
	}
	noiseReduction(): void {
		this.loading = true;
		this.api.musicNoiseReduction({
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
