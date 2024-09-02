import { Component, HostListener, OnInit } from "@angular/core";
import { io } from "../../../services/js/socket.io.js";
import { environment } from "../../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "ngx-tank-battle",
  templateUrl: "./tank-battle.component.html",
  styleUrls: ["./tank-battle.component.scss"],
})
export class TankBattleComponent implements OnInit {
  tank: any;
  tankBoxWidth: any;
  tankBoxHeight: any;
  isMoving: boolean = false;
  offSetX: any;
  offSetY: any;
  TankLeft: any;
  TankTop: any;
  gameStart: any = false;
  iscreatRoom: any = false;
  ref: any;
  loading = true;
  leftGrid = 30;
  topGrid = 15;
  ismove: boolean;
  token = window.localStorage.getItem("token");
  socketObj = {
    auth: {
      token: this.token,
    },
  };
  socketIO: any = null;
  socketSpace = "/tank";
  socketUrl = environment.socketUrl + this.socketSpace;
  tankCanMovePosition: any = [];
  roomIdNow: any = null;
  tankMap: any = {};
  roomid: any = "";
  players: any = [];
  roomDetail: any = [];
  mine: any = {};
  isVisible: any = false;
  gameInnerBox:any
  teammate: any;
  enemyTeam: any;
  ngOnDestroy() {
    console.log("注销页面");
    this.socketIO.off();
    this.socketIO.disconnect();
  }
  constructor(private toast: ToastrService,) {}
  ngOnInit(): void {
    this.connect();
    setTimeout(() => {
      var tankGame: any = document.getElementById("tankGame");
      let width = tankGame.offsetWidth;
      let height = tankGame.offsetHeight;
      this.tankBoxWidth = this.getSize(width, this.leftGrid);
      this.tankBoxHeight = this.getSize(height, this.topGrid);
      this.boxWidth = this.tankBoxWidth / this.leftGrid + "px";
      this.boxHeight = this.tankBoxHeight / this.topGrid + "px";
      tankGame.style.width = this.tankBoxWidth + "px";
      tankGame.style.height = this.tankBoxHeight + "px";
      tankGame.style.backgroundColor = "#ccc";
      this.loading = false;
    }, 1000);
  }
  // 复制
  copy(text: any) {
    const el = document.createElement("input");
    el.setAttribute("value", text);
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    this.createMessage("success", "复制成功");
  }
  // 消息弹窗
  createMessage(type: string, msg: any): void {
    this.toast.info(`${msg}`);
  }
  // 创建房间
  creatRoom() {
    this.socketIO.emit("match", { type: "createRoom" });
  }
  // 点击加入房间
  joinRoom() {
    this.roomid = "";
    this.isVisible = true;
  }
  // 确认加入房间
  handleOk(): void {
    let roomId = this.roomid;
    if (!roomId) {
      this.createMessage("error", "缺少id或roomid");
      return;
    }
    this.socketIO.emit("match", { type: "joinRoom", roomId });
  }
  // 取消加入房间
  handleCancel(): void {
    this.isVisible = false;
  }
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
    // 匹配阶段
    this.socketIO.on("match", (data: any) => {
      console.log(data.msg, data);
      this.loading = false;
      if (data.type == "error") {
        this.createMessage("error", data.msg);
        return;
      }
      if (data.type != "connect") {
        this.roomIdNow = data.roomId;
        this.players = data.houseUsers;
        let meIndex = data.houseUsers.findIndex((ele: any) => ele.token == this.token);
        this.mine = data.houseUsers[meIndex];
      }
      if (data.type == "join" || data.type == "create") {
        this.isVisible = false;
        this.iscreatRoom = true;
      }
      if (data.type == "beginGame") {
        this.isVisible = false;
        this.iscreatRoom = false;
        this.tankMap = data.playInfo.map;
        let meIndex = data.houseUsers.findIndex((ele: any) => ele.token == this.token);
        this.mine = data.houseUsers[meIndex];
        this.enemyTeam = data.houseUsers.filter((ele: any) => ele.team != this.mine.team);
        this.teammate = data.houseUsers.filter((ele: any) => ele.team == this.mine.team && ele.name!=this.mine.name);
        this.choseTank();
      }
    });
    //游戏阶段
    this.socketIO.on("play", (data: any) => {
      console.log(data.msg, data);
      // data.direction  data.isMove data.playerIndex //移动人index data.houseUsers中也有position
      if (data.type=='playerMove'&&data.houseUsers[data.playerIndex].token!= this.token) {
        let moveBox =document.getElementById(data.houseUsers[data.playerIndex].clientId)
        moveBox.style.top=data.houseUsers[data.playerIndex].position[1] * parseInt(this.boxHeight) + "px";
        moveBox.style.left = data.houseUsers[data.playerIndex].position[0] * parseInt(this.boxWidth) + "px"; 
        if(data.houseUsers[data.playerIndex].direction=="top"){
          moveBox.style.transform = "rotate(0deg)";
        }
        if(data.houseUsers[data.playerIndex].direction=="down"){
          moveBox.style.transform = "rotate(180deg)";
        }
        if(data.houseUsers[data.playerIndex].direction=="left"){
          moveBox.style.transform = "rotate(270deg)";
        }
        if(data.houseUsers[data.playerIndex].direction=="right"){
          moveBox.style.transform = "rotate(90deg)";
        }
      }
    }); 
  }
  // 更换队伍
  changeTeam(team: any) {
    this.socketIO.emit("match", {
      type: "changeTeam",
      roomId: this.roomIdNow,
      team: team,
    });
  }
  // 离开房间
  leaveHome() {
    this.iscreatRoom = false;
    this.socketIO.emit("match", { type: "leaveRoom", roomId: this.roomIdNow });
  }
  boxWidth = "0px";
  boxHeight = "0px";
  //获取元素属性值函数
  getStyle(ele: any, attr: any) {
    var res = null;
    if (ele.currentStyle) {
      res = ele.currentStyle[attr];
    } else {
      res = window.getComputedStyle(ele, null)[attr];
    }
    return parseFloat(res);
  }
  //创建子弹的计时器
  shotTimer: any = null;
  bullet1W = 6;
  bullet1H = 14;
  bullet2W = 14;
  bullet2H = 6;
  bulletS = [];
  bulletSpeed = 0.1; //子弹速度
  bulletCount = 3; //子弹容量
  bulletCountNow = 0; //当前子弹发射的数量    = bulletCount时 换弹
  bulletChangeTime = 2; //换弹速度 * 1000
  shotRange = 3; //射程 几格
  denseTime = 3; //迷雾消散时间
  tankSpeed = 1; //坦克速度
  visibleRange = 1;
  //   shot() {
  //     if (this.bulletCountNow < this.bulletCount) {
  //       // 当前子弹+1
  //       this.bulletCountNow += 1;
  //       // 发射子弹
  //       this.createBullet();
  //       // 换弹
  //       if (this.bulletCountNow >= this.bulletCount) {
  //         this.bulletChanges();
  //       }
  //     }
  //   }
  //   // 更换子弹
  //   bulletChanges() {
  //     let isBulletChange: any = null;
  //     setTimeout(() => {
  //       isBulletChange = document.getElementById("isBulletChange");
  //       isBulletChange.style.width = "100%";
  //     }, 10);
  //     setTimeout(() => {
  //       this.bulletCountNow = 0;
  //       isBulletChange.style.width = "0px";
  //     }, this.bulletChangeTime * 1000);
  //   }
  //   //创建子弹
  //   createBullet() {
  //     let direction = this.getTankDirection();
  //     var bullets = document.getElementById("bullets");
  //     var bullet = new Image();
  //     // 获取子弹方向
  //     bullet.src = this.getBulletDirection(direction);
  //     bullet.className = "b";
  //     // 获取子弹发射位置
  //     var mybulletL = this.getBulletPosition(direction)[0];
  //     var mybulletT = this.getBulletPosition(direction)[1];
  //     bullet.style.position = "absolute";
  //     bullet.style.zIndex = "102";
  //     bullet.style.left = mybulletL + "px";
  //     bullet.style.top = mybulletT + "px";
  //     bullets.appendChild(bullet);
  //     this.bulletS.push(bullet);
  //     this.bulletMove(bullet, direction);
  //   }
  //   // 获取子弹方向 横 竖
  //   getBulletDirection(direction: any) {
  //     var src = "";
  //     if (direction == "up" || direction == "down") {
  //       src = "../../../../assets/tank/bullet1.png";
  //     }
  //     if (direction == "right" || direction == "left") {
  //       src = "../../../../assets/tank/bullet2.png";
  //     }
  //     return src;
  //   }
  //   // 获取子弹发射位置
  //   getBulletPosition(direction: any) {
  //     var tank: any = document.getElementById("tank");
  //     var myTankL = this.getStyle(tank, "left"), myTankT = this.getStyle(tank, "top");
  //     var mybulletL = 0;
  //     var mybulletT = 0;
  //     if (direction == "up") {
  //       mybulletL = myTankL + parseInt(this.boxWidth) / 2 - this.bullet1W / 2;
  //       mybulletT = myTankT - this.bullet1H;
  //     }
  //     if (direction == "down") {
  //       mybulletL = myTankL + parseInt(this.boxWidth) / 2 - this.bullet1W / 2;
  //       mybulletT = myTankT + parseInt(this.boxHeight);
  //     }
  //     if (direction == "left") {
  //       mybulletL = myTankL - this.bullet2W;
  //       mybulletT = myTankT + parseInt(this.boxHeight) / 2 - this.bullet2H / 2;
  //     }
  //     if (direction == "right") {
  //       mybulletL = myTankL + parseInt(this.boxWidth);
  //       mybulletT = myTankT + parseInt(this.boxHeight) / 2 - this.bullet2H / 2;
  //     }
  //     return [mybulletL, mybulletT];
  //   }
  //   // 清空子弹
  //   clearBullet(ele: any) {
  //     clearInterval(ele.timer);
  //     ele.timer = null;
  //     ele.parentNode.removeChild(ele);
  //     this.bulletS.shift();
  //   }
  //   //子弹的运动 及 消失
  //   bulletMove(ele: any, direction: any) {
  //     var speed = -this.bulletSpeed;
  //     let attr = "top";
  //     if (direction == "down" || direction == "right") {
  //       speed = this.bulletSpeed;
  //     }
  //     if (direction == "left" || direction == "right") {
  //       attr = "left";
  //     }
  //     // 计算速度
  //     speed = parseInt(this.boxWidth) * speed;
  //     // 取子弹的在哪个格子 就是坦克的top和left
  //     let top = this.TankTop;
  //     let left = this.TankLeft;
  //     ele.timer = setInterval(() => {
  //       // 子弹移动的top或left值
  //       var moveVal = this.getStyle(ele, attr);
  //       // 超出范围 边界
  //       if (((direction == "up" || direction == "left") && moveVal <= 0) ||(direction == "right" &&moveVal >= this.tankBoxWidth - this.bullet2W) ||(direction == "down" && moveVal >= this.tankBoxHeight - this.bullet1H)) {
  //         this.clearBullet(ele);
  //       } else {
  //         // 碰撞墙壁 超出射程消失
  //         ele.style[attr] = moveVal + speed + "px";
  //         this.bulletDie(direction, moveVal, ele, top, left);
  //       }
  //     }, 10);
  //   }
  //   // 子弹碰撞墙壁消失 超出射程消失
  //   bulletDie(direction: any, moveVal: any, ele: any, top: any, left: any) {
  //     var tankBox: any = document.getElementById("tankBox");
  //     let deleteBox=[]
  //     if (direction == "right") {
  //       let index = this.tankCantMovePosition.findIndex((item: any) =>item.y == top &&moveVal + this.bullet2W >= item.x &&moveVal <= item.x);
  //       if (index != -1) {
  //         // 碰撞墙壁
  //         if (this.tankCantMovePosition[index].name == "OrdinaryBox") {
  //           deleteBox.push({
  //             X: this.tankCantMovePosition[index].x / parseInt(this.boxWidth),
  //             Y:this.tankCantMovePosition[index].y / parseInt(this.boxHeight)
  //           })
  //           let index1=this.tankMap.OrdinaryBox.findIndex((ele: any) => ele.X==this.tankCantMovePosition[index].x / parseInt(this.boxWidth)&&ele.Y==this.tankCantMovePosition[index].y / parseInt(this.boxHeight))
  // 		  this.tankCantMovePosition.splice(index, 1)
  // 		  let item = this.tankMap.OrdinaryBox.splice(index1, 1)[0];
  // 		  this.tankCanMovePosition.push({x:item.X*parseInt(this.boxWidth),y:item.Y*parseInt(this.boxHeight),Z:0})
  // 		  this.tankMap.VoidBox.push(item)
  //         }
  //         this.clearBullet(ele);
  //       } else if (moveVal + this.bullet2W >=left +parseInt(this.boxWidth) / 2 +this.shotRange * parseInt(this.boxWidth)) {
  //         // 超出射程 三格 = 2.5格消失
  //         this.clearBullet(ele);
  //       }
  //     }
  //     if (direction == "left") {
  //       let index = this.tankCantMovePosition.findIndex((item: any) =>item.y == top &&moveVal <= item.x + parseInt(this.boxWidth) &&moveVal >= item.x);
  //       if (index != -1) {
  //         if (this.tankCantMovePosition[index].name == "OrdinaryBox") {
  //           deleteBox.push({
  //             X: this.tankCantMovePosition[index].x / parseInt(this.boxWidth),
  //             Y:this.tankCantMovePosition[index].y / parseInt(this.boxHeight)
  //           })
  //           let index1=this.tankMap.OrdinaryBox.findIndex((ele: any) => ele.X==this.tankCantMovePosition[index].x / parseInt(this.boxWidth)&&ele.Y==this.tankCantMovePosition[index].y / parseInt(this.boxHeight))
  // 		  this.tankCantMovePosition.splice(index, 1);
  // 		  let item = this.tankMap.OrdinaryBox.splice(index1, 1)[0];
  // 		  this.tankCanMovePosition.push({x:item.X*parseInt(this.boxWidth),y:item.Y*parseInt(this.boxHeight),Z:0})
  // 		  this.tankMap.VoidBox.push(item)
  //         }
  //         this.clearBullet(ele);
  //       } else if (moveVal <=left +parseInt(this.boxWidth) / 2 -this.shotRange * parseInt(this.boxWidth)) {
  //         this.clearBullet(ele);
  //       }
  //     }
  //     if (direction == "down") {
  //       let index = this.tankCantMovePosition.findIndex((item: any) => item.x == left && moveVal <= item.y && moveVal + this.bullet1H >= item.y);
  //       if (index != -1) {
  //         this.clearBullet(ele);
  //         if (this.tankCantMovePosition[index].name == "OrdinaryBox") {
  //           deleteBox.push({
  //             X: this.tankCantMovePosition[index].x / parseInt(this.boxWidth),
  //             Y:this.tankCantMovePosition[index].y / parseInt(this.boxHeight)
  //           })
  //           let index1=this.tankMap.OrdinaryBox.findIndex((ele: any) => ele.X==this.tankCantMovePosition[index].x / parseInt(this.boxWidth)&&ele.Y==this.tankCantMovePosition[index].y / parseInt(this.boxHeight))
  // 		  this.tankCantMovePosition.splice(index, 1);
  // 		  let item = this.tankMap.OrdinaryBox.splice(index1, 1)[0];
  // 		  this.tankCanMovePosition.push({x:item.X*parseInt(this.boxWidth),y:item.Y*parseInt(this.boxHeight),Z:0})
  // 		  this.tankMap.VoidBox.push(item)
  //         }
  //       } else if ( moveVal + this.bullet1H >= top +parseInt(this.boxHeight) / 2 +this.shotRange * parseInt(this.boxHeight)) {
  //         this.clearBullet(ele);
  //       }
  //     }
  //     if (direction == "up") {
  //       let index = this.tankCantMovePosition.findIndex((item: any) =>item.x == left &&moveVal <= item.y + parseInt(this.boxHeight) &&moveVal >= item.y);
  //       if (index != -1) {
  //         this.clearBullet(ele);
  //         if (this.tankCantMovePosition[index].name == "OrdinaryBox") {
  //           deleteBox.push({
  //             X: this.tankCantMovePosition[index].x / parseInt(this.boxWidth),
  //             Y:this.tankCantMovePosition[index].y / parseInt(this.boxHeight)
  //           })
  //           let index1=this.tankMap.OrdinaryBox.findIndex((ele: any) => ele.X==this.tankCantMovePosition[index].x / parseInt(this.boxWidth)&&ele.Y==this.tankCantMovePosition[index].y / parseInt(this.boxHeight))
  // 		  this.tankCantMovePosition.splice(index, 1);
  // 		  let item = this.tankMap.OrdinaryBox.splice(index1, 1)[0];
  // 		  this.tankCanMovePosition.push({x:item.X*parseInt(this.boxWidth),y:item.Y*parseInt(this.boxHeight),Z:0})
  // 		  this.tankMap.VoidBox.push(item)
  //         }
  //       } else if (moveVal <=top +parseInt(this.boxHeight) / 2 -this.shotRange * parseInt(this.boxHeight)) {
  //         this.clearBullet(ele);
  //       }
  //     }
  //     this.drawerMetalBox(deleteBox, tankBox, "#ccc", "deleteBox");
  //   }
  //   // 获取坦克方向
  //   getTankDirection() {
  //     let direction = "up";
  //     if (this.tank.style.transform == "rotate(0deg)") {
  //       direction = "up";
  //     }
  //     if (this.tank.style.transform == "rotate(90deg)") {
  //       direction = "right";
  //     }
  //     if (this.tank.style.transform == "rotate(180deg)") {
  //       direction = "down";
  //     }
  //     if (this.tank.style.transform == "rotate(270deg)") {
  //       direction = "left";
  //     }
  //     return direction;
  //   }

  getSize(num: number, copies: number) {
    num = parseInt(num + "");
    let data = 0;
    for (let i = num; i > 0; i--) {
      if (i / copies == parseInt(i / copies + "")) {
        data = i;
        break;
      }
    }
    return data;
  }
  // 点击开始游戏
  clickStart() {
    this.socketIO.emit("match", {
      type: "beginGame",
      roomId: this.roomIdNow,
      mapX: this.tankBoxWidth / parseInt(this.boxWidth),
      mapY: this.tankBoxHeight / parseInt(this.boxHeight),
    });
  }
  // 开始游戏
  startGame() {
    var tankBox: any = document.getElementById("tankBox");
    let total = (this.tankBoxWidth / parseInt(this.boxWidth)) * (this.tankBoxHeight / parseInt(this.boxHeight));
    var tankBoxRect = tankBox.getBoundingClientRect();
    this.offSetX = tankBoxRect.x;
    this.offSetY = tankBoxRect.y;
    for (let i = 0; i < total; i++) {
      var tempCanvas: any = document.createElement("div");
      tempCanvas.style.width = this.boxWidth;
      tempCanvas.style.height = this.boxHeight;
      tankBox.appendChild(tempCanvas);
    }
    var keys = Object.keys(this.tankMap.x);
    for (var i = 0; i < keys.length; i++) {
      this.drawObstacle(this.tankMap.x[keys[i]], tankBox);
    }
    this.tank = document.getElementById("tank");  
    this.tank.style.zIndex = 101;
    this.tank.style.top =this.mine.position[1] * parseInt(this.boxHeight) + "px";
    this.tank.style.left = this.mine.position[0] * parseInt(this.boxWidth) + "px";
    this.tank.style.backgroundImage = `url(../../../../assets/tank/${this.nowTank.name}.png)`;
    this.tank.style.backgroundRepeat = "no-repeat";
    this.TankLeft = this.mine.position[0] * parseInt(this.boxWidth);
    this.TankTop = this.mine.position[1] * parseInt(this.boxHeight);
    this.tank.style.transition = `all ${(this.tankSpeed * 1.5) / 1000}s linear`;
    this.gameInnerBox = document.getElementById("gameInnerBox");
    for (let i = 0; i < this.enemyTeam.length; i++){
      var tempCanvas: any = document.createElement("div");
      tempCanvas.style.width = this.tank.style.width;
      tempCanvas.style.height =  this.tank.style.height;
      tempCanvas.style.position = "absolute"
      tempCanvas.style.top=this.enemyTeam[i].position[1] * parseInt(this.boxHeight) + "px";
      tempCanvas.style.left = this.enemyTeam[i].position[0] * parseInt(this.boxWidth) + "px";
      tempCanvas.style.transition = `all ${(this.tankSpeed * 1.5) / 1000}s linear`;
      tempCanvas.style.backgroundSize = "100% 100%";
      tempCanvas.style.backgroundRepeat = "no-repeat";
      tempCanvas.style.zIndex = '101'
      tempCanvas.style.backgroundImage = 'url("../../../../assets/tank/greenTank.png")'
      tempCanvas.setAttribute('id',this.enemyTeam[i].clientId);
      this.gameInnerBox.appendChild(tempCanvas);
    }
    for (let i = 0; i < this.teammate.length; i++){
      var tempCanvas: any = document.createElement("div");
      tempCanvas.style.width = "60px";
      tempCanvas.style.height = "60px";
      tempCanvas.style.position = "absolute"
      tempCanvas.style.top=this.teammate[i].position[1] * parseInt(this.boxHeight) + "px";
      tempCanvas.style.left = this.teammate[i].position[0] * parseInt(this.boxWidth) + "px";
      tempCanvas.style.transition = `all ${(this.tankSpeed * 1.5) / 1000}s linear`;
      tempCanvas.style.backgroundSize = "100% 100%";
      tempCanvas.style.backgroundRepeat = "no-repeat";
      tempCanvas.style.zIndex = '102'
      tempCanvas.style.backgroundImage = 'url("../../../../assets/tank/greenTank.png")'
      tempCanvas.setAttribute('id', this.enemyTeam[i].clientId);
      this.gameInnerBox.appendChild(tempCanvas);
    }
    this.drawVisible();
  }

  // 绘画所有障碍物
  drawObstacle(tankMap: any, tankBox: any) {
    tankMap.forEach((ele: any) => {
      if (ele.name == "NestleBox") {
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.opacity = 0.7;
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.zIndex = 102;
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.backgroundImage = `url(../../../../assets/tank/${ele.name}.svg)`;
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.backgroundSize = "cover";
      } else if (ele.name == "MetalBox" || ele.name == "OrdinaryBox") {
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.backgroundImage = `url(../../../../assets/tank/${ele.name}.svg)`;
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.backgroundSize = "cover";
      } else if (ele.name == "VoidBox") {
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.zIndex = 102;
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.transition = "0.2s";
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.transitionDelay = this.denseTime - 0.2 + "s";
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.transitionTimingFunction = "linear";
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.backgroundColor = "#000";
      }
    });
  }

  // 键盘点击事件
  @HostListener("document:keydown", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (this.gameStart) {
      this.keyboardEvent(event);
    }
  }
  keyboardEvent(event: any) {
    let left = this.tank.style.left;
    let top = this.tank.style.top;
    //   if (event.key == " ") {
    //     // console.log('按空格射击')
    //     this.shot();
    //   }
    //   // 手动换弹
    //   if (event.key == "r" || event.key == "R") {
    //     // 满子弹和正在换弹不能换弹
    //     if (this.bulletCountNow < this.bulletCount &&this.bulletCountNow != 0) {
    //       this.bulletCountNow = this.bulletCount;
    //       // 可以换弹
    //       this.bulletChanges();
    //     }
    //   }
    if (event.key == "D" || event.key == "d" || event.key == "W" || event.key == "w" || event.key == "s" || event.key == "S" || event.key == "A" || event.key == "a") {
      if (this.ismove) return;
      this.ismove = true;
      setTimeout(() => {
        this.ismove = false;
      }, this.tankSpeed);
    }
    if (event.key == "D" || event.key == "d") {
      if (this.tank.style.transform == "rotate(90deg)") {
        if (this.TankLeft + parseInt(this.boxWidth) >= this.tankBoxWidth - parseInt(this.boxWidth)) {
          this.TankLeft = this.tankBoxWidth - parseInt(this.boxWidth);
          this.tank.style.left = this.tankBoxWidth - parseInt(this.boxWidth) + "px";
          this.tank.style.transform = "rotate(90deg)";
        } else {
          let isMoveY = parseInt(this.tank.style.top) / parseInt(this.boxHeight);
          let isMoveX = parseInt(this.tank.style.left) / parseInt(this.boxWidth) + 1;
          if (this.tankMap.y[isMoveY][isMoveX].name != "OrdinaryBox" && this.tankMap.y[isMoveY][isMoveX].name != "MetalBox") {
            this.TankLeft = this.TankLeft + parseInt(this.boxWidth);
            this.tank.style.left = this.TankLeft + "px";
            this.socketIO.emit("play", { type: "playerMove",direction:'right',isMove:1,roomId: this.roomIdNow });
          } else {
            this.TankLeft = this.TankLeft;
            this.tank.style.left = this.TankLeft + "px";
          }
        }
      } else {
        this.tank.style.transform = "rotate(90deg)";
        this.socketIO.emit("play", { type: "playerMove",direction:'right',isMove:0,roomId: this.roomIdNow });
      }
    } else if (event.key == "W" || event.key == "w") {
      if (this.tank.style.transform == "rotate(0deg)") {
        if (this.TankTop - parseInt(this.boxHeight) < 0) {
          this.TankTop = 0;
          this.tank.style.top = "0px";
          this.tank.style.transform = "rotate(0deg)";
        } else {
          let isMoveY = parseInt(this.tank.style.top) / parseInt(this.boxHeight) - 1;
          let isMoveX = parseInt(this.tank.style.left) / parseInt(this.boxWidth);
          if (this.tankMap.x[isMoveX][isMoveY].name != "OrdinaryBox" && this.tankMap.x[isMoveX][isMoveY].name != "MetalBox") {
            this.TankTop = this.TankTop - parseInt(this.boxHeight);
            this.tank.style.top = this.TankTop + "px";
            this.socketIO.emit("play", { type: "playerMove",direction:'top',isMove:1,roomId: this.roomIdNow });
          } else {
            this.TankTop = this.TankTop;
            this.tank.style.top = this.TankTop + "px";
          }
        }
      } else {
        this.tank.style.transform = "rotate(0deg)";
        this.socketIO.emit("play", { type: "playerMove",direction:'top',isMove:0,roomId: this.roomIdNow });
      }
    } else if (event.key == "s" || event.key == "S") {
      if (this.tank.style.transform == "rotate(180deg)") {
        if (this.TankTop + parseInt(this.boxHeight) > this.tankBoxHeight - parseInt(this.boxHeight)) {
          this.TankTop = this.tankBoxHeight - parseInt(this.boxHeight);
          this.tank.style.top = this.tankBoxHeight - parseInt(this.boxHeight) + "px";
          this.tank.style.transform = "rotate(180deg)";
        } else {
          let isMoveY = parseInt(this.tank.style.top) / parseInt(this.boxHeight) + 1;
          let isMoveX = parseInt(this.tank.style.left) / parseInt(this.boxWidth);
          if (this.tankMap.x[isMoveX][isMoveY].name != "OrdinaryBox" && this.tankMap.x[isMoveX][isMoveY].name != "MetalBox") {
            this.TankTop = this.TankTop + parseInt(this.boxHeight);
            this.tank.style.top = this.TankTop + "px";
            this.socketIO.emit("play", { type: "playerMove",direction:'down',isMove:1,roomId: this.roomIdNow });
          } else {
            this.TankTop = this.TankTop;
            this.tank.style.top = this.TankTop + "px";
          }
        }
      } else {
        this.tank.style.transform = "rotate(180deg)";
        this.socketIO.emit("play", { type: "playerMove",direction:'down',isMove:0,roomId: this.roomIdNow });
      }
    } else if (event.key == "A" || event.key == "a") {
      if (this.tank.style.transform == "rotate(270deg)") {
        if (this.TankLeft - parseInt(this.boxWidth) < 0) {
          this.TankLeft = 0;
          this.tank.style.left = "0px";
          this.tank.style.transform = "rotate(270deg)";
        } else {
          let isMoveY = parseInt(this.tank.style.top) / parseInt(this.boxHeight);
          let isMoveX = parseInt(this.tank.style.left) / parseInt(this.boxWidth) - 1;
          if (this.tankMap.y[isMoveY][isMoveX].name != "OrdinaryBox" && this.tankMap.y[isMoveY][isMoveX].name != "MetalBox") {
            this.TankLeft = this.TankLeft - parseInt(this.boxWidth);
            this.tank.style.left = this.TankLeft + "px";
            this.socketIO.emit("play", { type: "playerMove",direction:'left',isMove:1,roomId: this.roomIdNow });
          } else {
            this.TankLeft = this.TankLeft;
            this.tank.style.left = this.TankLeft + "px";
          }
        }
      } else {
        this.tank.style.transform = "rotate(270deg)";
        this.socketIO.emit("play", { type: "playerMove",direction:'left',isMove:0,roomId: this.roomIdNow });
      }
    }
    // 迷雾
    if (left != this.tank.style.left || top != this.tank.style.top) {
      this.drawVisible();
    }
  }

  // IsShadows true 变黑 // IsShadows false变可见
  drawerVisiblelBox(tankMap: any, tankBox: any) {
    tankMap.forEach((ele: any) => {
      if (!ele.IsShadows) {
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.zIndex = 101;
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.transition = "0s";
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.backgroundColor = "#ccc";
      } else {
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.zIndex = 102;
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.transition = "0.2s";
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.transitionDelay = this.denseTime - 0.2 + "s";
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.transitionTimingFunction = "linear";
        tankBox.children[ele.coordinates.Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + ele.coordinates.X].style.backgroundColor = "#000";
      }
    });
  }

  // 去重 coordinates
  quchong(tempArr: any) {
    let result = [];
    let obj = {};
    for (let i = 0; i < tempArr.length; i++) {
      if (!obj[tempArr[i].coordinates.X + "," + tempArr[i].coordinates.Y]) {
        result.push(tempArr[i]);
        obj[tempArr[i].coordinates.X + "," + tempArr[i].coordinates.Y] = true;
      }
    }
    return result;
  }
  //绘画可见区域
  drawVisible() {
    var tankBox: any = document.getElementById("tankBox");
    let visibleRange = this.visibleRange;
    let Y = parseInt(this.tank.style.top) / parseInt(this.boxHeight);
    let X = parseInt(this.tank.style.left) / parseInt(this.boxWidth);
    let arr = [];
    // 取坦克为中心 向左向右向上向下 visibleRange+1 范围
    for (let i = -(visibleRange + 1); i <= visibleRange + 1; i++) {
      let yarr = [];
      let xarr = [];
      if (Y + i >= 0 && Y + i < Object.keys(this.tankMap.y).length) {
        yarr = this.tankMap.y[Y + i].filter((e: any) => e.name == "VoidBox");
      }
      if (X + i >= 0 && X + i < Object.keys(this.tankMap.x).length) {
        xarr = this.tankMap.x[X + i].filter((e: any) => e.name == "VoidBox");
      }
      arr.push(...yarr, ...xarr);
    }
    arr = this.quchong(arr);
    arr.forEach((item: any) => {
      item.IsShadows = true;
    });
    // 取变可见位置 赋值false
    for (let i = 0; i < visibleRange * 2 + 1; i++) {
      let ii = i - visibleRange;
      let X1 = X + ii;
      if (i > visibleRange) {
        for (let j = -i + 2 * ii; j <= i - 2 * ii; j++) {
          let indexY = arr.findIndex(
            (ele: any) => ele.coordinates.Y == Y - j && ele.coordinates.X == X1
          );
          if (indexY != -1) {
            arr[indexY].IsShadows = false;
          }
        }
      } else {
        for (let j = -i; j <= i; j++) {
          let indexY = arr.findIndex(
            (ele: any) => ele.coordinates.Y == Y - j && ele.coordinates.X == X1
          );
          if (indexY != -1) {
            arr[indexY].IsShadows = false;
          }
        }
      }
    }
    this.drawerVisiblelBox(arr, tankBox);
  }
  // 选择坦克
  changeTank(number: any) {
    this.nowTank = this.tankArray[number.to];
  }
  // 准备
  choseReady() {
    if (this.mine.ready) {
      this.socketIO.emit("match", { type: "notReady", roomId: this.roomIdNow });
    } else {
      this.socketIO.emit("match", {
        type: "ready",
        roomId: this.roomIdNow,
        tankData: this.nowTank,
      });
    }
  }
  // 添加坦克属性
  choseTank() {
    setTimeout(() => {
      this.startGame();
    }, 100);
    this.gameStart = true;
    this.bulletSpeed = this.nowTank.fire.fireRate / 100; //子弹速度
    this.bulletCount = this.nowTank.fire.ammoCapacity; //子弹容量
    this.bulletChangeTime = 6 - this.nowTank.fire.bulletChangeTime; //换弹时间
    this.shotRange = this.nowTank.fire.shotRange; //射程
    this.tankSpeed = 300 - this.nowTank.maneuverability.tankSpeed * 2; //坦克速度
    this.visibleRange = this.nowTank.investigate.visibleRange; //视野
  }
  nowTank: any = {
    name: "blueTank",
    chineseName: "小坦克",
    fire: {
      lethality: 50, //杀伤力
      fireRate: 30, //射速
      ammoCapacity: 20, //弹药容量
      shotRange: 3, //射程 格
      bulletChangeTime: 2, //换弹速度 s 越高越快
    },
    maneuverability: {
      tankSpeed: 100, //坦克移速
    },
    protection: {
      health: 100, //生命值
      armorThickness: 100, //装甲厚度
    },
    investigate: {
      visibleRange: 1, //侦察
    },
  };
  tankArray: any = [
    {
      name: "blueTank",
      chineseName: "小坦克",
      fire: {
        lethality: 50, //杀伤力
        fireRate: 30, //射速
        ammoCapacity: 20, //弹药容量
        shotRange: 3, //射程 格
        bulletChangeTime: 2, //换弹速度 s 越高越快
      },
      maneuverability: {
        tankSpeed: 10, //坦克移速
      },
      protection: {
        health: 100, //生命值
        armorThickness: 100, //装甲厚度
      },
      investigate: {
        visibleRange: 100,
      },
    },
    {
      name: "greenTank",
      chineseName: "轻型坦克",
      fire: {
        lethality: 50, //杀伤力
        fireRate: 30, //射速
        ammoCapacity: 20, //弹药容量
        shotRange: 3, //射程 格
        bulletChangeTime: 2, //换弹速度 s 越高越快
      },
      maneuverability: {
        tankSpeed: 10, //坦克移速
      },
      protection: {
        health: 100, //生命值
        armorThickness: 100, //装甲厚度
      },
      investigate: {
        visibleRange: 100,
      },
    },
    {
      name: "orangeTank",
      chineseName: "巡洋坦克",
      fire: {
        lethality: 50, //杀伤力
        fireRate: 30, //射速
        ammoCapacity: 20, //弹药容量
        shotRange: 3, //射程 格
        bulletChangeTime: 2, //换弹速度 s 越高越快
      },
      maneuverability: {
        tankSpeed: 10, //坦克移速
      },
      protection: {
        health: 100, //生命值
        armorThickness: 100, //装甲厚度
      },
      investigate: {
        visibleRange: 100,
      },
    },
    {
      name: "yellowTank",
      chineseName: "中型坦克",
      fire: {
        lethality: 50, //杀伤力
        fireRate: 30, //射速
        ammoCapacity: 20, //弹药容量
        shotRange: 3, //射程 格
        bulletChangeTime: 2, //换弹速度 s 越高越快
      },
      maneuverability: {
        tankSpeed: 10, //坦克移速
      },
      protection: {
        health: 100, //生命值
        armorThickness: 100, //装甲厚度
      },
      investigate: {
        visibleRange: 100,
      },
    },
    {
      name: "yellowTank",
      chineseName: "步兵坦克",
      fire: {
        lethality: 50, //杀伤力
        fireRate: 30, //射速
        ammoCapacity: 20, //弹药容量
        shotRange: 3, //射程 格
        bulletChangeTime: 2, //换弹速度 s 越高越快
      },
      maneuverability: {
        tankSpeed: 10, //坦克移速
      },
      protection: {
        health: 100, //生命值
        armorThickness: 100, //装甲厚度
      },
      investigate: {
        visibleRange: 100,
      },
    },
    {
      name: "yellowTank",
      chineseName: "重型坦克",
      fire: {
        lethality: 50, //杀伤力
        fireRate: 30, //射速
        ammoCapacity: 20, //弹药容量
        shotRange: 3, //射程 格
        bulletChangeTime: 2, //换弹速度 s 越高越快
      },
      maneuverability: {
        tankSpeed: 10, //坦克移速
      },
      protection: {
        health: 100, //生命值
        armorThickness: 100, //装甲厚度
      },
      investigate: {
        visibleRange: 100,
      },
    },
    {
      name: "yellowTank",
      chineseName: "超重型坦克",
      fire: {
        lethality: 50, //杀伤力
        fireRate: 30, //射速
        ammoCapacity: 20, //弹药容量
        shotRange: 3, //射程 格
        bulletChangeTime: 2, //换弹速度 s 越高越快
      },
      maneuverability: {
        tankSpeed: 10, //坦克移速
      },
      protection: {
        health: 100, //生命值
        armorThickness: 100, //装甲厚度
      },
      investigate: {
        visibleRange: 100,
      },
    },
  ];
}
