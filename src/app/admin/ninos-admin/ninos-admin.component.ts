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
      age: [null, [Validators.required]]
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
      age: [null, [Validators.required]]
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
        "age": this.registerChild.value.age,
     // }
    }
    console.log("valores crear: ", objetoCrear)
    
    this.restService.saveFile(this.files, objetoCrear, "/child").subscribe(
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
    /*this.restService.add(objetoCrear, "/child").subscribe(
      res => {
        this.toastr.success('Niño creado Exitosamente');
        console.log("creado exitosamente", res)
        this.resetForm();
        this.getChildren();
      },
      err => {
        console.log("error crear", err)
        this.toastr.error ('Error al crear el Registro');
      }
    );*/

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
    //Objeto json que se envia al back
    /*let objetoModificar = {
      "id": this.modifChild.value.id,
      "name": this.modifChild.value.name,
      "surname": this.modifChild.value.surname,
      "image": this.modifChild.value.image,
      "dateBirth": this.modifChild.value.dateBirth,
      "CI": this.modifChild.value.CI,
      "houseAddress": this.modifChild.value.houseAddress,
      "mothersName": this.modifChild.value.mothersName,
      "fathersName": this.modifChild.value.fathersName,
      "study": this.modifChild.value.study,
      "schoolName": this.modifChild.value.schoolName,
      "age": this.modifChild.value.age,
    }*/

    // console.log("objetoModificar: ", objetoModificar)
    this.restService.updateData(this.modifChild.value, "/child/" + this.childseleccionado.id).subscribe(
      res => {
        this.toastr.success('Niño modificado Exitosamente');
        console.log("modificado: exitosamente", res);
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
    this.restService.get("/child/" + id).subscribe((data) => {
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
    /* this.confirmationService.confirm({
      message: 'Desea Eliminar el Registro',
      header: 'Eliminar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {*/
        this.restService.delete("/child/" + id).subscribe(
          res => {
            this.toastr.success('Eliminado Exitosamente');
            this.getChildren();
          },
          err => {
            console.log("error: eliminar", err)
          }
        );
     /* },
      reject: () => {
        this.toastr.error('Operación Cancelada');
      }
    });*/
  }

  //Obtengo todos los eventos
  /* getEventos() {
     this.restService.get("/event").subscribe((data) => {
       this.eventos = data;
       console.log("eventos: ", this.eventos);
     });
   }*/


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



  /*selected = '';

  constructor(
    private formBuilder: FormBuilder,
    public _kidServices: PersonService
  ) {
    this.buildFormArchive();
    this.formKid.patchValue(this._kidServices.selectedField);
  }

  ngOnInit(): void {
    this.logeado = localStorage.getItem('logeado');
    console.log("logeado admin: ", this.logeado);
  }
  // resetForm(blogForm?: NgForm): void {
  //   this.blogsService.selectedBlog = {
  //     id: null,
  //     title: '',
  //     image: '',
  //     description: '',
  //     link: '',

  //   };
  // }


  buildFormArchive() {
    this.formKid = this.formBuilder.group({
      id: [null],//valor por defecto, 
      name: ['', [Validators.required, Validators.maxLength(20)]],
      surname: ['', [Validators.required, Validators.maxLength(20)]],//pipe para fechas??
      foto: [null],//si es una validacicion tener un Validators
      dateBirth: [null],
      ci: [null],
      houseAddress: ['', [Validators.required, Validators.maxLength(70)]],
      motherName: ['', [Validators.required, Validators.maxLength(70)]],
      fatherName: ['', [Validators.required, Validators.maxLength(70)]],
      study: [null],
      schoolName: ['', [Validators.required, Validators.maxLength(70)]],
      age: [null, [Validators.required]]

    });



    this.formKid.get('foto').valueChanges.subscribe((value) => {
      if (value !== null && value !== '') {
        this.imgToBase64((document.querySelector('input[type="file"]') as HTMLInputElement).files[0])
      }
      console.log(this.formKid.get('foto').value);
    })
  }

  private imgToBase64(file: any) {
    if (file) {
      const reader = new FileReader();
      reader.onload = this.toBase64.bind(this);
      reader.readAsBinaryString(file);
    }
  }
  toBase64(e) {
    console.log('data:image/png;base64,' + btoa(e.target.result));
  }

  onSaveArchive(): void {
    console.log(this.formKid.value);
    this.formKid.markAllAsTouched()

    if (this.formKid.valid) {// is es valido da true
      //nuevo
      if (this.formKid.controls['id'].value == null) {
        this._kidServices.agregarPerson(this.formKid.value);
      }

    } else {
      //actualizar
      //this._libraryServices.editField(formarchive.value.id, formarchive.value);
      this.formKid.markAllAsTouched()//activar los errores que hay
    }
  }*/

}
