import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AlbumService } from './../../services/album.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from "primeng/api";
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css'],
  providers: [ConfirmationService],

})
export class UsuariosAdminComponent implements OnInit {
  p: number = 1;
  modifUser: FormGroup;
  usuarios: any;
  usuarioSeleccionado: any;
  displayResponsiveCrear: boolean;
  displayResponsiveModificar: boolean;
  idEliminar: number;
  submitted = false;
  id: any;
  constructor(private confirmationService: ConfirmationService, private formBuilder: FormBuilder, private router: Router, private restService: AlbumService, private toastr: ToastrService) {
    this.modifUser = this.formBuilder.group({
      name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios() {
    this.restService.get("/user").subscribe((data) => {
      this.usuarios = data;
      console.log("usuarios: ", this.usuarios);
    });
  }

  modificarUsuario() {
    let id = this.id;
    this.displayResponsiveCrear = false;
    this.submitted = true;
    if (this.modifUser.invalid) {
      return;
    }
    console.log("objeto Modificar Usuario: ", this.modifUser.value);
    this.restService.updateData(this.modifUser.value, "/user/" + id).subscribe(
      res => {
        this.toastr.success('Usuario Modificado Exitosamente');
        this.modifUser.reset();
        this.modifUser.clearAsyncValidators()
        this.modifUser.clearValidators();
      },
      err => {
        this.toastr.success('Usuario Modificado Exitosamente');
        this.modifUser.reset();
        this.modifUser.clearAsyncValidators()
        this.modifUser.clearValidators();
        console.log("error crear", err)
      }
    );
    this.getUsuarios();
    this.displayResponsiveModificar = false;
  }

  getUser(id: number) {
    this.displayResponsiveModificar = true;
    this.restService.get("/user/" + id).subscribe((data) => {
      this.usuarioSeleccionado = data;
      this.id = this.usuarioSeleccionado.id;
      console.log("usuario seleccionado: ", this.usuarioSeleccionado);
    });
  }

  deleteUser(id) {
    this.confirmationService.confirm({
      message: 'Desea Eliminar el Usuario',
      header: 'Eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.restService.delete("/user/" + id).subscribe(
          res => {
            this.toastr.success('Usuario Eliminado Exitosamente');
            this.getUsuarios();
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
