import { Component, HostListener, OnInit } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "ngx-new-tank-battle",
  templateUrl: "./new-tank-battle.component.html",
  styleUrls: ["./new-tank-battle.component.scss"],
})
export class NewTankBattleComponent implements OnInit {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  gridSizeX = 22;
  gridSizeY = 40;
  gridSpacing = 1;
  gridGeometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>;
  gridMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });
  tankGame: any;
  tank: THREE.Mesh;
  tankSpeed = 0.1; // 坦克移动速度
  constructor() {}

  ngOnInit(): void {
    this.tankGame = document.getElementById("app");
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45, // 视场角
      this.tankGame.offsetWidth / this.tankGame.offsetHeight, // 纵横比
      0.1, // 近截面
      1000 // 远截面
    );
    this.gridGeometry = new THREE.BufferGeometry();
    this.renderer = new THREE.WebGLRenderer();
    this.drawMap();
    this.createTank();
    // 渲染
    this.animate();
  }
  createTank() {
    const geometry = new THREE.BoxGeometry(1, 0, 1);
    // 加载本地图片作为纹理
    const texture = new THREE.TextureLoader().load(
      "assets/tank/yellowTank.png"
    );
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.tank = new THREE.Mesh(geometry, material);
    this.scene.add(this.tank);
  }
  drawMap() {
    this.camera.position.set(0, 30, 0); // 调整相机位置
    this.camera.lookAt(0, 0, 0);
    this.renderer.setSize(
      this.tankGame.offsetWidth,
      this.tankGame.offsetHeight
    );
    this.tankGame.appendChild(this.renderer.domElement);
    // 初始化网格沙盘地图
    const gridLengthX = this.gridSizeX * this.gridSpacing;
    const gridLengthY = this.gridSizeY * this.gridSpacing;
    const startX = -gridLengthY / 2;
    const endX = gridLengthY / 2;
    const startY = -gridLengthX / 2;
    const endY = gridLengthX / 2;
    for (let i = startX; i <= endX; i += this.gridSpacing) {
      for (let j = startY; j <= endY; j += this.gridSpacing) {
        // 在每个格子中随机生成方块
        if (Math.random() < 0.2) {
          // 控制方块生成的概率，此处设为 20%
          const position = new THREE.Vector3(i, 0, j);
          const redCube = this.createRedCube(position);
          this.scene.add(redCube);
        }
      }
      // const start = new THREE.Vector3(i, 0, startY);
      // const end = new THREE.Vector3(i, 0, endY);
      // const gridLineX = this.createGridLine(start, end);
      // this.scene.add(gridLineX);
    }
    // for (let j = startY; j <= endY; j += this.gridSpacing) {
    //   const start = new THREE.Vector3(startX, 0, j);
    //   const end = new THREE.Vector3(endX, 0, j);
    //   const gridLineY = this.createGridLine(start, end);
    //   this.scene.add(gridLineY);
    // }

    // 追加灯光
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    this.scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 10, 0);
    this.scene.add(directionalLight);
  }
  // 创建红色立方体
  createRedCube = (position) => {
    const geometry = new THREE.BoxGeometry(1, 0, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.copy(position);
    return cube;
  };
  // 创建X格沙盘地图
  createGridLine = (start, end) => {
    this.gridGeometry = new THREE.BufferGeometry();
    const vertices = [start.x, start.y, start.z, end.x, end.y, end.z];
    this.gridGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    return new THREE.LineSegments(this.gridGeometry);
  };
  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };
  // 检查给定位置是否有障碍物
  checkForObstacle(position: THREE.Vector3): boolean {
    // 遍历场景中的每个红色立方体
    for (const object of this.scene.children) {
      if (
        object instanceof THREE.Mesh &&
        object.material.color.getHex() === 0xff0000
      ) {
        // 如果坦克位置与红色立方体位置接近，则认为发生了碰撞
        if (position.distanceTo(object.position) < 0.99) {
          // 这里的1是立方体的大小
          return true; // 有障碍物
        }
      }
    }
    return false; // 没有障碍物
  }

  @HostListener("window:keydown", ["$event"])
  onKeyDown(event: KeyboardEvent) {
    let nextPosition = new THREE.Vector3(
      this.tank.position.x,
      0,
      this.tank.position.z
    );
    switch (event.key) {
      case "w":
      case "W":
        if (this.tank.position.z - this.tankSpeed > -this.gridSizeX / 2) {
          // 上边界
		  if(this.tank.rotation.y==0){
		  	nextPosition.z -= this.tankSpeed;
		  }else{
			  this.tank.rotation.y = 0;
		  }
        }
        break;
      case "s":
      case "S":
        if (this.tank.position.z + this.tankSpeed < this.gridSizeX / 2) {
          // 下边界
		  if(this.tank.rotation.y==Math.PI){
		  	nextPosition.z += this.tankSpeed;
		  }else{
		  	this.tank.rotation.y = Math.PI;
		  }
        }
        break;
      case "a":
      case "A":
        if (this.tank.position.x - this.tankSpeed > -this.gridSizeY / 2) {
          // 左边界
		  if(this.tank.rotation.y==Math.PI/2){
		  	nextPosition.x -= this.tankSpeed;
		  }else{
		  	this.tank.rotation.y = Math.PI/2
		  }
        }
        break;
      case "d":
      case "D":
        if (this.tank.position.x + this.tankSpeed < this.gridSizeY / 2) {
          // 右边界
		  if(this.tank.rotation.y==Math.PI*1.5){
		  	nextPosition.x += this.tankSpeed;
		  }else{
		  	this.tank.rotation.y = Math.PI*1.5
		  }
        }
        break;
    }
    // 检查下一个位置是否有障碍物
    if (!this.checkForObstacle(nextPosition)) {
      // 如果没有障碍物，则移动坦克
      this.tank.position.copy(nextPosition);
    }
  }
}
