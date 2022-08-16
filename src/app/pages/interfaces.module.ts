import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';
import { RegisterComponent } from './register/register.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { ImagenesComponent } from './galeria/imagenes/imagenes.component';
import { CardModule } from 'primeng/card';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';
import { MatSelectModule } from '@angular/material/select';
import { HistoriasComponent } from './historias/historias.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { VoluntariosComponent } from './voluntarios/voluntarios.component';
import {InputTextModule} from 'primeng/inputtext';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {TooltipModule} from 'primeng/tooltip';
import {MatDialogModule} from '@angular/material/dialog';


import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        CardModule,
        NgImageFullscreenViewModule,
        MatSelectModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        MatFormFieldModule,
        MatInputModule,
        TooltipModule,
        MatDialogModule,
        ReactiveFormsModule
    ],
    declarations: [
        LoginComponent,
        BlogComponent,
        RegisterComponent,
        GaleriaComponent,
        ImagenesComponent,
        HistoriasComponent,
        VoluntariosComponent
    ]
})
export class ExamplesModule { }