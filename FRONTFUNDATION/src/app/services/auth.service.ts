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
    let u = localStorage.getItem('currentUser')
  let user = JSON.parse(u)
    console.log(form.value);
    return this.http.post(API_URL_FORM +'/register', form.value, {headers:{'Authorization':`Bearer ${user.token}`, "Content-Type": "application/json"}});
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
    return this.http.post(API_URL_FORM +'/login', JSON.stringify(form.value), {headers:{'Content-Type':'application/json'}});
    //return result;
  }

  logout(token: any): Observable<any>{
    let u = localStorage.getItem('currentUser')
  let user = JSON.parse(u)
    return this.http.get(API_URL_FORM +'/logout', {headers:{'Authorization':`Bearer ${user.token}`, "Content-Type": "application/json"}});
    //return result;
  }
 
}
