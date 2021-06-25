//import { VoluntariosAdminComponent } from './../../admin/voluntarios-admin/voluntarios-admin.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClubService } from './../../services/club.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-voluntarios',
  templateUrl: './voluntarios.component.html',
  styleUrls: ['./voluntarios.component.scss']
})
export class VoluntariosComponent implements OnInit {
  displayResponsive: boolean;
  formKid: FormGroup;
  clubs: any;
  displayResponsiveCrear: boolean;
  submitted = false;
  registerClub: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private restService: ClubService, private toastr: ToastrService) {
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
  }

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
  getClubs() {
    this.restService.get("/volunteer").subscribe((data) => {
      this.clubs = data;
      console.log("clubs: ", this.clubs);
    });
  }
  // buildFormArchive() {
  //   this.formKid = this.formBuilder.group({
  //     name: ['', [Validators.required, Validators.maxLength(20)]],
  //     surname: ['', [Validators.required, Validators.maxLength(20)]],
  //     ci: ['', [Validators.required, Validators.maxLength(10)]],
  //     description: ['', [Validators.required, Validators.maxLength(200)]],
  //     address: ['', [Validators.required, Validators.maxLength(100)]],
  //     availability: ['', [Validators.required, Validators.maxLength(100)]],

  //   });
  // }
  // showResponsiveDialog() {
  //   this.displayResponsive = true;
  //   this.formKid.patchValue(this._kidServices.selectedField);
  // }
  onSaveArchive(): void {
    console.log(this.formKid.value);
    this.formKid.markAllAsTouched()

  }
  modalCrear() {
    this.displayResponsiveCrear = true;
  }
  resetForm() {
    this.registerClub.reset();
  }
}