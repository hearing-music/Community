import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../services/api.service";
import { CommonService } from "../../services/common.service";
import TIM from 'tim-js-sdk';
import TIMUploadPlugin from 'tim-upload-plugin';
import { parseText, parseImage } from '../../../assets/base/message-facade';
import { NzMessageService } from 'ng-zorro-antd/message';
import { emojiName, emojiUrl, emojiMap } from '../../../assets/base/emojiMap';
@Component({
	selector: 'ngx-xilixili',
	templateUrl: './xilixili.component.html',
	styleUrls: ['./xilixili.component.scss']
})
export class XilixiliComponent implements OnInit {

	constructor(public api: ApiService, public common: CommonService, public message: NzMessageService) { }

	text = ''
	searchText = ''
	searchTextNow = ''
	err = true;
	loading = false;
	npc: any = {};
	chatUserId = null;
	sig = '';
	sdkid = null;
	// timsdk
	tim = null;
	// sdkready
	isSDKReady = false;
	// 会话列表
	conversationList = [];
	// 当前会话index
	selectIndex = null;
	// 当前会话item
	selectItem: any = { info: {} };
	// 消息列表
	messageList = []
	// 加载更多依据id
	nextReqMessageID = '';
	// 当前会话消息是否已经请求完毕 是否加载更多
	isCompleted = false
	// 音频对象
	audio: any = {};
	// 视频
	videoPlay = false;
	videoMessage: any = { payload: {} }
	//emoji list
	emojiList = []
	// 侧边栏active
	siderBarActive = 'comment'
	// 表情隐藏显示
	visible = false;
	// 联系人列表
	userList: any = []
	// 选中联系人
	selectUserItem: any = {}
	// 联系人err
	userListErr = true;
	userLoading = false;
	// 全部未读数量
	get unreadCountAll() {
		let all = 0;
		this.conversationList.forEach((item: any) => {
			all += item.unreadCount
		})
		return all
	}

	get userListNow() {
		if (this.searchTextNow.trim() == '') return this.userList
		let arr = []
		this.userList.forEach((item: any) => {
			if (item.name.indexOf(this.searchTextNow) != -1) {
				arr.push(item)
			}
		})
		return arr
	}
	get conversationListNow() {
		if (this.searchTextNow.trim() == '') return this.conversationList
		let arr = []
		this.conversationList.forEach((item: any) => {
			if (item.info.name.indexOf(this.searchTextNow) != -1) {
				arr.push(item)
			}
		})
		return arr
	}

