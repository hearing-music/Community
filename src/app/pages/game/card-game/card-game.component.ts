import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-card-game",
  templateUrl: "./card-game.component.html",
  styleUrls: ["./card-game.component.scss"],
})
export class CardGameComponent implements OnInit {
  cards: any = [
    {
      number: 54,
      suit: "hearts",
      sus: "JOKER",
      top: 15,
    },
    {
      number: 53,
      suit: "clubs",
      sus: "JOKER",
      top: 15,
    },
    {
      number: 2,
      suit: "hearts",
      sus: "2",
      top: 15,
    },
    {
      number: 15,
      suit: "spades",
      sus: "2",
      top: 15,
    },
    {
      number: 28,
      suit: "diamonds",
      sus: "2",
      top: 15,
    },
    {
      number: 41,
      suit: "clubs",
      sus: "2",
      top: 15,
    },
    {
      number: 1,
      suit: "hearts",
      sus: "A",
      top: 15,
    },
    {
      number: 14,
      suit: "spades",
      sus: "A",
      top: 15,
    },
    {
      number: 27,
      suit: "diamonds",
      sus: "A",
      top: 15,
    },
    {
      number: 40,
      suit: "clubs",
      sus: "A",
      top: 15,
    },
    {
      number: 13,
      suit: "hearts",
      sus: "K",
      top: 15,
    },
    {
      number: 26,
      suit: "spades",
      sus: "K",
      top: 15,
    },
    {
      number: 39,
      suit: "diamonds",
      sus: "K",
      top: 15,
    },
    {
      number: 52,
      suit: "clubs",
      sus: "K",
      top: 15,
    },
    {
      number: 12,
      suit: "hearts",
      sus: "Q",
      top: 15,
    },
    {
      number: 25,
      suit: "spades",
      sus: "Q",
      top: 15,
    },
    {
      number: 38,
      suit: "diamonds",
      sus: "Q",
      top: 15,
    },
    {
      number: 51,
      suit: "clubs",
      sus: "Q",
      top: 15,
    },
    {
      number: 11,
      suit: "hearts",
      sus: "J",
      top: 15,
    },
    {
      number: 24,
      suit: "spades",
      sus: "J",
      top: 15,
    },
    {
      number: 37,
      suit: "diamonds",
      sus: "J",
      top: 15,
    },
    {
      number: 50,
      suit: "clubs",
      sus: "J",
      top: 15,
    },
    {
      number: 10,
      suit: "hearts",
      sus: "10",
      top: 15,
    },
    {
      number: 23,
      suit: "spades",
      sus: "10",
      top: 15,
    },
    {
      number: 36,
      suit: "diamonds",
      sus: "10",
      top: 15,
    },
    {
      number: 49,
      suit: "clubs",
      sus: "10",
      top: 15,
    },
    {
      number: 9,
      suit: "hearts",
      sus: "9",
      top: 15,
    },
    {
      number: 22,
      suit: "spades",
      sus: "9",
      top: 15,
    },
    {
      number: 35,
      suit: "diamonds",
      sus: "9",
      top: 15,
    },
    {
      number: 48,
      suit: "clubs",
      sus: "9",
      top: 15,
    },
    {
      number: 8,
      suit: "hearts",
      sus: "8",
      top: 15,
    },
    {
      number: 21,
      suit: "spades",
      sus: "8",
      top: 15,
    },
    {
      number: 34,
      suit: "diamonds",
      sus: "8",
      top: 15,
    },
    {
      number: 47,
      suit: "clubs",
      sus: "8",
      top: 15,
    },
    {
      number: 7,
      suit: "hearts",
      sus: "7",
      top: 15,
    },
    {
      number: 20,
      suit: "spades",
      sus: "7",
      top: 15,
    },
    {
      number: 33,
      suit: "diamonds",
      sus: "7",
      top: 15,
    },
    {
      number: 46,
      suit: "clubs",
      sus: "7",
      top: 15,
    },
    {
      number: 6,
      suit: "hearts",
      sus: "6",
      top: 15,
    },
    {
      number: 19,
      suit: "spades",
      sus: "6",
      top: 15,
    },
    {
      number: 32,
      suit: "diamonds",
      sus: "6",
      top: 15,
    },
    {
      number: 45,
      suit: "clubs",
      sus: "6",
      top: 15,
    },
    {
      number: 5,
      suit: "hearts",
      sus: "5",
      top: 15,
    },
    {
      number: 18,
      suit: "spades",
      sus: "5",
      top: 15,
    },
    {
      number: 31,
      suit: "diamonds",
      sus: "5",
      top: 15,
    },
    {
      number: 44,
      suit: "clubs",
      sus: "5",
      top: 15,
    },
    {
      number: 4,
      suit: "hearts",
      sus: "4",
      top: 15,
    },
    {
      number: 17,
      suit: "spades",
      sus: "4",
      top: 15,
    },
    {
      number: 30,
      suit: "diamonds",
      sus: "4",
      top: 15,
    },
    {
      number: 43,
      suit: "clubs",
      sus: "4",
      top: 15,
    },
    {
      number: 3,
      suit: "hearts",
      sus: "3",
      top: 15,
    },
    {
      number: 16,
      suit: "spades",
      sus: "3",
      top: 15,
    },
    {
      number: 29,
      suit: "diamonds",
      sus: "3",
      top: 15,
    },
    {
      number: 42,
      suit: "clubs",
      sus: "3",
      top: 15,
    },
  ];
  extractedIndices = [
    54, 53, 2, 15, 28, 41, 1, 14, 27, 40, 13, 26, 39, 52, 12, 25, 38, 51, 11,
    24, 37, 50, 10, 23, 36, 49, 9, 22, 35, 48, 8, 21, 34, 47, 7, 20, 33, 46, 6,
    19, 32, 45, 5, 18, 31, 44, 4, 17, 30, 43, 3, 16, 29, 42,
  ];
  player1Cards = [];
  player2Cards = [];
  player3Cards = [];
  remainingCards = [];
  constructor() {}
  canvas: any;
  ctx: any;
  imgSource: "assets/wzp/颜色轮白.png";
  ngOnInit(): void {
    // this.Licensing();
    // let canvasWidth = ((this.player1Cards.length - 1) * 20 + 46).toString();
    // this.canvas = document.getElementById("myowncanvas");
    // this.canvas.width = canvasWidth;
    // this.ctx = this.canvas.getContext("2d");
    // this.drawCanvas();
  }
  sort(cards: any) {
    const sortedCards = [];
    for (const index of this.extractedIndices) {
      const card = cards.find((c: any) => c.number === index);
      if (card) {
        sortedCards.push(card);
      }
    }
    return sortedCards;
  }
  drawCanvas() {
    for (let i = 0; i < this.player1Cards.length; i++) {
      this.ctx.drawPokerCard(
        i * 20,
        this.player1Cards[i].top,
        60,
        this.player1Cards[i].suit,
        this.player1Cards[i].sus
      );
    }
  }
  Licensing() {
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 2; j++) {
        const randomNumber = Math.floor(Math.random() * this.cards.length);
        const randomCard = this.cards[randomNumber];
        if (j === 0) {
          this.player1Cards.push(randomCard);
        } else if (j === 1) {
          this.player2Cards.push(randomCard);
        }
        this.cards.splice(randomNumber, 1);
      }
    }
    this.remainingCards = this.cards;
    this.player1Cards = this.sort(this.player1Cards);
    this.player2Cards = this.sort(this.player2Cards);
    this.player3Cards = this.sort(this.player3Cards);
  }
  showHand(data: any) {
    if (data.isSelectedCard) {
      data.isSelectedCard = !data.isSelectedCard;
    } else {
      data.isSelectedCard = true;
    }
  }
  move(event: any) {
    const num = Math.ceil(event.offsetX / 22) - 1;
    let cardToMove = this.player1Cards[num];
    if (num > this.player1Cards.length - 1) {
      cardToMove = this.player1Cards[this.player1Cards.length - 1];
    }
    if (cardToMove.top === 0) {
      cardToMove.top = 15;
    } else {
      cardToMove.top -= 15;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawCanvas();
  }
  resetImage(event: any, player: any) {
    if (player == "player") {
      event.target.style.transform = "scale(1)  rotate(0)";
      event.target.style.zIndex = 10;
    } else {
      event.target.style.transform = "scale(1)";
      event.target.style.zIndex = 10;
    }
  }

  showDetail(event: any, player: any) {
    if (player == "player") {
      event.target.style.transform = "scale(3) rotate(180deg)";
      event.target.style.zIndex = 100001;
      event.target.style.position = "relative";
    } else {
      event.target.style.transform = "scale(3) ";
      event.target.style.zIndex = 100001;
      event.target.style.position = "relative";
    }
  }
}
