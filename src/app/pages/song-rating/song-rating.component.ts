import { Component,OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "ngx-song-rating",
  templateUrl: "./song-rating.component.html",
  styleUrls: ["./song-rating.component.scss"],
})
export class SongRatingComponent implements OnInit{
	ngOnInit(): void {
		this.UserId = localStorage.getItem("userId")
		this.SearchAllSongs()
	}
  constructor(public api: ApiService, public common: CommonService,private toast:ToastrService) {}
  loading = false;
  tagList:any = [
    {
      name: "投票打分",
    },
    {
      name: "上传歌曲",
    },
  ];
  tagList2:any=[
	  {
	    name: "已投票",
	  },
	  {
	    name: "未投票",
	  },
  ]
	selectItem:any = '投票打分';
	selectItem2:any = '未投票';

  onSelect(item: any) {
    this.selectItem = item.name;
	if(item.name == '投票打分'){
		this.SearchAllSongs()
	}
  }
  onSelect2(item: any) {
    this.selectItem2 = item.name;
  }
  file:any=null
  FileName:any=''
  UserId:any=0
  onFile(file:any): void{
  	console.log(file)
  	// console.log(this.host)
  	this.file = file;
	this.FileName = file.name
	this.UploadAudio()
  }
  
  UploadAudio(){
	  this.loading =true;
	  this.api.UploadAudio({UserId:this.UserId,FileName:this.FileName,Audio:this.file}).subscribe((res:any)=>{
		  if(res.success){
			  this.toast.success("上传成功")
		  }
		  this.loading =false;
	  },(err:any)=>{
		  this.loading =false;
	  })
  }
  no:any=[]
  yes:any=[]
  SearchAllSongs(){
	  this.loading =true;
	  this.api.SearchAllSongs({UserId:this.UserId}).subscribe((res:any)=>{
		  if(res.success){
			  res.data.no.forEach((item:any)=>{
				  let i = item.Title.indexOf('@')
				  item.Title = item.Title.substr(i+1,item.Title.length-1)
				  let i2 = item.Title.lastIndexOf('.')
				  item.Title = item.Title.substr(0,i2)
			  })
			  res.data.yes.forEach((item:any)=>{
			  		let i = item.Title.indexOf('@')
			  		item.Title = item.Title.substr(i+1,item.Title.length-1)
					let i2 = item.Title.lastIndexOf('.')
					item.Title = item.Title.substr(0,i2)
			  })
			  this.no = res.data.no
			  this.yes = res.data.yes
		  }
		  this.loading =false;
	  },(err:any)=>{
		  this.loading =false;
	  })
  }
  Referendum(item:any,Opinion:number){
	  this.loading =true;
	  this.api.Referendum({UserId:this.UserId,SongId:item.ID,Opinion}).subscribe((res:any)=>{
		  if(res.success){
			  this.toast.success("打分成功")
			 this.SearchAllSongs() 
		  }
		  this.loading =false;
	  },(err:any)=>{
		  this.loading =false;
	  })
  }
}
