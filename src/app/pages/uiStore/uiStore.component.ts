import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
import { ToastrService } from 'ngx-toastr';
import { HighlightLoader } from 'ngx-highlightjs';
@Component({
	selector: 'ngx-uiStore',
	templateUrl: './uiStore.component.html',
	styleUrls: ['./uiStore.component.scss']
})
export class UiStoreComponent implements OnInit {

	constructor(public api: ApiService,public common: CommonService,private toast: ToastrService,) { }
	async ngOnInit() {
		this.UiStoreCvSelectDate()
	}
	loading = false;
	searchValue = '';
	tagList = [];
	selectItem = '全部语言';
	page = 1;
	pageSize = 5;
	pageTotal = 0;
	UIList:any = [];
	codeLanguageList:any = [];
	codeLanguage = [];
	Title = '';
	Descriptions = '';
	codeText = '';
	videoUploadList = []
	figUploadList = []
	// 查询UI 原始
	UiStoreCvSelectDate(){
		this.loading = true;
		this.api.UiStoreCvSelectDate({
			Title:'',//模糊查
			limit:this.pageSize,
			offset:this.page
		}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.UIList = res.data.result;
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
		if(!this.Title){
			this.toast.info('请添加UI标题')
			return
		}
		if(!this.Descriptions){
			this.toast.info('请添加UI描述')
			return
		}
		if(this.figUploadList.length==0){
			this.toast.info('请添加fig')
			return
		}
		if(this.videoUploadList.length==0){
			this.toast.info('请添加视频')
			return
		}
		let userId = localStorage.getItem('userId')
		this.UiStoreCvIncrease({
			Video:this.videoUploadList[0],
			FigmaExt:this.figUploadList[0],
			Title:this.Title,
			Branch:0,
			Synopsis:this.Descriptions,
			UserId:userId
		})
	}
	//添加代码
	UiStoreCvIncrease(params:any){
		let {
			Video,
			FigmaExt,
			Title,
			Branch,
			Synopsis,
			UserId
		} = params;
		this.loading = true;
		this.api.UiStoreCvIncrease({
			Video,
			FigmaExt,
			Title,
			Branch,
			Synopsis,
			UserId
		}).subscribe(async (res: any) => {
			this.loading = false;
			if(res.success){
				this.toast.success('添加成功');
				this.videoUploadList = [];
				this.figUploadList = [];
				this.Title = '';
				this.Descriptions = '';
				this.page = 1;
				this.UiStoreCvSelectDate()
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	beforeUploadV = (file:any): boolean => {
		this.videoUploadList = [file]
	    return false;
	  };
	beforeUploadF = (file:any): boolean => {
		this.figUploadList = [file]
	    return false;
	  };
	PageNext(e:any){
		this.page = e;
		this.UiStoreCvSelectDate()
	}
	downloadFig(url:string){
		window.open(url)
	}
	childShow = false;
	childNow:any = {};
	openChild(item:any){
		this.childNow = item;
		this.childNow.page = 1;
		this.childNow.pageSize = 5;
		this.childNow.pageTotal = 0;
		this.UiStoreCvSelectDateChild()
	}
	saveChild(){
		if(this.figUploadList.length==0){
			this.toast.info('请添加fig')
			return
		}
		if(this.videoUploadList.length==0){
			this.toast.info('请添加视频')
			return
		}
		let userId = localStorage.getItem('userId')
		this.UiStoreCvIncreaseChild({
			Video:this.videoUploadList[0],
			FigmaExt:this.figUploadList[0],
			Title:this.childNow.title,
			Branch:1,
			Synopsis:this.childNow.synopsis,
			UserId:userId
		})
	}
	UiStoreCvIncreaseChild(params:any){
		let {
			Video,
			FigmaExt,
			Title,
			Branch,
			Synopsis,
			UserId
		} = params;
		this.loading = true;
		this.api.UiStoreCvIncrease({
			Video,
			FigmaExt,
			Title,
			Branch,
			Synopsis,
			UserId
		}).subscribe(async (res: any) => {
			this.loading = false;
			if(res.success){
				this.toast.success('添加成功');
				this.videoUploadList = [];
				this.figUploadList = [];
				this.childNow.page = 1;
				this.UiStoreCvSelectDateChild()
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	PageNextChild(e:any){
		this.childNow.page = e;
		this.UiStoreCvSelectDateChild()
	}
	UiStoreCvSelectDateChild(){
		this.loading = true;
		this.api.UiStoreCvSelectDate({
			Title:this.childNow.title,
			limit:this.childNow.pageSize,
			offset:this.childNow.page
		}).subscribe((res: any) => {
			this.loading = false;
			if(res.success){
				this.childNow.UIList = res.data.result;
				this.childNow.pageTotal = res.data.pageTotal;
				if(this.childNow.UIList.length==0){
					this.toast.info('该UI没有子集')
				}else{
					this.childShow=true;
				}
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
		})
	}
	back(){
		this.childNow = {}
		this.childShow = false;
	}
}
