import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'ngx-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
	@Input() searchValue: any;
	@Input() searchHolder: any;
	@Input() searchWidth: any='350px';
	@Output() childSearch=new EventEmitter();
	@Output() childInput=new EventEmitter();
	search() {
		console.log('search')
		this.childSearch.emit(this.searchValue)
	}
	input(e:any){
		setTimeout(()=>{
			this.childInput.emit(this.searchValue)
		},10)
	}
	focus(e:any){
		e.preventDefault();
		document.onkeydown =  (event_e:any)=>{
			if(event_e.keyCode === 13){
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
