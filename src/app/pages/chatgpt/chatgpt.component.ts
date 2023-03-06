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
	chatArr = [{id:2,text:'我TM无所不知'}]
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
	send(){
		console.log('发送')
		
		if(this.question.trim() == ''){
			this.message.info('不能发送空白信息')
			return
		}
		this.setChat(1,this.question)
		this.setChat(2,'思考中...')
		let question = this.question;
		this.question = ''
		this.loading = true;
		this.api.getChatgpt({
			question
		}).subscribe((res: any) => {
			console.log(res)
			// this.loading = false;
			if(res.success){
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
	setChat(id:number,text:string){
		// 1 自己 2 chatgpt
		this.chatArr.push({
			id,
			text
		})
		setTimeout(()=>{
			let chat = document.getElementById('chatScroll');
			chat.scrollTop = chat.scrollHeight - chat.clientHeight+1000;
		},10)
	}
	async setGptChat(text:string){
		this.chatArr[this.chatArr.length - 1].text = ''
		for(let i = 0;i<text.length;i++){
			await this.sleep(60)
			this.chatArr[this.chatArr.length - 1].text += text[i];
		}
		this.loading = false;
		// this.chatArr[this.chatArr.length - 1].text = text;
	}
	sleep(ms: number) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}
