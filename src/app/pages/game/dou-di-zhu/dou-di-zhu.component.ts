import { Component, OnDestroy, OnInit } from "@angular/core";
import "./poker.min";
import { io } from "../../../services/js/socket.io.js";
import { NzMessageService } from "ng-zorro-antd/message";
import { environment } from "../../../../environments/environment";
@Component({
  selector: "ngx-dou-di-zhu",
  templateUrl: "./dou-di-zhu.component.html",
  styleUrls: ["./dou-di-zhu.component.scss"],
})
export class DouDiZhuComponent implements OnInit, OnDestroy {
  constructor(private message: NzMessageService) {}
  roomDetail: any = [];
  canvas: any;
  canvas1: any;
  myCanvas: any;
  upCanvas: any;
  nextCanvas: any;
  myCtx: any;
  upCtx: any;
  nextCtx: any;
  ctx: any;
  ctx1: any;
  loading = false;
  ngOnInit() {
    this.connect();
  }
  ngOnDestroy() {
    console.log("注销页面");
    this.socketIO.off();
    this.socketIO.disconnect();
  }
  //创建全局消息
  createMessage(type: string, msg: any): void {
    this.message.create(type, `${msg}`);
  }

  clearDraw() {
    if (this.nextCtx && this.upCtx && this.myCtx) {
      this.nextCtx.clearRect(
        0,
        0,
        this.nextCanvas.width,
        this.nextCanvas.height
      );
      this.upCtx.clearRect(0, 0, this.upCanvas.width, this.upCanvas.height);
      this.myCtx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    }
  }
  // 展示最后剩余
  drawEndNest() {
    let canvasWidth = (
      (this.players.nextPlayer.cards.length - 1) * 15 +
      45
    ).toString();
    let canvasHeight = (150).toString();
    this.nextCanvas = document.getElementById("nestCard");
    this.nextCanvas.width = canvasWidth;
    this.nextCanvas.height = canvasHeight;
    this.nextCtx = this.nextCanvas.getContext("2d");
    for (let i = 0; i < this.players.nextPlayer.cards.length; i++) {
      this.nextCtx.drawPokerCard(
        i * 15,
        30,
        60,
        this.players.nextPlayer.cards[i].suits,
        this.players.nextPlayer.cards[i].card
      );
    }
  }
  drawEndUp() {
    let canvasWidth = (
      (this.players.lastPlayer.cards.length - 1) * 15 +
      45
    ).toString();
    let canvasHeight = (150).toString();
    this.upCanvas = document.getElementById("upCard");
    this.upCanvas.width = canvasWidth;
    this.upCanvas.height = canvasHeight;
    this.upCtx = this.upCanvas.getContext("2d");
    for (let i = 0; i < this.players.lastPlayer.cards.length; i++) {
      this.upCtx.drawPokerCard(
        i * 15,
        30,
        60,
        this.players.lastPlayer.cards[i].suits,
        this.players.lastPlayer.cards[i].card
      );
    }
  }
  choseRoom(roomId: any) {
    this.roomid = roomId;
    this.visible = false;
    this.roomAdd();
  }
  //打出的下家扑克牌
  drawNextCard() {
    let canvasWidth = (
      (this.players.nextPlayer.sendCards.length - 1) * 25 +
      75
    ).toString();
    this.nextCanvas = document.getElementById("nestCard");
    this.nextCanvas.width = canvasWidth;
    this.nextCtx = this.nextCanvas.getContext("2d");
    if (this.players.nextPlayer.sendCards.length > 0) {
      this.nextCtx.clearRect(
        0,
        0,
        this.nextCanvas.width,
        this.nextCanvas.height
      );
      for (let i = 0; i < this.players.nextPlayer.sendCards.length; i++) {
        this.nextCtx.drawPokerCard(
          i * 25,
          0,
          100,
          this.players.nextPlayer.sendCards[i].suits,
          this.players.nextPlayer.sendCards[i].card
        );
      }
    } else {
      this.nextCtx.clearRect(
        0,
        0,
        this.nextCanvas.width,
        this.nextCanvas.height
      );
    }
  }
  //打出的上家扑克牌
  drawUpCard() {
    let canvasWidth = (
      (this.players.lastPlayer.sendCards.length - 1) * 25 +
      75
    ).toString();
    this.upCanvas = document.getElementById("upCard");
    this.upCanvas.width = canvasWidth;
    this.upCtx = this.upCanvas.getContext("2d");
    if (this.players.lastPlayer.sendCards.length > 0) {
      this.upCtx.clearRect(0, 0, this.upCanvas.width, this.upCanvas.height);
      for (let i = 0; i < this.players.lastPlayer.sendCards.length; i++) {
        this.upCtx.drawPokerCard(
          i * 25,
          0,
          100,
          this.players.lastPlayer.sendCards[i].suits,
          this.players.lastPlayer.sendCards[i].card
        );
      }
    } else {
      this.upCtx.clearRect(0, 0, this.upCanvas.width, this.upCanvas.height);
    }
  }
  //打出的我的扑克牌
  drawMyCard() {
    let canvasWidth = (
      (this.players.player.sendCards.length - 1) * 35 +
      115
    ).toString();
    this.myCanvas = document.getElementById("myCard");
    this.myCanvas.width = canvasWidth;
    this.myCtx = this.myCanvas.getContext("2d");
    if (this.players.player.sendCards.length > 0) {
      this.myCtx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
      for (let i = 0; i < this.players.player.sendCards.length; i++) {
        this.myCtx.drawPokerCard(
          i * 35,
          0,
          150,
          this.players.player.sendCards[i].suits,
          this.players.player.sendCards[i].card
        );
      }
    } else {
      this.myCtx.clearRect(0, 0, this.myCanvas.width, this.myCanvas.height);
    }
  }
  //底牌的canvas
  drawBottomCard() {
    let canvasWidth = (3 * 70).toString();
    this.canvas1 = document.getElementById("bottom-card");
    this.canvas1.width = canvasWidth;
    this.ctx1 = this.canvas1.getContext("2d");
    this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
    if (this.playInfo.bottomCardShow) {
      for (let i = 0; i < this.playInfo.bottomCard.length; i++) {
        this.ctx1.drawPokerCard(
          i * 70,
          0,
          80,
          this.playInfo.bottomCard[i].suits,
          this.playInfo.bottomCard[i].card
        );
      }
    } else {
      for (let i = 0; i < 3; i++) {
        this.ctx1.drawPokerBack(i * 70, 0, 80, "#7A7BB8", "#2E319C");
      }
    }
  }
  //都准备之后的自己的扑克牌的canvas
  drawCanvas() {
    let canvasWidth = (
      (this.players.player.cards.length - 1) * 35 +
      115
    ).toString();
    this.canvas = document.getElementById("myowncanvas");
    var par: any = this.canvas.parentNode;
    this.canvas.width = canvasWidth;
    this.canvas.height = par.offsetHeight - 20;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.players.player.cards.length; i++) {
      this.ctx.drawPokerCard(
        i * 35,
        this.players.player.cards[i].top,
        150,
        this.players.player.cards[i].suits,
        this.players.player.cards[i].card
      );
    }
  }
  //向上移动扑克牌
  move(event: any) {
    let num = Math.ceil(event.offsetX / 35) - 1;
    if (num > this.players.player.cards.length - 1) {
      num = this.players.player.cards.length - 1;
      if (this.players.player.cards[num].top == 0) {
        this.players.player.cards[num].top = 30;
      } else {
        this.players.player.cards[num].top -= 30;
      }
    } else {
      if (this.players.player.cards[num].top == 0) {
        this.players.player.cards[num].top = 30;
      } else {
        this.players.player.cards[num].top -= 30;
      }
    }
    this.drawCanvas();
  }

  copy(text: any) {
    const el = document.createElement("input");
    el.setAttribute("value", text);
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.createMessage("success", "复制成功");
  }
  ispreparation = false;
  visible: boolean = false;
  isReady = false;
  ready() {
    console.log("我准备好了");
    this.socketIO.emit("match", { type: "ready", roomId: this.roomIdNow });
  }
  roomLeave() {
    console.log("离开");
    this.socketIO.emit("match", { type: "leaveRoom", roomId: this.roomIdNow });
    this.showPlay = false;
	this.isAi = false;
  }
  notReady() {
    console.log("我取消准备了");
    this.socketIO.emit("match", { type: "notReady", roomId: this.roomIdNow });
  }

  openSearchRoom() {
    this.visible = true;
  }
  closeSearchRoom() {
    this.visible = false;
  }

  isVisible: boolean = false;
    joinRoom() {
      this.roomid = "";
      this.isVisible = true;
    }
  joinRoomCancel() {
    this.isVisible = false;
  }
  isAi = false;
  aiPlay(){
	  this.socketIO.emit("match", { type: "createRoomAi" });
	  this.showPlay = true;
	  this.isAi = true;
  }
  roomid = "";
  showPlay = false;
  roomCreate() {
    this.socketIO.emit("match", { type: "createRoom" });
    this.showPlay = true;
	this.isAi = false;
  }
  roomAdd() {
    let roomId = this.roomid;
    if (!roomId) {
      this.createMessage("error", "缺少id或roomid");
      return;
    }
    this.socketIO.emit("match", { type: "joinRoom", roomId });
	this.isAi = false;
  }

  token = window.localStorage.getItem("token");
  socketObj = {
    auth: {
      token: this.token,
    },
  };
  socketIO: any = null;
  socketSpace = "/ddz";
  socketUrl = environment.socketUrl +this.socketSpace;
  // socketUrl = "https://communities.tingjianmusic.cn:444" + this.socketSpace;
  connect() {
    this.loading = true;
    this.socketObj.auth.token = this.token;
    this.socketIO = io(this.socketUrl, this.socketObj);
    this.socketIO = this.socketIO.connect();
    this.listen();
  }

  houseUsers: any = [];
  playInfo: any = {};
  players: any = {
    nextPlayer: {},
    lastPlayer: {},
    player: {},
  };
  meIndex = 0;
  nextIndex = 0;
  lastIndex = 0;
  roomIdNow: any = null;
  roomHouseShow = false;
  houseShow = true;
  listen() {
    //搜索所有房间
    this.socketIO.on("roomInfo", (data: any) => {
		console.log(data)
      this.roomDetail = data;
    });

    // 结算阶段
    this.socketIO.on("ending", (data: any) => {
      console.log(data.msg, data);
      this.houseUsers = data.houseUsers;
      this.playInfo = data.playInfo;
      if (data.type == "smallEnd") {
        // 小局结束
        clearInterval(this.players.lastPlayer.interval);
        this.players.lastPlayer.interval = null;
        clearInterval(this.players.player.interval);
        this.players.player.interval = null;
        clearInterval(this.players.nextPlayer.interval);
        this.players.nextPlayer.interval = null;
        this.players.lastPlayer = data.houseUsers[this.lastIndex];
        this.players.nextPlayer = data.houseUsers[this.nextIndex];
        this.players.player = data.houseUsers[this.meIndex];
        this.drawEndNest();
        this.drawEndUp();
        alert("胜利者" + this.playInfo.winner);
      }
      if (data.type == "bigEnd") {
        // 大局结束
        alert("大局结束");
        alert(JSON.stringify(this.playInfo.scores));
      }
    });
    // 出牌阶段
    this.socketIO.on("playPoker", (data: any) => {
      this.players.lastPlayer.actionStr = "";
      this.players.nextPlayer.actionStr = "";
      this.players.player.actionStr = "";
      console.log(data.msg, data);
      this.houseUsers = data.houseUsers;
      this.playInfo.multiple = data.playInfo.multiple;
      let token = this.houseUsers[data.playPokerIndex].token;
      // 通知出牌
      if (data.type == "playPokerBegin") {
        this.players.player.action = "playPoker";

        // 自己
        if (this.players.player.token == token) {
          this.players.player.playPoker = true;
          this.players.player.timeout = true;
          this.timing("player", "start");
        }
        //上家
        if (this.players.lastPlayer.token == token) {
          this.players.lastPlayer.timeout = true;
          this.timing("lastPlayer", "start");
        }
        // 下家
        if (this.players.nextPlayer.token == token) {
          this.players.nextPlayer.timeout = true;
          this.timing("nextPlayer", "start");
        }
      }
      // 不可以这么出 或 牌不大
      if (data.type == "playPokerErr") {
        this.createMessage("error", "牌不大于上一家出的牌");
        this.players.player.playPokerErr = data.errMsg;
      }
      // 有人出牌了
      if (data.type == "playPokerSuccess") {
        //重新给牌
        this.players.lastPlayer.cards = data.houseUsers[this.lastIndex].cards;
        this.players.nextPlayer.cards = data.houseUsers[this.nextIndex].cards;
        this.players.player.cards = data.houseUsers[this.meIndex].cards;
        this.players.lastPlayer.sendCards =
          data.houseUsers[this.lastIndex].sendCards;
        this.players.nextPlayer.sendCards =
          data.houseUsers[this.nextIndex].sendCards;
        this.players.player.sendCards = data.houseUsers[this.meIndex].sendCards;
        this.players.lastPlayer.sendPokerStr = this.pokerToStr(
          this.players.lastPlayer.sendCards
        );
        this.players.nextPlayer.sendPokerStr = this.pokerToStr(
          this.players.nextPlayer.sendCards
        );
        this.players.player.sendPokerStr = this.pokerToStr(
          this.players.player.sendCards
        );
        for (let i = 0; i < this.players.player.cards.length; i++) {
          this.players.player.cards[i].top = 30;
        }
        this.drawCanvas();
        this.drawMyCard();
        this.drawNextCard();
        this.drawUpCard();
        //上家
        if (this.players.lastPlayer.token == token) {
          if (data.state == false) {
            this.players.lastPlayer.sendPokerStr = "不出";
            this.players.nextPlayer.sendPokerStr = "";
            this.players.player.sendPokerStr = "";
          }
          this.players.lastPlayer.timeout = false;
        }
        // 下家
        if (this.players.nextPlayer.token == token) {
          if (data.state == false) {
            this.players.nextPlayer.sendPokerStr = "不出";
            this.players.lastPlayer.sendPokerStr = "";
            this.players.player.sendPokerStr = "";
          }
          this.players.nextPlayer.timeout = false;
        }
        // 自己
        if (this.players.player.token == token) {
          this.players.player.playPoker = false;
          if (data.state == false) {
            this.players.player.sendPokerStr = "不出";
            this.players.nextPlayer.sendPokerStr = "";
            this.players.lastPlayer.sendPokerStr = "";
          }
          this.players.player.timeout = false;
          this.timing("player", "stop");
        }
      }
    });
    // 加倍阶段
    this.socketIO.on("doubling", (data: any) => {
      console.log(data.msg, data);
      this.houseUsers = data.houseUsers;
      // 通知加倍
      if (data.type == "doubleBegin") {
        this.players.player.double = true;
        this.players.player.action = "doubling";

        this.players.player.timeout = true;
        this.timing("player", "start");

        this.players.lastPlayer.timeout = true;
        this.timing("lastPlayer", "start");
        this.players.nextPlayer.timeout = true;
        this.timing("nextPlayer", "start");
      }
      // 谁加倍或不加倍接收
      if (data.type == "double") {
        let token = this.houseUsers[data.doublingIndex].token;
        // 更新倍数
        this.playInfo.multiple = data.playInfo.multiple;
        //上家
        if (this.players.lastPlayer.token == token) {
          this.players.lastPlayer.actionStr = data.isDouble ? "加倍" : "不加倍";
          this.players.lastPlayer.timeout = false;
        }
        // 下家
        if (this.players.nextPlayer.token == token) {
          this.players.nextPlayer.actionStr = data.isDouble ? "加倍" : "不加倍";
          this.players.nextPlayer.timeout = false;
        }
      }
    });
    // 抢地主阶段
    this.socketIO.on("robLandlord", (data: any) => {
      console.log(data.msg, data);
      this.houseUsers = data.houseUsers;

      // 通知抢地主
      if (data.type == "robLandlordNotice") {
        let token = this.houseUsers[data.robLandlordIndex].token;
        if (this.players.player.token == token) {
          this.players.player.robLandlord = true;
          this.players.player.timeout = true;
          this.players.player.action = "robLandlord";
          this.timing("player", "start");
        }
        // 上家
        if (this.players.lastPlayer.token == token) {
          this.players.lastPlayer.timeout = true;
          this.timing("lastPlayer", "start");
        }
        // 下家
        if (this.players.nextPlayer.token == token) {
          this.players.nextPlayer.timeout = true;
          this.timing("nextPlayer", "start");
        }
      }
      if (data.type == "robLandlordExecute") {
        // 更新倍数
        this.playInfo.multiple = data.playInfo.multiple;
        let token = this.houseUsers[data.robLandlordIndex].token;
        // 上家
        if (this.players.lastPlayer.token == token) {
          this.players.lastPlayer.actionStr = data.isRobLandlord
            ? "抢地主"
            : "不抢";
          this.players.lastPlayer.timeout = false;
        }
        // 下家
        if (this.players.nextPlayer.token == token) {
          this.players.nextPlayer.actionStr = data.isRobLandlord
            ? "抢地主"
            : "不抢";
          this.players.nextPlayer.timeout = false;
        }
      }
      // 确定地主
      if (data.type == "robLandlordEnd") {
        this.players.nextPlayer.actionStr = "";
        this.players.lastPlayer.actionStr = "";
        this.players.player.actionStr = "";
        // 设置底牌 显示底牌
        this.playInfo.bottomCard = data.playInfo.bottomCard;
        this.playInfo.bottomCardShow = data.playInfo.bottomCardShow;
        this.drawBottomCard();
        //重新给牌
        this.players.player.cards = data.houseUsers[this.meIndex].cards;
        this.players.nextPlayer.cards = data.houseUsers[this.nextIndex].cards;
        this.players.lastPlayer.cards = data.houseUsers[this.lastIndex].cards;
        this.players.player.identity = data.houseUsers[this.meIndex].identity;
        this.players.nextPlayer.identity =
          data.houseUsers[this.nextIndex].identity;
        this.players.lastPlayer.identity =
          data.houseUsers[this.lastIndex].identity;
        for (let i = 0; i < this.players.player.cards.length; i++) {
          this.players.player.cards[i].top = 30;
        }
        this.drawCanvas();
      }
    });
    // 叫地主阶段
    this.socketIO.on("callLandlord", (data: any) => {
      console.log(data.msg, data);
      // 开始叫地主 通知
      if (data.type == "callLandlordNotice") {
        let token = this.houseUsers[data.callLandlordIndex].token;
		if(this.isAi){
			token = this.token;
		}
        // 自己
        if (this.players.player.token == token) {
          this.players.player.callLandlord = true;
          this.players.player.action = "callLandlord";
          this.players.player.timeout = true;
          this.timing("player", "start");
        }
        //上家
        if (this.players.lastPlayer.token == token) {
          this.players.lastPlayer.timeout = true;
          this.timing("lastPlayer", "start");
        }
        // 下家
        if (this.players.nextPlayer.token == token) {
          this.players.nextPlayer.timeout = true;
          this.timing("nextPlayer", "start");
        }
      }
      // 有人叫或不叫地主
      if (data.type == "callLandlordExecute") {
        let token = this.houseUsers[data.callLandlordIndex].token;
        // 上家
        if (this.players.lastPlayer.token == token) {
          this.players.lastPlayer.actionStr = data.isCallLandlord
            ? "叫地主"
            : "不叫";
          this.players.lastPlayer.timeout = false;
        }
        // 下家
        if (this.players.nextPlayer.token == token) {
          this.players.nextPlayer.actionStr = data.isCallLandlord
            ? "叫地主"
            : "不叫";
          this.players.nextPlayer.timeout = false;
        }
      }
    });
    // 发牌阶段
    this.socketIO.on("dealCards", (data: any) => {
      console.log(data.msg, data);
      this.houseUsers = data.houseUsers;
      this.playInfo = data.playInfo;
      if (data.type == "licensing") {
        this.playInfo.start = true;
        //发牌
        this.players.player.cards = data.cards;
        this.players.nextPlayer.cards = data.houseUsers[this.nextIndex].cards;
        this.players.lastPlayer.cards = data.houseUsers[this.lastIndex].cards;
        for (let i = 0; i < this.players.player.cards.length; i++) {
          this.players.player.cards[i].top = 30;
        }
        // 重置身份
        this.players.player.identity = data.houseUsers[this.meIndex].identity;
        this.players.lastPlayer.identity =
          data.houseUsers[this.lastIndex].identity;
        this.players.nextPlayer.identity =
          data.houseUsers[this.nextIndex].identity;
        this.drawCanvas();
        this.clearDraw();
        this.drawBottomCard();
      }
    });
    // 匹配阶段
    this.socketIO.on("match", (data: any) => {
      console.log(data.msg, data);
      this.loading = false;
      if (data.type == "error") {
        //         this.showPlay = false;
        //         this.isVisible = true;
        this.createMessage("error", "没有找到该房间");
        return;
      }
      this.houseUsers = data.houseUsers;
      this.roomIdNow = data.roomId;
      this.playInfo = data.playInfo;
      // 房间id

      // 人员信息 显示 上下家
      this.housePlayer(data.houseUsers);

      if (data.type == "Ileave" || data.type == "connect") {
        // 我离开房间
        this.showPlay = false;
        // this.isVisible = true;
        this.players = { player: {}, nextPlayer: {}, lastPlayer: {} };
        this.roomIdNow = "";
        this.houseUsers = [];
        this.playInfo = {};
      } else {
        this.showPlay = true;
        this.isVisible = false;
      }
    });
  }
  // 倒计数
  timing(key: any, action: string) {
    clearInterval(this.players[key].interval);
    this.players[key].interval = null;
    if (action == "start") {
      // 开启计时
      this.players[key].time = this.playInfo.timeout;
      this.players[key].interval = setInterval(() => {
        this.players[key].time = this.players[key].time - 1;
        if (this.players[key].time == 0) {
          clearInterval(this.players[key].interval);
          this.players[key].interval = null;
          // 是自己 到时间自动发emit
          if (this.players[key].token == this.token) {
            this.autoEmit(key);
          }
        }
      }, 1000);
    }
  }
  // 整理牌型
  pokerToStr(cards: any) {
    if (!cards) return "";
    let str = "";
    for (let i = 0; i < cards.length; i++) {
      str += `${cards[i].suits + cards[i].card} `;
    }
    return str;
  }

  housePlayer(houseUsers: any) {
    let meIndex = houseUsers.findIndex((e: any) => e.token == this.token);
    let lastIndex = -1;
    let nextIndex = -1;
    if (meIndex == 0) {
      lastIndex = 2;
      nextIndex = 1;
    }
    if (meIndex == 1) {
      lastIndex = 0;
      nextIndex = 2;
    }
    if (meIndex == 2) {
      lastIndex = 1;
      nextIndex = 0;
    }
    if (houseUsers[meIndex]) {
      this.players.player = houseUsers[meIndex];
    }
    if (houseUsers[lastIndex]) {
      this.players.lastPlayer = houseUsers[lastIndex];
    } else {
      this.players.lastPlayer = {};
    }
    if (houseUsers[nextIndex]) {
      this.players.nextPlayer = houseUsers[nextIndex];
    } else {
      this.players.nextPlayer = {};
    }
    this.lastIndex = lastIndex;
    this.nextIndex = nextIndex;
    this.meIndex = meIndex;
  }
  // 到时间 自动选择 发送emit
  autoEmit(key: any) {
    // 出牌自动
    if (this.players[key].action == "playPoker") {
      // 如果我必出 出张最左面的一张
      if (
        this.players.player.cards.length == 20 ||
        (!this.players.lastPlayer.sendCards &&
          !this.players.nextPlayer.sendCards)
      ) {
        this.playPoker(true, true);
      } else {
        this.playPoker(false, true);
      }
    }
    //加倍自动
    if (this.players[key].action == "doubling") {
      this.doubling(false);
    }
    // 抢地主自动
    if (this.players[key].action == "robLandlord") {
      this.robLandlord(false);
    }
    // 叫地主自动
    if (this.players[key].action == "callLandlord") {
      this.callLandlord(false);
    }
  }
  // 点击出牌或不出 先发emit 验证符不符合规范 符合规范 直接出牌 不符合提示不合理
  playPoker(state: any, auto: any = false) {
    // 自动出
    if (auto) {
      this.players.player.cards.forEach((item: any) => {
        item.top = 30;
      });
      if (state) {
        this.players.player.cards[0].top = 0;
      }
    }
    if (this.players.player.cards.every((e: any) => e.top == 30) && state) {
      // 没选牌 不让出
      this.createMessage("error", "请选择要出的牌");
      return;
    }
    let cards = this.players.player.cards.filter((e: any) => e.top == 0);
	if(!this.isAi){
		this.socketIO.emit("playPoker", {
		  type: "playPoker",
		  roomId: this.roomIdNow,
		  cards,
		  state,
		});
	}else{
		this.socketIO.emit("playPoker", {
		  type: "playPokerAi",
		  roomId: this.roomIdNow,
		  cards,
		  state,
		});
	}
  }
  doubling(isDouble: any) {
    console.log("我加倍或者不加倍");
	if(!this.isAi){
		this.socketIO.emit("doubling", {
		  type: "doubling",
		  roomId: this.roomIdNow,
		  isDouble,
		});
		this.players.player.actionStr = isDouble ? "加倍" : "不加倍";
		this.players.player.double = false;
		this.players.player.timeout = false;
		this.timing("player", "stop");
	}else{
		this.socketIO.emit("doubling", {
		  type: "doublingAi",
		  roomId: this.roomIdNow,
		  isDouble,
		});
		this.players.player.actionStr = isDouble ? "加倍" : "不加倍";
		this.players.player.double = false;
		this.players.player.timeout = false;
		this.timing("player", "stop");
		this.players.nextPlayer.double = false;
		this.players.nextPlayer.timeout = false;
		this.players.nextPlayer.actionStr = '不加倍';
		this.timing("nextPlayer", "stop");
		this.players.lastPlayer.double = false;
		this.players.lastPlayer.timeout = false;
		this.players.lastPlayer.actionStr = '不加倍';
		this.timing("lastPlayer", "stop");
	}
  }
  robLandlord(isRobLandlord: any) {
    console.log("我抢地主或者不抢");
    this.socketIO.emit("robLandlord", {
      type: "robLandlord",
      roomId: this.roomIdNow,
      isRobLandlord,
    });
    this.players.player.actionStr = isRobLandlord ? "抢地主" : "不抢";
    this.players.player.robLandlord = false;
    this.players.player.timeout = false;
    this.timing("player", "stop");
  }
  callLandlord(isCallLandlord: any) {
    console.log("我叫地主或者不叫");
	if(!this.isAi){
		this.socketIO.emit("callLandlord", {
		  type: "callLandlord",
		  roomId: this.roomIdNow,
		  isCallLandlord,
		});
		this.players.player.actionStr = isCallLandlord ? "叫地主" : "不叫";
		this.players.player.callLandlord = false;
		this.players.player.timeout = false;
		this.timing("player", "stop");
	}else{
		this.socketIO.emit("callLandlord", {
		  type: "callLandlordAi",
		  roomId: this.roomIdNow,
		  isCallLandlord,
		});
		this.players.player.timeout = false;
		this.players.player.callLandlord = false;
		this.timing("player", "stop");
		if(!isCallLandlord){
			this.players.nextPlayer.callLandlord = false;
			this.players.nextPlayer.timeout = false;
			this.players.nextPlayer.actionStr = '不叫';
			this.timing("nextPlayer", "stop");
			this.players.lastPlayer.callLandlord = false;
			this.players.lastPlayer.timeout = false;
			this.players.lastPlayer.actionStr = '不叫';
			this.timing("lastPlayer", "stop");
		}
	}
  }
}
