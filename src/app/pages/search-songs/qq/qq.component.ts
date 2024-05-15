import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { environment } from '../../../../environments/environment';
import { NzMessageService } from 'ng-zorro-antd/message';
let baseUrl = environment.baseUrl;
@Component({
	selector: 'ngx-qq',
	templateUrl: './qq.component.html',
	styleUrls: ['./qq.component.scss']
})
export class QqComponent implements OnInit {
	@Input() qqList: any;
	constructor(public common: CommonService,public api: ApiService,public message:NzMessageService,) { }
	@Output() change: EventEmitter<any> = new EventEmitter<any>();
	playAudio(url: string, i: number) {
		if(url){
			this.change.emit({src:url,i});
		}
	}
	ngOnInit(): void {
	}
	rankItem :any = [];
	lyricShow = false;
	
	albumNameDrawer=''
	visible = false;
	drawerLoading=false;
	albumAllSongs:any = []
	downloadWav(item:any){
		item.loadingDownload = true;
		let url = 'https://y.qq.com/n/ryqq/songDetail/'+item.mid
		this.api.QqAudioDecryptioNew({
			musicUrl: url
		}).subscribe((res: any) => {
			item.loadingDownload = false;
			if (res.success) {
				this.common.downloadServer(baseUrl + res.data)
			}else{
				this.message.error('失败')
			}
		}, (err: any) => {
			console.log(err)
			item.loadingDownload = false;
			this.message.error('出错了')
		})
	}
	urlPreview = {};
	mouseenterUrl(item:any,type:string){
		item['urlPreviewShow'+type] = true;
		if(item['urlPreview'+type]){
			
		}else{
			let url = ''
			if(type=='home'){
				url = 'https://y.qq.com/n/ryqq/songDetail/'+item.mid
			}
			if(type=='exponent'){
				url = 'https://y.qq.com/m/client/music_index/index.html?mid='+item.mid+'&type='+item.mid+'&ADTAG=wxfshare'
			}
			this.GetPreview(url,item,type)
		}
	}
	mouseleaveUrl(item:any,type:string){
		item['urlPreviewShow'+type] = false;
	}
	GetPreview(Url:string,item:any,type:string){
		item['UrlLoading'+type] = true;
		this.api.GetPreview({Url}).subscribe((res: any) => {
			item['UrlLoading'+type] = false;
			if (res.success) {
				item['urlPreview'+type] = res.data;
			}
		}, (err: any) => {
			console.log(err)
			item['UrlLoading'+type] = false;
		})
	}
	openQQ(uin:any){
		window.open('tencent://message/?uin='+uin)
	}
	// 更多版本
	moreVersion(item:any){
		item.isMore = item.isMore?false:true;
	}
	// 抽屉打开
	drawOpen(albumName:any,albummid:any){
		this.albumNameDrawer = albumName
		this.albumAllSongs=[]
		this.visible=true;
		let song=this.qqList.find((e:any)=>e.albumAllSongs&&albummid==e.album.mid)
		if(song){
			this.albumAllSongs = song.albumAllSongs
		}else{
			this.qq_getAlbumExponent(albummid)
		}
	}
	drawClose(){
		this.visible=false;
	}
	qq_getAlbumExponent(albummid:any){
		this.drawerLoading=true;
		this.api.qq_getAlbumExponent({albummid}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				for(let i =0;i<this.qqList.length;i++){
					if(this.qqList[i].album.mid==albummid){
						this.qqList[i].albumAllSongs = res.result;
					}
				}
				this.albumAllSongs=res.result;
			}
			this.drawerLoading=false;
		}, (err: any) => {
			console.log(err)
			this.drawerLoading=false;
		})
	}
	
	// 获取歌词
	getLyric(item:any){
		this.api.getQQLyric({
			songmid: item.mid,
		}).subscribe((res: any) => {
			console.log(res)
			if(res.success){
				item.lyricText = res.result.lyric
				item.lyricData2 = this.common.parseLRC3(item.lyricText)
				item.lyricReadly = true;
			}
		}, (err: any) => {
			console.log(err)
		})
		
	}
	getCompanyName(item:any){
		this.api.getCompanyName({idlist:item.history}).subscribe((res: any) => {
			console.log(res)
			for(let i = 0;i<res.result.length;i++){
				if(res.result[i]&&typeof item.history[i]=='number'){
					item.historyI[0].name = res.result[i]
				}
				if(res.result[i]&&typeof item.history[i]=='string'){
					item.historyS[i].name = res.result[i]
				}
			}
				item.historyReady = true;
		}, (err: any) => {
			console.log(err)
		})
	}
	mouseenter(item:any){
		this.rankItem = item.record.newData || item.record || [];
		item.lyricShow = true;
		if(item.lyricText){
			item.lyricData2 = this.common.parseLRC3(item.lyricText)
			item.lyricReadly = true;
		}else{
			item.lyricReadly = false;
			this.getLyric(item)
		}
	}
	mouseleave(item:any){
		item.lyricShow = false;
	}
	mouseenter2(item:any){
		item.historyShow = true;
		if(!item.historyReady){
			this.getCompanyName(item)
		}
	}
	mouseleave2(item:any){
		item.historyShow = false;
	}
	mouseenter3(item:any){
		item.historyShow2 = true;
	}
	mouseleave3(item:any){
		item.historyShow2 = false;
	}
	// 打开公司
	openCompay(id:string|number){
		window.open('https://y.qq.com/portal/company_detail.html?id='+id+'#sort=1&type=album')
	}
	// 打开链接
	openSongDetail(songMid:string,e:any){
		window.open('https://y.qq.com/n/ryqq/songDetail/'+songMid);
		// e.stopPropagation();
		
	}
	// 打开链接
	openLink(mid:string|number){
		window.open('https://y.qq.com/m/client/music_index/index.html?mid='+mid+'&type='+mid+'&ADTAG=wxfshare')
	}
	
	
}
