import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ClubService } from './../../services/club.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-voluntarios-admin',
  templateUrl: './voluntarios-admin.component.html',
  styleUrls: ['./voluntarios-admin.component.scss']
})
export class VoluntariosAdminComponent implements OnInit {
  modifClub: FormGroup;
  registerClub: FormGroup;
  clubs: any;
  clubseleccionado: any;
  displayResponsiveCrear: boolean;
  displayResponsiveModificar: boolean;
  idEliminar: number;
  //eventos: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private restService: ClubService, private toastr: ToastrService) {
    this.modifClub = this.formBuilder.group({
      id: [null],//valor por defecto,
      name: ['', Validators.required],
      surname: ['', Validators.required],
      CI: ['', Validators.required],
      address: ['', Validators.required],
      availability: ['', Validators.required],
      telefonNumber: ['', Validators.required],
      description: ['', Validators.required],
      //event: ["", Validators.required],
    });
    this.registerClub = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      CI: ['', Validators.required],
      address: ['', Validators.required],
      availability: ['', Validators.required],
      telefonNumber: ['', Validators.required],
      description: ['', Validators.required],
      //event: [', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getClubs();
    //this.getEventos();
  }
  // seteo de objeto enviar
  crearClub() {
    this.displayResponsiveCrear = false;
    this.submitted = true;
    if (this.registerClub.invalid) {
      return;
    }
    //Objeto json que se envia al back
    let objetoCrear = {
      "volunteers": {
        "name": this.registerClub.value.name,
        "surname": this.registerClub.value.surname,
        "CI": this.registerClub.value.CI,
        "description": this.registerClub.value.description,
        "address": this.registerClub.value.address,
        "telefonNumber": this.registerClub.value.telefonNumber,
        "availability": this.registerClub.value.availability,
        "image": null,
        "state": null
      }
      // "events": {
      //   "id": this.registerClub.value.event
      // }
    }
    console.log("valores crear: ", objetoCrear)
    this.restService.add(objetoCrear, "/volunteer").subscribe(
      res => {
        this.toastr.success('Club creado Exitosamente');
        console.log("creado exitosamente", res)
        this.resetForm();
        this.getClubs();
      },
      err => {
        console.log("error crear", err)
      }
    );
  }
  // Obtengo todos los clubs 
  getClubs() {
    this.restService.get("/volunteer").subscribe((data) => {
      this.clubs = data;
      console.log("clubs: ", this.clubs);
    });
  }
  // mensaje() {
  //   console.log("exitosamente",);
  // }

  // Seteo del objeto modificar 
  modificarClub() {
    this.displayResponsiveModificar = false;
    this.submitted = true;
    // console.log("hola");
    if (this.modifClub.invalid) {
      return;
    }
    //Objeto json que se envia al back
    let objetoModificar = {
      "volunteers": {
        "name": this.modifClub.value.name,
        "surname": this.modifClub.value.surname,
        "CI": this.modifClub.value.CI,
        "description": this.modifClub.value.description,
        "address": this.modifClub.value.address,
        "telefonNumber": this.modifClub.value.telefonNumber,
        "availability": this.modifClub.value.availability,
        "image": null,
        "state": null
      }
      // "events": {
      //   "id": this.modifClub.value.event
      // }
    }
    // console.log("objetoModificar: ", objetoModificar)
    this.restService.updateData(objetoModificar, "/volunteer/" + this.clubseleccionado.id).subscribe(
      res => {
        this.toastr.success('Club modificado Exitosamente');
        console.log("modificado: exitosamente", res);
        this.getClubs();
      },
      err => {
        console.log("error: modificar", err)
      }
    );
  }

  // Obtener club por Id
  getClub(id: number) {
    this.modalModificar();
    this.restService.get("/volunteer/" + id).subscribe((data) => {
      this.clubseleccionado = data;
      console.log("club seleccionado: ", this.clubseleccionado);
    });
  }

  getIdEliminar(id) {
    this.idEliminar = id;
    console.log("this.idEliminar = id: ", this.idEliminar = id)
  }

  // Servicio para eliminar objeto
  deleteClub(id) {
    console.log("id a eliminar:")
    this.restService.delete("/volunteer/" + id).subscribe(
      res => {
        this.toastr.success('Eliminado Exitosamente');

        console.log("eliminado: exitosamente", res);
        this.getClubs();
      },
      err => {
        console.log("error: eliminar", err)
      }
    );
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
    this.registerClub.reset();
  }
}
