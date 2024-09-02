import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: 'ngx-hotSearchList',
	templateUrl: './hotSearchList.component.html',
	styleUrls: ['./hotSearchList.component.scss']
})
export class HotSearchListComponent implements OnInit {
	constructor(public common : CommonService, public api : ApiService, private toast: ToastrService) { }

	ngOnInit() : void {
		this.DevTipListWeChatMini()
	}
	loading = false;
	isPlay = false;
	
	selectIndex=0;
	list : any = [
		{title:"热搜榜",type:1,infoArr:[]},
		{title:"飙升榜",type:1,infoArr:[]},
		{title:"DJ榜",type:1,infoArr:[]},
		{title:"抖音榜",type:1,infoArr:[]},
		{title:"外语热搜",type:1,infoArr:[]},
		{title:"国风热搜",type:1,infoArr:[]},
		{title:"情歌热搜",type:1,infoArr:[]},
		{title:"纯音乐热搜",type:1,infoArr:[]},
		{title:"综艺热搜",type:1,infoArr:[]},
		{title:"热搜音频榜",type:2,infoArr:[]},
		{title:"影视热搜",type:2,infoArr:[]}
	]
	audioSrc = '';
	
	type=0;
	typeList=[
		{label:"标签",value:0},
		{label:"全部",value:1}
	]
	
	
	
	onSelect(e:any,i:number){
		this.selectIndex = i;
		if(this.list[this.selectIndex].infoArr.length==0){
			this.DevTipListWeChatMini()
		}
	}
	ngModelType(e:any){
		console.log(e)
		if(e==1){
			//全部 检查哪个标签没请求 直接请求
			this.surplusReq()
		}
	}
	// 请求剩余 数据
	surplusReq(){
		for(let i=0;i<this.list.length;i++){
			let item = this.list[i];
			if(item.infoArr.length==0){
				this.DevTipListWeChatMini(item.title,i)
			}
		}
	}
	
	
	// 无值 标签 有值 全部
	DevTipListWeChatMini(info:string="",selectIndex:any=null){
		this.loading = true;
		info = info || this.list[this.selectIndex].title;
		selectIndex = selectIndex===null?this.selectIndex:selectIndex;
		this.api.DevTipListWeChatMini({info}).subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			if(res.success){
				res.data.forEach((item:any)=>{
					item.extra = item.extra || {}
				})
				this.list[selectIndex].infoArr = res.data;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	
	// DevTipListKugou() {
	// 	this.loading = true;
	// 	this.api.DevTipListKugou().subscribe((res: any) => {
	// 		console.log(res)
	// 		this.loading = false;
	// 		if(res.success){
	// 			this.list = res.data[0];
	// 			res.data[1].forEach((item:any)=>{
	// 				item.infoArr.forEach((citem:any)=>{
	// 					citem.extra = citem.extra || {}
	// 				})
	// 			})
	// 			// this.list2 = res.data[1];
	// 		}
	// 	}, (err: any) => {
	// 		console.log(err)
	// 		this.loading = false;
	// 	})
	// }
	openSongDetail(eMixSongID: string) {
		window.open('https://www.kugou.com/song/#' + eMixSongID)
	}
	play(element : any) {
		console.log(element)
		this.pause();
			this.list.forEach((item:any)=>{
				var i = item.infoArr.findIndex((e : any) => e.audioUrl == element.srcElement.currentSrc)
				if (i !== -1) {
					item.infoArr[i].isPlay = true;
				}
			})
	}
	pause() {
		this.list.forEach((item : any) => {
			item.infoArr.forEach((citem : any) => {
				citem.isPlay = false;
			})
		})
	
	}
	audioError() {
		if (this.isPlay) {
			this.toast.error("播放歌曲错误")
			this.pause()
		}
	}
	timeupdate(e : any) {

	}
	playChange(obj:any){
		let {cIndex,i} = obj;
		this.audioSrc = this.list[i].infoArr[cIndex].audioUrl
		if(!this.audioSrc) return;
		this.isPlay = true;
		let audio : any = document.getElementById('audio')
		setTimeout(() => {
			this.list.forEach((item : any, index : number) => {
				item.infoArr.forEach((citem : any, cindex : any) => {
					if (cIndex == cindex && index == i) {
						citem.isPlay = !citem.isPlay
						if (citem.isPlay) {
							audio.play()
						} else {
							audio.pause()
						}
					} else {
						citem.isPlay = false;
					}
				})
			})
		}, 50)
	}
}