import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import {CommonService} from "../../../services/common.service";
@Component({
	selector: "ngx-kuaishou-videoDetails",
	templateUrl: "./kuaishou-videoDetails.component.html",
	styleUrls: ["./kuaishou-videoDetails.component.scss"],
})
export class KuaishouVideoDetailsComponent implements OnInit {
	loading = false;
	constructor(public api: ApiService,public common: CommonService, private message: NzMessageService) { }

	ngOnInit(): void { }
	result: any = {};
	searchValue = "";
	searchHolder = "请输入视频链接";
	getData() {
		if (!this.searchValue) {
			this.message.info('请输入视频链接')
			return
		}
		this.loading = true;
		// 使用正则表达式提取musicId的值
		this.api
			.getKsVideoDetails({ src: this.searchValue })
			.subscribe((res: any) => {
				this.loading = false;
				if (res.success) {
					this.result = res.data;
				}
			}, (err: any) => {
				this.loading = false;
				console.log(err)
			});
	}
	search(value: string) {
		this.searchValue = value;
		this.getData();
	}
}
