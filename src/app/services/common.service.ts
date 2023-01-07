import { Injectable } from '@angular/core';
import { NzMessageService  } from 'ng-zorro-antd/message';
@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor(private message: NzMessageService) { }
	// 复制
	copy(text:string){
		// text是复制文本
		  // 创建input元素
		  const el = document.createElement('input')
		  // 给input元素赋值需要复制的文本
		  el.setAttribute('value', text)
		  // 将input元素插入页面
		  document.body.appendChild(el)
		  // 选中input元素的文本
		  el.select()
		  // 复制内容到剪贴板
		  document.execCommand('copy')
		  // 删除input元素
		  document.body.removeChild(el)
		  // alert('复制成功')
		  this.message.success('复制成功')
	}
	// 解析歌词
	parseLRC(sourceLrc:any) {
		sourceLrc.replaceAll('\n','')
		let lrcArr = [];
		try {
			// 处理歌词，转化成key为时间，value为歌词的对象
			let lyricArr = sourceLrc.split('[').slice(1); // 先以[进行分割
			if (lyricArr.length == 0) {
				return false
			}
			lyricArr.forEach((item:any) => {
				let arr = item.split(']'); // 再分割右括号
				let lrcObj = {};
				// 时间换算成毫秒
				let m = parseInt(arr[0].split(':')[0])
				let s = parseInt(arr[0].split(':')[1]) * 1000 + parseInt(arr[0].split('.')[1]) * 10
				arr[0] = m * 60 * 1000 + s;
				if (arr[1] != '\r\n' && arr[1] != null&&!isNaN(arr[0])) { // 去除歌词中的换行符
					// lrcObj[arr[0]] = arr[1];
					lrcObj['key'] = arr[0];
					lrcObj['value'] = arr[1]
					lrcArr.push(lrcObj)
				}
	
			})
			// 存储数据
			return lrcArr;
		} catch (e) {
			console.log('歌词出错')
			console.log(e)
			return false
		}
	}
	parseLRC3(sourceLrc:any){
		const reg_attr = /].*([：:])/g;
		const reg_remove = /\[([a-zA-Z].*)\]/g;
		const summary = sourceLrc.split('\n').filter((f:any) => f?.match(reg_attr));
		const content = sourceLrc.split('\n').filter((f:any) => !f?.match(reg_attr) && !f?.match(reg_remove)).join('\n');
		let arr = []
		summary.forEach((s:any) => {
			arr.push(s.replace(/\[[\d\:\.]*\]/g,'').split(/[:：]/))
		})
		return {
			summary:arr,
			content
		}
	}
	// 解析歌词
	parseLRC2(sourceLrc:any) {
		sourceLrc.replaceAll('\n','')
		let lrcArr = [];
		try {
			// 处理歌词，转化成key为时间，value为歌词的对象
			let lyricArr = sourceLrc.split('[').slice(1); // 先以[进行分割
			if (lyricArr.length == 0) {
				return false
			}
			lyricArr.forEach((item:any) => {
				let arr = item.split(']'); // 再分割右括号
				let lrcObj = {};
				if (arr[1] != '\r\n' && arr[1] != null) { // 去除歌词中的换行符
					// lrcObj[arr[0]] = arr[1];
					lrcObj['time'] = arr[0];
					lrcObj['lineLyric'] = arr[1]
					lrcArr.push(lrcObj)
				}
	
			})
			// 存储数据
			return lrcArr;
		} catch (e) {
			console.log('歌词出错')
			console.log(e)
			return false
		}
	}
	// 秒转分钟
	lyricTimeShift(time:any){
		time = time - 0;
		time = time.toFixed(2)
		var m:any = parseInt((time/60).toString());
		if(m < 10) m = '0'+m
		var s:any = parseInt((time%60).toString());
		if(s<10) s = '0'+s
		var ms = time.substr(-2)
		// if(ms < 10) ms = 0 +ms
		return m+':'+s+'.'+ms
	}
	getDate(date: number) {
		var time = new Date(date);
		var year = time.getFullYear()  //年
		var month = ("0" + (time.getMonth() + 1)).slice(-2); //月
		var day = ("0" + time.getDate()).slice(-2); //日
		var mydate = year + "-" + month + "-" + day + '';
		return mydate
	}
	download(src: string, name: string) {//下载地址和名
		var request = new XMLHttpRequest();
			request.responseType = "blob";
			let fileUrl = src; // 文件路径
			request.open("GET", fileUrl );
			request.onload = function() {
			    var url = window.URL.createObjectURL(this.response);
			    var a = document.createElement("a");
			    document.body.appendChild(a);
			    a.href = url;
			    a.download = name;
			    a.click();
			}
			request.send();
	};
	durationFormat(num:number){
		if(!num) return '0:00'
		var m:number = num / 60;
		m = parseInt(m+'')
		var s:number|string = num % 60;
		if(s<10){
			s = '0'+s
		}
		return m+':'+s
	};
	filterTag(str: string) {
		if (str === '') return ''
		// console.log(str)
		str = str.replace(/\n/g, '-')
		str = str.replace(/网易音乐人/g, '-')
		str = str.replace(/<span class=\"yyrtag\">/g, '-')
		str = str.replace(/<i class="tag u-icn2 u-icn2-pfdr">/g, '-')
		str = str.replace(/<p class=\"djp f-fs1 s-fc3\">/g, '-')
		str = str.replace(new RegExp("</i>", "gm"), '-')
		str = str.replace(new RegExp("</span>", "gm"), '-')
		str = str.replace(new RegExp("</p>", "gm"), '-')
		str = str.replace(new RegExp("--", "gm"), '')
		str = str.replace(new RegExp("-", "gm"), ' ')
		return str
	}
	round(num: any) {
		return Math.round(num)
	}
	toFixed2(value:string|number){
		return Number(value).toFixed(2)
	}
	tFixed(indexRate: any) {
		return (indexRate.toFixed(4) * 100).toFixed(2) + '%'
	}
	deleteEM(str: string) {
		if (str === '') return ''
		str = str.replace('<em>', '')
		str = str.replace('</em>', '')
		return str;
	}
	toThousands(num: any) {
		if (!num) return '0'
		num = parseInt(num)
		var result = [],
			counter = 0;
		num = (num || 0).toString().split('');
		for (var i = num.length - 1; i >= 0; i--) {
			counter++;
			result.unshift(num[i]);
			if (!(counter % 3) && i != 0) {
				result.unshift(',');
			}
		}
		return result.join('');
	}
}
