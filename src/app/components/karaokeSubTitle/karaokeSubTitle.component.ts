import { Component, Input, OnInit, SimpleChanges,OnChanges } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { ToastrService } from "ngx-toastr";
@Component({
	selector: "ngx-karaokeSubTitle",
	templateUrl: "./karaokeSubTitle.component.html",
	styleUrls: ["./karaokeSubTitle.component.scss"],
})
export class KaraokeSubTitleComponent implements OnInit,OnChanges {
	constructor(private api : ApiService, public common : CommonService, private toast : ToastrService) { }
	ngOnInit() {
		
	}
	ngOnChanges(changes: SimpleChanges) {
	    if (changes.data) {
			if(changes.data.previousValue!=changes.data.currentValue){
				this.initLyric()
			}
	    }
	  }
	@Input() data:any="";
	@Input() playSongTime:any=0;
	lyricData:any=[];
	initLyric(){
		if(!this.data){
			this.lyricData = []
			return;
		}
		let lines = []
		let data = this.data.split("\n")
		data.forEach((item:any)=>{
			let ws = []
			let arr:any = item.split("]");
			let od = arr[0];
			od = od.replace("[","")
			let offset = od.split(",")[0];//该行开始距0秒的毫秒
			let duration = od.split(",")[1]//该行持续时间的毫秒
			let lrc = arr[1]
			lrc = lrc.split("<");
			lrc.splice(0,1);
			lrc.forEach((l:any)=>{
				let w = l.split(">")[1]
				let od2 = l.split(">")[0]
				od2 = od2.split(",")
				let o = od2[0];
				let d = od2[1];
				ws.push({w,o:o-0,d:d-0})
			})
			let line = {
				ws,
				o:offset-0,
				d:duration-0
			}
			lines.push(line)
		})
		this.lyricData = lines;
		
	}
	
}