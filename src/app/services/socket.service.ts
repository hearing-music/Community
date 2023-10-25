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
	constructor(private http: HttpClient,private message: NzMessageService,) {
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
	// 流相关
	peerConnection:any = new RTCPeerConnection();
	peerConnection2:any = new RTCPeerConnection();
	// 发送 视频
	// 获取权限后 addTrack createOffer 发送offer emit 我要发视频连接了
	addTrack(track:any,localStream:any){
		this.peerConnection.addTrack(track,localStream);
	}
	createOffer(){
		this.peerConnection.createOffer().then((offer:any) => {
		    return this.peerConnection.setLocalDescription(offer);
		}).then(() => {
			this.socketIO.emit('offer', this.peerConnection.localDescription);
		}).catch((error:any) => {
		    console.log(error);
		});
	}
	// 监听 peerConnection 发送emit 流信息 
	onicecandidate(){
		this.peerConnection.onicecandidate = (event:any) => {
		    console.log(event.candidate)
		    if (event.candidate) {
		        this.socketIO.emit('candidate', event.candidate); 
		    }
		};
	}
	//监听 别人准备好接收了
	answer(){
		this.socketIO.on('answer', (answer:any) => {
		    console.log(answer)
		    this.peerConnection.setRemoteDescription(answer).catch((error:any) => {
		        console.log(error);
		    });
		});
	}
	// 接收 视频
	// 监听offer
	offer(fun:any){
		this.socketIO.on('offer', (offer:any) => {
		    console.log(offer);
			this.setRemoteDescription(offer)
			fun(offer)
		});
	}
	setRemoteDescription(offer:any){
		this.peerConnection2.setRemoteDescription(offer)
		.then(() => this.peerConnection2.createAnswer())
		.then((answer:any) => this.peerConnection2.setLocalDescription(answer))
		.then(() => {
		    this.socketIO.emit('answer', this.peerConnection2.localDescription);
		})
		.catch((error:any) => {
		    console.log(error);
		});
	}
	// 监听传过来的流
	candidate(){
		this.socketIO.on('candidate', (candidate:any) => {
		    console.log(candidate)
		    this.peerConnection2.addIceCandidate(candidate).then((res:any)=>{
		    // console.log(res)
		    }).catch((error:any) => {
		        console.log(error);
		    });
		});
	}
	// 返回流
	onaddstream(fun:any){
		this.peerConnection2.onaddstream = (event:any) => {
			fun(event.stream)
			console.log(event)
		}
	}
	// 关闭直播
	closeLive(){
		this.socketIO.emit('closeLive')
	}
	// 监听直播是否关闭
	onCloseLive(fun:any){
		this.socketIO.on('closeLive', (data:any) => {
		    fun(data)
		});
	}
	
	
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
	messages(fun:any){
		this.socketIO.on('messageToClients', function (data:any) {
			fun(data)
		});
	}
	disconnect(fun:any){
		this.socketIO.on('disconnect',() =>{
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
			this.message.error('缺少token，请刷新重试')
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
