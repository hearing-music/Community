import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NzMessageService  } from 'ng-zorro-antd/message';
// @ts-ignore
import { io } from "./js/socket.io.js";

@Injectable({
	providedIn: 'root'
})

export class SocketService {
	constructor(private http: HttpClient,private msg: NzMessageService,) {
		
	}
	socketUrl = environment.socketUrl;
	token=localStorage.getItem('token') || ''
	clientId=7729;
	errorCount=0;
	isConnected=false;
	maxError=5;
	newMessage='newMessage'
	socketIO:any=io(this.socketUrl, {
		auth: {
		    token: this.token
		},
		  // query: {
		  //   "my-key2222222222": "my-value2222222222222222222222"
		  // }
	});
	disconnectFun(){
		this.off()
		this.socketIO.disconnect()
	}
	off(){
		this.socketIO.off();
	}
	send(text:any){
		this.socketIO.emit(this.newMessage,text)
	}
	message(fun:any){
		this.socketIO.on('messageToClients', function (data:any) {
			fun(data)
		});
	}
	disconnect(fun:any){
		this.socketIO.on('disconnect', function () {
		    this.isConnected =false;
			this.errorCount = 0;
			this.message.error('连接断开，请刷新重试')
			fun('连接断开')
		});
	}
	connect_error(fun:any){
		this.socketIO.on('connect_error', function(data:any){
		    this.errorCount++;
		    if(this.errorCount>=this.maxError){
				this.off()
		        this.socketIO.disconnect();
		    }
			fun(data)
		});
	}
	connect_timeout(fun:any){
		this.socketIO.on('connect_timeout', function(data:any){
		    this.errorCount++;
		    if(this.errorCount>=this.maxError){
				this.off()
		        this.socketIO.disconnect();
		    }
			fun(data)
		});
	}
	error(fun:any){
		this.socketIO.on('error', function(data:any){
		    this.errorCount++;
		    if(this.errorCount>=this.maxError){
				this.off()
		        this.socketIO.disconnect();
		    }
			fun(data)
		});
	}
	login(fun:any){
		if(!this.token){
			this.msg.error('缺少token，请刷新重试')
			fun(false)
			return
		}
		this.socketIO = this.socketIO.connect();
		this.socketIO.on('connect', function () {
		    this.isConnected =true;
		    console.log("连接成功");
		    this.errorCount=0;
			fun('连接成功')
		});
	}
	
}
