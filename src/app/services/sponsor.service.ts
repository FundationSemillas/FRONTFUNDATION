import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from 'rxjs/operators';
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
export class SponsorService {

  
  constructor(private http: HttpClient) { }

add(objeto, url: String): Observable<any> {
  return this.http.post(API_URL_FORM + url, objeto).map((res) => res);
}


updateData(objeto, add: String) {
  console.log(objeto, "URL " + add);
  return this.http.put(API_URL_FORM + add, objeto, http).pipe(
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
  return this.http.delete(API_URL_FORM + url).map((res) => res);
}

get(url: string): Observable<any> {
  return this.http.get(API_URL_FORM + url).map((res) => res);
}
}
