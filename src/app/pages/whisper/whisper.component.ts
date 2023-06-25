import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";


@Component({
  selector: 'ngx-whisper',
  templateUrl: './whisper.component.html',
  styleUrls: ['./whisper.component.scss']
})
export class WhisperComponent implements OnInit {

  constructor(public api: ApiService) { }
  ngOnInit(): void {
	  var iframe:any = document.getElementsByClassName('whisper');
	  this.iframe = iframe[0].clientHeight;
  }
iframe:any=0
}
