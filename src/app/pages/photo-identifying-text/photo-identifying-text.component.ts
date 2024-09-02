import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'ngx-photo-identifying-text',
  templateUrl: './photo-identifying-text.component.html',
  styleUrls: ['./photo-identifying-text.component.scss']
})
export class PhotoIdentifyingTextComponent implements OnInit {
  language = "eng"
  file = ""
  text = ""
  constructor(private api: ApiService,private toast: ToastrService,) { }

  ngOnInit(): void {
  }
  onFile(file: any) {
    this.file = file;
    this.identify()
  }
  changeLanguage(language: any) {
    this.language = language
  }
  identify() {
    this.api.TextExtractionImage({ file: this.file, language: this.language }).subscribe((res: any) => {
      this.text = res.result
    })
  }
  copy() {
    var textarea = document.createElement("textarea");
    textarea.value = this.text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    this.toast.success(`¸´ÖÆ³É¹¦`);
  }
}
