import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  selectedValue = null;
  file: any;
  constructor() { }

  ngOnInit(): void {
  }

  onFile(file: any): void {
    console.log(file)
    this.file = file;
  }
}
