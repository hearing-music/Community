import { Component, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";
import { CommonService } from "../../../services/common.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "ngx-kuaishou-potential",
  templateUrl: "./kuaishou-potential.component.html",
  styleUrls: ["./kuaishou-potential.component.scss"],
})
export class kuaishouPotentialComponent implements OnInit {
  total = 0;
  dataSet:any = []
  page:any=1;
  constructor(public api: ApiService, public common: CommonService,private toast: ToastrService,) {}

  ngOnInit(): void {
		this.getKuaishouHotEventList();
  }
  nzPageIndexChange(e) {
	  this.toast.info('暂时还不能翻页哦')
	  this.page=1
	  return
	  this.page=e;
    this.getKuaishouHotEventList();
  }
  ToRadio(id:any){
	  window.open('https://www.kuaishou.com/profile/'+id)
  }
  loading:any=false
  getKuaishouHotEventList() {
	  this.loading=true;
    this.api
      .getKuaishouHotEventList({ page:this.page})
      .subscribe((res: any) => {
		  
		  if(res.success){
			  res.result.forEach((item:any)=>{
				  item.expand = false;
			  })
			  this.dataSet = res.result;
			  this.total = res.total
		  }
		  this.loading=false;
      },(err:any)=>{
		  this.loading=false;
	  });
  }
}
