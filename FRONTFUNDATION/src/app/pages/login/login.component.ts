import { Session } from './../../models/session';
import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginObject } from './login-object.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  test: Date = new Date();
  focus;
  focus1;
  loginForm: FormGroup;
  serverErrors = [];

  constructor(private auth: AuthService, private router: Router, private storage: StorageService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(5)])
    });
  }

 public submitted: Boolean = false;
  public error: {code: number, message: string} = null;

  public submitLogin(): void {
    this.submitted = true;
    this.error = null;
    
    if(this.loginForm){
      
      this.auth.logIn(this.loginForm).subscribe(
        data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Has iniciado sesión correctamente',
            showConfirmButton: false,
            timer: 1000
          })
          this.correctLogin(data)
        },
        error => {
          this.error = error;
        }
      )
    }
  }

  private correctLogin(data: Session){
    this.storage.setCurrentSession(data);
    console.log(data)
    this.router.navigate(['/ninosAdmin']);
  }
  
}
