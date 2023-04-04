import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import {CommonService} from "../../services/common.service";
import { NzMessageService } from 'ng-zorro-antd/message';
import { resolve } from 'dns';
@Component({
	selector: 'ngx-chatgpt',
	templateUrl: './chatgpt.component.html',
	styleUrls: ['./chatgpt.component.scss']
})
export class ChatgptComponent implements OnInit {

	constructor(public api: ApiService,public common: CommonService,private message: NzMessageService) { }
	ngOnInit(): void {
	}
	btndisabled = false;
	question='';
	loading = false;
	chatArr:any = [{id:2,text:'我无所不知',img:''}]
	lastQuestionArr:any = []
	focus(){
		document.onkeydown = (event_e:any)=>{
			if(event_e.keyCode === 13 &&event_e.shiftKey){
				
			}
			if(event_e.keyCode === 13&&!event_e.shiftKey){
				if(this.loading) return
				this.send()
				event_e.preventDefault();
			}
		}
	}
	blur(){
		document.onkeydown = null
	}
	getChatgptPlot(imgQuestion:string){
		this.api.getChatgptPlot({
			question:imgQuestion,
		}).subscribe((res: any) => {
			console.log(res)
			// this.loading = false;
			if(res.success){
				this.setGptPlot(res.result)
			}else{
				this.setGptChat(res.message)
			}
		}, (err: any) => {
			console.log(err)
			this.setGptChat('我故障了...')
			this.loading = false;
		})
	}
	getChatgpt(question:string){
		this.api.getChatgpt({
			question,
			lastQuestionArr:this.lastQuestionArr
		}).subscribe((res: any) => {
			console.log(res)
			// this.loading = false;
			if(res.success){
				this.lastQuestionArr.push(question)
				this.setGptChat(res.result)
			}else{
				this.setGptChat(res.message)
			}
		}, (err: any) => {
			console.log(err)
			this.setGptChat('我故障了...')
			this.loading = false;
		})
	}
	send(){
		console.log('发送')
		
		if(this.question.trim() == ''){
			this.message.info('不能发送空白信息')
			return
		}
		this.setChat(1,this.question)
		let question:any = this.question;
		let imgQuestion = ''
		let imgIndex = question.indexOf('图片=')
		if(imgIndex != -1){
			imgQuestion = question.substr(imgIndex+3)
		}
		this.question = ''
		this.loading = true;
		if(imgQuestion){
			this.setChat(2,'绘图中...')
			this.getChatgptPlot(imgQuestion)
		}else{
			this.setChat(2,'思考中...')
			this.getChatgpt(question)
		}
		
	}
	setChat(id:number,text:string){
		// 1 自己 2 chatgpt
		this.chatArr.push({
			id,
			text
		})
		setTimeout(()=>{
			this.scrollT()
		},10)
	}
	scrollT(){
		let chat = document.getElementById('chatScroll');
		chat.scrollTop = chat.scrollHeight - chat.clientHeight+1000;
	}
	async setGptChat(text:string){
		this.chatArr[this.chatArr.length - 1].text = ''
		for(let i = 0;i<text.length;i++){
			await this.sleep(45)
			this.chatArr[this.chatArr.length - 1].text += text[i];
			this.scrollT()
		}
		this.loading = false;
		// this.chatArr[this.chatArr.length - 1].text = text;
	}
	setGptPlot(img:string){
		this.chatArr[this.chatArr.length - 1].text = ''
		let start = img.indexOf('src=') + 4;
		let end = img.indexOf(' style',start)
		img = img.slice(start,end)
		this.chatArr[this.chatArr.length - 1].img = img
		this.loading = false;
		this.scrollT()
	}
	sleep(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
