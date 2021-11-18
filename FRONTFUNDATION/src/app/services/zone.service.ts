import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ZoneInterface } from '../models/zone';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
const API_URL_FORM = environment.baseUrl;
let token: string = JSON.parse(localStorage.getItem("currentUser")).token
let u = localStorage.getItem('currentUser')
let user = JSON.parse(u)
const headersApi = {
  headers: new HttpHeaders({

    "Content-Type": "application/json",
    "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Authorization": "Bearer " + user.token,
  }),
  /**
   *  "enctype": "multipart/form-data",
     "Content-Type":"application/json",
     "Accept": "application/json",
    "X-Requested-With": "XMLHttpRequest",
   */
};

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  constructor(private http: HttpClient) { }





  get(url: string) {
    return this.http.get(API_URL_FORM + url, { headers: { 'Authorization': `Bearer ${user.token}`, "Content-Type": "application/json"}});
  }




  add(objeto: any, url: String): Observable<ZoneInterface[]> {
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.post<ZoneInterface[]>(API_URL_FORM + url, JSON.stringify(objeto), { headers: { 'Authorization': `Bearer ${user.token}`, "Content-Type": "application/json"}});

  }



  delete(url: String): Observable<ZoneInterface[]> {
    return this.http.delete<ZoneInterface[]>(API_URL_FORM + url, { headers: { 'Authorization': `Bearer ${user.token}`, "Content-Type": "application/json"}});
  }


}
