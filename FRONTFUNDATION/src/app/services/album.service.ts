import { environment } from "../../environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {HttpClient,HttpHeaders,HttpRequest,HttpResponse,} from "@angular/common/http";
import 'rxjs/add/operator/map'
import 'rxjs/Rx';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
const API_URL_FORM = environment.baseUrl;
let u = localStorage.getItem('currentUser')
let user = JSON.parse(u)
const http = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Accept: "application/json",
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }

add(objeto, url: String): Observable<any> {
  return this.http.post(API_URL_FORM + url, objeto, {headers:{'Authorization':`Bearer ${user.token}`, "Content-Type": "application/json"}}).map((res) => res);
}

saveFile(file: File,objeto, url: String): Observable<any> {
  let formData = new FormData();
  let u = localStorage.getItem('currentUser')
  let user = JSON.parse(u)
  let json = JSON.stringify(objeto);
  console.log("json: ", json)
  let objetoJson = new Blob([json], {
    type: 'application/json'
  });
  console.log("obejtojspn: ",objetoJson)
  formData.append('image', file);
  formData.append('data', json);
  // formData.append('data', json);
  return this.http.post(API_URL_FORM+url, formData, {headers:{'Authorization':`Bearer ${user.token}`}}).map((res) => res);
}

saveFileSponsor(file: File,objeto, url: String): Observable<any> {
  let formData = new FormData();
  let u = localStorage.getItem('currentUser')
  let user = JSON.parse(u)
  let json = JSON.stringify(objeto);
  console.log("json: ", json)
  let objetoJson = new Blob([json], {
    type: 'application/json'
  });
  console.log("obejtojspn: ",objetoJson )
  formData.append('image', file);
  formData.append('data', json);
  // formData.append('data', json);
  return this.http.post(API_URL_FORM+url , formData, {headers:{'Authorization':`Bearer ${user.token}`}}).map((res) => res);
}

updateData(objeto, add: String) {
  console.log(objeto, "URL " + add);
  let u = localStorage.getItem('currentUser')
  let user = JSON.parse(u)
  return this.http.put(API_URL_FORM + add, objeto, {headers:{'Authorization':`Bearer ${user.token}`, "Content-Type": "application/json"}}).pipe(
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
  return this.http.delete(API_URL_FORM + url, {headers:{'Authorization':`Bearer ${user.token}`}}).map((res) => res);
}

get(url: string): Observable<any> {
  return this.http.get(API_URL_FORM + url).map((res) => res);
}


guardarImagenes(formdata: FormData): Observable<any> {
  // let formData1 = new FormData();
  // for (let i = 0; i < file.length; i++) {
  //   formData1.append('image', file[i])
  // }
  // formData1.append('image[]', file);
  console.log("formData1: ",formdata);
  // console.log("formData: ",formData )

  // formData.append('data', json);
  return this.http.post(API_URL_FORM+"/image/create", formdata, {headers:{'Authorization':`Bearer ${user.token}`}}).map((res) => res);
}
}