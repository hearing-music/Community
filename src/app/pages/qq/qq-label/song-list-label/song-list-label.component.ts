import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-song-list-label',
  templateUrl: './song-list-label.component.html',
  styleUrls: ['./song-list-label.component.scss']
})
export class SongListLabelComponent implements OnInit {
  songListId=""
  constructor(private router:ActivatedRoute) { }

  ngOnInit(): void {
    this.songListId=this.router.snapshot.params.id 
  }

}
