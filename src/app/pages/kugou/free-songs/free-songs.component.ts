import { Component, OnInit } from "@angular/core";
import { CommonService } from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: "ngx-free-songs",
  templateUrl: "./free-songs.component.html",
  styleUrls: ["./free-songs.component.scss"],
})
export class FreeSongs_kugouComponent implements OnInit {
  constructor(
    public common: CommonService,
    public api: ApiService,
	private toast: ToastrService,
	private router: Router
  ) {}

  ngOnInit(): void {
    this.getKugou_freeSongs();
    this.getSortList();
  }
	
  loading = false;
  pageCurrent = 1;
  sortId = 0;
  pageSize = 50;
  pageTotal = 0;
  searchValue = "";
  searchHolder = "搜索歌曲名";
  list: any = [];
  listRes: any = [];
  sort = "默认";
  sortList = [
    {
      source: "默认",
      id: 0,
    },
  ];
  type = "歌曲名";
  typeList = [
    {
      name: "歌曲名",
    },
    {
      name: "歌曲 audio ID",
    },
  ];
  checked = false;
	publish_timeOrderby:any=''
	exponentOrderby='desc'
	isOriginal:any='全部'
	original:any=''
  originalList: any = [{ value: '全部' }, { value: '原创' }]
  nextUpdataTime:number = 0
	ngModelOriginal(e:any){
		console.log(e)
		if(e=='全部'){
			this.original=''
		}
		if(e=='原创'){
			this.original='1'
		}
		this.pageCurrent = 1;
		this.getKugou_freeSongs()
	}
	// 排序
	publish_timeClick(){
		this.exponentOrderby =''
		if(this.publish_timeOrderby == 'desc'){
			this.publish_timeOrderby = 'asc'
		}else{
			this.publish_timeOrderby = 'desc'
		}
		this.pageCurrent = 1;
		this.getKugou_freeSongs()
	}
	exponentClick(){
		this.publish_timeOrderby =''
		if(this.exponentOrderby == 'desc'){
			this.exponentOrderby = 'asc'
		}else{
			this.exponentOrderby = 'desc'
		}
		this.pageCurrent = 1;
		this.getKugou_freeSongs()
	}
	
  nzPageIndexChange(e: any) {
    this.pageCurrent = e;
    this.getKugou_freeSongs();
  }
  openLink(item: any) {
    if (!item.song_url) {
      window.open(
        "https://www.kugou.com/song/#hash=" +
          item.hash +
          "&album_audio_id=" +
          item.album_audio_id
      );
    } else {
      window.open(item.song_url);
    }
  }
  openSingerHome(id: any) {
    if (!id || id == "0") {
      this.toast.info("没找到该歌手id😭");
      return;
    }
    window.open(`https://www.kugou.com/singer/${id}.html`);
  }
  copy(text: string) {
    this.common.copy(text);
  }
  reloadExponent(item: any) {
    this.loading = true;
    this.api
      .getKugou_exponent({
        scid: item.audio_id,
      })
      .subscribe(
        (res: any) => {
          this.loading = false;
          console.log(res);
          if (res.success) {
            item.newExponent = res.result;
          }
        },
        (err: any) => {
          console.log(err);
          this.loading = false;
        }
      );
  }
  search(e: any) {
    this.searchValue = e;
    this.pageCurrent = 1;
    this.getKugou_freeSongs();
  }
  ngModelChange(e: any) {
    if (this.type == "歌曲名") {
      this.searchHolder = "搜索歌曲名";
    } else {
      this.searchHolder = "搜索歌曲audio ID";
    }
  }
  ngModelChangeCheckBox(e: any) {
    console.log(e);
  }
  change(e: any) {
    this.pageCurrent = e.current;
    this.getKugou_freeSongs();
  }
  // 跳转词曲版权
  gotoCopyright(name:any){
	  this.router.navigate(['/pages/search-songs/copyright/'+name]);
  }
  ngModelSort(item: any) {
    let arrObjFilter = this.sortList.filter((ele: any) => ele.source == item);
    this.sortId = arrObjFilter[0].id;
    this.pageCurrent = 1;
    // this.pageSize = 25;
    this.pageTotal = 0;
    this.getKugou_freeSongs();
  }
  getKugou_freeSongs() {
    this.loading = true;
    this.api.getKugou_freeSongs({
        page: this.pageCurrent,
        pageSize: this.pageSize,
        keyword: this.searchValue,
        type: this.type,
        newly: this.checked,
        sort: this.sortId,
		    publish_timeOrderby:this.publish_timeOrderby,
		    exponentOrderby:this.exponentOrderby,
		    isOriginal:this.original
      }).subscribe((res: any) => {
          this.loading = false;
          console.log(res);
          if (res.success) {
            res.result.forEach((item: any, index: any) => {
              if (this.nextUpdataTime == 0 || this.nextUpdataTime<item.updateTime) {
                this.nextUpdataTime=item.updateTime + (86400000*14)
              }
              // res.res[index] = res.res[index].length == 0 ? [{}] : res.res[index];
              item.newExponent = "";
              if (typeof item.singerId != "object") {
                try {
                  item.singerId = item.singerId.replaceAll(":", "");
                  item.singerId = item.singerId.split("id");
                  let singerId = [];
                  for (let i = 1; i < item.singerId.length; i++) {
                    let ss = item.singerId[i].split("name");
                    let id = ss[0].replaceAll(",", "");
                    let name = ss[1].substr(0, ss[1].indexOf(","));
                    singerId.push({ name, id });
                  }
                  item.singerId = singerId;
                } catch (e) {
                  //TODO handle the exception
                  item.singerId = "";
                }
                // item.singerId = item.singerId.replaceAll(':','')
                // item.singerId = item.singerId.split('id')
                // item.singerId = item.singerId[1].split('name')

                // item.singerId = item.singerId.replaceAll('}','"}')
                // item.singerId = item.singerId.replaceAll(':','":"')
                // item.singerId = item.singerId.replaceAll(',','","')
                // item.singerId = item.singerId.replaceAll('{"size"}','{size}')
                // item.singerId = item.singerId.replaceAll('http":"//','http://')
                // item.singerId = JSON.parse(item.singerId)
                // item.singerId = eval('('+item.singerId+')')
              }
            });
            this.list = res.result;
            // this.listRes = res.res;
            this.pageTotal = res.pageTotal;
          }
        },
        (err: any) => {
          console.log(err);
          this.loading = false;
        }
      );
  }
  getSortList() {
    this.api.GetSortList().subscribe((res: any) => {
		res.result = res.result.splice(res.result.length-1,1)
      res.result.forEach((item: any) => {
        this.sortList.push(item);
      });
    });
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
  		this.api.getKugouSongUrl({ EMixSongID: item.EMixSongID }).subscribe((res : any) => {
  			this.loading = false;
  			if (res.success) {
  				item.musicUrl = res.result[0];
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
}
