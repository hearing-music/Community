import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import { CommonService } from '../../../services/common.service';
import { environment } from '../../../../environments/environment';
let baseUrl = environment.baseUrl;
@Component({
  selector: 'ngx-ogg-to-mp3',
  templateUrl: './ogg-to-mp3.component.html',
  styleUrls: ['./ogg-to-mp3.component.scss']
})
export class OggToMp3Component implements OnInit {
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
      this.api.OggToMp3({
        file: this.file,
        typeOf: this.typeOf
      }).subscribe((res: any) => {
        console.log(res)
        if (res.success) {
          this.isResData = true
          this.fileNameWithoutExtension = res.file
          this.fileURL = baseUrl + res.data
        }
      })
    }
  download() {
    this.common.download(this.fileURL,this.fileNameWithoutExtension)
    // window.open(this.fileURL)
  }
}
