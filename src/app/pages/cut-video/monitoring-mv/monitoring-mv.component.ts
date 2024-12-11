import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: "ngx-monitoring-mv",
	templateUrl: "./monitoring-mv.component.html",
	styleUrls: ["./monitoring-mv.component.scss"],
})
export class MonitoringMvComponent implements OnInit {
	constructor(public common : CommonService, public api : ApiService, private router : Router, private toast : ToastrService,) { }
	ngOnInit() : void {
		this.req()
	}
	loading = false;
	keyword = "";
	page = 1;
	lastPage = 1;
	pageSize = 30;
	pageTotal = 0;
	data = []
	search(keyword : string) {
		this.keyword = keyword;
		this.req();
	}
	req() {
		this.loading = true;
		this.api.GetMvInfo({ page: this.page, pageSize: this.pageSize, keyword: this.keyword }).subscribe((res : any) => {
			this.loading = false;
			if (res.success) {
				res.data.forEach((item : any) => {
					item.expand = false;
					this.echartsInit(item, "QQ")
					this.echartsInit(item, "KG")
				})
				this.data = res.data;
				this.pageTotal = res.count;
			} else {
				this.page = this.lastPage;
			}
		}, (err : any) => {
			this.loading = false;
			this.page = this.lastPage;
		})
	}
	nzPageIndexChange(page : any) {
		this.lastPage = this.page;
		this.page = page;
		this.req();
	}
	echartsInit(item : any, PlatformName : string) {
		if (!item[PlatformName][0].TotalPlayed[0]?.Time) {
			return;
		}
		let color = PlatformName == "QQ" ? ["#31c27c"] : ["#0062FF"]
		let date = item[PlatformName][0].TotalPlayed.map((e : any) => this.common.getDate(e.Time));
		let seriesArr = []
		let legend = []
		for(let i = 0;i<item[PlatformName].length;i++){
			let D = item[PlatformName][i];
			let data = D.TotalPlayed.map((e : any) => e.Played);
			let series = {
				name:D.Mid,
				data,
				type: 'line',
				smooth: true,
				areaStyle: {
					color
				}
			}
			legend.push(D.Mid)
			seriesArr.push(series)
		}
		let option : any = {
			title: {
				text: PlatformName=="QQ"?"QQ":"酷狗"
			},
			color,
			legend: {
			    data: legend
			  },
			tooltip: {
			  confine: true,
			  trigger: "axis", // 触发方式为坐标轴触发
			},
			grid: {
			  left: 100,
			  right: 60,
			  top: 60,
			  bottom: 20,
			},
			xAxis: {
				type: 'category',
				data: date,
				axisTick: {
				  alignWithLabel: true,
				},
			},
			yAxis: {
				type: 'value'
			},
			series:seriesArr,
			height: 150,
		};
		item[PlatformName][0].echarts = option;
	}
	
	openMvQQ(mid:any){
		window.open("https://y.qq.com/n/ryqq/mv/" + mid)
	}
	openMvKG(id:any){
		window.open("https://www.kugou.com/mv/"+id+"/")
	}
	
	
	editQQ(q:any){
		let editData1 = {...q};
		editData1.LyricsAuthorName = editData1.LyricsAuthorName.join(",");
		editData1.SongAuthorName = editData1.SongAuthorName.join(",");
		editData1.SingerName = editData1.SingerName.join(",");
		editData1.ReleaseDate = new Date(editData1.ReleaseDate);
		this.editData1 = editData1;
		this.isVisible1 = true;
	}
	editKG(k:any){
		let editData2 = {...k};
		
		editData2.LyricsAuthorName = editData2.LyricsAuthorName.join(",");
		editData2.SongAuthorName = editData2.SongAuthorName.join(",");
		editData2.SingerName = editData2.SingerName.join(",");
		editData2.ReleaseDate = new Date(editData2.ReleaseDate);
		this.editData2 = editData2;
		this.isVisible2 = true;
	}
	
	editData1:any={}
	editData2:any={}
	onDateChange1(e:any){
		
	}
	onDateChange2(e:any){
		
	}
	
	handleOk1() {
		let LyricsAuthorName = this.editData1.LyricsAuthorName.replaceAll("，",",")
		LyricsAuthorName = this.editData1.LyricsAuthorName.split(",");
		
		let SingerName = this.editData1.SingerName.replaceAll("，",",")
		SingerName = this.editData1.SingerName.split(",");
		
		let SongAuthorName = this.editData1.SongAuthorName.replaceAll("，",",")
		SongAuthorName = this.editData1.SongAuthorName.split(",");
		let SongName = this.editData1.SongName;
		let ReleaseDate = new Date(this.editData1.ReleaseDate).setHours(0,0,0,0);
		let Releases = this.editData1.Releases;
		let ID = this.editData1.ID;
		let data = {
			LyricsAuthorName,SingerName,SongAuthorName,SongName,ReleaseDate,Releases,ID
		}
		this.api.EditMvInfo(data).subscribe((res:any)=>{
			if(res.success){
				this.toast.success("修改成功")
				this.isVisible1 = false;
				this.req();
			}
		})
	
	}
	handleOk2() {
		let LyricsAuthorName = this.editData2.LyricsAuthorName.replaceAll("，",",")
		LyricsAuthorName = this.editData2.LyricsAuthorName.split(",");
		
		let SingerName = this.editData2.SingerName.replaceAll("，",",")
		SingerName = this.editData2.SingerName.split(",");
		
		let SongAuthorName = this.editData2.SongAuthorName.replaceAll("，",",")
		SongAuthorName = this.editData2.SongAuthorName.split(",");
		let SongName = this.editData2.SongName;
		let ReleaseDate = new Date(this.editData2.ReleaseDate).setHours(0,0,0,0);
		let Releases = this.editData2.Releases;
		let ID = this.editData2.ID;
		let data = {
			LyricsAuthorName,SingerName,SongAuthorName,SongName,ReleaseDate,Releases,ID
		}
		this.api.EditMvInfo(data).subscribe((res:any)=>{
			if(res.success){
				this.toast.success("修改成功")
				this.isVisible2 = false;
				this.req();
			}
		})
	
	}
	isVisible1=false;
	isVisible2=false;
	handleCancel1() {
		this.isVisible1 = false;
	}
	handleCancel2() {
		this.isVisible2 = false;
	}
}