import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { ApiService } from "../../../services/api.service";
@Component({
  selector: 'ngx-kuwo',
  templateUrl: './kuwo.component.html',
  styleUrls: ['./kuwo.component.scss']
})
export class KuwoComponent implements OnInit {
	@Input() kuwoList: any;
  constructor(public common: CommonService,public api: ApiService) { }
	openLink(rid:string|number){
		window.open('http://kuwo.cn/play_detail/'+rid)
	}
	reloadComment(rid:string|number){
		this.api.getKuwoComment({
			rid
		}).subscribe((res: any) => {
			console.log(res.result.total)
			if(res.success){
				this.kuwoList.find((e:any)=>e.rid == rid).commentCount = res.result.total;
			}
	}, (err: any) => {
		console.log(err)
	})
	}
  ngOnInit(): void {
  }

}
