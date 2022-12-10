import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
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
