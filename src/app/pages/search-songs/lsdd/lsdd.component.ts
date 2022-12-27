import { Component, OnInit, Input,Output,EventEmitter  } from '@angular/core';
import { CommonService } from "../../../services/common.service";
@Component({
	selector: 'ngx-lsdd',
	templateUrl: './lsdd.component.html',
	styleUrls: ['./lsdd.component.scss']
})
export class LsddComponent implements OnInit {
	@Input() lsddList: any;
	constructor(public common: CommonService) { }

	ngOnInit(): void {
	}
	audioSrc = ''
	@Output() change: EventEmitter<any> = new EventEmitter<any>();
	playAudio(url: string, i: number) {
		this.audioSrc = url;
		this.change.emit({src:this.audioSrc,i});
	}
	
}
