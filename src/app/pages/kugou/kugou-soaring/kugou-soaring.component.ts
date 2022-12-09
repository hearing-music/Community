import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
@Component({
	selector: 'ngx-kugou-soaring',
	templateUrl: './kugou-soaring.component.html',
	styleUrls: ['./kugou-soaring.component.scss']
})
export class KugouSoaringComponent implements OnInit {
	list = [];
	loading = false;
	pageCurrent = 1;
	pageSize = 30;
	pageTotal = 5010;
	constructor(public api: ApiService) { }

	ngOnInit(): void {
		this.getkugou_soaring()
	}
	openLink(id: string | number) {
		window.open('https://www.kugou.com/singer/' + id + '.html')
	}
	nzPageIndexChange(e: any) {
		this.pageCurrent = e;
		this.getkugou_soaring()
	}
	getkugou_soaring() {
		this.loading = true;
		this.api.getKugou_soaring({
			page: this.pageCurrent
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				this.list = res.result;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
