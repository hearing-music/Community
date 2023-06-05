import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { fromEvent } from 'rxjs';

@Component({
	selector: 'ngx-source-photo',
	templateUrl: './source-photo.component.html',
	styleUrls: ['./source-photo.component.scss']
})
export class SourcePhotoComponent implements OnInit {
	loading = false;
	private scrollContainer: HTMLElement | undefined;
	private subscribeScroll: any;
	page: number = 1;
	photoSource: any[] = [];
	constructor(public api: ApiService) { }
	ngOnInit(): void {
		this.getSource(1);
		this.scrollContainer = document.querySelector('.scrollable-container') as HTMLElement;
		this.subscribeScroll = fromEvent(this.scrollContainer, 'scroll')
			.subscribe(() => {
				this.onWindowScroll();
			});
	}
	ngOnDestroy(): void {
		if (this.subscribeScroll) {
			this.subscribeScroll.unsubscribe();
		}
	}
	getSource(page: any) {
		this.loading = true;
		this.api.getSourcePhoto({ page: page }).subscribe((res: any) => {
			this.loading = false;
			// let inner:any = document.getElementsByClassName('inner')
			this.photoSource = [...this.photoSource,...res.result]
		});
	}
	onWindowScroll() {
		const element = this.scrollContainer;
		const scrollPosition = element.scrollTop + element.clientHeight;
		const scrollHeight = element.scrollHeight;
		if ((scrollPosition >= scrollHeight - 10) && !this.loading) {
			this.page++;
			this.getSource(this.page);
		}
	}
}