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

  years = [2015, 2016, 2017, 2018, 2019, 2020, 2021]

  albums: any;
  constructor(private router: Router, private restService: AlbumService) {
  }

  ngOnInit(): void {
    this.directorioImagenes = environment.baseUrl+'/storage/';
    this.getAlbums();
  }

  getId(item) {
    // console.log("item: ", item);
    let id = item.id;
    let album = item.title;
    this.router.navigate(['/imagenes', id, album], { skipLocationChange: true });
  }

  filtrarEventoYear(value) {
      this.restService.get("/filterYear/"+value).subscribe((data) => {
      this.albums = data;
    });
  }

  getAlbums() {
    this.restService.get("/album").subscribe((data) => {
      this.albums = data;
    });  
  }   
}  
