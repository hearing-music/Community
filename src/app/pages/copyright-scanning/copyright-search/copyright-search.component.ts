import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";
@Component({
	selector: 'ngx-copyright-search',
	templateUrl: './copyright-search.component.html',
	styleUrls: ['./copyright-search.component.scss']
})
export class CopyrightSearchComponent implements OnInit {

	constructor(public api: ApiService) { }

	ngOnInit(): void {
	}
	searchValue = '';
	searchHolder = '搜索名字';
	copyrightList:any[] = [];
	pageSize = 20;
	pageCurrent = 1;
	pageTotal = 20;
	loading = false;

	search(value: string) {
		console.log(value)
		this.searchValue = value;
		this.copyrightSearch()
	}
	nzPageIndexChange(e: string | number) {
		console.log(e)
	}
	copyrightSearch() {
		this.loading = true;
		this.api.copyrightSearch({
			keyword: this.searchValue
		}).subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			this.copyrightList = res.result;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
