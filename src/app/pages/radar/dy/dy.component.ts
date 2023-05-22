import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-dy',
  templateUrl: './dy.component.html',
  styleUrls: ['./dy.component.scss']
})
export class DYComponent implements OnInit {
  @Input() listOfData: any;
  constructor() { }

  ngOnInit(): void {
  }
}
