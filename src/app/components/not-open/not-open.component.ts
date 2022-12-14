import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-not-open',
  templateUrl: './not-open.component.html',
  styleUrls: ['./not-open.component.scss']
})
export class NotOpenComponent implements OnInit {
  @Input("name") name: string = ""
  constructor() { }

  ngOnInit(): void {
  }
}
