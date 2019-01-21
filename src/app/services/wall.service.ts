import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + window.localStorage.getItem(environment.LSTOKEN)
  })
};

@Injectable({
  providedIn: 'root'
})
export class WallService {

  constructor(private http: HttpClient) { }

  getWall(month) {
    return this.http.get(environment.API_URL + 'wall/' + month, httpOptions);
  }
}
