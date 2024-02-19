import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from '../../../services/common.service';
import { environment } from '../../../../environments/environment';
let baseUrl = environment.baseUrl;
@Component({
	selector: 'ngx-mgg-to-wav',
	templateUrl: './mgg-to-wav.component.html',
	styleUrls: ['./mgg-to-wav.component.scss']
})
export class MggToWavComponent implements OnInit {
	loading = false;
	isResData = false
	file: any = '';
	fileURL: string
	fileNameWithoutExtension: string
	mp3File = false
	optionList = [
		{ label: 'mp3', value: 'mp3' },
		{ label: 'wav', value: 'wav' }
	];
	typeOf: string = "mp3"
	selectedValue = "mp3"
	constructor(public api: ApiService, public common: CommonService) { }
	ngOnInit(): void {
	}
	onFile(file: any): void {
		this.file = file;
		this.conversion()
	}
	//转换类型
	//选择
	changeTypeOf(value: string): void {
		this.typeOf = value
	}
	conversion(): void {
		this.isResData = false
		this.mp3File = true
		this.fileNameWithoutExtension = ""
		this.fileURL = ""
		this.api.QqAudioDecryptio({
			file: this.file
		}).subscribe((res: any) => {
			console.log(res)
			this.isResData = true
			this.fileNameWithoutExtension = res.result.name
			this.fileURL = baseUrl + res.result.url
		}, (err: any) => {
			console.log(err)
			this.isResData = true
		})
	}
	download() {
		this.common.downloadServer(this.fileURL)
		// window.open(this.fileURL)
	}
	searchValue = '';
	search(e: any) {
		this.searchValue = e;
		if (!this.searchValue) {
			return
		}
		this.QqAudioDecryptioNew()
	}
	QqAudioDecryptioNew() {
		this.mp3File = true
		this.api.QqAudioDecryptioNew({
			musicUrl: this.searchValue
		}).subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			if (res.success) {
				this.isResData = true
				this.fileNameWithoutExtension = res.data
				this.fileURL = baseUrl + res.data
			}
		}, (err: any) => {
			console.log(err)
			this.isResData = true
		})
	}
}
