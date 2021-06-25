import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { BlogAdminComponent } from './blog-admin/blog-admin.component';
import { PatrocinadoresAdminComponent } from './patrocinadores-admin/patrocinadores-admin.component';
import { NinosAdminComponent } from './ninos-admin/ninos-admin.component';
import { AlbumnesAdminComponent } from './albumnes-admin/albumnes-admin.component';
import { VoluntariosAdminComponent } from './voluntarios-admin/voluntarios-admin.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { DialogModule } from 'primeng/dialog';
import { MessagesModule, } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { ImagenesAdminComponent } from './albumnes-admin/imagenes-admin/imagenes-admin.component';

@NgModule({
  declarations: [
    BlogAdminComponent,
    PatrocinadoresAdminComponent,
    NinosAdminComponent,
    AlbumnesAdminComponent,
    VoluntariosAdminComponent,
    ImagenesAdminComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    DialogModule,
    ConfirmDialogModule,
    MessageModule,
    MessagesModule,
    TooltipModule,
  ]
})
export class AdminModule { }
