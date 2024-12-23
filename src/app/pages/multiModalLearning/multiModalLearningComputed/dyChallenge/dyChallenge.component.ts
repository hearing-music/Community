import { Component, Input, OnInit } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-dyChallenge",
  templateUrl: "./dyChallenge.component.html",
  styleUrls: ["./dyChallenge.component.scss"],
})
export class DyChallengeComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {
  }
@Input() DyChallengeList:any=[]
@Input() loading:any=true
}
