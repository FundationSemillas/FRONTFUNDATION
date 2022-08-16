import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Session } from '../models/session';
import { UserInterface } from '../models/user';
import { LoginObject } from '../pages/login/login-object.model';
import { environment } from "../../environments/environment";
const API_URL_FORM = environment.baseUrl;

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
    return this.http.post(API_URL_FORM +'/register', form.value);
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
    return this.http.post(API_URL_FORM +'/login', form.value);
    //return result;
  }

  logout(token: any): Observable<any>{
    return this.http.post(API_URL_FORM +'/logout', {'token': token});
    //return result;
  }
 
}