	ngOnInit(): void {
		this.getNpc()
		this.getEmoji()
		this.getOpenidList()
	}
	ngOnDestroy() {
		this.tim.off(TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer);
		this.tim.off(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived);
		this.tim.off(TIM.EVENT.SDK_READY, this.onConversationListUpdated);
		// 销毁 SDK 实例。SDK 会先 logout，然后断开 WebSocket 长连接，并释放资源
		this.tim.destroy();
	}
	// 点击联系人发消息按钮
	clickSendMessage() {
		this.messageList = [];
		this.nextReqMessageID = '';
		this.isCompleted = false;
		let index = this.conversationList.findIndex((e: any) => e.info.openid == this.selectUserItem.openid)
		if (index != -1) {
			// 会话列表中有该联系人
			this.gotoConversationItem(index)
		} else {
			// 会话列表中没有该联系人
			this.createCoversation('C2C' + this.selectUserItem.openid, this.selectUserItem)
		}
		this.inputFoucs()
	}
	// 联系人 点击发消息=>去会话
	gotoConversationItem(index: number) {
		this.selectIndex = index;
		this.selectItem = this.conversationList[index];
		this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived);
		this.tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer);
		this.getMessageList(this.selectItem)
		this.setMessageRead(this.selectItem.conversationID)
		this.siderBarActive = 'comment'
	}
	// 创建会话
	createCoversation(conversationID: string, info: any) {
		this.tim.getConversationProfile(conversationID).then((res: any) => {
			let { conversation } = res.data;
			let conversation2 = { info, ...conversation };
			this.conversationList.unshift(conversation2)
			this.selectIndex = 0;
			this.selectItem = this.conversationList[0]
			this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived);
			this.tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer);
			this.getMessageList(this.selectItem)
			this.setMessageRead(this.selectItem.conversationID)
			this.siderBarActive = 'comment'
		});
	}
	// 获取联系人列表
	getOpenidList() {
		this.userLoading = true;
		this.api.getOpenidList().subscribe((res: any) => {
			console.log(res)
			this.userLoading = false;
			if (res.success) {
				this.userList = res.result;
				this.userListErr = false;
			} else {
				this.userListErr = true;
			}
		}, (err: any) => {
			console.log(err)
			this.userLoading = false;
			this.userListErr = true;
		})
	}
	userItemClick(item: any, i: number) {
		this.selectUserItem = item;
	}
	// 左侧边栏 点击事件
	commentClick() {
		if (this.siderBarActive == 'comment') return
		this.siderBarActive = 'comment'
		this.searchTextNow = ''
		this.searchText = ''
		this.nextReqMessageID = '';
		this.messageList = []
		this.isCompleted = false;
		if (this.selectItem.conversationID) {
			this.getMessageList(this.selectItem)
			this.setMessageRead(this.selectItem.conversationID)
			this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived);
			this.tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer);
		}
		this.inputFoucs()
	}
	userClick() {
		if (this.siderBarActive == 'user') return
		this.siderBarActive = 'user'
		this.searchTextNow = ''
		this.searchText = ''
		if (this.selectItem.conversationID) {
			this.tim.off(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived);
			this.tim.off(TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer);
		}
	}
	// emoji初始化
	getEmoji() {
		let list = []
		for (let i = 0; i < emojiName.length; i++) {
			list.push({
				emojiName: emojiName[i],
				url: emojiUrl + emojiMap[emojiName[i]]
			});
		}
		this.emojiList = list
	}
	// 输入框 获取焦点
	inputFoucs() {
		setTimeout(() => {
			let inputtext = document.getElementById('inputtext');
			if (inputtext) {
				inputtext.focus();
			}
		}, 50)
	}
	// 点击emoji
	handleEnterEmoji(event: any) {
		this.text = this.text + event.target.name
		this.visible = false;
		this.inputFoucs()
	}
	// text格式化
	parsetext(item: any) {
		return parseText(item)
	}
	// 图片格式化
	parseimage(item: any) {
		return parseImage(item)
	}
	// 播放语音
	handlePlayAudioMessage(item: any) {
		// 路径不同直接播放
		if (this.audio.src != item.payload.url) {
			this.audio = new Audio(item.payload.url)
			this.audio.play()
		} else {
			// 路径相同 暂停or播放
			if (this.audio.paused) {
				this.audio.play()
			} else {
				this.audio.pause()
			}
		}
	}
	// 播放视频
	playerHander(item: any) {
		this.videoPlay = true;
		this.videoMessage = item;
	}
	stopVideoHander() {
		this.videoPlay = false;
	}
	// 选择图片
	chooseImage() {
		let image: any = document.getElementById('imageFile')
		image.click()
		image.onchange = () => {
			this.sendImageMessage(image)
		}
	}
	//选择视频
	chooseVideo() {
		let video: any = document.getElementById('videoFile')
		video.click()
		video.onchange = () => {
			this.sendVideoMessage(video)
		}
	}
	// 创建文本消息
	sendTextMessage() {
		if (this.text.trim() == '') {
			this.message.info('不能发送空消息')
			return
		}
		const to = this.selectItem.openid;
		const text = this.text;
		const message = this.tim.createTextMessage({
			to,
			conversationType: this.selectItem.type,
			payload: {
				text
			}
		});
		this.text = ''
		this.$sendTIMMessage(message);
	}
	// 创建图片消息
	sendImageMessage(res: any) {
		const to = this.selectItem.openid;
		const message = this.tim.createImageMessage({
			to,
			conversationType: this.selectItem.type,
			payload: {
				file: res
			},
			onProgress: (percent: any) => {
				message.percent = percent;
			}
		});
		this.$sendTIMMessage(message);
	}
	// 创建视频消息
	sendVideoMessage(res: any) {
		const to = this.selectItem.openid;
		const message = this.tim.createVideoMessage({
			to,
			conversationType: this.selectItem.type,
			payload: {
				file: res
			},
			onProgress: (percent: any) => {
				message.percent = percent;
			}
		});
		this.$sendTIMMessage(message);
	}
	// 发送消息
	$sendTIMMessage(message: any) {
		let obj = message
		if (message.type == 'TIMTextElem') {
			obj.renderDom = this.parsetext(message)
		}
		if (message.type == 'TIMImageElem') {
			obj.renderDom = this.parseimage(message)
		}
		this.messageList = [...this.messageList, obj];
		this.scrollToButtom();
		this.tim.sendMessage(message).then((res: any) => {
			// if(this.firstSendMessage) {

			// }
			// this.firstSendMessage = false
		}).catch((error: any) => {

		})
	}

	// 点击会话 人
	coversationClick(item: any, i: number) {
		if (item.conversationID == this.selectItem.conversationID) return
		this.messageList = [];
		this.nextReqMessageID = '';
		this.isCompleted = false;
		this.selectIndex = i;
		this.selectItem = item;
		this.inputFoucs()
		if (!this.selectItem.conversationID) {
			// 开启监听消息
			this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived);
			this.tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer);
			this.getMessageList(this.selectItem)
		} else {
			this.tim.off(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived);
			this.tim.on(TIM.EVENT.MESSAGE_RECEIVED, this.onMessageReceived);
			this.tim.off(TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer);
			this.tim.on(TIM.EVENT.MESSAGE_READ_BY_PEER, this.onMessageReadByPeer);
			this.getMessageList(this.selectItem)
		}
		this.setMessageRead(this.selectItem.conversationID)
	}
	// 消息已读更新
	onMessageReadByPeer = () => {
		// console.log('已读')
		// this.messageList = this.messageList;
	}
	// 历史消息渲染//
	getMessageList(conversation: any) {
		if (!this.isCompleted) {
			this.tim
				.getMessageList({
					conversationID: conversation.conversationID,
					nextReqMessageID: this.nextReqMessageID,
					count: 15
				})
				.then((res: any) => {
					const { messageList } = res.data; // 消息列表。
					messageList.forEach((item: any) => {
						if (item.type == 'TIMTextElem') {
							item.renderDom = this.parsetext(item)
						}
						if (item.type == 'TIMImageElem') {
							item.renderDom = this.parseimage(item)
						}
					})
					this.nextReqMessageID = res.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
					this.isCompleted = res.data.isCompleted; // 表示是否已经拉完所有消息。
					this.messageList = [...messageList, ...this.messageList];
					this.scrollToButtom()
					// this.$handleMessageRender(this.messageList);
				});
		}
	}
	// 历史消息渲染
	$handleMessageRender(messageList: any) {
		if (messageList.length > 0) {
			this.messageList = messageList
			this.scrollToButtom()
		}
	}
	//接收消息 监听
	onMessageReceived = (value: any) => {
		// 若需修改消息，需将内存的消息复制一份，不能直接更改消息，防止修复内存消息，导致其他消息监听处发生消息错误
		const event = value;
		const list = [];
		event.data.forEach((item: any) => {
			if (item.conversationID === this.selectItem.conversationID) {
				console.log(item)
				if (item.type == 'TIMTextElem') {
					item.renderDom = this.parsetext(item)
				}
				if (item.type == 'TIMImageElem') {
					item.renderDom = this.parseimage(item)
				}
				list.push(Object.assign(item));
			}
		});
		if (list.length > 0) {
			// 发送该人的消息已读
			this.setMessageRead(this.selectItem.conversationID)
		}
		this.messageList = this.messageList.concat(list);
		this.scrollToButtom();
	}
	// 加载之前的记录
	refresh() {
		if (this.isCompleted) {
			return;
		}
		this.getMessageList(this.selectItem);
	}
	// 移动到最底部
	scrollToButtom() {
		setTimeout(() => {
			let chat = document.getElementById('chatScroll');
			chat.scrollTop = chat.scrollHeight
		}, 50)
	}
	// 发送该人的消息已读
	setMessageRead(id: string) {
		this.tim.setMessageRead({
			conversationID: id
		}).then(() => { });
	}
	// 获取npc有没有权限聊天 以及相关信息
	getNpc() {
		this.loading = true;
		this.api.getNpc().subscribe((res: any) => {
			console.log(res)
			this.loading = false;
			if (res.success) {
				this.err = false;
				this.sig = res.sig;
				this.sdkid = res.TUIAPPID;
				this.npc = res.npc;
				this.chatUserId = res.chatUserId;
				this.timCreate(this.sdkid, this.sig, this.chatUserId)
			} else {
				this.err = true;
			}
		}, (err: any) => {
			console.log(err)
			this.loading = false;
			this.err = true;
		})
	}
	// 创建聊天 
	timCreate(SDKAppID: number, sig: string, chatUserId: string) {
		this.tim = TIM.create({
			SDKAppID: SDKAppID
		});
		//tim.setLogLevel(0); // Common level. You are advised to use this level during connection as it covers more logs.
		// tim.setLogLevel(1); // Release level, at which the SDK outputs important information. You are advised to use this log level in a production environment.
		this.tim.setLogLevel(3);
		this.tim.registerPlugin({ 'tim-upload-plugin': TIMUploadPlugin });
		this.tim.on(TIM.EVENT.SDK_READY, this.onSdkReady);
		this.tim.on(TIM.EVENT.SDK_NOT_READY, this.onSdkNotReady);

		let promise = this.tim.login({ userID: chatUserId, userSig: sig });
		promise.then(function(imResponse: any) {
			console.log(imResponse.data); // Login successful
			if (imResponse.data.repeatLogin === true) {
				console.log(imResponse.data.errorInfo);
			}
		}).catch(function(imError: any) {
			console.warn('login error:', imError); // Error information
		});
	}
	// sdk ready 在用户登录后触发
	onSdkReady = () => {
		this.isSDKReady = true;
		// 登入后拉去会话列表
		this.getConversationList();
		this.tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, this.onConversationListUpdated);
	}
	// sdk notready 
	onSdkNotReady = () => {
		this.isSDKReady = false;
		this.loading = false;
	}
	// 获取会话列表
	getConversationList() {
		this.tim.getConversationList().then((imResponse: any) => {
			console.log(imResponse)
			if (imResponse.data.conversationList.length > 0) {
				this.getOpenidInfo(imResponse.data.conversationList)
			}
		});
	}
	// 监听会话变化
	onConversationListUpdated = (event: any) => {
		this.getOpenidInfo(event.data)
	}
	// 获取用户信息
	getOpenidInfo(list: any) {
		let idArr = [];
		let isAgain = 0;
		for (let i = 0; i < list.length; i++) {
			list[i].openid = list[i].conversationID.replace('C2C', '')
			idArr.push(list[i].openid)

			let cIndex = this.conversationList.findIndex(e => e.conversationID == list[i].conversationID);
			if (cIndex != -1) {
				isAgain += 1
				list[i].info = this.conversationList[cIndex].info;
			}
		}
		if (list.length == isAgain) {
			this.conversationList = list;
			return
		}
		this.api.getOpenidInfo({ idArr })
			.subscribe((res: any) => {
				this.loading = false;
				if (res.success) {
					list.forEach((item: any) => {
						let c = res.result.find((e: any) => e.openid == item.openid) || false
						if (c) {
							item.info = c
						}
					})
					this.conversationList = list;
					console.log(this.conversationList)
				}
			}, (err: any) => {
				this.loading = false;
				console.log(err)
			})
	}
	search1() {
		this.searchTextNow = this.searchText;
		this.selectIndex = null;
		this.selectItem = { info: {} }
		this.messageList = []
		this.nextReqMessageID = '';
		this.isCompleted = false;
	}
	focus2() {
		document.onkeydown = (event_e: any) => {
			if (event_e.keyCode === 13 && event_e.shiftKey) {

			}
			if (event_e.keyCode === 13 && !event_e.shiftKey) {
				// todo send
				this.search1()
			}
		}
	}
	blur2() {
		document.onkeydown = null
	}
	focus() {
		document.onkeydown = (event_e: any) => {
			if (event_e.keyCode === 13 && event_e.shiftKey) {

			}
			if (event_e.keyCode === 13 && !event_e.shiftKey) {
				// todo send
				this.sendTextMessage()
			}
		}
	}
	blur() {
		document.onkeydown = null
	}
}
