import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlbumService } from '../../../services/album.service';
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent implements OnInit {
  directorioImagenes: any
  navigationSubscription;
  id: number;
  currentIndex: any = -1;
  showFlag: any = false;
  album: string;
  fotos: any;
  imaganesAlbum: any;

  constructor(private route: ActivatedRoute, private router: Router, private restService: AlbumService) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initializar();
      }
    });
  }

  initializar() {
    if (this.route.snapshot.params.id.lenght, this.route.snapshot.params.album.length) {
      this.id = this.route.snapshot.params.id;
      this.album = this.route.snapshot.params.album;
      console.log("Componente Imagenes id: ", this.id, this.album);
      this.getImagenesAlbum(this.id);
    }
  }

  ngOnInit(): void {
        this.directorioImagenes = environment.baseUrl+'/storage/';

  }

  showLightbox(index) {
    this.currentIndex = index;
    this.showFlag = true;
  }

  closeEventHandler() {
    this.showFlag = false;
    this.currentIndex = -1;
  }

  getImagenesAlbum(id) {
    this.restService.get("/image/" + id).subscribe((data) => {
      this.imaganesAlbum = data;
       for (var i = 0; i < this.imaganesAlbum.length; i++) {
        this.imaganesAlbum[i].image = this.directorioImagenes + this.imaganesAlbum[i].image;
      }
      console.log("imagnes album: ", this.imaganesAlbum);
    });
  }

}
