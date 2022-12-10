import { Component, OnInit } from '@angular/core';
import {CommonService} from "../../services/common.service";
import { ApiService } from "../../services/api.service";
@Component({
  selector: 'ngx-query-songlist',
  templateUrl: './query-songlist.component.html',
  styleUrls: ['./query-songlist.component.scss']
})
export class QuerySonglistComponent implements OnInit {

  constructor(public common: CommonService,public api: ApiService) { }

  ngOnInit(): void {
  }
  searchValue='';
  searchHolder='搜索播放列表';
  search(value: string){
	  console.log(value)
	  this.searchValue = value;
	  this.pageCurrent = 1;
	  this.getSongList()
  }
	loading=false;
	pageCurrent=1;
	pageSize=20;
	pageTotal=20;
	nzPageIndexChange(e){
		
	}
	list:any = []
	
	openLink(dissid:string|number) {
		if (!dissid) return
		window.open('https://y.qq.com/n/ryqq/playlist/'+dissid)
	}
	openQQ(qq:string|number){
		window.open('tencent://message/?uin='+qq+'&Site=&amp;amp;&Menu=yes:text=qq：'+qq)
	}
	getSongList() {
		this.loading = true;
		this.api.get_qq_songlist({
			page: this.pageCurrent,
			pageSize: this.pageSize,
			keyword:this.searchValue
		}).subscribe((res:any) => {
			console.log(res)
			this.loading = false;
			this.list = res.result;
			this.pageTotal = res.pageTotal;
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
