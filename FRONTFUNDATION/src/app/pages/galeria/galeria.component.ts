import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlbumService } from './../../services/album.service';
import { environment } from "../../../environments/environment";

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  selectedAlbum: any;
  directorioImagenes: any

  years = []

  albums: any;
  constructor(private router: Router, private restService: AlbumService) {
  }

  ngOnInit(): void {
    this.directorioImagenes = environment.baseUrl+'/public/';
    this.getAlbums();
    //this.addYears();
  }

  getId(item) {
    let id = item.id;
    let album = item.title;
    this.router.navigate(['/imagenes', id, album], { skipLocationChange: true });
  }

  filtrarEventoYear(value) {
    console.log("Aguanta ya esta en proceso")
    this.albums = []
      this.restService.get("/filterYear/"+value+"%").subscribe((data) => {
      console.log(data);
      this.albums = data;
    }, 
    (err) =>{
      console.log("Error", err)
    });
  }

  addYears(){
    let añobase = 2000
    let año = new Date().getFullYear()
    console.log(año)
    for(let i = 0; i<=(año - 2000); i++)
    {
      this.years[i] = añobase+i
    }
  }

  getAlbums() {
    console.log("Ya mismo");
    this.addYears();
    this.restService.get("/album").subscribe((data) => {
      this.albums = data;
      console.log("galeria",this.albums)
    }, 
    (err) => {
      console.log("Error", err)
    });
  }
}
