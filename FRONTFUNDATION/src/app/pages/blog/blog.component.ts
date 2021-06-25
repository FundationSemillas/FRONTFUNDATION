import { BlogService } from './../../services/blog.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
contenido: any[];
blogs: any;
  constructor( private _blogServices: BlogService) {
    
    this.contenido = [
      {
          "nombre": "Marcos",
          "imagen": "./assets/img/faces/clem-onojeghuo-3.jpg",
          "contenido": "por definir"
      },
      {
          "nombre": "Oyuki",
          "imagen": "./assets/img/faces/joe-gardner-2.jpg",
          "contenido": "por definir"
      },
      {
          "nombre": "Patricio",
          "imagen": "./assets/img/faces/erik-lucatero-2.jpg",
          "contenido": "por definir"
      },
  ]
   }

   getBlogs() {
    this._blogServices.get("/blog").subscribe((data) => {
      this.blogs = data;
      console.log("blogs: ", this.blogs);
    });
  }

  ngOnInit(): void {
    this.getBlogs() 
  }

}
