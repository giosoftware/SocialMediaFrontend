import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return window.localStorage.getItem(environment.NICK) || 'User';
  }

  isAuthenticated() {
    if (window.localStorage.getItem(environment.LSTOKEN)) {
      return true;
    } else {
      return false;
    }
  }

  login(loginData) {
    return this.http.post<ILoginResponse>(environment.API_URL + 'login', loginData, httpOptions);
  }

  logout() {
    window.localStorage.removeItem(environment.LSTOKEN);
  }

  register(registerData) {
    return this.http.post<ILoginResponse>(environment.API_URL + 'register', registerData, httpOptions);
  }
}
