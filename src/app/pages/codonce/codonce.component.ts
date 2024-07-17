import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import { HighlightLoader } from 'ngx-highlightjs';
@Component({
	selector: 'ngx-codonce',
	templateUrl: './codonce.component.html',
	styleUrls: ['./codonce.component.scss']
})
export class CodonceComponent implements OnInit {

	constructor(private hljsLoader: HighlightLoader,public api: ApiService,public common: CommonService,private message: NzMessageService) { }
	async ngOnInit() {
		//切换主题
		this.hljsLoader.setTheme('assets/styles/solarized-dark.css');
		let res = await this.ProgrammingLanguageAll()
		if(res){
			this.codingClipSelectAll()
		}
	}
	loading = false;
	searchValue = '';
	tagList = [];
	selectItem = '全部语言';
	page = 1;
	pageSize = 5;
	pageTotal = 0;
	codeList:any = [];
	codeLanguageList:any = [];
	codeLanguage = [];
	codeTitle = '';
	codeDescriptions = '';
	codeText = '';
	videoUploadList = []
	// 搜索查询
	keywordSearch(){
		this.page = 1;
		this.codingClipSelectAll()
	}
	// 类别查询
	onSelect(item:any){
		this.page = 1;
		this.selectItem = item.ProgrammingLanguage;
		this.codingClipSelectAll()
	}
	// 查询语言列表
	ProgrammingLanguageAll(){
		return new Promise((resolve)=>{
			this.loading = true;
			this.api.ProgrammingLanguageAll().subscribe((res: any) => {
				this.loading = false;
				if(res.success){
					this.tagList = [{ID:0,ProgrammingLanguage:"全部语言"},...res.data];
					this.codeLanguageList = res.data;
					resolve(true)
				}else{
					resolve(false)
				}
			}, (err: any) => {
				resolve(false)
				console.log(err)
				this.loading = false;
			})
		})
	}
	// 查询代码片段
	codingClipSelectAll(){
		this.loading = true;
		this.api.codingClipSelectAll({
			Type:this.selectItem,//语言类别 
			KeyWord:this.searchValue,//模糊查
			limit:this.pageSize,
			offset:this.page
		}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.codeList = res.data.result;
				this.pageTotal = res.data.pageTotal;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	// 运行
	playCodingClip(item:any){
		item.play = true;
	}
	// 停止
	stopCodingClip(item:any){
		item.play = false;
	}
	async save(){
		// console.log(this.videoUploadList)
		// console.log(this.codeLanguage)
		if(this.codeLanguage.length==0){
			this.message.info('请添加代码语言')
			return
		}
		if(!this.codeTitle){
			this.message.info('请添加代码标题')
			return
		}
		if(!this.codeDescriptions){
			this.message.info('请添加代码描述')
			return
		}
		if(!this.codeText){
			this.message.info('请添加代码片段')
			return
		}
		if(this.videoUploadList.length==0){
			this.message.info('请添加视频')
			return
		}
		let PlId = await this.ProgrammingLanguageIncrease(this.codeLanguage[0]);
		this.StoreCvIncrease({
			video:this.videoUploadList[0],
			ProgrammingLanguage:this.codeLanguage[0],
			Title:this.codeTitle,
			PlId,
			CodingClip:this.codeText,
			Descriptions:this.codeDescriptions,
		})
	}
	// 添加语言
	ProgrammingLanguageIncrease(ProgrammingLanguage:string){
		return new Promise((resolve)=>{
			if(this.codeLanguageList.findIndex((e:any)=>e.ProgrammingLanguage==ProgrammingLanguage)==-1){
				this.api.ProgrammingLanguageIncrease({ProgrammingLanguage}).subscribe(async (res: any) => {
					if(res.success){
						await this.ProgrammingLanguageAll();
						resolve(res.data)
					}else{
						resolve(false)
					}
				}, (err: any) => {
					console.log(err)
					resolve(false)
				})
			}else{
				resolve(false)
			}
		})
	}
	//添加代码
	StoreCvIncrease(params:any){
		let {
			video,ProgrammingLanguage,Title,PlId,CodingClip,Descriptions
		} = params;
		try{
			if(!PlId){
				PlId = this.codeLanguageList.find((e:any)=>e.ProgrammingLanguage==ProgrammingLanguage).ID;
			}
		}catch(e){
			this.message.info('请重新保存')
		}
		this.loading = true;
		this.api.StoreCvIncrease({
			video,ProgrammingLanguage,Title,PlId,CodingClip,Descriptions
		}).subscribe(async (res: any) => {
			this.loading = false;
			if(res.success){
				this.message.success('添加成功');
				this.videoUploadList = [];
				this.codeLanguage = [];
				this.codeTitle = '';
				this.codeText = '';
				this.codeDescriptions = '';
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	beforeUpload = (file:any): boolean => {
		this.videoUploadList = [file]
	    return false;
	  };
	PageNext(e:any){
		this.page = e;
		this.codingClipSelectAll()
	}
}
