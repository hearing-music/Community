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
	round(num:any){
		return Math.round(num)
	}
	tFixed(indexRate:any){
		return (indexRate.toFixed(4) * 100).toFixed(2) + '%'
	}
	deleteEM(str:string){
		if(str === '') return ''
		str = str.replace('<em>','')
		str = str.replace('</em>','')
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
