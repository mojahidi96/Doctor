import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }
  // login service
  login(reqdata) {
    return this.http.post(`${environment.apiURL}auth/login`, reqdata,
      { observe: 'response', responseType: 'text' });
  }

  getLoggedinProfile(res) {
    console.log('res', res);
    sessionStorage.setItem('jwt', res.headers.get('x-auth-token'));
    return this.http.get(`${environment.apiURL}users/${JSON.parse(res.body).id}`);
  }

  logout(reqdata) {
    return this.http.post(`${environment.apiURL}auth/logout`, reqdata,
      { observe: 'response', responseType: 'text' });
  }
}
