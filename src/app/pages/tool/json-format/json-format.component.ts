import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";

@Component({
	selector: 'ngx-json-format',
	templateUrl: './json-format.component.html',
	styleUrls: ['./json-format.component.css']
})
export class JsonFormatComponent implements OnInit {
	constructor(public api: ApiService) { }

	ngOnInit(): void {
	}


	select() {
		let main = document.querySelector('.main')
		main.innerHTML = `<div>
                                     <iframe id="jsoncrackEmbed" style='flex: 1;order: 2;border: none;width: 100%;height: 80vh;' src="https://jsoncrack.com/widget"></iframe>
                             </div>`
		const inputBox:any = document.querySelector('.intJson')
		const json = inputBox.value;
		const jsonCrackEmbed = document.querySelector("iframe");
		jsonCrackEmbed?.addEventListener("load", () => {
			setTimeout(() => jsonCrackEmbed.contentWindow.postMessage({
				json
			}, "*"), 500);
		});
	}
}
