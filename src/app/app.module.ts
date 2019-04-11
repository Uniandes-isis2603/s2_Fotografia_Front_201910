import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpErrorInterceptor} from './interceptors/httperrorinterceptor.service';
import {NgxPermissionsModule} from 'ngx-permissions';
import { ModalDialogModule } from 'ngx-modal-dialog';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {AuthModule} from './auth/auth.module';
import {CalificacionModule} from './calificacion/calificacion.module';
import {JuradoModule} from './jurado/jurado.module';
import {OrganizadorModule} from './organizador/organizador.module';
import {FotografoModule} from './fotografo/fotografo.module';

import {ClienteModule} from './cliente/cliente.module';

import {RondaModule} from './ronda/ronda.module';
import { Ronda } from './ronda/ronda';
import {PhotoModule} from './photo/photo.module';
import {ConcursoModule} from './concurso/concurso.module';
import {FormaDePagoModule} from './forma-de-pago/forma-de-pago.module';


@NgModule({
    declarations: [
        AppComponent,
        
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        HttpClientModule,
        ConcursoModule,
        BrowserAnimationsModule,
        ModalDialogModule.forRoot(),
        AuthModule,
        CalificacionModule,
        JuradoModule,
        OrganizadorModule,
        FotografoModule,

        ClienteModule,
        FormaDePagoModule,

        RondaModule,
        PhotoModule,

        FormsModule,
        ToastrModule.forRoot({
            timeOut: 10000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
        }),
        NgxPaginationModule,
        NgxPermissionsModule.forRoot(),
        NgbModule
    ],

    bootstrap: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
        }
    ]
})
export class AppModule {}
