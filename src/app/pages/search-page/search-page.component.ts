import { Component, OnInit,OnDestroy } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {SocketService} from "../../services/socket.service"
@Component({
	selector: 'ngx-search-page',
	templateUrl: './search-page.component.html',
	styleUrls: ['./search-page.component.scss']
})
export class SearchPageComponent implements OnInit,OnDestroy {

	constructor(public api: ApiService,public socket:SocketService) { }
	ngOnDestroy(){
		console.log('注销页面')
		this.socket.disconnectFun()
	}
	ngOnInit(): void {
		console.log(1)
		this.socket.login((data)=>{
			//连接成功
			// 模拟点击发送消息
			setTimeout(()=>{
				this.socket.send('我来了阿')
			},2000)
		})
		// 接受消息 监听
		this.socket.message((data:any)=>{
			console.log(data)
		})
		// 断开连接 监听
		this.socket.disconnect((data:any)=>{
			console.log(data)
		})
		this.socket.connect_error((data:any)=>{
			console.log(data)
		})
		this.socket.connect_timeout((data:any)=>{
			console.log(data)
		})
		this.socket.error((data:any)=>{
			console.log(data)
		})
	}
	tagList: any[] = [{
		name: '腾讯音乐人',
		holder: '腾讯音乐人搜索'
	}, {
		name: '网易私信',
		holder: '网易私信搜索'
	},{
		name: '厂牌用户',
		holder: '用户搜索'
	}, {
		name: '5SING用户',
		holder: '5SING搜索'
	},{
		name: '相似歌手',
		holder: '搜索歌手mid'
	}
	]
	selectItem = '腾讯音乐人';
	searchValue = '';
	loading = false;
	searchHolder = "腾讯音乐人搜索";
	
	sing5Page=1;
	sing5PageSize=30;
	sing5PageTotal=30;
	sing5List: any[]=[];
	
	brandUserPage=1;
	brandUserList: any[]=[];
	brandUserPageSize=30;
	brandUserPageTotal=30;
	
	wangyisixinPage=1;
	wangyisixinList: any[]=[];
	
	musicianTxPage = 1;
	musicianTxList: any[] = []

	artists:any=false

	search(value: string): void {
		console.log(value)
		this.searchValue = value;
		this.musicianTxPage = 1;
		this.loading = true;
		if (this.selectItem == '腾讯音乐人') {
			this.searchMusicianTx()
		}
		if(this.selectItem == '网易私信'){
			this.searchWangyisixin()
		}
		if(this.selectItem=='5SING用户'){
			this.searchFiveSing()
		}
		if(this.selectItem=='厂牌用户'){
			this.searchbrandUser()
		}
		if(this.selectItem == '相似歌手'){
			this.GetArtists()
		}
	}
	GetArtists(){
		this.api.getArtiest({singerMid:this.searchValue}).subscribe((res:any)=>{
			if(res.success){
				this.artists=res.result
			}
			this.loading=false
		})
	}
	searchbrandUser(){
		this.api.GetbrandUser({page:this.brandUserPage,pagesize:this.brandUserPageSize,keyword:this.searchValue}).subscribe((res:any)=>{
			this.brandUserList=res.company,
			this.brandUserPageTotal=res.count,
			this.loading=false
		})
	}
	searchFiveSing(){
	        this.api.GetfiveSing({page:this.sing5Page,pagesize:this.sing5PageSize,keyword:this.searchValue}).subscribe((res:any)=>{
	            for(let i=0;i<res.company.length;i++){
	                res.company[i].styles=res.company[i].styles.join(',')
	            }
	            this.sing5List=res.company,
	            this.sing5PageTotal=res.count,
	            this.loading=false
	        })
	    }
	onSelect(item: any): void {
		this.selectItem = item.name;
		this.searchHolder = item.holder;
		this.searchValue = '';
	}

	musicianTxPageNext(): void{
		if (this.musicianTxList.length == 0) {
			return
		}
		this.musicianTxPage += 1;
		this.loading = true;
		this.searchMusicianTx()
	}
	wangyisixinPageNext(): void{
		if (this.wangyisixinList.length == 0) {
			return
		}
		this.wangyisixinPage += 1;
		this.loading = true;
		this.searchWangyisixin()
	}
	nzPageIndexChangeBrandUser(e:any): void{
		this.brandUserPage=e
		this.searchbrandUser()
		this.loading=true
	}
	nzPageIndexChangeSing5(e:any): void{
		this.sing5Page=e
		this.searchFiveSing()
		this.loading=true
	}
	searchWangyisixin(): void{
		this.api.getWangyiyun_user({
			keyword: this.searchValue,
			page: this.wangyisixinPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			// res.data.results.forEach((item:any)=>{
			// 	item.topinfo = item.topinfo || {}
			// })
			if (res.success) {
				if (this.wangyisixinPage == 1) {
					this.wangyisixinList = res.result;
				} else {
					this.wangyisixinList = [...this.wangyisixinList, ...res.result];
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	searchMusicianTx(): void{
		this.api.getMusicianTx({
			keyword: this.searchValue,
			page: this.musicianTxPage
		}).subscribe((res: any) => {
			this.loading = false;
			console.log(res)
			// res.data.results.forEach((item:any)=>{
			// 	item.topinfo = item.topinfo || {}
			// })
			if (res.success) {
				if (this.musicianTxPage == 1) {
					this.musicianTxList = res.result;
				} else {
					this.musicianTxList = [...this.musicianTxList, ...res.result];
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
}
