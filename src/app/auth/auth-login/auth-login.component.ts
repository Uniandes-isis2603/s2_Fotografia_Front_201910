import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { AuthService } from '../auth.service';

import { User } from '../user';

import { ToastrService } from 'ngx-toastr';

import {Router} from '@angular/router';

@Component({
    selector: 'app-auth-login',
    templateUrl: './auth-login.component.html',
    styleUrls: ['./auth-login.component.css']
})
export class AuthLoginComponent implements OnInit {

    /**
    * Constructor for the component
    * @param authService Auth service provider
    * @param toastrService The toastr to show messages to the user
    */
    constructor(
        private authService: AuthService,
        private toastrService: ToastrService,
        private router: Router
    ) { }

    user: User;

    roles: String[];

    role: string;
    /**
    * Logs the user in with the selected role
    */
    login(): void {
        let respuesta = `{"login": "${this.user.nombre}", "password":"${this.user.password}"}`
        let res = JSON.parse(respuesta);
        if(this.role === 'Administrador'){
            if(this.user.nombre === 'admin' && this.user.password === 'admin'){
                this.authService.setAdministratorRole();
                localStorage.setItem('currentUser', JSON.stringify(this.user));
                this.router.navigateByUrl('/');
            }
        }
        else if(this.role === 'Client'){
            this.authService.loginCliente(res).
            subscribe(cliente => {
                this.authService.setCurrentUser(cliente);
                localStorage.setItem('currentUser', JSON.stringify(cliente));
                this.authService.setClientRole();
                this.router.navigateByUrl('/');
            }
            );
        }
        else if(this.role === 'Fotografo'){
            this.authService.loginFotografo(res).
            subscribe(cliente => {
                this.authService.setCurrentUser(cliente);
                localStorage.setItem('currentUser', JSON.stringify(cliente));
                this.authService.setFotografoRole();
                this.router.navigateByUrl('/');
            }
            );
        }
        else if(this.role === 'Organizador'){
            this.authService.loginOrganizador(res).
            subscribe(cliente => {
                this.authService.setCurrentUser(cliente);
                localStorage.setItem('currentUser', JSON.stringify(cliente));
                this.authService.setOrganizadorRole();
                this.router.navigateByUrl('/');
            }
            );
        }
        else if(this.role === 'Jurado'){
            this.authService.loginJurado(res).
            subscribe(cliente => {
                this.authService.setCurrentUser(cliente);
                localStorage.setItem('currentUser', JSON.stringify(cliente));
                this.authService.setJuradoRole();
                this.router.navigateByUrl('/');
            }
            );
        }
   
    }

    /**
    * This function will initialize the component
    */
    ngOnInit() {
        this.user = new User();
        this.roles = ['Administrator', 'Client', 'Fotografo','Organizador','Jurado'];
    }

}
