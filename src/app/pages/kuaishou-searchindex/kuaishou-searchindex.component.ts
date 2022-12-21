import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
@Component({
  selector: 'ngx-kuaishou-searchindex',
  templateUrl: './kuaishou-searchindex.component.html',
  styleUrls: ['./kuaishou-searchindex.component.scss']
})
export class KuaishouSearchindexComponent implements OnInit {
  tagList: any = ['热词榜', '飙升词榜']//搜索标签
  activeTag: any = '热词榜'//点击自定义class
  hotSearchList: any = []//所有数据
  hotList: any = [] //热词榜
  dayTime: any = 0
  hotactiveTag: any = '精选'
  searchData: any = []
  loading = false;
  index1 = 0;
  index2 = 0;
  constructor(public api: ApiService) {
  }

  ngOnInit(): void {
    this.getkuaishouSearch()
  }
  getkuaishouSearch() {
    this.api.getkuaishouSearch()
      .subscribe((res: any) => {
        this.hotSearchList = [res.result.home.hot, res.result.home.soar]
      }, (err: any) => {
        console.log(err)
      })
  }
  changeTag(tag: string, i: any) {
    this.activeTag = tag
    this.index1 = i;
  }
  changeVertical(item: any, i: any) {
    this.index2 = i;
    this.hotactiveTag = item
  }
  onProjectChange(item: any) {
    this.dayTime = item
  }
}
