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
import { UsuariosAdminComponent } from './admin/usuarios-admin/usuarios-admin.component';
import { EventosAdminComponent } from './admin/eventos-admin/eventos-admin.component';
import { ZonasAdminComponent } from './admin/zonas-admin/zonas-admin.component';
import { FormularioComponent } from './admin/zonas-admin/formulario.component';
import { RecuperarComponent } from './pages/login/recuperar/recuperar.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: ComponentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'galeria', component: GaleriaComponent },
  { path: 'imagenes/:id/:album', component: ImagenesComponent },
  { path: 'clubAmigos', component: VoluntariosComponent },
  { path: 'albumAdmin', component: AlbumnesAdminComponent, canActivate: [AuthGuard]}, 
  { path: 'blogAdmin', component: BlogAdminComponent, canActivate: [AuthGuard] },
  { path: 'ninosAdmin', component: NinosAdminComponent, canActivate: [AuthGuard] },//
  { path: 'patrocinadoresAdmin', component: PatrocinadoresAdminComponent, canActivate: [AuthGuard]},
  { path: 'clubAdmin', component: VoluntariosAdminComponent, canActivate: [AuthGuard] },
  { path: 'imagenesAdmin/:id/:album', component: ImagenesAdminComponent, canActivate: [AuthGuard]},
  { path: 'usuariosAdmin', component: UsuariosAdminComponent, canActivate: [AuthGuard]},
  { path: 'eventos', component: EventosAdminComponent},
  { path: 'zonas', component: ZonasAdminComponent, canActivate: [AuthGuard]},
  { path: 'zonas-admin/formulario', component: FormularioComponent, canActivate: [AuthGuard]},
  { path: 'recuperar', component: RecuperarComponent},


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
