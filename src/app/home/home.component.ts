import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WallService } from '../services/wall.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  wall: any
  constructor(private wallSrv: WallService, private router: Router) { }

  ngOnInit() {
    var d = new Date();
    var month = '' + d.getUTCFullYear() + (d.getUTCMonth() + 1);
    this.wallSrv.getWall(month).subscribe(
      res => {
        console.log(res);
        this.wall = res;
      },
      err => {
        console.error(err.error.message);
      }
    );
  }

}
