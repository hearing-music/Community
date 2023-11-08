import { Component, OnInit, OnDestroy } from "@angular/core";
import { SocketService } from "../../../services/socket.service";
import { ApiService } from "../../../services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
@Component({
  selector: "ngx-song-room",
  templateUrl: "./song-room.component.html",
  styleUrls: ["./song-room.component.scss"],
})
export class SongRoomComponent implements OnInit, OnDestroy {
  constructor(
    public api: ApiService,
    public socket: SocketService,
    public message: NzMessageService
  ) {}
  ngOnDestroy() {
    console.log("注销页面");
    this.socket.disconnectFun();
  }
  ngOnInit(): void {
    this.socket.login((data: any) => {
      this.loadingFinished = true;
      //连接成功
      // 模拟点击发送消息
      // setTimeout(()=>{
      // 	this.socket.send('我来了阿')
      // },2000)
    });
    // 接受消息 监听
    this.socket.messages((data: any) => {
      console.log(data);
      this.messageFun(data);
    });
    // 断开连接 监听
    this.socket.disconnect((data: any) => {
      console.log(data);
    });
    this.socket.connect_error((data: any) => {
      console.log(data);
    });
    this.socket.connect_timeout((data: any) => {
      console.log(data);
    });
    this.socket.error((data: any) => {
      console.log(data);
    });

    // 发送直播流监听
    this.socket.onOpenLive((data: any) => {
      console.log("openLive", data);
      if (data.err == 1) {
        // 有人开播 不能开启直播
        this.message.error(data.str);
      } else if (data.err == 0) {
        // 有人开播 快去看看
        this.message.info(data.str);
        this.liveAuth = data.liveAuth;
      }
    });
    // 监听开播有人进入我的直播给发送数据
    this.socket.onOtherjoinedLive();
    this.socket.answer();
    // 其他人离开直播
    this.socket.onOtherleavedLive((id: any) => {
      console.log("有人离开直播", id);
    });
    // 监听直播是否关闭
    this.socket.onCloseLive((data: any) => {
      console.log("直播已关闭");
      this.liveAuth = {};
    });
    // 接收直播流
    this.socket.offer();
    this.socket.candidate();
    // 接收直播流
    this.socket.ontrack((stream: any) => {
      console.log("ontrack stream", stream);
      const video: any = document.getElementById("remote-video");
      const audio: any = document.getElementById("remote-audio");
      video.srcObject = stream;
      audio.srcObject = stream;
    });
    // this.socket.onaddstream((stream:any)=>{
    // 	console.log('onaddstream stream',stream)
    // 	const video:any = document.getElementById('remote-video');
    // 	const audio:any = document.getElementById('remote-audio');
    // 	video.srcObject = stream;
    // 	audio.srcObject = stream;
    // })
  }
  messageFun(data: any) {
    if (data.type == "info") {
      this.liveAuth = data.liveAuth || {};
      this.user = data.houseUserInfo;
      this.myInfo = {
        name: data.name,
        avatar: data.avatar,
        id: data.id,
      };
      this.userTemp = data.userTemp;
    }
    if (data.type == "system") {
      this.chat.push(data);
      this.userFun(data);
    }
    if (data.type == "history") {
      this.chat.push(...data.result);
    }
    if (data.type == "user") {
      if (data.id == this.myInfo.id) {
      } else {
        this.chat.push(data);
      }
    }
    this.scrollToButtom();
  }
  userFun(data: any) {
    if (data.action == "addUser") {
      if (this.user.findIndex((e: any) => e.id == data.auth.id) == -1) {
        this.user.push(data.auth);
      }
    }
    if (data.action == "removeUser") {
      let i = this.user.findIndex((e: any) => e.id == data.auth.id);
      if (i != -1) {
        this.user.splice(i, 1);
      }
    }
  }
  notOpen() {
    this.message.info("该功能暂未开放哦~");
  }
  // 移动到最底部
  scrollToButtom() {
    setTimeout(() => {
      let chat = document.getElementById("chatScroll");
      chat.scrollTop = chat.scrollHeight;
    }, 50);
  }
  defaultAvatar = "../../../assets/img/avatar.jpg";
  loadingFinished = false;
  inputValue = "";
  isRoom = false;
  isOnline = false;
  chat = [];
  user = [];
  myInfo: any = {};
  userTemp: any = {};
  videoShow: any = false;
  liveAuth: any = {};
  openLive() {
    this.videoShow = !this.videoShow;
    // 去看别人直播
    if (this.liveAuth.id && this.videoShow) {
      this.socket.otherjoinedLive();
      return;
    }
    if (this.liveAuth.id != this.myInfo.id && !this.videoShow) {
      // 关闭直播 不看了
      this.socket.otherleavedLive();
      return;
    }

    // 自己开播
    if (!this.liveAuth.id && this.videoShow) {
      this.mediaDevices();
      return;
    }
    if (this.liveAuth.id == this.myInfo.id && !this.videoShow) {
      // 关闭直播 不播了
      this.closeLive();
      return;
    }
  }
  closeLive() {
    this.liveAuth = {};
    this.socket.closeLive();
  }
  // 获取权限
  mediaDevices() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        // localStream = stream; // 将媒体流赋值给localStream变量
        const video: any = document.getElementById("local-video");
        const audio: any = document.getElementById("local-audio");
        video.srcObject = stream;
        audio.srcObject = stream;
        this.socket.openLive(stream);
        this.liveAuth = { ...this.myInfo };
      })
      .catch((error) => {
        // DOMException: Permission denied
        console.log(error);
      });
  }
  stop(event: any) {
    event.stopPropagation();
  }
  showOnline(event: any) {
    event.stopPropagation();
    this.isOnline = !this.isOnline;
    this.isRoom = false;
  }
  showHome(event: any) {
    event.stopPropagation();
    this.isRoom = !this.isRoom;
    this.isOnline = false;
  }
  showMessage() {
    this.isOnline = false;
    this.isRoom = false;
  }
  focus(e: any) {
    e.preventDefault();
    document.onkeydown = (event_e: any) => {
      if (event_e.keyCode === 13 && event_e.shiftKey) {
      }
      if (
        event_e.keyCode === 13 &&
        !event_e.shiftKey &&
        this.inputValue !== ""
      ) {
        // todo send
        event_e.preventDefault();
        var inputValue = this.inputValue;
        this.socket.send(inputValue);
        this.setMyChat(inputValue);
        this.inputValue = "";
      }
    };
  }
  blur() {
    document.onkeydown = null;
  }
  setMyChat(message: any) {
    let userTemp = { ...this.userTemp };
    userTemp.text = message;
    userTemp.time = new Date().getTime();
    this.chat.push(userTemp);
    this.scrollToButtom();
  }
}
