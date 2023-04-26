import { Injectable } from '@angular/core';
import { NzMessageService  } from 'ng-zorro-antd/message';
@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor(public message: NzMessageService) { }
	// 是否是移动端
	isMobile() {
	    let userAgentInfo = navigator.userAgent;
	    let Agents = ['Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod'];
	    let getArr = Agents.filter(i => userAgentInfo.includes(i));
	    return getArr.length ? true : false;
	  }
	// 验证是否为管理员
	checkAdmin(){
		let permission_name = localStorage.getItem('permission_name')
		let permission_name_id = localStorage.getItem('permission_name_id')
		if(permission_name == '超级管理员' && permission_name_id == '7B444814D1E9720BE875044F66BCFAD2'){
			return true
		}
		return false
	}
	// 删除登录态
	removeLocalStorages(){
		localStorage.removeItem('token')
		localStorage.removeItem('token_expiration_time')
		localStorage.removeItem('permission_name_id')
		localStorage.removeItem('username')
		localStorage.removeItem('url')
		localStorage.removeItem('permission_name')
		localStorage.removeItem('menus_item')
	}
	// 验证验证码合法
	checkSms(sms:string){
		if (!sms) {
		  return false
		}else{
			let reg = /^\d{4}$/;
			if (reg.test(sms)) {
			  return true;
			} else {
			  return false;
			}
		}
	}
	// 验证手机号合法
	checkPhone (p:string) {
	    if (!p) {
	      return false
	    } else {
	      // 必须是1开头，第二位数字可以是0-9任意一个，总长为11
	      // let reg = /^1([3-9])\d{9}$/;
		  // var reg = /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/; //不带区号校验
	      // 必须是1开头，第二位数字可以是3|5|6|7|8|9任意一个，总长为11
	      let reg = /^1([3|4|5|6|7|8|9])\d{9}$/;
	      if (reg.test(p)) {
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }
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
	getDate(date: number|string) {
		var time = new Date(Number(date));
		var year = time.getFullYear()  //年
		var month = ("0" + (time.getMonth() + 1)).slice(-2); //月
		var day = ("0" + time.getDate()).slice(-2); //日
		var mydate = year + "-" + month + "-" + day + '';
		return mydate
	}
	getTime(date: number|string){
		var time = new Date(Number(date));
		var year = time.getFullYear()  //年
		var month = ("0" + (time.getMonth() + 1)).slice(-2); //月
		var day = ("0" + time.getDate()).slice(-2); //日
		var mydate = year + "-" + month + "-" + day + '';
		 var hour:any = time.getHours() //时
		 var minutes:any = time.getMinutes() //分
		 var seconds:any = time.getSeconds() //秒
		 if(hour<10){
			 hour = '0'+hour
		 }
		 if(minutes<10){
			minutes = '0'+minutes
		 }
		 if(seconds<10){
		 	seconds = '0'+seconds
		 }
		var mytime = ' '+hour+':'+minutes
		return mydate+mytime
	}
	// 多久之前
	timeFrom(timestamp = null, format:any = 'yyyy-mm-dd') {
		if (timestamp == null) timestamp = Number(new Date())
		timestamp = parseInt(timestamp)
		// 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
		if (timestamp.toString().length == 10) timestamp *= 1000
		let timer:any = (new Date()).getTime() - timestamp
		timer = parseInt(timer/ 1000+'')
		// 如果小于5分钟,则返回"刚刚",其他以此类推
		let tips = ''
		switch (true) {
			case timer < 300:
				tips = '刚刚'
				break
			case timer >= 300 && timer < 3600:
				tips = `${parseInt(timer / 60+'')}分钟前`
				break
			case timer >= 3600 && timer < 86400:
				tips = `${parseInt(timer / 3600+'')}小时前`
				break
			case timer >= 86400 && timer < 2592000:
				tips = `${parseInt(timer / 86400+'')}天前`
				break
			default:
				// 如果format为false，则无论什么时间戳，都显示xx之前
				if (format === false) {
					if (timer >= 2592000 && timer < 365 * 86400) {
						tips = `${parseInt(timer / (86400 * 30)+'')}个月前`
					} else {
						tips = `${parseInt(timer / (86400 * 365)+'')}年前`
					}
				} else {
					tips = this.timeFormat(timestamp, format)
				}
		}
		return tips
	}
	// 时间转化
	timeFormat(dateTime = null, formatStr = 'yyyy-mm-dd') {
	  let date:any
		// 若传入时间为假值，则取当前时间
	  if (!dateTime) {
	    date = new Date()
	  }
	  // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
	  else if (/^\d{10}$/.test(dateTime?.toString().trim())) {
	    date = new Date(dateTime * 1000)
	  }
	  // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
	  else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
	    date = new Date(Number(dateTime))
	  }
		// 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
		// 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
		else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
			date = new Date(dateTime.replace(/-/g, '/'))
		}
		// 其他都认为符合 RFC 2822 规范
		else {
			date = new Date(dateTime)
		}
	
		const timeSource = {
			'y': date.getFullYear().toString(), // 年
			'm': (date.getMonth() + 1).toString().padStart(2, '0'), // 月
			'd': date.getDate().toString().padStart(2, '0'), // 日
			'h': date.getHours().toString().padStart(2, '0'), // 时
			'M': date.getMinutes().toString().padStart(2, '0'), // 分
			's': date.getSeconds().toString().padStart(2, '0') // 秒
			// 有其他格式化字符需求可以继续添加，必须转化成字符串
		}
	
	  for (const key in timeSource) {
	    const [ret] = new RegExp(`${key}+`).exec(formatStr) || []
	    if (ret) {
	      // 年可能只需展示两位
	      const beginIndex = key === 'y' && ret.length === 2 ? 2 : 0
	      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex))
	    }
	  }
	
	  return formatStr
	}
	download(src: string, name: string,t:any = true) {//下载地址和名
		var request = new XMLHttpRequest();
			request.responseType = "blob";
			// let token = localStorage.getItem('token');
			let fileUrl = src; // 文件路径
			request.open("GET", fileUrl ,true);
			// request.setRequestHeader('Access-Control-Allow-Origin','*')
			// if(t){
			// 	request.setRequestHeader('token',token)
			// }
			request.onload = function() {
			    var url = window.URL.createObjectURL(this.response);
				// console.log(url)
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
		indexRate = indexRate - 0;
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
				if(num[i-1]!='-'){
					result.unshift(',');
				}
			}
		}
		return result.join('');
	}
}
