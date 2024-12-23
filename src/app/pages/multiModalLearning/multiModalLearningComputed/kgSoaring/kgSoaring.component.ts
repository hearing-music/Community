import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ApiService } from "../../../../services/api.service";
import { CommonService } from "../../../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
  selector: "ngx-kgSoaring",
  templateUrl: "./kgSoaring.component.html",
  styleUrls: ["./kgSoaring.component.scss"],
})
export class KgSoaringComponent implements OnInit,OnChanges {
  constructor(
    public api: ApiService,
    public common: CommonService,
    private toast: ToastrService
  ) {}
  async ngOnInit() {
  }
  ngOnChanges(changes : SimpleChanges) {
  	if (changes.KGSoaringSongs) {
  		this.initData();
  	}
  }
@Input() KGSoaringSongs:any=[]
@Input() KGSoaringSongsLoading:any=true;
@Input() ThreePartyInterface:any=[]
@Input() ThreePartyInterfaceLoading:any=true;

//酷狗歌手页
  openLink(id: string | number) {
    window.open("https://www.kugou.com/singer/" + id + ".html");
  }
  initData(){
	 this.KGSoaringSongs.forEach((item:any)=>{
		 item.other.reverse();
	 })
  }
}
