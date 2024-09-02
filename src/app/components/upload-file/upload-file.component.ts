import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ngx-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent implements OnInit {
@Input() multiple: any = false;
  constructor(private toast: ToastrService,) { }
	file:any = ''
	files:any = []
  ngOnInit(): void {
  }
	@Output() onFileChild=new EventEmitter();
	inputChange(e:any) {
		if(this.multiple){
			if(e.target.files.length>10){
				// 最多上传10个文件
				this.toast.info('最多上传10个文件')
				return
			}
			this.files = e.target.files;
			this.onFileChild.emit(this.files)
		}else{
			this.file = e.target.files[0];
			this.onFileChild.emit(this.file)
		}
	}
	click(e:any){
		e.target.value = null;
	}
}
