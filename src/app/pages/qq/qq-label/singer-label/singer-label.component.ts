import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-singer-label',
  templateUrl: './singer-label.component.html',
  styleUrls: ['./singer-label.component.scss']
})
export class SingerLabelComponent implements OnInit {
  singerId=""
  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.singerId=this.router.snapshot.params.id 
  }

}
