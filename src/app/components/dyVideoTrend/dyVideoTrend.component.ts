import { Component, OnInit,Input } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import * as echarts from 'echarts';
@Component({
	selector: 'ngx-dyVideoTrend',
	templateUrl: './dyVideoTrend.component.html',
	styleUrls: ['./dyVideoTrend.component.scss']
})
export class DyVideoTrendComponent implements OnInit {
	fallback = 'data:image/png;base64,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'
	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) {
	}
	ngOnInit(): void {
			this.setEoptions('点赞')
	}
	@Input() result: any=[];
	loading: any = false
	active: any = '点赞'
	echartsOptions: any = {};
	nzSelectedIndex:any=0;
	changeTag(e: any) {
		this.active = e;
		this.setEoptions(e)
	}
	// 查看24小时开关
	is24=false;
	filter24(){
		this.is24=!this.is24;
		this.setEoptions(this.active)
	}
	setEoptions(e: any) {
		let title = e + '量趋势'
		let date = []
		let value = []
		let value2 = []
		var value3 = []
		try{
			if (e == '点赞') {
				date = this.result.digg_data.map((e: any) => e.date)
				value = this.result.digg_data.map((e: any) => e.value)
			} else if (e == '分享') {
				date = this.result.share.map((e: any) => e.date)
				value = this.result.share.map((e: any) => e.value)
				value2 = this.result.Exception.map((e:any)=>e.ExceptionShare)
				if(this.is24&&value2.length>25){
					value2.length=26;
				}
				value2.forEach((e:any,i:any)=>{
					if(e<0){
						let v = this.getD(date[i])
						value3.push({name: '异常数据', value:v, xAxis: i, yAxis: e})
					}
				})
			} else if (e == '涨粉') {
				date = this.result.fns.map((e: any) => e.date)
				value = this.result.fns.map((e: any) => e.value)
			} else if (e == '评论') {
				date = this.result.comment.map((e: any) => e.date)
				value = this.result.comment.map((e: any) => e.value)
				value2 = this.result.Exception.map((e:any)=>e.ExceptionComment)
				if(this.is24&&value2.length>25){
					value2.length=26;
				}
				value2.forEach((e:any,i:any)=>{
					if(e<0){
						let v = this.getD(date[i])
						value3.push({name: '异常数据', value:v, xAxis: i, yAxis: e})
					}
				})
			} else {
				return
			}
			let series:any = [
					{
						name:'趋势',
						data: value,
						type: 'line',
						// color: '#ff7f0f',
						smooth: true
					},
			]
			if(value2.length>0){
				series.push({
						name:'异常数据',
						data: value2,
						type: 'line',
						color: '#6b0fff',
						label: {
						        show: true,
						        position: 'bottom',
								formatter: function(params:any) {
									if(params.data<0) return params.data
									if(params.data>=0) return ''
								}
						      },
						markPoint: {
							itemStyle: {
							        color: 'blue'
							      },
							symbolSize:[110,85],
							// symbolOffset:[0,'-50%'],
						    data: value3
						},
						areaStyle: {
					    }
				})
			}
			this.echartsOptions = {
				title: {
					text: title
				},
				legend: {
				    data: ['趋势', '异常数据',]
				  },
				xAxis: {
					type: 'category',
					data: date
				},
				tooltip: {
					trigger: 'axis'
				},
				yAxis: {
					type: 'value'
				},
				series
			}
		}catch(err){
			
		}
		
	}
	getD(date:any){
		let y = new Date(date).getTime()-24*60*60*1000;
		let yM:any = new Date(y).getMonth()+1
		let yD:any = new Date(y).getDate()
		yD=yD<10?'0'+yD:yD
		yM=yM<10?'0'+yM:yM
		let date2 = yM+'-'+yD
		let date1 = date.substr(5)
		date1 = date1.substr(0,5)
		let hour1 = new Date(date).getHours()
		let hour2 = hour1 - 1
		if(hour1 == 0){
			hour2 = 23
			date1 = date2;
		}else{
			hour2 = hour1-1
		}
		return `${hour2}:00 - ${hour1}:00`
		// return `${date1} ${hour2}:00 - ${hour1}:00`
	}
	
	
}
