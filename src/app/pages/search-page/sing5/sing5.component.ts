import { Component, OnInit,Input } from '@angular/core';
import {CommonService} from "../../../services/common.service";
@Component({
  selector: 'ngx-sing5',
  templateUrl: './sing5.component.html',
  styleUrls: ['./sing5.component.scss']
})
export class Sing5Component implements OnInit {

 @Input() sing5List: any;
 	constructor(public common: CommonService) { }
   ngOnInit(): void {
   }
   OpenFiveSing(id:string|number){
    window.open('http://5sing.kugou.com/'+id)
   }
}
