import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'ngx-searchTip',
  templateUrl: './searchTip.component.html',
  styleUrls: ['./searchTip.component.scss']
})
export class SearchTipComponent implements OnInit {
	@Input() tipStr: string;
  constructor() { }

  ngOnInit(): void {
  }

}
