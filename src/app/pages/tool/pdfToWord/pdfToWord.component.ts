import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
import {environment} from '../../../../environments/environment'
@Component({
  selector: 'ngx-pdfToWord',
  templateUrl: './pdfToWord.component.html',
  styleUrls: ['./pdfToWord.component.scss']
})
export class PdfToWordComponent implements OnInit {
  selectedValue = null;
  file: any;
  testTrue: { [key: string]: boolean } = {
    flieTrue: false,
    choseTrue: false,
  }
  percent = 0;
  choseJsonExle = [
    { value: ".json", label: '.json' },
    { value: ".xlsx", label: '.xlsx' }
  ]
  message: string;
  compareFn = (o1: any, o2: any): boolean => (o1 && o2 ? o1.value === o2.value : o1 === o2);
  fileType: any;
  location: any = '';
  url = ''
  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }
  onFile(file: any): void {
    console.log(file)
    this.file = file;
    this.message = ""
  }
  change(): void {
	this.api.pdfToWord({pdf:this.file}).subscribe((res: any) => {
        if (res.success) {
          this.url = res.result
		  this.downLoad()
        }
      }, (err: any) => {
        console.log(err)
      })
    
   
  }
  downLoad() {
    let url = environment.downloadUrl + this.url
    window.open(url);
  }

}
