import { Component, OnInit } from "@angular/core";
import { Canvg } from "canvg";
import { environment } from "../../../../environments/environment";
import { io } from "../../../services/js/socket.io.js";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "ngx-ma-jiang",
  templateUrl: "./ma-jiang.component.html",
  styleUrls: ["./ma-jiang.component.scss"],
})
export class MaJiangComponent implements OnInit {
  // 东玩家手牌canvas
  canvas: any;
  // 东玩家吃碰对canvas
  myDisplayCard: any;
  // 北玩家手牌背景canvas
  northOne: any;
  // 北玩家吃碰对canvas
  northOneDisplayCard: any;
  // 南玩家手牌背景canvas
  southOne: any;
  // 南玩家吃碰对canvas
  southOneDisplayCard: any;
  // 西玩家手牌背景canvas
  westOne: any;
  // 西玩家吃碰对canvas
  westOneDisplayCard: any;
  //东玩家新抓牌canvas
  myDisplayCard1: any;
  // 牌桌计时器
  timeOut: any = 30;
  // 房间号
  roomid: any = "";
  // 加入房间显示
  isVisible: boolean = false;
  // 规则提示
  messageTip: any = [
    "闭门胡 1番",
    "点炮 1番",
    "自摸 1番",
    "庄家(输赢都是) 1番",
    "胡单张 1番",
    "单胡幺 1番",
    "闭门 1番",
    "三家闭门 1番",
    "明杠(中发白三张就算杠)(中发白不区分明暗杠)1番/四张风牌2番",
    "暗杠比明杠翻一倍",
    "旋风杠(东南西北(两番),中发白(一番))(旋风杠必须起手就用，必须开局就展示)(14张,不算开门)",
    "杠上开花 1番 (自摸,点炮)",
    "杠上炮 1番(点炮)",
    "抢杠 1番",
    "四归一 (吃，碰，手里的牌凑成四张算明杠) 1番",
    "飘胡(只能碰/杠) 三番",
    "手把一(手里只剩一张的情况下在胡单张的基础上在番一番)(必须是飘的情况下)",
  ];
  // 东玩家手牌
  svg1: any = [];
  // 北玩家吃碰对牌
  svgNorthOneDisplayCard: any = [];
  // 东玩家吃碰对牌
  svgMyDisplayCard: any = [];
  // 选择创建房间的倍数
  choseMultiplesValue = "一倍";
  // 倍数信息
  options = [
    { label: "一倍", value: "一倍" },
    { label: "两倍", value: "两倍" },
    { label: "四倍", value: "四倍" },
  ];
  // 倍数先择页面弹出
  choseMultiples: boolean = false;
  // 是否进入游戏
  showPlay: boolean = false;
  // 庄家
  farmhouse = "North";
  // 东新抓牌
  vewCard: any = [];
  loading: boolean = false;
  token = window.localStorage.getItem("token");
  socketObj = {
    auth: {
      token: this.token,
    },
  };
  socketIO: any = null;
  socketSpace = "/majiang";
  socketUrl = environment.socketUrl + this.socketSpace;
  roomDetail: any = [];
  houseUsers: any = [];
  roomIdNow: any = null;
  playInfo: any = {};
  housePlayerArr:any=[]
  ngOnInit(): void {
    this.connect();
  }
  ngOnDestroy() {
    console.log("注销页面");
    this.socketIO.off();
    this.socketIO.disconnect();
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
  constructor(private message: NzMessageService) {}

  // socket连接
  connect() {
    this.loading = true;
    this.socketObj.auth.token = this.token;
    this.socketIO = io(this.socketUrl, this.socketObj);
    this.socketIO = this.socketIO.connect();
    this.listen();
  }
  listen() {
    //搜索所有房间
    this.socketIO.on("roomInfo", (data: any) => {
      console.log(data);
      this.roomDetail = data;
    });
    this.socketIO.on("match", (data: any) => {
      console.log(data.msg, data);
      this.loading = false;
      if (data.type == "error") {
        //         this.showPlay = false;
        //         this.isVisible = true;
        this.createMessage("error", "没有找到该房间");
        return;
      }
      if (data.type == "join" || data.type == "create") {
        this.showPlay = true;
        this.choseMultiples = false;
        this.isVisible = false;
      }
      this.houseUsers = data.houseUsers;
      this.roomIdNow = data.roomId;
      this.playInfo = data.playInfo;
      // 人员信息 显示 上下家
      this.housePlayer(data.houseUsers);
    });
    // 发牌;
    this.socketIO.on("dealCards", (data: any) => {
      console.log(data.msg, data);
      data.cards.forEach((ele: any) => {
        ele.isMoved = false;
      });
      this.svg1 = data.cards;
      this.canvas = document.getElementById("canvas");
      this.northOne = document.getElementById("northOne");
      this.southOne = document.getElementById("southOne");
      this.westOne = document.getElementById("westOne");
      this.myDisplayCard = document.getElementById("myDisplayCard");
      this.northOneDisplayCard = document.getElementById("northOneDisplayCard");
      this.westOneDisplayCard = document.getElementById("westOneDisplayCard");
      this.southOneDisplayCard = document.getElementById("southOneDisplayCard");
      this.myDisplayCard1 = document.getElementById("myDisplayCard1");
      this.players.player = data.houseUsers[this.meIndex];
      this.players.nextPlayer = data.houseUsers[this.nextIndex];
      this.players.next2Player = data.houseUsers[this.next2Index];
      this.players.lastPlayer = data.houseUsers[this.lastIndex];
      this.drawerMaJiang(this.svg1, this.canvas, "mine");
      this.drawerNorthOne(this.players.nextPlayer.cards.length);
      this.drawerWestOne(this.players.next2Player.cards.length);
      this.drawerSouthOne(this.players.lastPlayer.cards.length);
      this.gameStart = true;
    });
	this.socketIO.on("playCard", (data: any) => {
		console.log(data);
		this.playInfo = data.playInfo;
		this.svg1 = this.players.player.cards;
		this.players.player = data.houseUsers[this.meIndex];
		this.players.nextPlayer = data.houseUsers[this.nextIndex];
		this.players.next2Player = data.houseUsers[this.next2Index];
		this.players.lastPlayer = data.houseUsers[this.lastIndex];
		this.drawerMaJiang(this.svg1, this.canvas, "mine");
		this.drawerNorthOne(this.players.nextPlayer.cards.length);
		this.drawerWestOne(this.players.next2Player.cards.length);
		this.drawerSouthOne(this.players.lastPlayer.cards.length);
		this.housePlayer(data.housePlayer)
		this.housePlayerArr = data.housePlayer
		// 通知开局旋风杠 旋风杠和过按钮亮
		if(data.type=='askCardFirst'){
			if(data.playCardIndex == this.meIndex){
				this.players.player.btnGuo = true;
			}
		}
		// 有人旋风杠 接收
		if(data.type=='doAskCardFirst'){
			
		}
		// 通知出牌 index 是自己 功能 和出牌 按钮亮
		if(data.type=='playCardBegin'){
			if(data.playCardIndex == this.meIndex){
				this.players.player.btnChu = true;
				this.players.player.drawCards[0].isMoved=false
				this.vewCard = this.players.player.drawCards
				this.drawerMaJiang(this.vewCard, this.myDisplayCard1, "mineNew");
			}
		}
		// 通知要牌 index 是自己 功能 和过 按钮亮
		if(data.type=='askCard'){
			if(data.playCardIndex == this.meIndex){
				this.players.player.btnGuo = true;
			}
		}
	});
  }
  players: any = {
    player: {},
    nextPlayer: {},
    next2Player: {},
    lastPlayer: {},
  };
  lastIndex: any;
  nextIndex: any;
  meIndex: any;
  next2Index: any;
  gameStart: boolean = false;
  housePlayer(houseUsers: any) {
    let meIndex = houseUsers.findIndex((e: any) => e.token == this.token);
    let nextIndex = -1;
    let next2Index = -1;
    let lastIndex = -1;
    if (meIndex == 0) {
      nextIndex = 1;
      next2Index = 2;
      lastIndex = 3;
    }
    if (meIndex == 1) {
      lastIndex = 0;
      nextIndex = 2;
      next2Index = 3;
    }
    if (meIndex == 2) {
      lastIndex = 1;
      nextIndex = 3;
      next2Index = 0;
    }
    if (meIndex == 3) {
      lastIndex = 2;
      nextIndex = 0;
      next2Index = 1;
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
    if (houseUsers[next2Index]) {
      this.players.next2Player = houseUsers[next2Index];
    } else {
      this.players.next2Player = {};
    }
    this.lastIndex = lastIndex;
    this.nextIndex = nextIndex;
    this.meIndex = meIndex;
    this.next2Index = next2Index;
  }
  // 点击出牌
  playCard(){
	  let index=this.svg1.findIndex((ele:any)=>ele.isMoved)
	  let cards =[]
	  if(index!=-1){
		cards = [this.svg1[index]]
	  }else{
		  if(this.vewCard.length>0){
			  cards = this.vewCard[0].isMoved?this.vewCard[0]:[]
		  }
	  }
	  if(cards.length==0){
		  // 请选择牌 再点击出牌
		  return
	  }
	  this.socketIO.emit('playCard',{type:'playCard',roomId:this.roomIdNow,cards})
  }
  // 点击除了出牌 其他功能按钮
  clickBtn(str:string){
	  let cards = []
	  let click = str
	  let own = false;
	  if(this.players.player.drawCards.length>0){
		  own = true;
	  }
	  let sendcard = this.housePlayerArr[this.playInfo.sendIndex].sendCards[this.housePlayerArr[this.playInfo.sendIndex].sendCards.length-1]
	  if(str=='peng'){
		  // 传 手牌两张（能与打的牌 凑三个的）
		  let newcards = this.players.player.cards
		  for(let i = 0;i<newcards.length;i++){
			  if(newcards[i].suit==sendcard.suit&&newcards[i].value == sendcard.value&&cards.length<2){
				  cards.push(newcards[i])
			  }
		  }
	  }
	  if(str=='chi'){
		  // 传 手牌两张（能与上家打的牌 凑顺子的）
		  //  "首位": false,		  //  "中间": false,		  //  "末尾": false
		  let newcards = this.players.player.cards
		  if(this.players.player.chiArr['首位']){
			  for(let i = 0;i<newcards.length;i++){
			  	if(newcards[i].suit==sendcard.suit&&newcards[i].value == (sendcard.value+1)&&cards.length<2){
			  		cards.push(newcards[i])
			  	}
				if(newcards[i].suit==sendcard.suit&&newcards[i].value == (sendcard.value+2)&&cards.length<2){
					cards.push(newcards[i])
				}
			  }
		  }else if(this.players.player.chiArr['中间']){
			  for(let i = 0;i<newcards.length;i++){
			  	if(newcards[i].suit==sendcard.suit&&newcards[i].value == (sendcard.value-1)&&cards.length<2){
			  		cards.push(newcards[i])
			  	}
			  	if(newcards[i].suit==sendcard.suit&&newcards[i].value == (sendcard.value+1)&&cards.length<2){
			  		cards.push(newcards[i])
			  	}
			  }
		  }else if(this.players.player.chiArr['末尾']){
			  for(let i = 0;i<newcards.length;i++){
			  	if(newcards[i].suit==sendcard.suit&&newcards[i].value == (sendcard.value-2)&&cards.length<2){
			  		cards.push(newcards[i])
			  	}
			  	if(newcards[i].suit==sendcard.suit&&newcards[i].value == (sendcard.value-1)&&cards.length<2){
			  		cards.push(newcards[i])
			  	}
			  }
		  }
	  }
	  if(str=='gang'){
		  // 摸到的杠 可以不传牌
		  // 别人打的  传手牌三张（能与打的牌 凑四个的）
		  if(!own){
			  let newcards = this.players.player.cards
			  for(let i = 0;i<newcards.length;i++){
			  	if(newcards[i].suit==sendcard.suit&&newcards[i].value == sendcard.value&&cards.length<3){
			  		cards.push(newcards[i])
			  	}
			  }
		  }
	  }
	  if(str=='xfgang'){
		  // 传组成旋风杠的牌 中发白 或 东南西北风
		  let newcards = [...this.players.player.cards,...this.players.player.drawCards]
		  let wordarr = []
		  let threearr = []
		  for(let i = 0;i<newcards.length;i++){
			  // 东南西北风
		  	if(newcards[i].suit=='Word'&&newcards[i].value == 1&&wordarr.findIndex((e:any)=>e.value==1)==-1){
		  		wordarr.push(newcards[i])
		  	}
			if(newcards[i].suit=='Word'&&newcards[i].value == 2&&wordarr.findIndex((e:any)=>e.value==2)==-1){
				wordarr.push(newcards[i])
			}
			if(newcards[i].suit=='Word'&&newcards[i].value == 3&&wordarr.findIndex((e:any)=>e.value==3)==-1){
				wordarr.push(newcards[i])
			}
			if(newcards[i].suit=='Word'&&newcards[i].value == 4&&wordarr.findIndex((e:any)=>e.value==4)==-1){
				wordarr.push(newcards[i])
			}
			// 中发白
			if(newcards[i].suit=='ThreeDollar'&&newcards[i].value == 1&&wordarr.findIndex((e:any)=>e.value==1)==-1){
				threearr.push(newcards[i])
			}
			if(newcards[i].suit=='ThreeDollar'&&newcards[i].value == 2&&wordarr.findIndex((e:any)=>e.value==2)==-1){
				threearr.push(newcards[i])
			}
			if(newcards[i].suit=='ThreeDollar'&&newcards[i].value == 3&&wordarr.findIndex((e:any)=>e.value==3)==-1){
				threearr.push(newcards[i])
			}
		  }
		  cards = wordarr.length==4?wordarr:threearr
	  }
	  if(str=='hu'){
		  
	  }
	  this.socketIO.emit('playCard',{type:'clickBtn',roomId:this.roomIdNow,own,click,cards})
  }
  ready() {
    console.log("我准备好了");
    this.socketIO.emit("match", { type: "ready", roomId: this.roomIdNow });
  }
  roomLeave() {
    console.log("离开");
    this.socketIO.emit("match", { type: "leaveRoom", roomId: this.roomIdNow });
    this.showPlay = false;
  }
  notReady() {
    console.log("我取消准备了");
    this.socketIO.emit("match", { type: "notReady", roomId: this.roomIdNow });
  }

  createMessage(type: string, msg: any): void {
    this.message.create(type, `${msg}`);
  }
  // 创建房间按钮点击
  roomCreate() {
    this.choseMultiples = true;
  }
  // 取消点击加倍
  cancelMultiple() {
    this.showPlay = false;
    this.choseMultiples = false;
  }
  // 加入房间按钮点击
  joinRoom() {
    this.roomid = "";
    this.isVisible = true;
  }
  // 加入房间
  roomAdd() {
    let roomId = this.roomid;
    if (!roomId) {
      this.createMessage("error", "缺少id或roomid");
      return;
    }
    this.socketIO.emit("match", { type: "joinRoom", roomId });
  }
  // 取消加入房间
  joinRoomCancel() {
    this.isVisible = false;
  }
  // 选择倍数进入房间
  choseMultiple() {
    this.socketIO.emit("match", { type: "createRoom" });

    // setTimeout(() => {
    //   this.startGame();
    // }, 100);
    // let timeInterval = setInterval(() => {
    //   if (this.timeOut >= 1) {
    //     this.timeOut -= 1;
    //   } else {
    //     this.timeOut = 0;
    //     clearInterval(timeInterval);
    //   }
    // }, 1000);
  }
  // 启动游戏绘画视图
  async startGame() {
    this.canvas = document.getElementById("canvas");
    this.northOne = document.getElementById("northOne");
    this.southOne = document.getElementById("southOne");
    this.westOne = document.getElementById("westOne");
    this.myDisplayCard = document.getElementById("myDisplayCard");
    this.myDisplayCard = document.getElementById("myDisplayCard");
    this.northOneDisplayCard = document.getElementById("northOneDisplayCard");
    this.westOneDisplayCard = document.getElementById("westOneDisplayCard");
    this.southOneDisplayCard = document.getElementById("southOneDisplayCard");
    this.myDisplayCard1 = document.getElementById("myDisplayCard1");
    this.drawerMaJiang(this.svg1, this.canvas, "mine");
    this.drawerMaJiang(this.vewCard, this.myDisplayCard1, "mineNew");
    this.drawerNorthOne(13);
    this.drawerSouthOne(13);
    this.drawerWestOne(13);
    this.drawerMaJiang(
      this.svgMyDisplayCard,
      this.myDisplayCard,
      "myDisplayCard"
    );
    this.drawerMaJiang(
      this.svgNorthOneDisplayCard,
      this.northOneDisplayCard,
      "northDisplayCard"
    );
    this.drawerMaJiang(
      this.svgNorthOneDisplayCard,
      this.westOneDisplayCard,
      "westOneDisplayCard"
    );
    this.drawerMaJiang(
      this.svgNorthOneDisplayCard,
      this.southOneDisplayCard,
      "southOneDisplayCard"
    );
  }

  drawerWestOne(num: any) {
    let name = "assets/maJiang/background.svg";
    for (let i = 1; i <= num; i++) {
      this.drawSingleWestOne(name);
    }
  }

  drawerNorthOne(num: any) {
    let name = "assets/maJiang/verticalView.svg";
    for (let i = 1; i <= num; i++) {
      this.drawSingleNorthOne(name);
    }
  }

  drawerSouthOne(num: any) {
    let name = "assets/maJiang/verticalView.svg";
    for (let i = 1; i <= num; i++) {
      this.drawSingleSouthOne(name);
    }
  }

  async drawSingleWestOne(name: string) {
    return new Promise<void>((resolve) => {
      var tempCanvas: any = document.createElement("canvas");
      tempCanvas.width = 60;
      tempCanvas.height = 80;
      this.westOne.appendChild(tempCanvas);
      this.loadSVG(name).then((svgContent: any) => {
        const ctx = tempCanvas.getContext("2d");
        Canvg.fromString(ctx, svgContent, {
          scaleWidth: 188,
          scaleHeight: 248,
          offsetX: 20,
          offsetY: 24,
        }).render();
        resolve();
      });
    });
  }

  drawSingleNorthOne(name: string) {
    return new Promise<void>((resolve) => {
      var tempCanvas: any = document.createElement("canvas");
      // tempCanvas.style.transform = "rotate(90deg)";
      tempCanvas.width = 20;
      tempCanvas.height = 30;
      this.northOne.appendChild(tempCanvas);
      this.loadSVG(name).then((svgContent: any) => {
        const ctx = tempCanvas.getContext("2d");
        Canvg.fromString(ctx, svgContent, {
          scaleWidth: 260,
          scaleHeight: 700,
        }).render();
        resolve();
      });
    });
  }

  drawSingleSouthOne(name: string) {
    return new Promise<void>((resolve) => {
      var tempCanvas: any = document.createElement("canvas");
      // tempCanvas.style.transform = "rotate(90deg)";
      tempCanvas.width = 20;
      tempCanvas.height = 30;
      this.southOne.appendChild(tempCanvas);
      this.loadSVG(name).then((svgContent: any) => {
        const ctx = tempCanvas.getContext("2d");
        Canvg.fromString(ctx, svgContent, {
          scaleWidth: 260,
          scaleHeight: 700,
        }).render();
        resolve();
      });
    });
  }

  // 绘画麻将
  drawerMaJiang(svg1: any, canvasName: any, canMove: any) {
	console.log(canvasName.childern)
    if (canMove == "mine") {
      svg1.forEach((ele: any, index: number) => {
        var tempCanvas: any = document.createElement("canvas");
        tempCanvas.width = 60;
        tempCanvas.height = 80;
        tempCanvas.setAttribute("data-index", index.toString()); // 记录索引
        tempCanvas.setAttribute("type", ele.suit); // 记录索引
        tempCanvas.setAttribute("isNew", "old"); // 记录索引
        canvasName.appendChild(tempCanvas);
        this.loadSVG("assets/maJiang/" + ele.value + ele.suit + ".svg").then(
          (svgContent: any) => {
            const ctx = tempCanvas.getContext("2d");
            Canvg.fromString(ctx, svgContent, {
              scaleWidth: 190,
              scaleHeight: 240,
              offsetX: 20,
              offsetY: 24,
            }).render();
          }
        );
      });
    } else if (canMove == "myDisplayCard") {
      svg1.forEach((ele: any, index: number) => {
        var tempCanvas: any = document.createElement("canvas");
        tempCanvas.width = 60;
        tempCanvas.height = 80;
        canvasName.appendChild(tempCanvas);
        this.loadSVG("assets/maJiang/" + ele.value + ele.suit + ".svg").then(
          (svgContent: any) => {
            const ctx = tempCanvas.getContext("2d");
            Canvg.fromString(ctx, svgContent, {
              scaleWidth: 190,
              scaleHeight: 240,
              offsetX: 20,
              offsetY: 24,
            }).render();
          }
        );
      });
    } else if (
      canMove == "northDisplayCard" ||
      canMove == "westOneDisplayCard" ||
      canMove == "southOneDisplayCard"
    ) {
      svg1.forEach((ele: any, index: number) => {
        var tempCanvas: any = document.createElement("canvas");
        tempCanvas.width = 38;
        tempCanvas.height = 50;
        canvasName.appendChild(tempCanvas);
        this.loadSVG("assets/maJiang/" + ele.value + ele.suit + ".svg").then(
          (svgContent: any) => {
            const ctx = tempCanvas.getContext("2d");
            Canvg.fromString(ctx, svgContent, {
              scaleWidth: 190,
              scaleHeight: 240,
              offsetX: 12.5,
              offsetY: 15,
            }).render();
          }
        );
      });
    } else if (canMove == "mineNew") {
      svg1.forEach((ele: any, index: number) => {
        var tempCanvas: any = document.createElement("canvas");
        tempCanvas.width = 60;
        tempCanvas.height = 80;
        tempCanvas.setAttribute("data-index", index.toString()); // 记录索引
        tempCanvas.setAttribute("type", ele.suit); // 记录索引
        tempCanvas.setAttribute("isNew", "new"); // 记录索引
        canvasName.appendChild(tempCanvas);
        this.loadSVG("assets/maJiang/" + ele.value + ele.suit + ".svg").then(
          (svgContent: any) => {
            const ctx = tempCanvas.getContext("2d");
            Canvg.fromString(ctx, svgContent, {
              scaleWidth: 190,
              scaleHeight: 240,
              offsetX: 20,
              offsetY: 24,
            }).render();
          }
        );
      });
    }
  }
  // 加载svg
  async loadSVG(url: string): Promise<string> {
    const response = await fetch(url);
    return response.text();
  }
  // 移动麻将
  choseMaJiang(e: any) {
    const clickedElement = e.target;
    // 检查是否是 canvas 元素
    if (clickedElement.tagName.toLowerCase() === "canvas") {
      const index = clickedElement.getAttribute("data-index");
      const isNew = clickedElement.getAttribute("isNew");
      if (isNew == "old") {
        this.vewCard.forEach((element: any, i: number) => {
          // 将所有元素设置为初始状态
          const canvasElement: any = document.querySelector(`[isNew="new"]`);
          if (canvasElement) {
            canvasElement.style.transform = "translateY(0)";
            element.isMoved = false;
          }
        });
        if (this.svg1[index].isMoved) {
          clickedElement.style.transform = "translateY(0)";
          this.svg1[index].isMoved = !this.svg1[index].isMoved;
        } else {
          this.svg1.forEach((element: any, i: number) => {
            // 将所有元素设置为初始状态
            const canvasElement: any = document.querySelector(
              `[data-index="${i}"]`
            );
            if (canvasElement) {
              canvasElement.style.transform = "translateY(0)";
              element.isMoved = false;
            }
          });
          clickedElement.style.transform = "translateY(-15px)";
          this.svg1[index].isMoved = !this.svg1[index].isMoved;
        }
      } else {
        this.svg1.forEach((element: any, i: number) => {
          // 将所有元素设置为初始状态
          const canvasElement: any = document.querySelector(
            `[data-index="${i}"]`
          );
          if (canvasElement) {
            canvasElement.style.transform = "translateY(0)";
            element.isMoved = false;
          }
        });
        if (this.vewCard[index].isMoved) {
          clickedElement.style.transform = "translateY(0)";
          this.vewCard[index].isMoved = !this.vewCard[index].isMoved;
        } else {
          this.vewCard.forEach((element: any, i: number) => {
            // 将所有元素设置为初始状态
            const canvasElement: any = document.querySelector(
              `[data-index="${i}"]`
            );
            if (canvasElement) {
              canvasElement.style.transform = "translateY(0)";
              element.isMoved = false;
            }
          });
          clickedElement.style.transform = "translateY(-15px)";
          this.vewCard[index].isMoved = !this.vewCard[index].isMoved;
        }
      }
    }
  }
}
