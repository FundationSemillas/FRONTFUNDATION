import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpRequest, HttpResponse, } from "@angular/common/http";
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
const API_URL_FORM = environment.baseUrl;
const http = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  constructor(private http: HttpClient) { }

  add(objeto, url: String): Observable<any> {
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.post(API_URL_FORM + url, JSON.stringify(objeto), { headers: { 'Authorization': `Bearer ${user.token}`, "Content-Type": "application/json"}}).map((res) => res);
  }

  updateData(objeto, add: String) {
    console.log(objeto, "URL " + add);
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    return this.http.put(API_URL_FORM + add, JSON.stringify(objeto), { headers: { 'Authorization': `Bearer ${user.token}`, "Content-Type": "application/json"}}).pipe(
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
    return this.http.get(API_URL_FORM + url, {headers: {'Authorization': `Bearer ${user.token}`}}).map((res) => res);
  }
}
