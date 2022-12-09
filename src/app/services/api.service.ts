import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService{
	constructor(private http:HttpClient) {
		
	}
	
	getQQ(params: any) {
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_qq&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	getKuwo(params: any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_kuwo&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	getKuwoComment(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_kuwo_comment&params="+JSON.stringify({rid:params.rid}))
	}
	getWangyiyun(params: any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_wangyiyun&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	getWangyiyun_user(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_wangyiyun_user&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	getV3(params: any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_kugou&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}
	getKugou_soaring(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=kugou_soaring&params="+JSON.stringify({page:params.page}))
	}
	getMusicianTx(params:any){
		return this.http.get("https://tcb-3e8ebbnm0ab0c7-9ddrxa0a7ebcd.service.tcloudbase.com/search?action=search_qq_musician&params="+JSON.stringify({keyword:params.keyword,page:params.page}))
	}

  
}