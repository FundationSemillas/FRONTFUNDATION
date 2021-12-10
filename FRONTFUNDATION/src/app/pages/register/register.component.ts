import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlbumService } from './../../services/album.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  test: Date = new Date();
  focus;
  focus1;
  registerForm: FormGroup;
  submitted = false;

constructor(private auth: AlbumService, private formBuilder: FormBuilder, private router: Router, private toastr: ToastrService) {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      permission: ["true"],
      rol_id: [1],
    });
  }
  
  ngOnInit(): void {
  }

  registrarUsuario() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      console.log("error registrae usuario Formulario", this.registerForm.value)
      return;
    }
    console.log("objeto usuario: ", this.registerForm.value);
    this.auth.add(this.registerForm.value, "/register").subscribe(
      res => {
        console.log("creado exitosamente");
        this.toastr.success('Usuario Registrado Exitosamente');
        this.registerForm.clearValidators();
        this.registerForm.clearAsyncValidators();
        //this.registerForm.reset();
        this.toastr.info('Verifique su correo');
        this.router.navigate(['/#/login']);
      },
      err => {
        console.log("error crear", err)
        this.toastr.info('esta cuenta ya esta en uso o falta validar su correo');
      }

    );

 
  }
  
}
