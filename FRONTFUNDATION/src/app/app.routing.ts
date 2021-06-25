import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsComponent } from './components/components.component';
import { LoginComponent } from './pages/login/login.component';
import { BlogComponent } from './pages/blog/blog.component';
import { RegisterComponent } from './pages/register/register.component';
import { GaleriaComponent } from './pages/galeria/galeria.component';
import { ImagenesComponent } from './pages/galeria/imagenes/imagenes.component';
import { VoluntariosComponent } from './pages/voluntarios/voluntarios.component';
import { AlbumnesAdminComponent } from './admin/albumnes-admin/albumnes-admin.component';
import { BlogAdminComponent } from './admin/blog-admin/blog-admin.component';
import { NinosAdminComponent } from './admin/ninos-admin/ninos-admin.component';
import { PatrocinadoresAdminComponent } from './admin/patrocinadores-admin/patrocinadores-admin.component';
import { VoluntariosAdminComponent } from './admin/voluntarios-admin/voluntarios-admin.component';
import { ImagenesAdminComponent } from './admin/albumnes-admin/imagenes-admin/imagenes-admin.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ComponentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'imagenes/:id/:album', component: ImagenesComponent },
  { path: 'clubAmigos', component: VoluntariosComponent },
  { path: 'albumAdmin', component: AlbumnesAdminComponent}, 
  { path: 'blogAdmin', component: BlogAdminComponent },
  { path: 'ninosAdmin', component: NinosAdminComponent },//
  { path: 'patrocinadoresAdmin', component: PatrocinadoresAdminComponent},
  { path: 'clubAdmin', component: VoluntariosAdminComponent },
  { path: 'imagenesAdmin/:id/:album', component: ImagenesAdminComponent},

  

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
