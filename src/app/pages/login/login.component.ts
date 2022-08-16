import { Session } from './../../models/session';
import { StorageService } from './../../services/storage.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginObject } from './login-object.model';
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

//   get email(){ return this.loginForm.get('email'); }
//   get password(){ return this.loginForm.get('password'); }

//   login(){
//     console.log(this.loginForm, "si llega ");
//     this.auth.logIn(this.loginForm).subscribe(
//       (response) => { 
//         console.log(response.token, "si llega ");
//         //localStorage.removeItem('token');
//         localStorage.setItem('token', response.token);
//         this.router.navigate(['/ninosAdmin']);
//       },
//       (error) => { 
//         localStorage.removeItem('token');
//         this.serverErrors = error.error;
//         console.log(this.serverErrors);
//       }
//     );
//   }


 public submitted: Boolean = false;
  public error: {code: number, message: string} = null;
//   loginForm: FormGroup;
//   constructor(
//               private formBuilder: FormBuilder,
//               public _authServices: AuthService,
//               private storageService: StorageService,
//               private router: Router
//              ) { 
//               this.buildFormArchive();
//              }


  public submitLogin(): void {
    
    this.submitted = true;
    this.error = null;
    if(this.loginForm){
      // console.log("si llega");
      // console.log(this.loginForm)
      //     this.auth.logIn(this.loginForm).subscribe(
      this.auth.logIn(this.loginForm).subscribe(
        data => this.correctLogin(data),
        error => {
          this.error = error;
        }
      )
    }
  }

  private correctLogin(data: Session){
    this.storage.setCurrentSession(data);
    this.router.navigate(['/ninosAdmin']);
  }
  
}
