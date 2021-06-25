import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlbumService } from './../../services/album.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {
  selectedAlbum: any;
  directorioImagenes: any = 'http://127.0.0.1:8000/storage/posts/';

  // years = [2015, 2016, 2017, 2018, 2019, 2020, 2021]

  albums: any;
  constructor(private router: Router, private restService: AlbumService) {
  }

  ngOnInit(): void {
    this.getAlbums();
  }

  getId(item) {
    // console.log("item: ", item);
    let id = item.id;
    let album = item.title;
    console.log("galeria: ", id + "  || ", album)
    this.router.navigate(['/imagenes', id, album], { skipLocationChange: true });
  }

  filtrarEventoYear(value) {
    console.log("año: ", value);
    // this.selectedAlbum = this.albums.filter(albums => albums.year === value);
    this.albums = this.albums.filter(albums => albums.year === value);

    console.log("album final: ", this.albums);
  }

  getAlbums() {
    this.restService.get("/album").subscribe((data) => {
      this.albums = data;
      console.log("albumnes galeria: ", this.albums);
    });
  }
}
