import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import * as echarts from 'echarts';
@Component({
	selector: 'ngx-dyAuthor',
	templateUrl: './dyAuthor.component.html',
	styleUrls: ['./dyAuthor.component.scss']
})
export class DyAuthorComponent implements OnInit {
	fallback = 'data:image/png;base64,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'
	constructor(public api: ApiService, public common: CommonService, private message: NzMessageService) {
	}
	ngOnInit(): void {
		if (this.result.author) {
			// 处理里程碑数据
			this.result.author = this.authorData(this.result.author)
			// 计算里程碑数据
			this.fansprogressCount(this.result.author.fans_milestone)
			this.setEoptions3('新增点赞量')
			this.setEoptions4(this.result)
			this.setEoptions5(this.result)
			this.setEoptions6(this.result)
			this.setEoptions7(this.result)
			this.setEoptions8(this.result)
		}
	}
	@Input() result: any = [];
	loading: any = false
	active3: any = '新增点赞量'
	echartsOptions3: any = {};
	echartsOptions4: any = {};
	echartsOptions5: any = {};
	echartsOptions6: any = {};
	echartsOptions7: any = {};
	echartsOptions8: any = {};
	// 里程碑进度
	fansprogress: any = '0%'
	nzSelectedIndex3: any = 0;
	changeTag3(e: any) {
		this.active3 = e;
		this.setEoptions3(e)
	}
	setEoptions3(e: any) {
		let title = e + '趋势'
		let date = []
		let value = []
		if (e == '新增点赞量') {
			date = this.result.author.digg.map((e: any) => this.common.getTime(e.datetime * 1000))
			value = this.result.author.digg.map((e: any) => e.value)
		} else if (e == '净增粉丝量') {
			date = this.result.author.fns.map((e: any) => this.common.getTime(e.datetime * 1000))
			value = this.result.author.fns.map((e: any) => e.value)
		} else if (e == '新增分享量') {
			date = this.result.author.share.map((e: any) => this.common.getTime(e.datetime * 1000))
			value = this.result.author.share.map((e: any) => e.value)
		} else if (e == '新增评论量') {
			date = this.result.author.comment.map((e: any) => this.common.getTime(e.datetime * 1000))
			value = this.result.author.comment.map((e: any) => e.value)
		} else if (e == '新增作品量') {
			date = this.result.author.work.map((e: any) => this.common.getTime(e.datetime * 1000))
			value = this.result.author.work.map((e: any) => e.value)
		} else {
			return
		}
		this.echartsOptions3 = {
			title: {
				text: title
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
			series: [
				{
					data: value,
					type: 'line',
					// color: '#ff7f0f',
					smooth: true
				}
			]
		}
	}
	setEoptions4(e: any) {
		let date = []
		let date2 = []
		let value = []
		let value2 = []
		date = e.author.city.portrait.map((e: any) => e.name)
		// value = e.author.city.map((e: any) => e.value)
		value2 = e.author.city.portrait.map((e: any) => Number(e.value.toFixed(6)))
		for (let i = 0; i < date.length; i++) {
			let o = e.author.city.portrait_tgi.find((e: any) => e.name == date[i])
			if (o) {
				value.push(Number(o.value.toFixed(2)))
			}
		}
		this.echartsOptions4 = {
			color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C', '#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3'],
			title: {
				text: '粉丝城市等级'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: date,
					axisTick: {
						alignWithLabel: true
					}
				},
			],
			yAxis: [
				{
					type: 'value',
					position: 'left',
				}, {
					type: 'value',
					position: 'right',
				}
			],
			series: [
				{
					type: 'bar',
					name: '城市等级',
					colorIndex: 2,
					barWidth: '60%',
					data: value2,
				}
				, {
					data: value,
					name: '偏好度',
					yAxisIndex: 1,
					type: 'line',
					// color: '#ff7f0f',
					smooth: true,
					itemStyle: {
						normal: {
							color: "#e09216"//设置折线颜色
						}

					}
				}
			]
		}
	}
	setEoptions5(e: any) {
		let date = []
		let value = []
		let value2 = []
		date = e.author.gender.portrait.map((e: any) => e.name == 'male' ? '男' : '女')
		// value = e.author.gender.map((e: any) => e.value)
		value2 = e.author.gender.portrait.map((e: any) => Number(e.value.toFixed(6)))
		for (let i = 0; i < date.length; i++) {
			let o = e.author.gender.portrait_tgi.find((e: any) => (e.name == 'male' && date[i] == '男') || (e.name == 'female' && date[i] == '女'))
			if (o) {
				value.push(Number(o.value.toFixed(2)))
			}
		}
		this.echartsOptions5 = {
			color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C', '#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3'],
			title: {
				text: '粉丝性别分布'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: date,
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					position: 'left',
				}, {
					type: 'value',
					position: 'right',
				}
			],
			series: [
				{
					type: 'bar',
					name: '性别',
					// label: {
					// 	show: true,
					// 	formatter: '{c}%' //格式化数据
					// },
					barWidth: '60%',
					data: value2,
					colorIndex: 3,
				}
				, {
					data: value,
					name: '偏好度',
					yAxisIndex: 1,
					type: 'line',
					// color: '#ff7f0f',
					smooth: true,
					itemStyle: {
						normal: {
							color: "#e09216"//设置折线颜色
						}

					}
				}
			]
		}
	}
	setEoptions6(e: any) {
		let date = []
		let value = []
		let value2 = []
		date = e.author.age.portrait.map((e: any) => e.name)
		// value = e.author.age.map((e: any) => e.value)
		value2 = e.author.age.portrait.map((e: any) => Number(e.value.toFixed(6)))
		for (let i = 0; i < date.length; i++) {
			let o = e.author.age.portrait_tgi.find((e: any) => e.name == date[i])
			if (o) {
				value.push(Number(o.value.toFixed(2)))
			}
		}
		this.echartsOptions6 = {
			color: ['#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C', '#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3'],
			title: {
				text: '粉丝年龄分布'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: date,
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value',
					position: 'left',
				}, {
					type: 'value',
					position: 'right',
				}
			],
			series: [
				{
					type: 'bar',
					name: '年龄',
					// label: {
					// 	show: true,
					// 	formatter: '{c}%' //格式化数据
					// },
					barWidth: '60%',
					data: value2,
					colorIndex: 4
				}
				, {
					data: value,
					name: '偏好度',
					yAxisIndex: 1,
					type: 'line',
					// color: '#ff7f0f',
					smooth: true,
					itemStyle: {
						normal: {
							color: "#e09216"//设置折线颜色
						}

					}
				}
			]
		}
	}
	setEoptions7(e: any) {
		let date = []
		let data = []
		let data2 = []
		data = e.author.province.portrait
		data2 = e.author.province.portrait_tgi
		this.echartsOptions7 = {
			title: {
				text: '粉丝地域分布',
			},
			tooltip: {
				trigger: 'item',
				formatter: function(params) {
					// console.log(params)
					params.data.value = params.data.value ||0
					let o = data.find((e: any) => e.name == params.name)
					var value1 = (params.data.value).toFixed(2); // 第一个值
					var value2 = (o.value).toFixed(6); // 第二个值
					return params.name + '<br/>偏好度' + value1 + '' + '<br/>占比' + value2 + ' ';
				}
			},

			visualMap: {
				min: 0,
				max: 500,
				text: ['High', 'Low'],
				realtime: false,
				calculable: true,
				inRange: {
					color: ['lightskyblue', 'yellow', 'orangered']
				}
			},
			series: [
				{
					name: '偏好度',
					type: 'map',
					mapType: 'china',
					label: {
						show: false
					},
					data: data2,
				}

			],
		}
	}
	setEoptions8(e: any) {
		let date = []
		let data = []
		let data2 = []
		let name = e.author.province.portrait.map((e: any) => e.name)
		e.author.province.portrait = e.author.province.portrait.sort((a, b) => b.value - a.value)
		e.author.province.portrait_tgi = e.author.province.portrait_tgi.sort((a, b) => b.value - a.value)
		data = [...e.author.province.portrait]
		data2 = [...e.author.province.portrait_tgi]
		data.length=5
		name.length=5
		this.echartsOptions8 = {
			width: 300,
			height: 300,
			tooltip: {
				trigger: 'item',
				formatter: function(params) {
					let o = data2.find((e: any) => e.name == params.name)
					var value1 = (params.data.value).toFixed(2); // 第一个值
					var value2 = (o.value).toFixed(6); // 第二个值
					return params.name + '<br/>偏好度' + value2 + '' + '<br/>占比' + value1 + ' ';
				}
			},
			grid: {
				left: 0,
				right: 0,
				top: 0,
				bottom: 0,
			},
			series: [
				{
					position: 'center',
					name: '',
					type: 'pie',
					radius: [20, 80],
					center: ['50%', '50%'],
					roseType: 'radius',
					itemStyle: {
						borderRadius: 20,
						normal: {
							borderRadius: 20,
							color: function(colors: any) {
								var colorList = [
									'#fc8251',
									'#5470c6',
									'#9A60B4',
									'#ef6567',
									'#f9c956',
									'#3BA272',
									 '#FFCCCC', '#CCFFFF', '#CCFFCC', '#CCCCFF','#d87c7c','#919e8b', '#d7ab82', '#6e7074','#61a0a8','#efa18d', '#787464', '#cc7e63', '#724e58', '#4b565b'
								];
								return colorList[colors.dataIndex];
							}
						},
					},
					label: {
						show: true
					},
					labelLine: {
					            normal: {
					                length: 3,
					                length2: 3,
					            }
					        },
					emphasis: {
						label: {
							show: true
						}
					},
					data: data
				},
			]
		}
	}
	// 地域分布偏好度取值 单
	portrait_tgiValue(result: any, data: any) {
		let value = result.author.province.portrait_tgi.find(e => e.name == data.name).value || 0
		value = value.toFixed(2)
		return value
	}
	// 计算里程碑进度
	fansprogressCount(fans_milestone: any) {
		let w1 = fans_milestone.first_1w_fans_date;
		let w10 = fans_milestone.first_10w_fans_date;
		let w30 = fans_milestone.first_30w_fans_date;
		let w100 = fans_milestone.first_100w_fans_date;
		let w500 = fans_milestone.first_500w_fans_date;
		let w1000 = fans_milestone.first_1000w_fans_date;
		// 95 77  59  41  23  5
		let w1x = '2.5%'
		let w10x = '14%'
		let w30x = '32%'
		let w100x = '50%'
		let w500x = '68%'
		let w1000x = '86%'
		let w1000d = '97.5%'
		if (w1000) {
			this.fansprogress = w1000d
		} else if (w500) {
			this.fansprogress = w1000x
		} else if (w100) {
			this.fansprogress = w500x
		} else if (w30) {
			this.fansprogress = w100x
		} else if (w10) {
			this.fansprogress = w30x
		} else if (w1) {
			this.fansprogress = w10x
		} else {
			this.fansprogress = w1x
		}

	}
	authorData(result: any) {
		result.create_time = result.create_time * 1000;
		result.fans_milestone.first_1w_fans_date = result.fans_milestone.first_1w_fans_date.split("")
		for (let i = 0; i < result.fans_milestone.first_1w_fans_date.length; i++) {
			if (i == 3 || i == 5) {
				result.fans_milestone.first_1w_fans_date[i] += '-'
			}
		}
		result.fans_milestone.first_1w_fans_date = result.fans_milestone.first_1w_fans_date.join("")

		result.fans_milestone.first_10w_fans_date = result.fans_milestone.first_10w_fans_date.split("")
		for (let i = 0; i < result.fans_milestone.first_10w_fans_date.length; i++) {
			if (i == 3 || i == 5) {
				result.fans_milestone.first_10w_fans_date[i] += '-'
			}
		}
		result.fans_milestone.first_10w_fans_date = result.fans_milestone.first_10w_fans_date.join("")

		result.fans_milestone.first_30w_fans_date = result.fans_milestone.first_30w_fans_date.split("")
		for (let i = 0; i < result.fans_milestone.first_30w_fans_date.length; i++) {
			if (i == 3 || i == 5) {
				result.fans_milestone.first_30w_fans_date[i] += '-'
			}
		}
		result.fans_milestone.first_30w_fans_date = result.fans_milestone.first_30w_fans_date.join("")

		result.fans_milestone.first_100w_fans_date = result.fans_milestone.first_100w_fans_date.split("")
		for (let i = 0; i < result.fans_milestone.first_100w_fans_date.length; i++) {
			if (i == 3 || i == 5) {
				result.fans_milestone.first_100w_fans_date[i] += '-'
			}
		}
		result.fans_milestone.first_100w_fans_date = result.fans_milestone.first_100w_fans_date.join("")

		result.fans_milestone.first_500w_fans_date = result.fans_milestone.first_500w_fans_date.split("")
		for (let i = 0; i < result.fans_milestone.first_500w_fans_date.length; i++) {
			if (i == 3 || i == 5) {
				result.fans_milestone.first_500w_fans_date[i] += '-'
			}
		}
		result.fans_milestone.first_500w_fans_date = result.fans_milestone.first_500w_fans_date.join("")

		result.fans_milestone.first_1000w_fans_date = result.fans_milestone.first_1000w_fans_date.split("")
		for (let i = 0; i < result.fans_milestone.first_1000w_fans_date.length; i++) {
			if (i == 3 || i == 5) {
				result.fans_milestone.first_1000w_fans_date[i] += '-'
			}
		}
		result.fans_milestone.first_1000w_fans_date = result.fans_milestone.first_1000w_fans_date.join("")

		result.fans_milestone.first_1w_fans_date_t = new Date(result.fans_milestone.first_1w_fans_date).getTime()
		result.fans_milestone.first_10w_fans_date_t = new Date(result.fans_milestone.first_10w_fans_date).getTime()
		result.fans_milestone.first_30w_fans_date_t = new Date(result.fans_milestone.first_30w_fans_date).getTime()
		result.fans_milestone.first_100w_fans_date_t = new Date(result.fans_milestone.first_100w_fans_date).getTime()
		result.fans_milestone.first_500w_fans_date_t = new Date(result.fans_milestone.first_500w_fans_date).getTime()
		result.fans_milestone.first_1000w_fans_date_t = new Date(result.fans_milestone.first_1000w_fans_date).getTime()

		result.fans_milestone.first_1w_fans_date_between = this.common.getDaysBetween(result.create_time, result.fans_milestone.first_1w_fans_date_t)
		result.fans_milestone.first_10w_fans_date_between = this.common.getDaysBetween(result.create_time, result.fans_milestone.first_10w_fans_date_t)
		result.fans_milestone.first_30w_fans_date_between = this.common.getDaysBetween(result.create_time, result.fans_milestone.first_30w_fans_date_t)
		result.fans_milestone.first_100w_fans_date_between = this.common.getDaysBetween(result.create_time, result.fans_milestone.first_100w_fans_date_t)
		result.fans_milestone.first_500w_fans_date_between = this.common.getDaysBetween(result.create_time, result.fans_milestone.first_500w_fans_date_t)
		result.fans_milestone.first_1000w_fans_date_between = this.common.getDaysBetween(result.create_time, result.fans_milestone.first_1000w_fans_date_t)
		return result
	}
	lcbShow = false;
	seeLcb() {
		this.lcbShow = true;
	}
	handleCancel() {
		this.lcbShow = false;
	}
	visible2: any = false;
	visiblechange2(e: any) {
		// console.log(e)
	}
}
