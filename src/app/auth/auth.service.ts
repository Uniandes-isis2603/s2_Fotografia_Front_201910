import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {NgxRolesService, NgxPermissionsService} from 'ngx-permissions'
import 'rxjs/add/operator/catch';

/**
 * The service provider for everything related to authentication
 */
@Injectable()
export class AuthService {

    /**
     * Constructor of the service
     * @param router Angular's Router to redirect the user on login or logout
     * @param roleService NgxRolesService to manage authentication roles
     * @param permissionsService NgxPermissionsService to manage authentication permissions
     */
    constructor (private router: Router, private roleService: NgxRolesService, private permissionsService: NgxPermissionsService) { }

    start (): void {
        this.permissionsService.flushPermissions();
        this.roleService.flushRoles();
        this.permissionsService.loadPermissions(['edit_author_permission', 'delete_author_permission', 'leave_review','entrar_concurso', 'anadir_fotografia','crear_concurso']);
        const role = localStorage.getItem('role');
        if (!role) {
            this.setGuestRole();
        } else if (role === 'ADMIN') {
            this.setAdministratorRole();
        } else if (role === 'CLIENT'){
            this.setClientRole();
        } else if (role === 'FOTOGRAFO'){
            this.setFotografoRole();
        } else if (role === 'ORGANIZADOR'){
            this.setOrganizadorRole();
        }
    }

    setGuestRole (): void {
        this.roleService.flushRoles();
        this.roleService.addRole('GUEST', ['']);
    }

    setClientRole (): void {
        this.roleService.flushRoles();
        this.roleService.addRole('CLIENT', ['leave_review']);
        localStorage.setItem('role', 'CLIENT');
    }

    setAdministratorRole (): void {
        this.roleService.flushRoles();
        this.roleService.addRole('ADMIN', ['edit_author_permission', 'delete_author_permission']);
        localStorage.setItem('role', 'ADMIN');
    }
    
    setFotografoRole (): void{
        this.roleService.flushRoles();
        this.roleService.addRole('FOTOGRAFO', ['entrar_concurso', 'anadir_fotografia']);
        localStorage.setItem('role', 'FOTOGRAFO');
    }
    
    setOrganizadorRole (): void{
        this.roleService.flushRoles();
        this.roleService.addRole('ORGANIZADOR', ['crear_concurso']);
        localStorage.setItem('role','ORGANIZADOR');
    }

    printRole (): void {
        console.log(this.roleService.getRoles());
    }

    /**
     * Logs the user in with the desired role
     * @param role The desired role to set to the user
     */
    login (role): void {
        if (role === 'Administrator') {
            this.setAdministratorRole();
        } else if (role === 'Client') {
            this.setClientRole();
        } else if (role === 'Fotografo'){
            this.setFotografoRole();
        } else if (role === 'Organizador'){
            this.setOrganizadorRole();
        }
        this.router.navigateByUrl('/');
    }

    /**
     * Logs the user out
     */
    logout (): void {
        this.roleService.flushRoles();
        this.setGuestRole();
        localStorage.removeItem('role');
        this.router.navigateByUrl('/');
    }
}
