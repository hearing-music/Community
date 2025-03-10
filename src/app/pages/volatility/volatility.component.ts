import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../services/common.service";
import { ApiService } from "../../services/api.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: "ngx-volatility",
	templateUrl: "./volatility.component.html",
	styleUrls: ["./volatility.component.scss"],
})
export class VolatilityComponent implements OnInit {
	nextUpdataTime : number = 0;
	constructor(public common : CommonService, public api : ApiService, private router : Router, private toast : ToastrService) { }
	ngOnInit() : void {
		this.getQq_freeSongs();
		this.qqfreeSongs2Progress()
	}
	keyword='';
	type = 'QQ音乐'
	loading = false;
	qqPageCurrent = 1;
	qqPageSize = 30;
	qqPageTotal = 0;
	qqlist : any = [];
	qqPercent = 0;

	qqFree : any = 2
	qqFreeList : any = [{
		value: 2,
		label:"全部"
	},{
		value: 0,
		label:"免费"
	}, {
		value: 1,
		label:"付费"
	}]
	qqCompany : any = 2
	qqCompanyList : any = [{
		value: 2,
		label:"全部"
	},{
		value: 0,
		label:"无"
	}, {
		value: 1,
		label:"有"
	}]
	qqSort : any = 0
	qqSortList : any = [{
		value: 0,
		label:"指数"
	}, {
		value: 1,
		label:"指数增长"
	}]
	
	
	kgPageCurrent = 1;
	kgPageSize = 30;
	kgPageTotal = 0;
	kglist : any = [];
	kgPercent = 0;
	
	kgFree : any = 2
	kgFreeList : any = [{
		value: 2,
		label:"全部"
	},{
		value: 0,
		label:"免费"
	}, {
		value: 1,
		label:"付费"
	}]
	kgCompany : any = 2
	kgCompanyList : any = [{
		value: 2,
		label:"全部"
	},{
		value: 0,
		label:"无"
	}, {
		value: 1,
		label:"有"
	}]
	kgSort : any = 0
	kgSortList : any = [{
		value: 0,
		label:"指数"
	}, {
		value: 1,
		label:"指数增长"
	}]
	
	search(e:any){
		this.keyword = e;
		if(this.type=='QQ音乐'){
			this.getQq_freeSongs()
		}
		if(this.type=='酷狗音乐'){
			this.getKg_freeSongs()
		}
	}
	childInput(e:any){
		this.keyword = e;
	}
	onSelect(str : string) {
		this.type = str;
		if(this.type=='QQ音乐'){
			this.qqfreeSongs2Progress()
		}
		if(this.type=='酷狗音乐'){
			if(this.kglist.length==0){
				this.getKg_freeSongs()
			}
			this.kgfreeSongs2Progress()
		}
	}
	// qq选择排序
	ngModelQQSort(e : any) {
		this.qqPageCurrent = 1;
		this.getQq_freeSongs()
	}
	// qq选择公司选项
	ngModelQQCompany(e : any) {
		this.qqPageCurrent = 1;
		this.getQq_freeSongs()
	}
	// qq选择免费选项
	ngModelQQFree(e : any) {
		this.qqPageCurrent = 1;
		this.getQq_freeSongs()
	}
	// qq翻页
	nzPageIndexChangeQQ(e : any) {
		this.qqPageCurrent = e;
		this.getQq_freeSongs();
	}
	// kg选择排序
	ngModelKGSort(e : any) {
		this.kgPageCurrent = 1;
		this.getKg_freeSongs()
	}
	// kg选择公司选项
	ngModelKGCompany(e:any){
		this.kgPageCurrent = 1;
		this.getKg_freeSongs()
	}
	// kg选择免费选项
	ngModelKGFree(e : any) {
		this.qqPageCurrent = 1;
		this.getKg_freeSongs()
	}
	// kg翻页
	nzPageIndexChangeKG(e : any) {
		this.kgPageCurrent = e;
		this.getKg_freeSongs();
	}
	getQq_freeSongs() {
		this.loading = true;
		this.api.qqfreeSongs2({ keyword:this.keyword,page: this.qqPageCurrent, pageSize: this.qqPageSize, sort: this.qqSort,company:this.qqCompany,free:this.qqFree}).subscribe((res : any) => {
			this.loading = false;
			if (res.success) {
				this.qqlist = res.data;
				this.qqPageTotal = res.totalCount;
			}
		}, (err : any) => {
			console.log(err);
			this.loading = false;
		});
	}
	qqfreeSongs2Progress() {
		this.api.qqfreeSongs2Progress({}).subscribe((res : any) => {
			this.qqPercent = res.data;
		}, (err : any) => {
			console.log(err);
		});
	}
	kgfreeSongs2Progress() {
		this.api.kgfreeSongs2Progress({}).subscribe((res : any) => {
			if (res.success) {
				this.kgPercent = res.data;
			}
		}, (err : any) => {
			console.log(err);
		});
	}
	getKg_freeSongs() {
		this.loading = true;
		this.api.kgfreeSongs2({ keyword:this.keyword,page: this.kgPageCurrent, pageSize: this.kgPageSize, sort: this.kgSort,company:this.kgCompany,free:this.kgFree }).subscribe((res : any) => {
			this.loading = false;
			console.log(res)
			if (res.success) {
				res.data.forEach((item : any) => {
					item.album_name = item.album_name || '无'
					item.company = item.company || '无'
					if (item.url) {
						item.url = item.url.replace('{size}', '240');
						item.url = item.url.replace('http://', 'https://');
					}
				});

				this.kglist = res.data;
				this.kgPageTotal = res.totalCount;
			}
		}, (err : any) => {
			console.log(err);
			this.loading = false;
		});
	}

