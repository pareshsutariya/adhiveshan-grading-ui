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

         // HOME
        let home: MenuItem = {label: 'Home', items: []};
        home.items?.push({ label: 'Dashboard', icon: 'fa-solid fa-chart-pie', routerLink: ['/'] });

        // PARTICIPANTS
        let participants: MenuItem = {label: 'Participants',  items: []};
        participants.items?.push({ label: 'Import / View', icon: 'fa-solid fa-upload', routerLink: ['/import-participants'] });

        // PROCTOR ADMIN
        let proctorAdmin: MenuItem = {label: 'Proctor Admins', items: []};
        proctorAdmin.items?.push({ label: 'Proctors', icon: 'fa-solid fa-user-clock', routerLink: ['/proctors'] });
        proctorAdmin.items?.push({ label: 'Events', icon: 'fa-solid fa-calendar-check', routerLink: ['/events'] });

        // NATIONAL ADMIN
        let nationalAdmin: MenuItem = {label: 'National Admin', items: []};
        nationalAdmin.items?.push({ label: 'Proctor Admins', icon: 'fa-solid fa-users-gear', routerLink: ['/proctor-admins'] });
        nationalAdmin.items?.push({ label: 'Skill Grading Questions', icon: 'fa-solid fa-circle-question', routerLink: ['/skill-grading-questions'] });
        nationalAdmin.items?.push({ label: 'Skill and Categories', icon: 'fa-solid fa-kitchen-set', routerLink: ['/skill-categories'] });

        //if(this.HasUserPermissions([PermissionsEnum.USERS_LIST]))
        //superAdmin.items?.push({ label: 'Users', icon: 'fa-solid fa-user-lock', routerLink: ['/users'] });

        if(home!.items!.length > 0)
            this.model.push(home);

        if(participants!.items!.length > 0)
            this.model.push(participants);

        if(proctorAdmin!.items!.length > 0)
            this.model.push(proctorAdmin);

        if(nationalAdmin!.items!.length > 0)
            this.model.push(nationalAdmin);
    }
}
