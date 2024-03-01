import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../../../src/app/services/api.service";
@Component({
  selector: "ngx-entered-by-you-ni",
  templateUrl: "./entered-by-you-ni.component.html",
  styleUrls: ["./entered-by-you-ni.component.scss"],
})
export class EnteredByYouNiComponent implements OnInit {
  upLoadmessage: any = "";
  constructor(public api: ApiService) {}
  upLoadSuccess = false;
  ngOnInit(): void {}
  onFile(file: any) {
    this.api
      .EnteredByYou({
        file: file,
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.upLoadmessage = res.data;
          this.upLoadSuccess = true;
        }
      });
  }
}
