import { Component, OnInit, OnDestroy } from "@angular/core";
import { SocketService } from "../../../services/socket.service";
import { ApiService } from "../../../services/api.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { CommonService } from "../../../services/common.service";

@Component({
  selector: "ngx-song-room",
  templateUrl: "./song-room.component.html",
  styleUrls: ["./song-room.component.scss"],
})
export class SongRoomComponent implements OnInit, OnDestroy {
  constructor(
    public api: ApiService,
    public socket: SocketService,
    public message: NzMessageService,
    public common: CommonService
  ) {}
  ngOnDestroy() {
    console.log("注销页面");
    this.socket.disconnectFun();
  }
  ngOnInit(): void {
	  let audio: any = document.getElementById("audio");
	  audio.addEventListener('ended', ()=> {
	      // 这里写入音频播放结束后的操作代码
		  console.log('播放结束')
		  this.doChangeSongs(audio.src)
	  })
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
	  const video: any = document.getElementById("local-video");
	  const video2: any = document.getElementById("remote-video");
	  const audio: any = document.getElementById("local-audio");
	  const audio2: any = document.getElementById("remote-audio");
	  video.srcObject = null;
	  video2.srcObject = null;
	  audio.srcObject = null;
	  audio2.srcObject = null;
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
	// 有人点歌 更新点歌列表
	this.socket.chooseSongs((res:any)=>{
		console.log(res,'有人点歌')
		if(res.success){
			res.message&&this.message.success(res.message)
			if(res.data){
				this.SongPlayedList = res.data
			}
		}else{
			this.message.info(res.message)
		}
	})
	
	// 播放歌曲on
	this.socket.playSongs((res:any)=>{
		console.log(res,'该播放歌曲拉')
		if(res.success){
			this.playMusic(res.song,res.duration)
		}else{
			this.message.info(res.message)
		}
	})
	this.socket.changeSongs((res:any)=>{
		console.log(res,'该切换歌曲拉')
		if(res.success){
			this.SongPlayedList = res.list;
			this.playMusic(res.song)
		}else{
			this.message.info(res.message)
		}
	})
  }
  playMusic(item:any,duration:number=0){
	  if(!item.url){
		  this.message.error('歌曲地址获取失败,切歌失败')
		  return
	  }
	  this.musicName = item.name;
	  try{
	  	this.lyricData = JSON.parse(item.lyric);
	  }catch(e){
	  	//TODO handle the exception
	  }
	  this.audioSrc = item.url;
	  let audio: any = document.getElementById("audio");
	  setTimeout(() => {
		  audio.currentTime = duration/1000
		  audio.play();
	  }, 50);
  }
  // 酷我歌词处理
  kuwoLyricProcessing(lyric: any) {
    lyric.replaceAll("\n", "");
    let lrcArr = [];
    try {
      // 处理歌词，转化成key为时间，value为歌词的对象
      let lyricArr = lyric.split("[").slice(1); // 先以[进行分割
      if (lyricArr.length == 0) {
        return false;
      }
      lyricArr.forEach((item: any) => {
        let arr = item.split("]"); // 再分割右括号
        let lrcObj = {};
        // 时间换算成毫秒
        let s = arr[0];

        arr[0] = s * 1000;
        if (arr[1] != "\r\n" && arr[1] != null && !isNaN(arr[0])) {
          // 去除歌词中的换行符
          // lrcObj[arr[0]] = arr[1];
          lrcObj["key"] = arr[0];
          lrcObj["value"] = arr[1];
          lrcArr.push(lrcObj);
        }
      });
      // 存储数据
      return lrcArr;
    } catch (e) {
      console.log("歌词出错");
      console.log(e);
      return false;
    }
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
	  if(data.chooseSongsList){
		  this.SongPlayedList = data.chooseSongsList.data
	  }
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

  // 点歌展开
  searchSongs(event: any) {
    event.stopPropagation();
    this.IsSearchSongs = !this.IsSearchSongs;
    this.IsShowPlayed = false;
    this.isOnline = false;
    this.isRoom = false;
    this.isExpression = false;
    this.isShowCollect = false;
  }
  // 展示表情
  showExpression(event: any) {
    event.stopPropagation();
    this.isExpression = !this.isExpression;
    this.IsSearchSongs = false;
    this.IsShowPlayed = false;
    this.isOnline = false;
    this.isRoom = false;
    this.isShowCollect = false;
    if (this.isExpression && this.EmojiList.length == 0) {
      this.loading = true;
      this.api.GetEmojiList().subscribe((res: any) => {
        this.loading = false;
        if (res.success) {
          this.EmojiList = res.data;
        }
      });
    }
  }
  // 添加收藏;
  addCollect(item: any) {
    console.log(item.musicId);
    this.loading = true;
    try {
      this.api
        .AddCollectList({ musicId: item.musicId, state: true })
        .subscribe((res: any) => {
          this.loading = false;
		  this.message.success(res.message)
		  if(res.success){
			  item.collectArr.push(this.userId)
		  }
        });
    } catch (e) {
      this.loading = false;
    }
  }
  collected(){
	  this.message.info('已经添加收藏拉')
  }
  rmCollect(item: any,i:any) {
    console.log(item.musicId);
    this.loading = true;
    try {
      this.api
        .AddCollectList({ musicId: item.musicId, state: false })
        .subscribe((res: any) => {
          this.loading = false;
		  this.message.success(res.message)
		  if(res.success){
			  this.collectList.splice(i,1)
			  let index = this.SongPlayedList.findIndex((e:any)=>e.musicId==item.musicId)
			  if(index!=-1){
				  let index2 = this.SongPlayedList[index].collectArr.findIndex((e:any)=>e == this.userId)
				  if(index2!=-1){
					  this.SongPlayedList[index].collectArr.splice(index2,1)
				  }
			  }
		  }
        });
    } catch (e) {
      this.loading = false;
    }
  }
  sendExpression(Emoji: any) {
    this.inputValue += Emoji;
  }
  onClickChild(e: any) {
    e.cancelBubble = true;
  }
  // 已点歌曲展示
  showPlayed(event: any) {
    event.stopPropagation();
    this.IsShowPlayed = !this.IsShowPlayed;
    this.isExpression = false;
    this.IsSearchSongs = false;
    this.isOnline = false;
    this.isRoom = false;
    this.isShowCollect = false;
    // if (this.IsShowPlayed) {
    //   this.loading = true;
    //   this.api.GetMusicChatRoomList().subscribe((res: any) => {
    //     this.loading = false;
    //     if (res.success) {
    //       this.SongPlayedList = res.data;
    //     }
    //   });
    // }
  }
  showCollect(event: any) {
    event.stopPropagation();
    this.IsShowPlayed = false;
    this.isExpression = false;
    this.IsSearchSongs = false;
    this.isOnline = false;
    this.isRoom = false;
    this.isShowCollect = !this.isShowCollect;
    if (this.isShowCollect) {
      this.loading = true;
      this.api.GetCollectList().subscribe((res: any) => {
        this.loading = false;
        if (res.success) {
          this.collectList = res.data;
        }
      });
    }
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
  audioSrc: any = "";
  songPage: number = 1;
  userId: any = localStorage.getItem("userId") || 0;
  SongList: any = [];
  loading = false;
  musicName: string = "";
  autoplay = "";
  // 当前歌词
  lyricKey: any = 0;
  lyricIndex: any = 0;
  lyricData: any = [];
  SongPlayedList: any = [];
  IsSearchSongs: boolean = false;
  searchValue: string = "";
  searchHolder: string = "请输入搜索歌曲";
  IsShowPlayed: boolean = false;
  isExpression: boolean = false;
  isShowCollect: boolean = false;
  EmojiList: any = [];
  collectList: any = [];
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
    this.IsSearchSongs = false;
    this.isExpression = false;
  }
  showHome(event: any) {
    event.stopPropagation();
    this.isRoom = !this.isRoom;
    this.isOnline = false;
    this.IsSearchSongs = false;
    this.isExpression = false;
  }
  showMessage() {
    this.isOnline = false;
    this.isRoom = false;
    this.IsSearchSongs = false;
    this.IsShowPlayed = false;
    this.isExpression = false;
    this.isShowCollect = false;
  }
  // 点歌搜索歌曲
  focusSearchSongs(e: any) {
    document.onkeydown = (event_e: any) => {
      if (event_e.keyCode === 13) {
        this.SearchSong();
      }
    };
  }
  // 点歌搜索歌曲
  SearchSong() {
    this.loading = true;
    try {
      this.api
        .ChooseSongSearchComprehensiveServices({
          SongName: this.searchValue,
          Page: this.songPage,
        })
        .subscribe((res: any) => {
          this.loading = false;
          if (res.success) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].isPlay = false;
              if (typeof res.data[i].singer == "object") {
                res.data[i].singer = res.data[i].singer.join(",");
              }
              if (res.data[i].type == "酷我") {
                res.data[i].Lyric = this.kuwoLyricProcessing(res.data[i].Lyric);
              }
              if (res.data[i].type == "QQ") {
                res.data[i].Lyric = this.common.parseLRC(res.data[i].Lyric);
                res.data[i].audioUrl =
                  "https://dl.stream.qqmusic.qq.com/" + res.data[i].audioUrl;
              }
              if (res.data[i].type == "酷狗" || res.data[i].type == "网易云") {
                res.data[i].Lyric = this.common.parseLRC(res.data[i].Lyric);
              }
            }
            this.SongList = res.data;
            console.log(res.data);
          }
        });
    } catch (e) {
      this.loading = false;
    }
  }
  // 滚动方法
  songScroll(e: any) {
    // console.log(e);
  }
  // 歌曲进度
  timeupdate(e: any) {
    this.lyricUp(e.srcElement.currentTime);
  }
  // 点歌播放
  listenMusic(item: any, indexs: any) {
    // this.loading = true;
    let typeNum = 0;
    if (item.type == "QQ") {
      typeNum = 1;
    } else if (item.type == "酷狗") {
      typeNum = 2;
    } else if (item.type == "网易云") {
      typeNum = 3;
    } else if (item.type == "酷我") {
      typeNum = 4;
    }
    try {
		this.socket.addSongs({ musicId: typeNum==1?item.mid:item.id,
          name: this.common.deleteEM(item.name),
          singerName: item.singer,
          albumName: item.albumName,
          albumSubtitle: item.albumSubtitle,
          ImageUrl: item.ImageUrl,
          lyric: JSON.stringify(item.Lyric),
          platformType: typeNum,
          time: Date.now(),
          userId: this.userId,
		  collect: { data: [] }})
      // this.api
      //   .SetMusicChatRoom({
      //     musicId: item.id,
      //     name: item.name,
      //     singerName: item.singer,
      //     albumName: item.albumName,
      //     albumSubtitle: item.albumSubtitle,
      //     ImageUrl: item.ImageUrl,
      //     lyric: JSON.stringify(item.Lyric),
      //     platformType: typeNum,
      //     time: Date.now(),
      //     userId: this.userId,
      //   })
      //   .subscribe((res: any) => {
      //     if (res.success) {
      //       this.loading = false;
      //       this.message.success(res.message);
      //     } else {
      //       this.message.error("添加失败");
      //     }
      //   });
    } catch (e) {
      this.loading = false;
    }

    // this.musicName = item.name;
    // this.lyricData = this.SongList[indexs].Lyric;
    // this.audioSrc = item.audioUrl;
    // let audio: any = document.getElementById("audio");
    // setTimeout(() => {
    //   this.SongList.forEach((item: any, index: number) => {
    //     if (index == indexs) {
    //       item.isPlay = !item.isPlay;
    //       if (item.isPlay) {
    //         audio.play();
    //       } else {
    //         audio.pause();
    //       }
    //     } else {
    //       item.isPlay = false;
    //     }
    //   });
    // }, 50);
  }
  // 切歌
  doChangeSongs(src:string=''){
	  this.socket.doChangeSongs(src)
  }
  // 歌词上滚
  lyricUp(currentTime: any) {
    for (let i = 0; i < this.lyricData.length; i++) {
      if (currentTime * 1000 > this.lyricData[i].key) {
        this.lyricKey = this.lyricData[i].key;
        this.lyricIndex = i;
      }
    }
  }
  // 歌词回看
  PreviousLyric() {
    if (this.lyricIndex > 0) {
      let audio: any = document.getElementById("audio");
      audio.currentTime = this.lyricData[this.lyricIndex - 1].key / 1000;
      audio.play();
    }
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
