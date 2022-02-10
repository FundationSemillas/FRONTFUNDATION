import { environment } from './../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { HttpService } from './http.service';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";
const API_URL_FORM = environment.baseUrl;
const http = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
  }),
  /**
   *  "enctype": "multipart/form-data",
    "Content-Type":"application/json",
    "X-Requested-With": "XMLHttpRequest",
   */
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  constructor(private http: HttpClient) { }

  add(objeto, url: String): Observable<any> {
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.post(API_URL_FORM + url, objeto, { headers: { 'Authorization': `Bearer ${user.token}`, "Content-Type": "application/json" } }).map((res) => res);
  }
  /*
  addImage(image:FormData){
    
    return this.httpi.formdata(API_URL_FORM, image)
  
  }*/

  updateData(objeto, add: String) {
    console.log(objeto, "URL " + add);
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.put(API_URL_FORM + add, objeto, { headers: { 'Authorization': `Bearer ${user.token}`, "Content-Type": "application/json" } }).pipe(
      map(
        (res: any) => {
          return res;
        },
        error => {
          console.log('error: ', error);
        }
      ));
  }

  delete(url: String): Observable<any> {
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.delete(API_URL_FORM + url, { headers: { 'Authorization': `Bearer ${user.token}`, "Content-Type": "application/json" } }).map((res) => res);
  }

  get(url: string): Observable<any> {
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.get(API_URL_FORM + url, { headers: { 'Authorization': `Bearer ${user.token}`}});
  }
  saveFile(file: File, objeto, url: String): Observable<any> {
    let formData = new FormData();
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    let json = JSON.stringify(objeto);
    console.log("json: ", json)
    let objetoJson = new Blob([json], {
      type: 'application/json'
    });
    console.log("obejtojson: ", objetoJson)
    formData.append('image', file);
    formData.append('data', json);
    // formData.append('data', json);
    return this.http.post(API_URL_FORM + url, formData, { headers: { 'Authorization': `Bearer ${user.token}`}}).map((res) => res);
  }
  
}
