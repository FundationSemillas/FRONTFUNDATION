import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Session } from '../models/session';
import { UserInterface } from '../models/user';
import { LoginObject } from '../pages/login/login-object.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });


  loggedIn = false;

  registerUser(form: any){
    console.log(form.value);
    return this.http.post('http://localhost:8000/register', form.value);
  }

   isAuthonticated(){
  	const promise = new Promise(
  		(resolve,reject) => {
  			setTimeout(() => {
          let t = localStorage.getItem('token');
          if(t){
            this.loggedIn = true;
            resolve(this.loggedIn);
          }else{
            this.loggedIn = false;
            reject();
          }
        },800);
  		});

  	return promise;
  }

  logIn(form: any): Observable<any>{
    return this.http.post('http://localhost:8000/login', form.value);
    //return result;
  }

  logout(token: any): Observable<any>{
    return this.http.post('http://localhost:8000/logout', {'token': token});
    //return result;
  }
  /**logoutUser() {
    let accessToken = localStorage.getItem("accessToken");
    const url_api = `http://localhost:3000/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
    return this.htttp.post<UserInterface>(url_api, { headers: this.headers });
  } */

  
/**constructor(private http: HttpClient) {}
 
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });
  
  private basePath = "http://localhost:8000/";

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<Session>(this.basePath + 'login', loginObj);
  }

  logout(): Observable<Boolean> {
    return this.http.post<Boolean>(this.basePath + 'logout', {});
  } */
  
 
 
}
