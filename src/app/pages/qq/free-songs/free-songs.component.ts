import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { Router } from '@angular/router';
@Component({
	selector: "ngx-free-songs",
	templateUrl: "./free-songs.component.html",
	styleUrls: ["./free-songs.component.scss"],
})
export class FreeSongs_qqComponent implements OnInit {
	nextUpdataTime : number = 0;
	constructor(public common : CommonService, public api : ApiService, private router : Router) { }
	ngOnInit() : void {
		this.getSortList();
    this.getQq_freeSongs();
    this.GetQqUpdataTime();
	}
	loading = false;
	pageCurrent = 1;
	pageSize = 50;
	pageTotal = 0;
	searchValue = "";
	searchHolder = "搜索歌曲名";
	list : any = [];
	sortId = 0;
	type = "歌曲名";
	sort = "默认";
	sortList = [
		{
			source: "默认",
			id: 0,
		},
	];
	typeList = [
		{
			name: "歌曲名",
		},
		{
			name: "歌曲Mid",
		},
	];
	checked = false;
	publish_timeOrderby : any = ''
  exponentOrderby = 'desc'
  updataState:boolean=false
	// 排序
	publish_timeClick() {
		this.exponentOrderby = ''
		if (this.publish_timeOrderby == 'desc') {
			this.publish_timeOrderby = 'asc'
		} else {
			this.publish_timeOrderby = 'desc'
		}
		this.pageCurrent = 1;
		this.getQq_freeSongs()
	}
	exponentClick() {
		this.publish_timeOrderby = ''
		if (this.exponentOrderby == 'desc') {
			this.exponentOrderby = 'asc'
		} else {
			this.exponentOrderby = 'desc'
		}
		this.pageCurrent = 1;
		this.getQq_freeSongs()
	}

	nzPageIndexChange(e : any) {
		this.pageCurrent = e;
		this.getQq_freeSongs();
	}
	openLink(item : any) {
		let url = "https://y.qq.com/n/ryqq/songDetail/" + item.mid + "/";
		window.open(url);
	}
	openCompay(id : any) {
		let url =
			"https://y.qq.com/portal/company_detail.html?id=" +
			id +
			"#sort=1&type=album";
		window.open(url);
	}
	openSinger(mid : any) {
		let url = `https://y.qq.com/n/ryqq/singer/${mid}`;
		window.open(url);
	}
	openAlbum(mid : any) {
		let url = `https://y.qq.com/n/ryqq/albumDetail/${mid}`;
		window.open(url);
	}
	copy(text : string) {
		this.common.copy(text);
	}
	reloadExponent(item : any) {
		this.loading = true;
		this.api
			.getQq_exponent({
				songmid: item.mid,
				keyword: item.songname,
			})
			.subscribe(
				(res : any) => {
					this.loading = false;
					console.log(res);
					if (res.success) {
						item.today_index = res.result.todayIndex;
						item.today_rank = res.result.todayRank;
						item.cnt = res.result.cnt;
					}
				},
				(err : any) => {
					console.log(err);
					this.loading = false;
				}
			);
	}
	search(e : any) {
		this.searchValue = e;
		this.pageCurrent = 1;
		this.getQq_freeSongs();
	}
	ngModelChange(e : any) {
		if (this.type == "歌曲名") {
			this.searchHolder = "搜索歌曲名";
		} else {
			this.searchHolder = "搜索歌曲Mid";
		}
	}
	ngModelChangeCheckBox(e : any) {
		console.log(e);
	}
	change(e : any) {
		this.pageCurrent = e.current;
		this.getQq_freeSongs();
	}
	// 跳转词曲版权
	gotoCopyright(name : any) {
		this.router.navigate(['/pages/search-songs/copyright/' + name]);
	}
	getQq_freeSongs() {
		this.loading = true;
		this.api.getQq_freeSongs({
			page: this.pageCurrent,
			pageSize: this.pageSize,
			keyword: this.searchValue,
			type: this.type,
			newly: this.checked,
			sort: this.sortId,
			publish_timeOrderby: this.publish_timeOrderby,
			exponentOrderby: this.exponentOrderby
		}).subscribe((res : any) => {
			this.loading = false;
			console.log(res);
			if (res.success) {
				res.result = res.result || res.data;
				// res.result.forEach((item : any) => {
				// 	const date = new Date(item.updated_at);
				// 	const timestamp = date.getTime();
				// 	if (this.nextUpdataTime == 0 || this.nextUpdataTime < timestamp) {
				// 		this.nextUpdataTime = timestamp + (86400000 * 14)
				// 	}
				// 	item.newExponent = "";
				// });
				this.list = res.result;
				this.pageTotal = res.pageTotal;
			}
		}, (err : any) => {
			console.log(err);
			this.loading = false;
		}
		);
	}
	audioSrc : any = "";
	isPlay : any = false;
	play() {
		let audio : any = document.getElementById("audio");
		audio.play();
		this.list.forEach((item : any) => {
			if (item.musicUrl == this.audioSrc) {
        item.isplay = true;
			}
		});
	}
	pause() {
		let audio : any = document.getElementById("audio");
		audio.pause();
		this.list.forEach((item : any) => {
			item.isplay = false;
		});
	}
	playMusic(item : any) {
		if (item.musicUrl) {
			this.playMusicFun(item)
		} else {
			this.loading = true;
			this.api.getSongMusicUrl({ mid: item.mid }).subscribe((res : any) => {
				this.loading = false;
				if (res.success) {
					item.musicUrl = res.result
					this.playMusicFun(item)
				}
			}, (err : any) => {
				console.log(err);
				this.loading = false;
			})
		}
	}
	playMusicFun(item : any) {
		this.isPlay = true;
		this.audioSrc = item.musicUrl;
		setTimeout(() => {
			this.list.forEach((item : any) => {
				item.isplay = false;
			});
			item.isplay = true;
			this.play();
		}, 50);
	}
	pauseMusic(item : any) {
		this.pause();
	}
	ngModelSort(item : any) {
		let arrObjFilter = this.sortList.filter((ele : any) => ele.source == item);
		this.sortId = arrObjFilter[0].id;
		this.pageCurrent = 1;
		this.pageSize = 50;
		this.pageTotal = 0;
		this.getQq_freeSongs();
	}
	getSortList() {
		this.api.GetSortList().subscribe((res : any) => {
			res.result.forEach((item : any) => {
				this.sortList.push(item);
			});
		});
  }
  ToDataNum(value: any) {
    if (value) {
      const date = new Date(value);
      const timestamp = date.getTime(); // 得到时间戳，单位是毫秒
      return timestamp
    } else {
      const date = new Date();
      const timestamp = date.getTime(); // 得到时间戳，单位是毫秒
      return timestamp
    }
  }
  GetQqUpdataTime() {
    this.api.GetQqUpdataTime().subscribe((res: any) => {
      for (let i = 0; i < res.result.length; i++){
        if (res.result[i].FlatRoofedBuilding == 'QQ') {
          this.nextUpdataTime = res.result[i].UpdateDate + 14 * 86400000
          this.updataState = res.result[i].State.data[0]==0 ? false : true
        }
      }
      console.log(res.result)
    })
  }
}
