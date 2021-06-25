import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlbumService } from './../../services/album.service';
import { ToastrService } from 'ngx-toastr';
// @ViewChild('closebutton') closebutton;
import { ConfirmationService } from "primeng/api";
import { environment } from "../../../environments/environment";
const  directorioImagenes: any = environment.baseUrl+'/storage/posts/';

@Component({
  selector: 'app-albumnes-admin',
  templateUrl: './albumnes-admin.component.html',
  styleUrls: ['./albumnes-admin.component.scss'],
  providers: [ConfirmationService],

})
export class AlbumnesAdminComponent implements OnInit {
  modifAlbum: FormGroup;
  registerAlbum: FormGroup;
  albums: any;
  albumseleccionado: any;
  displayResponsiveCrear: boolean;
  displayResponsiveModificar: boolean;
  idEliminar: number;
  eventos: any;
  submitted = false;
  files: any;
  // directorioImagenes:any = 'http://127.0.0.1:8000/public/img/';

  constructor(private confirmationService: ConfirmationService, private formBuilder: FormBuilder, private router: Router, private restService: AlbumService, private toastr: ToastrService) {
    this.modifAlbum = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      date: ["", Validators.required],
      // event: ["", Validators.required],
    });
    this.registerAlbum = this.formBuilder.group({
      title: ["", Validators.required],
      description: ["", Validators.required],
      date: ["", Validators.required],
      // event: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAlbums();
    // this.getEventos();
  }
  // seteo de objeto enviar
  crearAlbum() {
    this.displayResponsiveCrear = false;
    this.submitted = true;
    if (this.registerAlbum.invalid) {
      return;
    }
    // Objeto json que se envia al back
    // let objetoCrear = {
    //   "title": this.registerAlbum.value.title,
    //   "description": this.registerAlbum.value.description,
    //   "date": this.registerAlbum.value.date,
    //   // "events_i": this.registerAlbum.value.event
    // }
    // console.log("valores crear: ", objetoCrear);
    console.log("objeto crear: ", this.registerAlbum.value);
    this.restService.saveFile(this.files, this.registerAlbum.value, "/album").subscribe(
      // this.restService.saveFile(this.files,objetoModificar,
      res => {
        this.toastr.success('Album creado Exitosamente');
        this.resetForm();
        this.getAlbums();
      },
      err => {
        this.toastr.success('Album creado Exitosamente');
        this.resetForm();
        this.getAlbums();
        console.log("error crear", err)
      }
    );
  }

  // Obtengo todos los albumnes
  getAlbums() {
    this.restService.get("/album").subscribe((data) => {
      this.albums = data;
      console.log("albumnes: ", this.albums);
    });
  }

  foto(event) {
    this.files = event.target.files[0];
    console.log("foto: ", this.files);
  }

  // Seteo del objeto modificar 
  modificarAlbum() {
    this.displayResponsiveModificar = false;
    this.submitted = true;
    if (this.modifAlbum.invalid) {
      return;
    }
    //Objeto json que se envia al back
    // let objetoModificar = {
    //   "albums": {
    //     "title": this.modifAlbum.value.title,
    //     "description": this.modifAlbum.value.description,
    //     "date": this.modifAlbum.value.date
    //   },
    //   "events": {
    //     "id": this.modifAlbum.value.event
    //   }
    // }
    // console.log("objetoModificar: ", objetoModificar)
    console.log("objeto crear: ", this.modifAlbum.value);
    this.restService.updateData(this.modifAlbum.value, "/album/" + this.albumseleccionado.id).subscribe(
      res => {
        this.toastr.success('Álbum modificado Exitosamente');
        console.log("modificado: exitosamente", res);
        this.getAlbums();
      },
      err => {
        console.log("error: modificar", err)
      }
    );
  }

  // Obtener album por Id
  getAlbum(id: number) {
    this.modalModificar();
    this.restService.get("/album/" + id).subscribe((data) => {
      this.albumseleccionado = data;
      console.log("album seleccionado: ", this.albumseleccionado);
    });
  }

  //Obtengo todos los eventos
  // getEventos() {
  //   this.restService.get("/event").subscribe((data) => {
  //     this.eventos = data;
  //     console.log("eventos: ", this.eventos);
  //   });
  // }


  //Despliege de Modales
  modalModificar() {
    this.displayResponsiveModificar = true;
  }

  modalCrear() {
    this.displayResponsiveCrear = true;
  }

  resetForm() {
    this.registerAlbum.reset();
  }

  // Servicio para eliminar objeto
  deleteAlbum(id) {
    this.confirmationService.confirm({
      message: 'Desea Eliminar el Álbum',
      header: 'Eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.restService.delete("/album/" + id).subscribe(
          res => {
            this.toastr.success('Eliminado Exitosamente');
            this.getAlbums();
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

  agregarImagenes(objeto) {
    let id = objeto.id;
    let album = objeto.title;
    console.log("album admin: ", id + "  || ", album)
    this.router.navigate(['/imagenesAdmin', id, album], { skipLocationChange: true });
  }
}
