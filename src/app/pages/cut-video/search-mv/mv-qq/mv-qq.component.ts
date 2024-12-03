import { Component, Input, OnInit } from "@angular/core";
import { CommonService } from "../../../../services/common.service";
import { ApiService } from "../../../../services/api.service";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
	selector: "ngx-mv-qq",
	templateUrl: "./mv-qq.component.html",
	styleUrls: ["./mv-qq.component.scss"],
})
export class MvQqComponent implements OnInit {
	constructor(public common : CommonService, public api : ApiService, private router : Router,private toast: ToastrService,) { }
	ngOnInit() : void {
		
	}
	@Input() data:any=null;
	loading=false;
  
  
	
	
	
	openSinger(mid:string){
		window.open("https://y.qq.com/n/ryqq/singer/"+mid)
	}
	openMv(mid:string){
		window.open("https://y.qq.com/n/ryqq/mv/"+mid)
	}
}