	audioSrc : any = "";
	isPlay : any = false;
	play() {
		this.pause()
		this.qqlist.forEach((item : any) => {
			if (item.musicUrl == this.audioSrc) {
				item.isPlay = true;
			}
		});
		this.kglist.forEach((item : any) => {
			if (item.musicUrl == this.audioSrc) {
				item.isPlay = true;
			}
		});
	}
	pause() {
		this.qqlist.forEach((item : any) => {
			item.isPlay = false;
		});
		this.kglist.forEach((item : any) => {
			item.isPlay = false;
		});
	}

	kgPlayAudio(item : any, i : number) {
		if (item.musicUrl) {
			this.kgPlayMusicFun(item, i)
		} else {
			if (!item.EMixSongID || item.EMixSongID == '0') {
				this.toast.info('暂无EMixSongID')
				return
			}
			this.loading = true;
			this.api.getKugouSongUrl({ EMixSongID: item.EMixSongID }).subscribe((res : any) => {
				this.loading = false;
				if (res.success) {
					item.musicUrl = res.result[0];
					this.kgPlayMusicFun(item, i)
				}
			}, (err : any) => {
				console.log(err);
				this.loading = false;
			})
		}

	}
	// qq播放歌曲
	qqPlayAudio(item : any, i : number) {
		if (item.musicUrl) {
			this.qqPlayMusicFun(item, i)
		} else {
			this.loading = true;
			this.api.getSongMusicUrl({ mid: item.mid }).subscribe((res : any) => {
				this.loading = false;
				if (res.success) {
					item.musicUrl = res.result
					this.qqPlayMusicFun(item, i)
				}
			}, (err : any) => {
				console.log(err);
				this.loading = false;
			})
		}
	}
	qqPlayMusicFun(item : any, i : number) {
		this.isPlay = true;
		this.audioSrc = item.musicUrl;
		let audio : any = document.getElementById('audio')
		setTimeout(() => {
			this.qqlist.forEach((listitem : any, index : number) => {
				if (index == i) {
					listitem.isPlay = !listitem.isPlay
					if (listitem.isPlay) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					listitem.isPlay = false;
				}
			})
		}, 50)
	}
	kgPlayMusicFun(item : any, i : number) {
		this.isPlay = true;
		this.audioSrc = item.musicUrl;
		let audio : any = document.getElementById('audio')
		setTimeout(() => {
			this.kglist.forEach((listitem : any, index : number) => {
				if (index == i) {
					listitem.isPlay = !listitem.isPlay
					if (listitem.isPlay) {
						audio.play()
					} else {
						audio.pause()
					}
				} else {
					listitem.isPlay = false;
				}
			})
		}, 50)
	}


	// qq 打开链接
	openSongDetail(mid : any) {
		let url = "https://y.qq.com/n/ryqq/songDetail/" + mid + "/";
		window.open(url);
	}
	openCompay(id : any) {
		if(!id) return
		let url = "https://y.qq.com/portal/company_detail.html?id=" + id + "#sort=1&type=album";
		window.open(url);
	}
	// 打开链接
	openLink(mid:string|number){
		window.open('https://y.qq.com/m/client/music_index/index.html?mid='+mid+'&type='+mid+'&ADTAG=wxfshare')
	}
	openSinger(mid : any) {
		let url = `https://y.qq.com/n/ryqq/singer/${mid}`;
		window.open(url);
	}
	openAlbum(mid : any) {
		let url = `https://y.qq.com/n/ryqq/albumDetail/${mid}`;
		window.open(url);
	}

	// kg打开链接
	openSongDetailKG(item : any) {
		if (!item.EMixSongID || item.EMixSongID == '0') {
			this.toast.info('暂无EMixSongID')
		} else {
			window.open('https://www.kugou.com/song/#' + item.EMixSongID)
		}
	}
	openExponentLinkKG(item: any) {
		window.open('https://h5.kugou.com/achievement/v-a34ccad0/index.html?audio_id=' + item.audio_id + '&hash=' + item.hash + '&mixsongid=' + item.album_audio_id)
	}
	openSingerKG(id : any) {
		window.open(`https://www.kugou.com/singer/${id}.html`)
	}
	openAlbumKG(item : any) {
		if (!item.album_id) {
			this.toast.info('暂无album_id')
			return
		}
		window.open('http://www2.kugou.kugou.com/yueku/v8/album/single/' + item.album_id + '-0-1.html')
	}

	ArtistNames(artists : any) {
		let artistNames : any = [];
		if (typeof artists != "object") {
			try {
				artists = artists.replaceAll(":", "");
				artists = artists.split("id");
				for (let i = 1; i < artists.length; i++) {
					let ss = artists[i].split("name");
					let id = ss[0].replaceAll(",", "");
					let name = ss[1].substr(0, ss[1].indexOf(","));
					artistNames.push({ name, id });
				}
			} catch (e) {

			}
		} else {
			artists.forEach((item : any) => {
				if (item.name) {
					artistNames.push({ name: item.name, id: item.id });
				} else if (item.base && item.base.author_name) {
					artistNames.push({ name: item.base.author_name, id: item.base.author_id });
				}
			});
		}
		return artistNames;
	};
}