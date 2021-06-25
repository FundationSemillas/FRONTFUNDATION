import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlbumService } from '../../../services/album.service';

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.scss']
})
export class ImagenesComponent implements OnInit {
  navigationSubscription;
  id: number;
  currentIndex: any = -1;
  showFlag: any = false;
  album: string;
  fotos: any;
  directorioImagenes: any = 'http://127.0.0.1:8000/storage/posts/';
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
      console.log("imagnes album: ", this.imaganesAlbum);
    });
  }

}
