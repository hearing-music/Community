import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
import mermaid from 'mermaid';
const { mermaidAPI } = mermaid;
@Component({
	selector: 'ngx-mapping',
	templateUrl: './mapping.component.html',
	styleUrls: ['./mapping.component.scss']
})


export class MappingComponent implements OnInit {

	constructor(public api: ApiService,public common: CommonService) { }
	ngOnInit(): void {
		mermaidAPI.render('the-id', `graph TD
		A[Christmas] -->|Get money| B(Go shopping)
		B --> C{Let me think}
		C -->|One| D[Laptop]
		C -->|Two| E[iPhone]
		C -->|Three| F[fa:fa-car Car]`,
		// @ts-ignore
		 (g:any) => {
			let r:any = document.querySelector('#result')
		  r.innerHTML(g);
		});
	} 
		

	
}
