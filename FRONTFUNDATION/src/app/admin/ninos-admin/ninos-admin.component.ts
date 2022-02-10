import { environment } from './../../../environments/environment';
import { PersonService } from './../../services/person.service';
import { Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-ninos-admin',
  templateUrl: './ninos-admin.component.html',
  styleUrls: ['./ninos-admin.component.scss'],
  providers: [ConfirmationService],
})
export class NinosAdminComponent implements OnInit {
  modifChild: FormGroup;
  registerChild: FormGroup;
  children: any;
  childseleccionado: any;
  displayResponsiveCrear: boolean;
  displayResponsiveModificar: boolean;
  idEliminar: number;
  eventos: any;
  files: any;
  id: any;
  submitted = false;
  directorioImagenes:any;
  logeado: any;
  validacion: any;
    p: number = 1;


  constructor(private confirmationService: ConfirmationService,private formBuilder: FormBuilder, private router: Router, private restService: PersonService, private toastr: ToastrService) {
    this.logeado = localStorage.getItem('logeado');
    this.validacion = localStorage.getItem('validacion');
    this.modifChild = this.formBuilder.group({
      id: [null],//valor por defecto, 
      name: ['', [Validators.required, Validators.maxLength(20)]],
      surname: ['', [Validators.required, Validators.maxLength(20)]],//pipe para fechas??
      //image: [null],//si es una validacicion tener un Validators
      dateBirth: [null],
      CI: [null],
      houseAddress: ['', [Validators.required, Validators.maxLength(70)]],
      mothersName: ['', [Validators.required, Validators.maxLength(70)]],
      fathersName: ['', [Validators.required, Validators.maxLength(70)]],
      study: [null],
      schoolName: [null, [Validators.maxLength(70)]],
      //age: [null, [Validators.required]]
    });
    this.registerChild = this.formBuilder.group({
     // id: [null],valor por defecto, 
      name: ['', [Validators.required, Validators.maxLength(20)]],
      surname: ['', [Validators.required, Validators.maxLength(20)]],//pipe para fechas??
      //image: [null],//si es una validacicion tener un Validators
      dateBirth: [null],
      CI: [null],
      houseAddress: ['', [Validators.required, Validators.maxLength(70)]],
      mothersName: ['', [Validators.required, Validators.maxLength(70)]],
      fathersName: ['', [Validators.required, Validators.maxLength(70)]],
      study: [null],
      schoolName: [null, [Validators.maxLength(70)]],
      //age: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.directorioImagenes = environment.baseUrl+'/storage/';
     if (this.logeado === 'si') {
      if (this.validacion === 'si') {
      } else {
        localStorage.setItem('validacion', 'si');
        this.refrescar();
      }
    }
    this.getChildren();
  }
  
  refrescar() {
    window.location.reload();
  }

  // seteo de objeto enviar
  crearChild() {
    this.displayResponsiveCrear = false;
    this.submitted = true;
    if (this.registerChild.invalid) {
          console.log("error validacion crear: ", )
      return;
    }
    //Objeto json que se envia al back
    let objetoCrear = {
      //"children": {
       // "id": this.registerChild.value.id,
        "name": this.registerChild.value.name,
        "surname": this.registerChild.value.surname,
       // "image": this.registerChild.value.image,
        "dateBirth": this.registerChild.value.dateBirth,
        "CI": this.registerChild.value.CI,
        "houseAddress": this.registerChild.value.houseAddress,
        "mothersName": this.registerChild.value.mothersName,
        "fathersName": this.registerChild.value.fathersName,
        "study": this.registerChild.value.study,
        "schoolName": this.registerChild.value.schoolName,
        //"age": this.registerChild.value.age,
     // }
    }
    console.log("valores crear: ", objetoCrear)
    if(objetoCrear.study == 'si'){
      objetoCrear.study = true
    }else{
      objetoCrear.study = false
    }
    this.restService.saveFile(this.files, objetoCrear, "/child/create").subscribe(
      // this.restService.saveFile(this.files,objetoModificar,
      res => {
        this.toastr.success('Niño creado Exitosamente');
        this.resetForm();
        this.getChildren();
      },
      err => {
        //this.toastr.error('Niño error al crear');
        this.toastr.success('Niño creado Exitosamente');
        this.resetForm();
        this.getChildren();
        console.log("error crear", err)
      }
    );
  }


  // Obtengo todos los niños
  getChildren() {
    this.restService.get("/child").subscribe((data) => {
      this.children = data;
      console.log("nilos: ", this.children);
    });
  }

  // Seteo del objeto modificar 
  modificarChild() {
    this.displayResponsiveModificar = false;
    this.submitted = true;
    if (this.modifChild.invalid) {
      return;
    }

    // console.log("objetoModificar: ", objetoModificar)
    if(this.modifChild.value.study == 'Sí'){
      this.modifChild.value.study = true
    }else{
      this.modifChild.value.study = false
    }
    this.restService.updateData(this.modifChild.value, "/child/update").subscribe(
      res => {
        this.toastr.success('Niño modificado Exitosamente');
        console.log("modificado: exitosamente", res);
        this.displayResponsiveModificar = false;
        this.getChildren();
      },
      err => {
        console.log("error: modificar", err)
      }
    );
  }

  // Obtener niño por Id
  getChild(id: number) {
    this.modalModificar();
    let u = localStorage.getItem('currentUser')
    let user = JSON.parse(u)
    this.restService.get("/child/findById/" + id).subscribe((data) => {
      this.childseleccionado = data;
      console.log("Niño seleccionado: ", this.childseleccionado);
    });
  }

  getIdEliminar(id) {
    this.idEliminar = id;
    console.log("this.idEliminar = id: ", this.idEliminar = id)
  }

  // Servicio para eliminar objeto
  deleteChild(id) {
    console.log("id a eliminar:")
        this.restService.delete("/child/delete/" + id).subscribe(
          res => {
            this.toastr.success('Eliminado Exitosamente');
            this.getChildren();
          },
          err => {
            console.log("error: eliminar", err)
          }
        );
  }

  //Despliege de Modales
  modalModificar() {
    this.displayResponsiveModificar = true;
  }

  modalCrear() {
    this.displayResponsiveCrear = true;
  }

  resetForm() {
    this.registerChild.reset();
  }

  foto(event) {
    this.files = event.target.files[0];
    console.log("foto: ", this.files);
  }

  agregarImagenes(objeto){
    let id = objeto.id;
    let imaChild = objeto.title;
    console.log("album admin: ", id + "  || ", imaChild)
    //this.router.navigate(['/imageChild', id, imaChild], { skipLocationChange: true });
  }

}
