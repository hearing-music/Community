import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-musician-tx',
  templateUrl: './musician-tx.component.html',
  styleUrls: ['./musician-tx.component.scss']
})
export class MusicianTxComponent implements OnInit {
@Input() musicianTxList: any;
	constructor(public common: CommonService,public api: ApiService) { }
  ngOnInit(): void {
	  
  }
	loading = false;
	// getMusician_phone(item:any){
	// 	this.loading = true;
	// 	this.api.getMusician_phone({uinList:[item.uin]}).subscribe((res: any) => {
 //       console.log(res)
 //        this.loading = false;
 //      }, (err: any) => {
	// 		console.log(err)
	// 		this.loading = false;
	// 	});
	// }
}
