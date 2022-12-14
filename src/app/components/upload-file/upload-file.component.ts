import { Component, OnInit,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'ngx-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {

  constructor() { }
	file:any = ''
  ngOnInit(): void {
  }
	@Output() onFileChild=new EventEmitter();
	inputChange(e:any) {
		this.file = e.target.files[0];
		this.onFileChild.emit(this.file)
	}
	click(e:any){
		e.target.value = null;
	}
}
