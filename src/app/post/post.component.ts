import { Component, OnInit, Input } from '@angular/core';

interface IPost {
  uid: String,
  n: String,
  t: String,
  d: Date,
  i: String[],
  ln: String[],
  c: Object[]
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() data: any[];

  constructor() { }

  ngOnInit() {
  }

}
