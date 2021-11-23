import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
const API_URL_FORM = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http: HttpClient) { }

  getEvent(url: string){
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.get(API_URL_FORM+url, {headers: {'Authorization': `Bearer ${user.token}`}}).map((res) => res)
  }

  addEvent(url:string, body: any){
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.post(API_URL_FORM+url, JSON.stringify(body), {headers: {'Authorization': `Bearer ${user.token}`}}).map((res) => res)
  }

  updateEvent(url:string, body:any){
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.put(API_URL_FORM+url, body, {headers: {'Authorization': `Bearer ${user.token}`}}).map((res) => res)
  }

  deleteEvent(url:string){
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.delete(API_URL_FORM+url, {headers: {'Authorization': `Bearer ${user.token}`}}).map((res) => res)
  }
}
