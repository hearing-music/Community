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
	peerList:any={}
	pBoos:any=null;
	localStream:any=null;
	// 发送 视频
	
	
	//监听 别人准备好接收了
	answer(){
		this.socketIO.on('answer', (data:any) => {
		    let {answer,id}=data;
		    console.log('接收answer',data)
		    this.peerList[id].setRemoteDescription(new RTCSessionDescription(answer)).catch((error:any) => {
		        console.log(error);
		    });
		});
	}
	// 接收 视频
	// 监听offer
	offer(){
		this.socketIO.on('offer', (body:any) => {
			let {offer,id}=body;
			this.setRemoteDescription(offer,id)
		});
	}
	setRemoteDescription(offer:any,id:any){
		this.peerConnection.setRemoteDescription(offer)
		.then(() => this.peerConnection.createAnswer())
		.then((answer:any) => this.peerConnection.setLocalDescription(answer))
		.then(() => {
		    this.socketIO.emit('answer', {answer:this.peerConnection.localDescription,liveId:id});
		})
		.catch((error:any) => {
		    console.log(error);
		});
	}
	otherjoinedLive(){
		this.socketIO.emit('otherjoinedLive')
	}
	// 监听传过来的流
	candidate(){
		this.socketIO.on('candidate', (body:any) => {
			let {candidate,id}=body
		    console.log(candidate)
		    this.peerConnection.addIceCandidate(candidate).then((res:any)=>{
		    // console.log(res)
		    }).catch((error:any) => {
		        console.log(error);
		    });
		});
	}
	// 返回流
	ontrack(fun:any){
		this.peerConnection.ontrack = (event:any) => {
			fun(event.streams[0])
		}
	}
	// onaddstream(fun:any){
	// 	 this.peerConnection.onaddstream = (event) => {
	// 		fun(event.stream)
	// 	}
	// }
	 
	// 关闭直播
	closeLive(){
		this.socketIO.emit('closeLive')
	}
	// 监听直播是否关闭
	onCloseLive(fun:any){
		this.socketIO.on('closeLive', (data:any) => {
			// this.peerConnection = new RTCPeerConnection();
			// @ts-ignore
			for(var id in this.peerList){
				if(id){
					// @ts-ignore
					this.peerList[id].close();
					// @ts-ignore
					this.peerList[id] = null;
				}
			}
			this.peerList={}
			this.pBoos=null;
			this.localStream=null;
		    fun(data)
		});
	}
	// 有人离开直播监听
	onOtherleavedLive(fun:any){
		this.socketIO.on("otherleavedLive",(socketId:any)=>{
			if(this.peerList[socketId]){
				this.peerList[socketId].close();
				this.peerList[socketId] = null;
			}
			fun(socketId)
		})
	}
	otherleavedLive(){
		this.socketIO.emit("otherleavedLive")
		// this.peerConnection = new RTCPeerConnection();
	}
	// 有人加入直播监听
	onOtherjoinedLive(){
		this.socketIO.on("otherjoinedLive",(socketId:any)=>{
			this.onicecandidate(socketId)
			//媒体协商 先添加流
			this.localStream.getTracks().forEach((track:any) => { 
				//将本地采集的音视频流添加到pBoos中 调用者中
				this.addTrack(track)
			});
			//媒体协商
			// let offerOptions = {offerToRecieveAudio: 1,offerToRecieveVideo: 1}
			this.createOffer(socketId)
			
		})
	}
	// 获取权限后 addTrack createOffer 发送offer emit 我要发视频连接了
	addTrack(track:any){
		this.pBoos.addTrack(track, this.localStream);
	}
	createOffer(socketId:any){
		this.pBoos.createOffer().then((offer:any)=>{
			return this.pBoos.setLocalDescription(offer);
		}).then(()=>{
			this.socketIO.emit('offer', {offer:this.pBoos.localDescription,id:socketId});
		}).catch();
		this.peerList[socketId] = this.pBoos;
	}
	// 监听 peerConnection 发送emit 流信息
	onicecandidate(socketId:any){
		this.pBoos = new RTCPeerConnection();
		this.pBoos.onicecandidate = (e:any) => {
			console.log("candidate---------", e);
			if (e.candidate) { 
				this.socketIO.emit('candidate', {candidate:e.candidate,id:socketId}); 
				//当发现candidate后 发送出去（潜在的连接端点称为 ICE 候选者。）
			}
		}
	}
	// 开启直播发送emit
	openLive(localStream:any){
		this.localStream = localStream;
		this.socketIO.emit('openLive');
	}
	onOpenLive(fun:any){
		this.socketIO.on('openLive',(data:any)=>{
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
