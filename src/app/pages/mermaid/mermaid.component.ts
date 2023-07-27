import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
import mermaid from 'mermaid';
const { mermaidAPI } = mermaid;
@Component({
	selector: 'ngx-mermaid',
	templateUrl: './mermaid.component.html',
	styleUrls: ['./mermaid.component.scss']
})


export class MermaidComponent implements OnInit {

	constructor(public api: ApiService,public common: CommonService) { }
	ngOnInit(): void {
		this.reload()
	} 
	reload(){
		let m:any = document.getElementsByClassName('mermaid')[0]
		m.innerHTML=` graph TD
		  A[Christmas] -->|Get money| B(Go shopping)
		  B --> C{Let me think}
		  C -->|One| D[Laptop]
		  C -->|Two| E[iPhone]
		  C -->|Three| F[fa:fa-car Car]`
		mermaid.initialize({
			startOnLoad:true
		})
	}

	
}
