import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-blog-admin',
  templateUrl: './blog-admin.component.html',
  styleUrls: ['./blog-admin.component.scss'],
  providers: [ConfirmationService],
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
  files: any;
  submitted = false;
    p: number = 1;


  constructor(private confirmationService: ConfirmationService,private formBuilder: FormBuilder, private router: Router, private _blogServices: BlogService, private toastr: ToastrService) {
    this.modifBlog = this.formBuilder.group({
      id: [null],//valor por defecto, 
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(80)]],
      //image: [null],//si es una validacicion tener un Validators
      link: [null]
    });
    this.registerBlog = this.formBuilder.group({
      //id: [null],//valor por defecto, 
      title: ['', [Validators.required, Validators.maxLength(20)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      //image: [null],//si es una validacicion tener un Validators
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
      console.log("Error en el formato del blog")
      return;
    }
    //Objeto json que se envia al back
    let objetoCrear = {
      //"blogs": {
        "title": this.registerBlog.value.title,
        "description": this.registerBlog.value.description,
        //"image": this.registerBlog.value.image,
        "link": this.registerBlog.value.link
      //}
    }
    console.log("valores crear: ", objetoCrear)
    this._blogServices.saveFile(this.files, objetoCrear, "/blog").subscribe(
      // this.restService.saveFile(this.files,objetoModificar,
      res => {
        this.toastr.success('Blog creado Exitosamente');
        this.resetForm();
        this.getBlogs();
      },
      err => {
        this.toastr.success('Entrada de Blog creado');
        this.resetForm();
        this.getBlogs();
       // console.log("error crear", err)
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
    //let objetoModificar = {
     // "blogs": {
     //   "title": this.modifBlog.value.title,
     //   "description": this.modifBlog.value.description,
    //  "image": this.modifBlog.value.image,
     //   "link": this.registerBlog.value.link
      //}
    //}
    console.log("objeto crear: ", this.modifBlog.value);
    // console.log("objetoModificar: ", objetoModificar)
    console.log(this.modifBlog.value, "/blog/" + this.blogseleccionado.id);
    this._blogServices.updateData(this.modifBlog.value, "/blog/update").subscribe(
      res => {
        
        this.toastr.success('Blog modificado Exitosamente');
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
    this._blogServices.get("/blog/findById/" + id).subscribe((data) => {
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
          this._blogServices.delete("/blog/delete/" + id).subscribe(
            res => {
              this.toastr.success('Eliminado Exitosamente');
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
