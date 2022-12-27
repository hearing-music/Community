import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
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
	getDate(date: number) {
		var time = new Date(date);
		var year = time.getFullYear()  //年
		var month = ("0" + (time.getMonth() + 1)).slice(-2); //月
		var day = ("0" + time.getDate()).slice(-2); //日
		var mydate = year + "-" + month + "-" + day + '';
		return mydate
	}
	download(src: string, name: string) {//下载图片地址和图片名
		fetch(src).then((res) => {
		  res.blob().then((blob) => {
		    const blobUrl = window.URL.createObjectURL(blob);
		    // 这里的文件名根据实际情况从响应头或者url里获取
		    const a = document.createElement('a');
		    a.href = blobUrl;
		    a.download = name;
		    a.click();
		    window.URL.revokeObjectURL(blobUrl);
		  });
		});
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
	constructor() { }
}
