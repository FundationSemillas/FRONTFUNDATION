import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss']
})
export class BlogAdminComponent implements OnInit {
  modifBlog: FormGroup;
  registerBlog: FormGroup;
  blogs: any;
  blogseleccionado: any;
  displayResponsiveCrear: boolean;
  displayResponsiveModificar: boolean;
  idEliminar: number;
  eventos: any;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private _blogServices: BlogService, private toastr: ToastrService) {
    this.modifBlog = this.formBuilder.group({
      id: [null],//valor por defecto, 
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(80)]],
      image: [null],//si es una validacicion tener un Validators
      link: [null]
    });
    this.registerBlog = this.formBuilder.group({
      id: [null],//valor por defecto, 
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(80)]],
      image: [null],//si es una validacicion tener un Validators
      link: [null]
    });
  }

  ngOnInit(): void {
    this.getBlogs();

  }
  // seteo de objeto enviar
  crearBlog() {
    this.displayResponsiveCrear = false;
    this.submitted = true;
    if (this.registerBlog.invalid) {
      return;
    }
    //Objeto json que se envia al back
    let objetoCrear = {
      "blogs": {
        "title": this.registerBlog.value.title,
        "description": this.registerBlog.value.description,
        "image": this.registerBlog.value.image,
        "link": this.registerBlog.value.link
      }/*,
      "events": {
        "id": this.registerBlog.value.event
      }*/
    }
    console.log("valores crear: ", objetoCrear)
    this._blogServices.add(objetoCrear, "/blog").subscribe(
      res => {
        this.toastr.success('Blog creado Exitosamente');
        console.log("creado exitosamente", res)
        this.resetForm();
        this.getBlogs();
      },
      err => {
        console.log("error crear", err)
      }
    );
  }
  // Obtengo todos los blogs
  getBlogs() {
    this._blogServices.get("/blog").subscribe((data) => {
      this.blogs = data;
      console.log("blogs: ", this.blogs);
    });
  }

  // Seteo del objeto modificar 
  modificarBlog() {
    this.displayResponsiveModificar = false;
    this.submitted = true;
    if (this.modifBlog.invalid) {
      return;
    }
    //Objeto json que se envia al back
    let objetoModificar = {
      "blogs": {
        "title": this.modifBlog.value.title,
        "description": this.modifBlog.value.description,
        "image": this.modifBlog.value.image,
        "link": this.registerBlog.value.link
      }/*,
      "events": {
        "id": this.modifBlog.value.event
      }*/
    }
    // console.log("objetoModificar: ", objetoModificar)
    this._blogServices.updateData(objetoModificar, "/blog/" + this.blogseleccionado.id).subscribe(
      res => {
        this.toastr.success('Álbum modificado Exitosamente');
        console.log("modificado: exitosamente", res);
        this.getBlogs();
      },
      err => {
        console.log("error: modificar", err)
      }
    );
  }

  // Obtener blog por Id
  getBlog(id: number) {
    this.modalModificar();
    this._blogServices.get("/blog/" + id).subscribe((data) => {
      this.blogseleccionado = data;
      console.log("blog seleccionado: ", this.blogseleccionado);
    });
  }

  getIdEliminar(id) {
    this.idEliminar = id;
    console.log("this.idEliminar = id: ", this.idEliminar = id)
  }

  // Servicio para eliminar objeto
  deleteBlog(id) {
    console.log("id a eliminar:")
    this._blogServices.delete("/blog/" + id).subscribe(
      res => {
        this.toastr.success('Eliminado Exitosamente');

        console.log("eliminado: exitosamente", res);
        this.getBlogs();
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
    this.registerBlog.reset();
  }

  /* formBlog: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public _blogServices: BlogService
             ) {
                this.buildFormArchive();
                this.formBlog.patchValue(this._blogServices.selectedField);
   }

  ngOnInit(): void {
  }

  buildFormArchive(){
    this.formBlog=this.formBuilder.group({
      id:[null],//valor por defecto, 
      title:['',[Validators.required, Validators.maxLength(20)]],
      description:['',[Validators.required, Validators.maxLength(20)]],
      foto:[null]//si es una validacicion tener un Validators
    });


    this.formBlog.get('foto').valueChanges.subscribe((value)=>{
      if(value !== null && value !== ''){
        this.imgToBase64((document.querySelector('input[type="file"]') as HTMLInputElement).files[0])
      }
      console.log(this.formBlog.get('foto').value);
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

  onSaveArchive(): void{
    console.log(this.formBlog.value);
    console.log(this.formBlog.value);
    this.formBlog.markAllAsTouched()

    if(this.formBlog.valid){// is es valido da true
      //nuevo
      if(this.formBlog.controls['id'].value== null){
       this._blogServices.agregarBlog(this.formBlog.value);
      }
      
    } else{
      //actualizar
      //this._libraryServices.editField(formarchive.value.id, formarchive.value);
      this.formBlog.markAllAsTouched()//activar los errores que hay
    }

  }*/
}
