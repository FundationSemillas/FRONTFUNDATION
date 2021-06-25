import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { Sponsor } from '../models/sponsors';
import { HttpService } from './http.service';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map'
import 'rxjs/Rx';

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
export class BlogService {

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
saveFile(file: File,objeto, url: String): Observable<any> {
  let formData = new FormData();
  let json = JSON.stringify(objeto);
  console.log("json: ", json)
  let objetoJson = new Blob([json], {
    type: 'application/json'
  });
  console.log("obejtojspn: ",objetoJson )
  formData.append('image', file);
  formData.append('data', json);
  // formData.append('data', json);
  return this.http.post("https://backendfundation.herokuapp.com/blog", formData).map((res) => res);
}


/** 
  public selectedField: Sponsor = {
    nombre: '',
    id: null,
    foto: '',
  };

  constructor(private http: HttpService) { }

  public async eliminarBlog(idBlog) {
    return await this.http.delete("/api/blogD/?id=".concat(idBlog));
  }

  public async agregarBlog(blog: Blog) {
    return await this.http.post("/api/blog", blog);
  }
  public async obtenerBlog() {
    return await this.http.get("/api/blog");
  }
  
  public async modificarBlog(blog: Blog) {
    return await this.http.update("/api/blog", blog);
  }

  public async obtenerPorId(idBlog){
    return await this.http.get("/api/blog/?id=".concat(idBlog));
  }
    
  
  / *
  El formdata debe tener el id del producto
   * /

   //TODO REVISAR LA SUBIDA DE IMAGENES


  public async agregarFotoBlog(foto: FormData) {
    return await this.http.formdata("/foto_blog", foto);
  }

  public async obtenerProductosConFotos() {
    return await this.http.get("/blog_con_foto");
  }

  public async obtenerProductoConFotosPorId(idProducto) {
    return await this.http.get("/producto?id=".concat(idProducto));
  }
*/
  
}
