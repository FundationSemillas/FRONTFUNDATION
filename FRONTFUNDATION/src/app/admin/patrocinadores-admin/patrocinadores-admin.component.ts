import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from "primeng/api";
import { AlbumService } from './../../services/album.service';

@Component({
  selector: 'app-patrocinadores-admin',
  templateUrl: './patrocinadores-admin.component.html',
  styleUrls: ['./patrocinadores-admin.component.scss'],
  providers: [ConfirmationService],

})
export class PatrocinadoresAdminComponent implements OnInit {
  modifSponsor: FormGroup;
  registerSponsor: FormGroup;
  sponsors: any;
  sponsorseleccionado: any;
  displayResponsiveCrear: boolean;
  displayResponsiveModificar: boolean;
  idEliminar: number;
  files: any;
  directorioImagenes: any = 'http://127.0.0.1:8000/storage/posts/';
  submitted = false;

  constructor(private confirmationService: ConfirmationService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService, private restService: AlbumService,) {
    this.modifSponsor = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      image: [],//si es una validacicion tener un Validators
      description: [""]
    });
    this.registerSponsor = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(20)]],
      image: [null],//si es una validacicion tener un Validators
      description: [""]
    });
  }

  ngOnInit(): void {
    this.getSponsors();
  }
  // seteo de objeto enviar
  crearSponsor() {
    this.displayResponsiveCrear = false;
    this.submitted = true;
    if (this.registerSponsor.invalid) {
      console.log("error formulario");
      return;
    }

    this.restService.saveFileSponsor(this.files, this.registerSponsor.value, "/sponsor").subscribe(
      res => {
        this.toastr.success('sponsor creado Exitosamente');
        console.log("creado exitosamente", res)
        this.resetForm();
        this.getSponsors();
      },
      err => {
        // console.log("error crear", err)
        this.toastr.success('sponsor creado Exitosamente');
        this.resetForm();
        this.getSponsors();
      }
    );
  }

  foto(event) {
    this.files = event.target.files[0];
    // console.log("foto: ", this.files);
  }

  // Obtengo todos los sponsornes
  getSponsors() {
    this.restService.get("/sponsor").subscribe((data) => {
      this.sponsors = data;
      // console.log("sponsornes: ", this.sponsors);
    });
  }

  // Seteo del objeto modificar 
  modificarsponsor() {
    this.displayResponsiveModificar = false;
    this.submitted = true;
    if (this.modifSponsor.invalid) {
      alert("error formulaio modificar");
      return;
    }
  this.modifSponsor.value.image = this.sponsorseleccionado.image;
    // console.log("objetoModificar: ", this.modifSponsor.value)
    this.restService.updateData(this.modifSponsor.value, "/sponsor/" + this.sponsorseleccionado.id).subscribe(
      res => {
        this.toastr.success('Álbum modificado Exitosamente');
        // console.log("modificado: exitosamente", res);
        this.getSponsors();
      },
      err => {
        // this.toastr.success('Álbum modificado Exitosamente');
        console.log("modificado: exitosamente", err);
        // this.getSponsors();
      }
    );
  }

  // Obtener sponsor por Id
  getsponsor(id: number) {
    this.modalModificar();
    this.restService.get("/sponsor/" + id).subscribe((data) => {
      this.sponsorseleccionado = data;
      // console.log("sponsor seleccionado: ", this.sponsorseleccionado);
    });
  }


  // Servicio para eliminar objeto
  deleteSponsor(id) {
    this.confirmationService.confirm({
      message: 'Desea Eliminar el Sponsor',
      header: 'Eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.restService.delete("/sponsor/" + id).subscribe(
          res => {
            this.toastr.success('Eliminado Exitosamente');
            this.getSponsors();
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

  //Despliege de Modales
  modalModificar() {
    this.displayResponsiveModificar = true;
  }

  modalCrear() {
    this.displayResponsiveCrear = true;
  }

  resetForm() {
    this.registerSponsor.reset();
  }
 
}
