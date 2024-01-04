import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
@Component({
  selector: "ngx-search-page",
  templateUrl: "./search-page.component.html",
  styleUrls: ["./search-page.component.scss"],
})
export class SearchPageComponent implements OnInit {
  constructor(public api: ApiService, public common: CommonService) {}
  ngOnInit(): void {
    if (!this.common.checkAdmin()) {
      let menu: any = localStorage.getItem("menu");
      menu = JSON.parse(menu);
      let menu_list: any = menu || { top: [], left: [] };
      let tagList = [];
      for (let i = 0; i < menu_list.top.length; i++) {
        if (menu_list.top[i].parent_id == 17) {
          tagList.push(menu_list.top[i].menu);
        }
      }
      this.tagList = tagList;
    }
  }
  tipData: any = [];
  tipDataNow:any = [];
  tagList: any[] = [
    {
      title: "腾讯音乐人",
      holder: "腾讯音乐人搜索",
    },
    {
      title: "网易私信",
      holder: "网易私信搜索",
    },
    {
      title: "厂牌用户",
      holder: "用户搜索",
    },
    {
      title: "厂牌歌曲",
      holder: "厂牌搜索",
    },
    {
      title: "5SING用户",
      holder: "5SING搜索",
    },
    {
      title: "相似歌手",
      holder: "搜索歌手mid",
    },
  ];
  selectItem = "腾讯音乐人";
  searchValue = "";
  loading = false;
  searchHolder = "腾讯音乐人搜索";

  sing5Page = 1;
  sing5PageSize = 30;
  sing5PageTotal = 30;
  sing5List: any[] = [];

  brandUserPage = 1;
  brandUserList: any[] = [];
  brandUserPageSize = 30;
  brandUserPageTotal = 30;

  brandSongPage = 1;
  brandSongList: any[] = [];
  brandSongPageSize = 30;
  brandSongPageTotal = 30;

  wangyisixinPage = 1;
  wangyisixinList: any[] = [];

  musicianTxPage = 1;
  musicianTxList: any[] = [];

  artists: any = false;

  search(value: string): void {
    console.log(value);
    this.tipDataNow = [];
    this.searchValue = value;
    this.musicianTxPage = 1;
    this.loading = true;
    if (this.selectItem == "腾讯音乐人") {
      this.searchMusicianTx();
    }
    if (this.selectItem == "网易私信") {
      this.searchWangyisixin();
    }
    if (this.selectItem == "5SING用户") {
      this.searchFiveSing();
    }
    if (this.selectItem == "厂牌用户") {
      this.searchbrandUser();
    }
    if (this.selectItem == "厂牌歌曲") {
      this.searchbrandSong();
    }
    if (this.selectItem == "相似歌手") {
      this.GetArtists();
    }
  }
  GetArtists() {
    this.api
      .getArtiest({ singerMid: this.searchValue })
      .subscribe((res: any) => {
        if (res.success) {
          this.artists = res.result;
        }
        this.loading = false;
      });
  }
  searchbrandUser() {
    this.api
      .GetbrandUser({
        page: this.brandUserPage,
        pagesize: this.brandUserPageSize,
        keyword: this.searchValue,
      })
      .subscribe((res: any) => {
        (this.brandUserList = res.company),
          (this.brandUserPageTotal = res.count);
        this.loading = false;
      });
  }
  searchbrandSong() {
    this.api
      .GetbrandSong({
        page: this.brandSongPage,
        pagesize: this.brandSongPageSize,
        brand: this.searchValue,
      })
      .subscribe((res: any) => {
        res.data.forEach((ele: any) => {
          ele.audio_url = "https://dl.stream.qqmusic.qq.com/" + ele.audio_url;
          ele.isPlay = false;
        });
        (this.brandSongList = res.data),
          (this.brandSongPageTotal = res.total[0].total);
        this.loading = false;
      });
    
  }
  searchFiveSing() {
    this.api
      .GetfiveSing({
        page: this.sing5Page,
        pagesize: this.sing5PageSize,
        keyword: this.searchValue,
      })
      .subscribe((res: any) => {
        for (let i = 0; i < res.company.length; i++) {
          res.company[i].styles = res.company[i].styles.join(",");
        }
        (this.sing5List = res.company),
          (this.sing5PageTotal = res.count),
          (this.loading = false);
      });
  }
  onSelect(item: any): void {
    this.selectItem = item.title;
    this.searchHolder = item.holder;
    this.searchValue = "";
	if(this.selectItem == "厂牌歌曲"&&this.tipData.length==0){
		this.getQBrandSongs()
	}
  }

  musicianTxPageNext(): void {
    if (this.musicianTxList.length == 0) {
      return;
    }
    this.musicianTxPage += 1;
    this.loading = true;
    this.searchMusicianTx();
  }
  wangyisixinPageNext(): void {
    if (this.wangyisixinList.length == 0) {
      return;
    }
    this.wangyisixinPage += 1;
    this.loading = true;
    this.searchWangyisixin();
  }
  nzPageIndexChangeBrandUser(e: any): void {
    this.brandUserPage = e;
    this.searchbrandUser();
    this.loading = true;
  }
  nzPageIndexChangeBrandSong(e: any) {
    this.brandSongPage = e;
    this.searchbrandSong();
    this.loading = true;
  }
  nzPageIndexChangeSing5(e: any): void {
    this.sing5Page = e;
    this.searchFiveSing();
    this.loading = true;
  }
  searchWangyisixin(): void {
    this.api
      .getWangyiyun_user({
        keyword: this.searchValue,
        page: this.wangyisixinPage,
      })
      .subscribe(
        (res: any) => {
          this.loading = false;
          console.log(res);
          // res.data.results.forEach((item:any)=>{
          // 	item.topinfo = item.topinfo || {}
          // })
          if (res.success) {
            if (this.wangyisixinPage == 1) {
              this.wangyisixinList = res.result;
            } else {
              this.wangyisixinList = [...this.wangyisixinList, ...res.result];
            }
          }
        },
        (err: any) => {
          console.log(err);
          this.loading = false;
        }
      );
  }
  searchMusicianTx(): void {
    this.api
      .getMusicianTx({
        keyword: this.searchValue,
        page: this.musicianTxPage,
      })
      .subscribe(
        (res: any) => {
          this.loading = false;
          console.log(res);
          // res.data.results.forEach((item:any)=>{
          // 	item.topinfo = item.topinfo || {}
          // })
          if (res.success) {
            if (this.musicianTxPage == 1) {
              this.musicianTxList = res.result;
            } else {
              this.musicianTxList = [...this.musicianTxList, ...res.result];
            }
          }
        },
        (err: any) => {
          console.log(err);
          this.loading = false;
        }
      );
  }
  input(query: any) {
    if (this.selectItem == "厂牌歌曲") {
      // this.getQBrandSongs();
	  this.setTipDataNow(query.target.value)
    }
  }
  timeout:any=null
  setTipDataNow(value:any){
	  clearTimeout(this.timeout)
	  this.timeout = null
	  this.timeout = setTimeout(()=>{
		  if(value==''){
			  this.tipDataNow = []
		  }else{
			  this.tipDataNow = this.tipData.filter((e:any)=>e.company.indexOf(value)!=-1)
		  }
	  },500)
  }
  // 输入文字 获得名字提示
  getQBrandSongs() {
      this.loading = true;
      this.api.getQBrandSongs({ brand: '' }).subscribe((res: any) => {
        this.tipData = res.data;
        this.loading = false;
      });
  }
  choseTip(item: any) {
    this.search(item);
    this.tipDataNow = [];
  }
}
