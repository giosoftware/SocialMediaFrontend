import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

interface ILoginResponse {
  token: string;
  nickname: string,
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getNickname(): string {
    return localStorage.getItem(environment.NICK) || 'User';
  }

  isAuthenticated() {
    if (localStorage.getItem(environment.LSTOKEN)) {
      return true;
    } else {
      return false;
    }
  }

  login(loginData) {
    return this.http.post<ILoginResponse>(environment.API_URL + 'login', loginData, httpOptions)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          //localStorage.setItem(environment.LSTOKEN, JSON.stringify(user));
          localStorage.setItem(environment.LSTOKEN, user.token);
          localStorage.setItem(environment.NICK, user.nickname);
        }

        return user;
      }));
  }

  logout() {
    localStorage.removeItem(environment.LSTOKEN);
    localStorage.removeItem(environment.NICK);
  }

  register(registerData) {
    return this.http.post<ILoginResponse>(environment.API_URL + 'register', registerData, httpOptions);
  }
}
