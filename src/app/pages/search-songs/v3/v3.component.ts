import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
	selector: 'ngx-v3',
	templateUrl: './v3.component.html',
	styleUrls: ['./v3.component.scss'],
})
export class V3Component implements OnInit {
	@Input() kugouV3List: any;
	@Output() change: EventEmitter<any> = new EventEmitter<any>();
	constructor(public common: CommonService, public api: ApiService, private router: Router,public message:NzMessageService) { }
	ngOnInit(): void {

	}
	openModal(){
		this.isVisible = true;
	}
	handleCancel(){
		this.isVisible = false;
	}
	add(){
		if(this.cartData.length==0){
			this.message.info('请添加')
			return;
		}
		let Parameters = {};
		let SCID = [];
		let EMixSongID = [];
		let AlbumID = [];
		let CommentID = [];
		let length = [];
		this.cartData.forEach((item:any)=>{
			SCID.push(item.scid);
			EMixSongID.push(item.EMixSongID)
			AlbumID.push(item.albumID)
			CommentID.push({"MixSongID":item.MixSongID,"FileHash":item.FileHash})
			length.push(0)
		})
		Parameters['SCID']=SCID;
		Parameters['EMixSongID']=EMixSongID;
		Parameters['AlbumID']=AlbumID;
		Parameters['CommentID']=CommentID;
		Parameters['length']=length;
		this.loading = true;
		this.api.kgSurveillanceSongs({Parameters}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				this.message.success("添加成功")
				this.cartData = [];
				this.isVisible = false;
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	cartData:any=[];
	isVisible=false;
	selectItem(item:any,index:number){
		item.isSelect = !item.isSelect;
		var i = this.cartData.findIndex((e:any)=>e.scid == item.scid)
		if(item.isSelect){
			if(i==-1){
				this.cartData.push(item);
			}
		}else{
			if(i!=-1){
				this.cartData.splice(i,1);
			}
		}
	}
	playAudio(item: any, i: number,e:any) {
		if(item.MusicUrl){
			this.change.emit({src:item.MusicUrl,i});
		}else{
			this.getKugouSongUrl(item,i)
		}
		e.stopPropagation();
	}
	loading=false;
	getKugouSongUrl(item:any,i:number){
		this.loading = true;
		this.api.getKugouSongUrl({EMixSongID:item.EMixSongID}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				item.MusicUrl = res.result[0];
				this.change.emit({src:item.MusicUrl,i});
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	copy(FileHash:string,e:any){
		this.common.copy(FileHash)
		e.stopPropagation();
	}
	// 更多版本
	moreVersion(item:any,e:any){
		item.isMore = item.isMore?false:true;
		e.stopPropagation();
	}
	openSongDetail(MixSongId: string | number, hash: string | number,e:any) {
		window.open('https://www.kugou.com/song/#hash=' + hash + '&album_audio_id=' + MixSongId)
		e.stopPropagation();
	}
	openExponentLink(item: any,e:any) {
		window.open('https://h5.kugou.com/achievement/v-a34ccad0/index.html?audio_id=' + item.scid + '&hash=' + item.FileHash + '&mixsongid=' + item.MixSongID)
		e.stopPropagation();
	}
	openAlbum(item: any,e:any) {
		if(!item.albumID) return
		window.open('http://www2.kugou.kugou.com/yueku/v8/album/single/' + item.albumID + '-0-1.html')
		e.stopPropagation();
	}
	copyScid(scid: string | number,e:any) {
		this.common.copy(scid + '')
		e.stopPropagation();
	}
	addScid(scid: string | number,e:any) {
		this.router.navigate(['/pages/set-ranking/', scid]);
		e.stopPropagation();
	}
	// 获取歌词
	getLyric(item: any) {
		this.api.getKugouLyric({
			hash: item.FileHash,
		}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				item.lyricText = res.result || '无'
				item.lyricData2 = this.common.parseLRC3(item.lyricText)
				item.lyricReadly = true;
			}
		}, (err: any) => {
			console.log(err)
		})
	
	}
	mouseenter(item: any) {
		item.lyricShow = true;
		if (item.lyricText) {
			item.lyricData2 = this.common.parseLRC3(item.lyricText)
			item.lyricReadly = true;
		} else {
			item.lyricReadly = false;
			this.getLyric(item)
		}
	}
	mouseleave(item: any) {
		item.lyricShow = false;
	}
	// refreshSearchPeopleNum(item: any, index: any) {
	// 	this.api.getV3SearchNum({
	// 		keyword: this.common.deleteEM(item),
	// 	}).subscribe((res: any) => {
	// 		if (res.success) {
	// 			this.kugouV3List[index].searchPeopleCount = res.result.searchPeopleCount
	// 			this.kugouV3List[index].searchPeopleArr = res.result.searchPeopleArr
	// 		}
	// 	}, (err: any) => {
	// 		console.log(err)
	// 	})
	// }
	refreshListenPeopleNum(item: any, index: any,e:any) {
		this.api.getV3ListenPeopleNum({
			mixsongid: item,
		}).subscribe((res: any) => {
			if (res.success) {
				this.kugouV3List[index].listenPeopleCount = res.result.listenPeopleCount
				this.kugouV3List[index].listenPeopleArr = res.result.listenPeopleArr
			}
		}, (err: any) => {
			console.log(err)
		})
		e.stopPropagation()
	}
	refreshSingingPeopleNum(item: any, index: any,e:any) {
		this.api.getV3SingingPeople({
			songname: this.common.deleteEM(item),
		}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				this.kugouV3List[index].singingPeople = res.result.singingPeople
			}
		}, (err: any) => {
			console.log(err)
		})
		e.stopPropagation()
	}
	goToSeeSinger(url: any, index: any,e:any) {
		window.open(url)
		e.stopPropagation();
	}
	goSingerHome(id:any,e:any){
		window.open(`https://www.kugou.com/singer/${id}.html`)
		e.stopPropagation();
	}
}
