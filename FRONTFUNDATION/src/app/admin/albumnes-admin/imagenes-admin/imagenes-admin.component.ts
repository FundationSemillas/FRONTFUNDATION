import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../../services/album.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from "primeng/api";
import { environment } from "../../../../environments/environment";
const   directorioImagenes: any = environment.baseUrl+'/storage/';

@Component({
  selector: 'app-imagenes-admin',
  templateUrl: './imagenes-admin.component.html',
  styleUrls: ['./imagenes-admin.component.scss'],
  providers: [ConfirmationService],
})
export class ImagenesAdminComponent implements OnInit {
  files: any;
  registeImages: FormGroup;
  submitted = false;
  id: any;
  album: string;
  navigationSubscription;
  directorioImagenes: any;
  imagenes: any;

  constructor(private confirmationService: ConfirmationService, private formBuilder: FormBuilder, private router: Router, private restService: AlbumService, private toastr: ToastrService, private route: ActivatedRoute,) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initializar();
      }
    });

    this.registeImages = this.formBuilder.group({
      name: ["", Validators.required],
      type: ["", Validators.required],
      description: ["", Validators.required],
      ealbums_idvent: ["", Validators.required],
    });
  }

  initializar() {
    if (this.route.snapshot.params.id.lenght, this.route.snapshot.params.album.length) {
      this.id = this.route.snapshot.params.id;
      this.album = this.route.snapshot.params.album;
      console.log("Componente Imagenes admin: ", this.id + "  ||  " + this.album)
    }
  }

  ngOnInit(): void {
    console.log("imagen admin: ", directorioImagenes);
    this.directorioImagenes = environment.baseUrl + '/storage/';
    this.getImagenesAlbum( this.id);
  }

  foto(event) {
    const formData = new FormData();
    this.files = event.target.files;
    // console.log("size: ", this.files.size());
    console.log("size:", this.files.length)
    for (var x = 0; x < this.files.length; x++) {
      console.log("s: ", this.files[x]);
      formData.append("image[]", this.files[x]);
  }
  formData.append("id",  this.id)


    // console.log("foto: ", this.files);
    // const files = event.target.files;
    // for (var i = 0; i < this.files.length; i++) {
      // formData.append("image[]", files);
    // }
    this.guardarImagenes(formData);

  }

  guardarImagenes(formData: FormData) {
    console.log("formdata guardar imagenes: ", formData);
    this.restService.guardarImagenes(formData).subscribe(
      // this.restService.saveFile(this.files,objetoModificar,
      res => {
        this.toastr.success('Album creado Exitosamente');
        this.getImagenesAlbum(this.id);
      },
      err => {
        console.log("error crear", err)
      }
    );
  }

  getImagenesAlbum(id) {
    this.restService.get("/image/" + id).subscribe((data) => {
      this.imagenes = data;
      for (var i = 0; i < this.imagenes.length; i++) {
        this.imagenes[i].image = this.directorioImagenes + this.imagenes[i].image;
      }
      console.log("imagnes: ", this.imagenes);
    });
  }

  deleteImage(id) {
    this.confirmationService.confirm({
      message: 'Desea Eliminar la Imagen',
      header: 'Eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.restService.delete("/image/id/" + id).subscribe(
          res => {
            this.toastr.success('Imagen eliminado Exitosamente');
            this.getImagenesAlbum(this.id);
          },
          err => {
            console.log("error: eliminar", err)
          }
        );
      },
      reject: () => {
        this.toastr.error('Operación Cancelada');
      }
    });
  }
}
