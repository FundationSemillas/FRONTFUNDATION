import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {
contenido: any[];
  constructor() {
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

  ngOnInit(): void {
  }

}
