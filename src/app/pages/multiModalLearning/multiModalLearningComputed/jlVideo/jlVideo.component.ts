import { Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-jlVideo",
  templateUrl: "./jlVideo.component.html",
  styleUrls: ["./jlVideo.component.scss"],
})
export class JlVideoComponent implements OnInit {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() { }
  ngOnChanges(changes : SimpleChanges) {
  	if (changes.MassiveArithmeticVedio.currentValue.length>0) {
  		this.loadPage();
  	}
  }
@Input() MassiveArithmeticVedio:any=[]
  @Input() loading: any = true;
paginatedData:any=[]
 //巨量达人跳转主页  || 视频主页
  OpenDy(item: any) {
    window.open(item);
  }
  hasMore: any = true;
  currentPage=1
  isLoading: any = false; // 是否正在加载
  pageSize = 30; // 每页大小
  // 监听滚动事件
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    // 判断是否接近底部
    const nearBottom =
      element.scrollHeight - element.scrollTop <= element.clientHeight + 100;
    if (nearBottom && this.hasMore && !this.isLoading) {
      this.currentPage++;
      this.loadPage(this.currentPage);
    }
  }
  // 加载当前页数据
  loadPage(page: number=1): void {
    if (this.isLoading || !this.hasMore) return;
    this.isLoading = true;
    setTimeout(() => {
      const start = (page - 1) * this.pageSize;
      const end = start + this.pageSize;
      const pageData = this.MassiveArithmeticVedio.slice(start, end);
      if (pageData.length) {
        this.paginatedData = [...this.paginatedData, ...pageData];
      } else {
        this.hasMore = false; // 没有更多数据
      }
      this.isLoading = false;
    }, 1000); // 模拟异步加载
  }
}
