import { Component, OnInit } from '@angular/core';
import { CommonService } from "../../services/common.service";
import { ApiService } from "../../services/api.service";
import { NzMessageService } from 'ng-zorro-antd/message';


@Component({
  selector: 'ngx-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  i = 0;
  listOfData = [];
  isDeleteUser = false;
  deleteUser: any = []
  isAddUser = false
  adduser = {
    Name: "",
    Phone: "",
    Last_activity: 1673336254215,
    Status: 1
  }
  constructor(public common: CommonService, public api: ApiService, private message: NzMessageService) {
  }
  ngOnInit(): void {
    this.getUsersApi()
  }
  getUsersApi() {
    this.api.getUsersApi()
      .subscribe((res: any) => {
        this.listOfData = res.users
        console.log(res.users)
      })
  }



  deleteRow(item: any): void {
    this.isDeleteUser = true;
    this.deleteUser = item
  }


  handleOk(): void {
    console.log('Button ok clicked!');
    this.isDeleteUser = false;
    this.api.deleteUserApi(this.deleteUser.ID).subscribe((res: any) => {
      if (res.result) {
        this.message.success('删除成功', {
          nzDuration: 1000
        });
        this.getUsersApi()
      }
    })
  }

  handleCancel(): void {
    this.isDeleteUser = false;
    this.isAddUser = false
  }

  addRow(): void {
    this.isAddUser = true
    this.adduser.Name = ""
    this.adduser.Phone = ""
    this.adduser.Last_activity = 1673336254215
  }
  Adduser() {
    this.adduser.Last_activity = new Date().getTime();
    console.log(this.adduser)
    this.api.addUsersApi(this.adduser).subscribe((res: any) => {
      console.log(res)
      if (res.result == "添加成功") {
        this.message.success('添加成功', {
          nzDuration: 1000
        });
        this.getUsersApi()
        this.isAddUser = false
      }
    })
  }

}
