import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
     //dashboard: MenuItem = {label: 'Dashboard', icon: 'fa-solid fa-house', routerLink: ['/'] };

     model: MenuItem[] = [];

     constructor(private authService: AuthService) {
         
     }
 
     ngOnInit() {
         this.model = [];

         // Home
        let home: MenuItem = {label: 'Home', items: []};
        home.items?.push({ label: 'Dashboard', icon: 'fa-solid fa-house', routerLink: ['/'] });

        let participants: MenuItem = {label: 'Participants', items: []};
        participants.items?.push({ label: 'Import / View', icon: 'pi pi-id-card', routerLink: ['/import-participants'] });

        let superAdmin: MenuItem = {label: 'Super Admin', items: []};
        //if(this.HasUserPermissions([PermissionsEnum.USERS_LIST]))
        superAdmin.items?.push({ label: 'Users', icon: 'fa-solid fa-user-lock', routerLink: ['/users'] });

        if(home!.items!.length > 0)
            this.model.push(home);

        if(participants!.items!.length > 0)
            this.model.push(participants);

        if(superAdmin!.items!.length > 0)
            this.model.push(superAdmin);

    }
}
