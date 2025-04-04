import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../../services/api.service";

@Component({
  selector: 'ngx-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {
  name: any = "";
  idCard: any = "";
  bankIdCard: any = ""
  message: any = ""
  errmessage: any = ""
  nameNull: string;
  idCardNull: string;
  bankIdCardNull: string;
  testTrue: { [key: string]: boolean } = {
    nameTrue: false,
    idTrue: false,
    bankTrue: false
  }
  loading=false;
  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }
  searchUser() {
	  this.loading = true;
    if (this.testTrue.nameTrue && this.testTrue.idTrue && this.testTrue.bankTrue) {
      this.message = ""
      this.api.getbank({ Name: this.name, IdCard: this.idCard, BankId: this.bankIdCard }).subscribe((res: any) => {
        console.log(res, '2356 +')
		this.message = res.message
		this.loading = false;
        // if (res.data.data.result==0) {
       	// 	    this.errmessage = ''
       	// 	    this.message = res.message
       	// 	  }else {
       	// 	    this.message = ''
       	// 	    this.errmessage = res.data.data.msg
       	// 	  }
      },(err:any)=>{
		  this.loading = false;
	  })
    }
  }
  closeMessage() {
    this.message = ""
    this.errmessage = ""
  }
  onNameBlur() {
    if (!this.name) {
      this.nameNull = '请输入名字'
      this.testTrue.nameTrue = false
      this.message = ""
    } else {
      this.nameNull = ''
      this.testTrue.nameTrue = true
    }
  }
  onidCardBlur() {
    if (!this.idCard) {
      this.idCardNull = "请输入身份证号"
      this.testTrue.idTrue = false
      this.message = ""
    } else {
      let _IDRe18 = /^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      let _IDre15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
      // 校验身份证：
      if (_IDRe18.test(this.idCard) || _IDre15.test(this.idCard)) {
        this.idCardNull = ""
        this.testTrue.idTrue = true
      } else {
        this.idCardNull = "请正确的身份证号"
        this.testTrue.idTrue = false
        this.message = ""
      }
    }
  }
  onidBankBlur() {
    if (!this.bankIdCard) {
      this.bankIdCardNull = "请输入银行卡号"
      this.testTrue.bankTrue = false
      this.message = ""
    } else {
      let bankstr = /^([1-9]{1})(\d{13}|\d{14}|\d{15}|\d{16}|\d{17}|\d{18}|\d{19})$/
      if (bankstr.test(this.bankIdCard)) {
        this.bankIdCardNull = ""
        this.testTrue.bankTrue = true
      } else {
        this.bankIdCardNull = "请输入正确的银行卡号"
        this.testTrue.bankTrue = false
        this.message = ""
      }
    }
  }
}
