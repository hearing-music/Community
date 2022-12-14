import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@Input() searchValue: any;
	@Input() searchHolder: any;
	@Output() childSearch=new EventEmitter();
	search() {
		console.log('search')
		this.childSearch.emit(this.searchValue)
	}
	focus(){
		document.onkeydown =  (event_e)=>{
			if(event_e.code === 'Enter' || event_e.code === 'NumpadEnter'){
				this.search()
			}
		}
	}
	blur(){
		document.onkeydown = null
	}
  constructor() { }

  ngOnInit(): void {
  }

}
