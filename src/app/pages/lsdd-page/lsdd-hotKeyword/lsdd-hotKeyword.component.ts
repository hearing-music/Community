import { Component, OnInit, Input } from "@angular/core";
@Component({
  selector: "ngx-lsdd-hotKeyword",
  templateUrl: "./lsdd-hotKeyword.component.html",
  styleUrls: ["./lsdd-hotKeyword.component.scss"],
})
export class LsddKeywordComponent implements OnInit {
  @Input() list: any;
  constructor() {}
  ngOnInit(): void {}
}
