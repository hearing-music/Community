import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'ngx-musiry-tools',
  templateUrl: './musiry-tools.component.html',
  styleUrls: ['./musiry-tools.component.scss']
})
export class MusiryToolsComponent implements OnInit {
  navNow: string = '首页'
  username: string
  cardId: any
  bankId: any
  navList: Array<any> = [
    {
      text: '首页',
      icon: 'home',
    }, {
      text: '银行',
      icon: 'search',
    }, {
      text: '转换文件',
      icon: 'pic-center',
    }, {
      text: '监测',
      icon: 'file-search',
    },
  ]
  constructor() {
  }
  ngOnInit(): void {

  }
  showItem(item: any) {
    console.log(item.text)
    this.navNow = item.text
  }
  submitForm() {
    if (!(/^\d{17}[\dX]$/.test(this.cardId))) {
      alert('身份证输入有误')
    }
    else if (!(/^([1-9]{1})(\d{15}|\d{16}|\d{18})$/.test(this.bankId))) {
      alert('银行卡号输入有误')
    } else {
      console.log(this.username, this.cardId, this.bankId)
    }
  }

  //文件转换
  onFile(file: any) {
    console.log(file)
  }

  //文件类型转换
}
