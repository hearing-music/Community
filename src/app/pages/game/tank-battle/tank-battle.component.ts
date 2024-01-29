import { Component, HostListener, OnInit } from "@angular/core";
import { Translate } from "canvg";
import { NzMessageService } from "ng-zorro-antd/message";

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
	ngOnInit(): void {
		setTimeout(() => {
			var tankGame: any = document.getElementById("tankGame");
			let width = tankGame.offsetWidth;
			let height = tankGame.offsetHeight;
			this.tankBoxWidth = this.getSize(width, this.leftGrid)
			this.tankBoxHeight = this.getSize(height, this.topGrid)
			this.boxWidth = this.tankBoxWidth / this.leftGrid + 'px'
			this.boxHeight = this.tankBoxHeight / this.topGrid + 'px'
			tankGame.style.width = this.tankBoxWidth + 'px'
			tankGame.style.height = this.tankBoxHeight + 'px'
			tankGame.style.background = '#9eb375'
			this.loading = false;
		}, 1000)
	}
	creatRoom() {
		this.iscreatRoom = true;
	}
	constructor(private message: NzMessageService) { }
	tankCantMovePosition: any = [];
	tankMap: any = {
		"VoidBox": [
			{
				"X": 0,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 14,
				"Z": 0
			}
		],
		"MetalBox": [
			{
				"X": 23,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 3,
				"Z": 0
			}
		],
		"NestleBox": [
			{
				"X": 2,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 1,
				"Z": 0
			}
		],
		"OrdinaryBox": [
			{
				"X": 4,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 2,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 3,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 24,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 11,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 27,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 22,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 8,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 3,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 26,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 28,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 17,
				"Y": 6,
				"Z": 0
			},
			{
				"X": 15,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 7,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 6,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 21,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 4,
				"Y": 10,
				"Z": 0
			},
			{
				"X": 5,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 10,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 14,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 16,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 18,
				"Y": 4,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 7,
				"Z": 0
			},
			{
				"X": 29,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 9,
				"Z": 0
			},
			{
				"X": 9,
				"Y": 5,
				"Z": 0
			},
			{
				"X": 23,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 0,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 12,
				"Y": 13,
				"Z": 0
			},
			{
				"X": 13,
				"Y": 12,
				"Z": 0
			},
			{
				"X": 19,
				"Y": 2,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 1,
				"Z": 0
			},
			{
				"X": 20,
				"Y": 14,
				"Z": 0
			},
			{
				"X": 1,
				"Y": 11,
				"Z": 0
			},
			{
				"X": 25,
				"Y": 0,
				"Z": 0
			},
			{
				"X": 8,
				"Y": 8,
				"Z": 0
			}
		]
	};
	boxWidth = '0px';
	boxHeight = '0px';
	//获取元素属性值函数
	getStyle(ele:any,attr:any){
		var res=null;
		if(ele.currentStyle){
			res=ele.currentStyle[attr];
		}else{
			res=window.getComputedStyle(ele,null)[attr];
		}
		return parseFloat(res);
	}
	//创建子弹的计时器
	shotTimer:any = null;
	bullet1W = 6;
	bullet1H = 14;
	bullet2W = 14;
	bullet2H = 6;
	bulletS = [];
	isShot = [];//是否正在射击 一次shotCount发
	shotCount=2;//在子弹消失前可以发射几发子弹
	bulletSpeed = 0.1;//子弹速度
	shot(){
		this.createBullet();
	}
	//创建子弹
	createBullet(){
		let direction = this.getTankDirection()
		var bullets = document.getElementById("bullets");
		var bullet=new Image();
		// 获取子弹方向
		bullet.src=this.getBulletDirection(direction)
		bullet.className="b";
		// 获取子弹发射位置
		var mybulletL = this.getBulletPosition(direction)[0]
		var mybulletT = this.getBulletPosition(direction)[1]
		bullet.style.position = 'absolute';
		bullet.style.left=mybulletL+"px";
		bullet.style.top=mybulletT+"px";
		bullets.appendChild(bullet);
		this.bulletS.push(bullet);
		this.bulletMove(bullet,direction)
	}
	// 获取子弹方向 横 竖
	getBulletDirection(direction:any){
		var src = ''
		if(direction=='up'||direction=='down'){
			src = "../../../../assets/tank/bullet1.png";
		}
		if(direction=='right'||direction=='left'){
			src = "../../../../assets/tank/bullet2.png";
		}
		return src
	}
	// 获取子弹发射位置
	getBulletPosition(direction:any){
		var tank: any = document.getElementById("tank");
		var myTankL=this.getStyle(tank,"left")
		,	myTankT=this.getStyle(tank,"top");
		var mybulletL = 0;
		var mybulletT = 0;
		if(direction=='up'){
			mybulletL = myTankL + parseInt(this.boxWidth)/2 - this.bullet1W/2;
			mybulletT = myTankT - this.bullet1H;
		}
		if(direction=='down'){
			mybulletL = myTankL + parseInt(this.boxWidth)/2 - this.bullet1W/2;
			mybulletT = myTankT + parseInt(this.boxHeight);
		}
		if(direction=='left'){
			mybulletL = myTankL - this.bullet2W;
			mybulletT = myTankT + parseInt(this.boxHeight)/2 - this.bullet2H/2;
		}
		if(direction=='right'){
			mybulletL = myTankL + parseInt(this.boxWidth);
			mybulletT = myTankT + parseInt(this.boxHeight)/2 - this.bullet2H/2;
		}
		return [mybulletL,mybulletT]
	}
	//子弹的运动 及 消失
	bulletMove(ele:any,direction:any){
		var speed = -this.bulletSpeed;
		let attr = 'top';
		if(direction=='down'||direction=='right') {
			speed = this.bulletSpeed;
		}
		if(direction=='left'||direction=='right'){
			attr = 'left';
		}
		// 计算速度
		speed = parseInt(this.boxWidth) * speed;
		ele.timer=setInterval(()=>{
			var moveVal=this.getStyle(ele,attr)
			// if(moveVal<=-this.bulletH){
			if(((direction=='up'||direction=='left')&&moveVal<=0)||(direction=='right'&&moveVal>=this.tankBoxWidth-this.bullet2W)||(direction=='down'&&moveVal>=this.tankBoxHeight-this.bullet1H)){
				clearInterval(ele.timer);
				ele.timer=null;
				ele.parentNode.removeChild(ele);
				this.bulletS.shift();
				this.isShot.shift();
			}else{
				ele.style[attr] = moveVal + speed + "px";
			}
		},10)
	}
	// 获取坦克方向
	getTankDirection(){
		let direction = 'up'
		if(this.tank.style.transform == "rotate(0deg)"){
			direction = 'up'
		}
		if(this.tank.style.transform == "rotate(90deg)"){
			direction = 'right'
		}
		if(this.tank.style.transform == "rotate(180deg)"){
			direction = 'down'
		}
		if(this.tank.style.transform == "rotate(270deg)"){
			direction = 'left'
		}
		return direction
	}
		
	getSize(num: number, copies: number) {
		num = parseInt(num + '')
		let data = 0;
		for (let i = num; i > 0; i--) {
			if ((i / copies) == parseInt(i / copies + '')) {
				data = i
				break
			}
		}
		return data
	}
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
		this.drawerMetalBox(this.tankMap.MetalBox, tankBox, "#9d9d9d", false);
		this.drawerMetalBox(this.tankMap.NestleBox, tankBox, "#69c254", true);
		this.drawerMetalBox(this.tankMap.OrdinaryBox, tankBox, "#c29e54", false);

		this.tank = document.getElementById("tank");
		this.tank.style.top = "0px";
		this.tank.style.left = "0px";
		this.tank.style.backgroundImage = `url(../../../../assets/tank/${this.nowTank.name}.png)`;
		this.TankLeft = this.tank.getBoundingClientRect().x - this.offSetX;
		this.TankTop = this.tank.getBoundingClientRect().y - this.offSetY;
	}
	drawerMetalBox(tankMap: any, tankBox: any, color: any, isNestleBox: any) {
		for (let i = 0; i < tankMap.length; i++) {
			if (tankMap[i].X != 0 && tankMap[i].Y != 0) {
				tankBox.children[tankMap[i].Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + tankMap[i].X].style.backgroundColor = color;
				if (isNestleBox) {
					tankBox.children[tankMap[i].Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + tankMap[i].X].style.opacity = 0.7;
					tankBox.children[
						tankMap[i].Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + tankMap[i].X
					].style.zIndex = 100;
				} else {
					this.tankCantMovePosition.push({
						x: tankMap[i].X * parseInt(this.boxWidth),
						y: tankMap[i].Y * parseInt(this.boxHeight),
					});
				}
			}
			if (tankMap[i].X == 0) {
				tankBox.children[
					(this.tankBoxWidth / parseInt(this.boxWidth)) * tankMap[i].Y
				].style.backgroundColor = color;
				if (isNestleBox) {
					tankBox.children[(this.tankBoxWidth / parseInt(this.boxWidth)) * tankMap[i].Y].style.opacity = 0.7;
					tankBox.children[
						tankMap[i].Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + tankMap[i].X
					].style.zIndex = 100;
				} else {
					this.tankCantMovePosition.push({
						x: tankMap[i].X * parseInt(this.boxWidth),
						y: tankMap[i].Y * parseInt(this.boxHeight),
					});
				}
			}
			if (tankMap[i].Y == 0) {
				tankBox.children[tankMap[i].X].style.backgroundColor = color;
				if (isNestleBox) {
					tankBox.children[tankMap[i].Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + tankMap[i].X].style.opacity = 0.7;
					tankBox.children[
						tankMap[i].Y * (this.tankBoxWidth / parseInt(this.boxWidth)) + tankMap[i].X
					].style.zIndex = 100;
				} else {
					this.tankCantMovePosition.push({
						x: tankMap[i].X * parseInt(this.boxWidth),
						y: tankMap[i].Y * parseInt(this.boxHeight),
					});
				}
			}
		}
	}
	@HostListener("document:keydown", ["$event"])
	handleKeyboardEvent(event: KeyboardEvent) {
		if (this.gameStart) {
			if(event.key==' '){
				// console.log('按空格射击')
				if(this.isShot.length >= this.shotCount) return
				this.isShot.push(1);
				this.shot()
			}
			if (event.key == "D" || event.key == "d") {
				if (this.tank.style.transform == "rotate(90deg)") {
					if (this.TankLeft + parseInt(this.boxWidth) > this.tankBoxWidth - parseInt(this.boxWidth)) {
						this.TankLeft = this.tankBoxWidth - parseInt(this.boxWidth);
						this.tank.style.left = this.tankBoxWidth - parseInt(this.boxWidth) + "px";
						this.tank.style.transform = "rotate(90deg)";
					} else {
						let isMove = this.tankCantMovePosition.findIndex(
							(ele: any) =>
								ele.y + "px" == this.tank.style.top &&
								this.TankLeft == ele.x - parseInt(this.boxWidth)
						);
						if (isMove == -1) {
							this.TankLeft = this.TankLeft + parseInt(this.boxWidth);
							this.tank.style.left = this.TankLeft + "px";
							this.tank.style.transform = "rotate(90deg)";
						} else {
							this.TankLeft = this.TankLeft;
							this.tank.style.left = this.TankLeft + "px";
							this.tank.style.transform = "rotate(90deg)";
						}
					}
				} else {
					this.tank.style.transform = "rotate(90deg)";
				}
			} else if (event.key == "W" || event.key == "w") {
				if (this.tank.style.transform == "rotate(0deg)") {
					if (this.TankTop - parseInt(this.boxHeight) < 0) {
						this.TankTop = 0;
						this.tank.style.top = "0px";
						this.tank.style.transform = "rotate(0deg)";
					} else {
						let isMove = this.tankCantMovePosition.findIndex(
							(ele: any) =>
								ele.x + "px" == this.tank.style.left &&
								this.TankTop == ele.y + parseInt(this.boxHeight)
						);
						if (isMove != -1) {
							this.TankTop = this.TankTop;
							this.tank.style.top = this.TankTop + "px";
							this.tank.style.transform = "rotate(0deg)";
						} else {
							this.TankTop = this.TankTop - parseInt(this.boxHeight);
							this.tank.style.top = this.TankTop + "px";
							this.tank.style.transform = "rotate(0deg)";
						}
					}
				} else {
					this.tank.style.transform = "rotate(0deg)";
				}
			} else if (event.key == "s" || event.key == "S") {
				if (this.tank.style.transform == "rotate(180deg)") {
					if (this.TankTop + parseInt(this.boxHeight) > this.tankBoxHeight - parseInt(this.boxHeight)) {
						this.TankTop = this.tankBoxHeight - parseInt(this.boxHeight);
						this.tank.style.top = this.tankBoxHeight - parseInt(this.boxHeight) + "px";
						this.tank.style.transform = "rotate(180deg)";
					} else {
						let isMove = this.tankCantMovePosition.findIndex(
							(ele: any) =>
								ele.x + "px" == this.tank.style.left &&
								this.TankTop == ele.y - parseInt(this.boxHeight)
						);
						if (isMove != -1) {
							this.TankTop = this.TankTop;
							this.tank.style.top = this.TankTop + "px";
							this.tank.style.transform = "rotate(180deg)";
						} else {
							this.TankTop = this.TankTop + parseInt(this.boxHeight);
							this.tank.style.top = this.TankTop + "px";
							this.tank.style.transform = "rotate(180deg)";
						}
					}
				} else {
					this.tank.style.transform = "rotate(180deg)";
				}
			} else if (event.key == "A" || event.key == "a") {
				if (this.tank.style.transform == "rotate(270deg)") {
					if (this.TankLeft - parseInt(this.boxWidth) < 0) {
						this.TankLeft = 0;
						this.tank.style.left = "0px";
						this.tank.style.transform = "rotate(270deg)";
					} else {
						let isMove = this.tankCantMovePosition.findIndex(
							(ele: any) =>
								ele.y + "px" == this.tank.style.top &&
								this.TankLeft == ele.x + parseInt(this.boxWidth)
						);
						if (isMove == -1) {
							this.TankLeft = this.TankLeft - parseInt(this.boxWidth);
							this.tank.style.left = this.TankLeft + "px";
							this.tank.style.transform = "rotate(270deg)";
						} else {
							this.TankLeft = this.TankLeft;
							this.tank.style.left = this.TankLeft + "px";
							this.tank.style.transform = "rotate(270deg)";
						}
					}
				} else {
					this.tank.style.transform = "rotate(270deg)";
				}
			}
		}
	}
	changeTank(number: any) {
		this.nowTank = this.tankArray[number.to];
	}
	choseTank() {
		if (
			this.nowTank.attribute.speed +
			this.nowTank.attribute.fire +
			this.nowTank.attribute.RateOfFire ==
			100
		) {
			setTimeout(() => {
				this.startGame();
			}, 100);
			this.gameStart = true;
		} else {
			this.message.error("速度，火力，子弹速度三个值需相加为100");
		}
	}
	nowTank: any = {
		name: "blueTank",
		attribute: {
			speed: 50,
			fire: 30,
			RateOfFire: 20,
		},
	};
	tankArray: any = [
		{
			name: "blueTank",
			attribute: {
				speed: 50,
				fire: 30,
				RateOfFire: 20,
			},
		},
		{
			name: "greenTank",
			attribute: {
				speed: 60,
				fire: 10,
				RateOfFire: 30,
			},
		},
		{
			name: "orangeTank",
			attribute: {
				speed: 40,
				fire: 10,
				RateOfFire: 50,
			},
		},
		{
			name: "yellowTank",
			attribute: {
				speed: 40,
				fire: 30,
				RateOfFire: 30,
			},
		},
	];
}
