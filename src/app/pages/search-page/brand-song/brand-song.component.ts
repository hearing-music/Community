import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
import { Router } from '@angular/router';
@Component({
  selector: 'ngx-brand-song',
  templateUrl: './brand-song.component.html',
  styleUrls: ['./brand-song.component.scss']
})
export class BrandSongComponent implements OnInit {

@Input() brandSongList: any;
	constructor(public common: CommonService,private router: Router) { }
  ngOnInit(): void {
  }
  toSearchQQ(item:any){
		this.router.navigate(['/pages/search-songs/qq/'+item.name]);
	}
}
