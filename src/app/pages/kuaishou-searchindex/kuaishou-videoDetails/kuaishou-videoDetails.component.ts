import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from 'ngx-toastr';
import {CommonService} from "../../../services/common.service";
import * as XLSX from "xlsx";
@Component({
	selector: "ngx-kuaishou-videoDetails",
	templateUrl: "./kuaishou-videoDetails.component.html",
	styleUrls: ["./kuaishou-videoDetails.component.scss"],
})
export class KuaishouVideoDetailsComponent implements OnInit {
	loading = false;
	constructor(public api: ApiService,public common: CommonService, private toast: ToastrService,) { }

	ngOnInit(): void { }
	result: any = {};
	searchValue = "";
	searchHolder = "请输入视频链接";
	searchType: any = "切换excel批量搜索";
	listK: any = [];
	listObj: any = {};
	listeValue: any = "";
	resultList:any=[]
	searchTypeChange() {
		if (this.searchType == "切换excel批量搜索") {
			this.searchType = "切换输入搜索";
		} else {
			this.searchType = "切换excel批量搜索";
		}
	}
	excelSearch() {
		var inputElement = document.createElement("input");
		// 设置input的type为file
		inputElement.setAttribute("type", "file");
		inputElement.setAttribute(
			"accept",
			".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
		);
		inputElement.setAttribute("multiple", "true");
		inputElement.click();
		inputElement.addEventListener("change", (e: any) => {
			const target: any = e.target;
			const files = target.files;
	
			var reader = new FileReader();
	
			//文件加载完成后调用
			reader.onload = (e) => {
				var data = e.target.result;
	
				const workbook = XLSX.read(data, {
					type: "array",
				});
				//获取json格式的Excel数据
				var jsonData = XLSX.utils.sheet_to_json(
					workbook.Sheets[workbook.SheetNames[0]],
					{
						defval: "null", //单元格为空时的默认值
					}
				);
				this.parseJson(jsonData);
				// console.log(jsonData)
			};
	
			//加载文件
			reader.readAsArrayBuffer(files[0]);
		});
	}
	parseJson(jsonData: any) {
		this.listK = [];
		this.listObj = {};
		this.listeValue = "";
		try {
			let j: any = {};
			for (let i = 0; i < jsonData.length; i++) {
				let k = Object.keys(jsonData[i]);
				let v = Object.values(jsonData[i]);
				for (let c = 0; c < k.length; c++) {
					if (!j[k[c]]) {
						j[k[c]] = [v[c]];
					} else {
						j[k[c]].push(v[c]);
					}
				}
			}
			this.listObj = j;
			this.listK = Object.keys(j);
		} catch (e) {
			this.toast.error("格式错误");
		}
	}
	listeChange() {
		let valueArr: any = [];
		// 判断key是链接或者ID 加到数组第一位
		if (this.listeValue.indexOf("https://v.kuaishou.com") != -1){
			valueArr = [this.listeValue, ...this.listObj[this.listeValue]];
		} else {
			valueArr = this.listObj[this.listeValue];
		}
		// 排除null
		valueArr = valueArr.filter((item: any) => item !== "null");
		//判断不符合规则的 不查询
		var isSearch = valueArr.every((e: any) => (e + "").indexOf("https://v.kuaishou.com") != -1 );
		
		if (valueArr.length == 0) {
			this.toast.error("该列为空");
			return;
		}
		this.getKsVideoDetailsXlsx(valueArr);
	}
	getKsVideoDetailsXlsx(srcArr:any){
		this.loading=true;
		this.api.getKsVideoDetailsXlsx({srcArr})
		.subscribe((res: any) => {
			this.loading = false;
			if (res.success) {
				this.resultList = res.result;
			}
		}, (err: any) => {
			this.loading = false;
			console.log(err)
		});
	}
	getData() {
		if (!this.searchValue) {
			this.toast.info('请输入视频链接')
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
