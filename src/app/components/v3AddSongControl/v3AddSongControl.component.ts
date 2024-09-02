import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from "../../services/common.service";
import { ApiService } from "../../services/api.service";
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'ngx-v3AddSongControl',
	templateUrl: './v3AddSongControl.component.html',
	styleUrls: ['./v3AddSongControl.component.scss']
})
export class V3AddSongControlComponent implements OnInit {
	constructor(public common: CommonService, public api: ApiService,private toast: ToastrService,) { }
	fallback = 'data:image/png;base64,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';
	ngOnInit() : void {
	}
	@Input() cartData: any=[];
	@Output() removeCartEmit: EventEmitter<any> = new EventEmitter<any>();
	@Output() cancelSelectEmit: EventEmitter<any> = new EventEmitter<any>();
	isVisible=false;
	audioSrc=""
	isPlay=false;
	// 酷狗添加监控 播放音乐
	audioError(){
		if(this.isPlay){
			this.toast.error("播放歌曲错误")
		}
	}
	play(element: any) {
		console.log(element)
		this.pause();
		var i = this.cartData.findIndex((e: any) => e.MusicUrl == element.srcElement.currentSrc)
		if (i !== -1) {
			this.cartData[i].isPlay2 = true;
		}
		this.cartData.forEach((item:any,index:any)=>{
			var i2 = item.QQData.findIndex((e: any) => e.musicUrl == element.srcElement.currentSrc)
			if (i2 !== -1) {
				this.cartData[index].QQData[i2].isPlay2 = true;
			}
		})
	}
	pause() {
		this.cartData.forEach((item: any) => {
			item.QQData.forEach((qitem:any)=>{
				qitem.isPlay2 = false;
			})
			item.isPlay2 = false;
		})
	}
	playAudio2(item: any,i:number) {
		if(item.MusicUrl){
			this.kgPlay({src:item.MusicUrl,i});
		}else{
			this.getKugouSongUrl2(item,i)
		}
	}
	playAudio3(item:any,i:number,qitem:any,qi:number,e:any){
		this.qqPlay({src:qitem.musicUrl,qi,item})
		e.stopPropagation();
	}
	qqPlay(params:any){
		this.isPlay = true;
		let { src, qi,item } = params;
		this.audioSrc = src;
		let audio : any = document.getElementById('audioKG')
		setTimeout(() => {
			item.QQData.forEach((qitem : any, index : number) => {
				if (index == qi) {
					qitem.isPlay2 = !qitem.isPlay2
					if (qitem.isPlay2) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					qitem.isPlay2 = false;
				}
			})
		}, 50)
	}
	kgPlay(params:any){
		this.isPlay = true;
		let { src, i } = params;
		this.audioSrc = src;
		let audio : any = document.getElementById('audioKG')
		setTimeout(() => {
			this.cartData.forEach((item : any, index : number) => {
				if (index == i) {
					item.isPlay2 = !item.isPlay2
					if (item.isPlay2) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					item.isPlay2 = false;
				}
			})
		}, 50)
	}
	getKugouSongUrl2(item:any,i:number){
		this.loading = true;
		this.api.getKugouSongUrl({EMixSongID:item.EMixSongID}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				item.MusicUrl = res.result[0];
				this.kgPlay({src:item.MusicUrl,i});
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	
	
	
	loading=false;
	openModal(){
		if(this.cartData.length==0){
			this.toast.info("请点击歌曲选择")
			return
		}
		this.isVisible = true;
	}
	handleCancel(){
		this.isVisible = false;
	}
	removeCart(i:number){
		this.removeCartEmit.emit(i);
	}
	selectQQ(item:any,qindex:any){
		item.QQData.forEach((e:any,index:any)=>{
			if(qindex==index){
				e.isSelect = !e.isSelect;
			}else{
				e.isSelect = false;
			}
		})
	}
	add(){
		if(this.cartData.length==0){
			this.toast.info('请添加')
			return;
		}
		let Parameters = {};
		let SCID = [];
		let EMixSongID = [];
		let AlbumID = [];
		let CommentID = [];
		let Mid = [];
		let Ids = [];
		let length = [];
		this.cartData.forEach((item:any)=>{
			SCID.push(item.scid);
			EMixSongID.push(item.EMixSongID)
			AlbumID.push(item.albumID)
			CommentID.push({"MixSongID":item.MixSongID,"FileHash":item.FileHash})
			length.push(0)
			
			let qqData:any = {}
			let QQData = item.QQData.filter((e:any)=>e.isSelect==true)
			if(QQData.length>0){
				qqData = QQData[0];
				Mid.push(qqData.mid)
				Ids.push(qqData.id)
			}else{
				Mid.push(false)
				Ids.push(false)
			}
			
		})
		Parameters['SCID']=SCID;
		Parameters['EMixSongID']=EMixSongID;
		Parameters['AlbumID']=AlbumID;
		Parameters['CommentID']=CommentID;
		Parameters['length']=length;
		Parameters['Mid']=Mid;
		Parameters['Ids']=Ids;
		this.loading = true;
		this.api.kgSurveillanceSongs({Parameters}).subscribe((res: any) => {
			console.log(res)
			if (res.success) {
				this.toast.success("添加成功")
				this.cancelSelectEmit.emit()
				this.isVisible = false;
			}
			this.loading = false;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	// 打开链接
	openSongDetailQQ(songMid:string,e:any){
		window.open('https://y.qq.com/n/ryqq/songDetail/'+songMid);
		e.stopPropagation();
		
	}
}