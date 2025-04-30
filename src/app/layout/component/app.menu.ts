import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from '../../services/auth.service';
import { PermissionsEnum } from '../../services/rolePermissions.service';

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

    constructor(private auth: AuthService) { }
     //dashboard: MenuItem = {label: 'Dashboard', icon: 'fa-solid fa-house', routerLink: ['/'] };

     model: MenuItem[] = [];

     ngOnInit() {
         this.model = [];

         // HOME
        let home: MenuItem = {label: 'Home', items: []};
        home.items?.push({ label: 'Dashboard', icon: 'fa-solid fa-chart-pie', routerLink: ['/'] });

        // PARTICIPANTS
        let participants: MenuItem = {label: 'Participants',  items: []};
        
        if(this.auth.HasUserPermissions([PermissionsEnum.Participants_Import, PermissionsEnum.Participants_View,]))
            participants.items?.push({ label: 'Import / View', icon: 'fa-solid fa-upload', routerLink: ['/import-participants'] });
        
        if(this.auth.HasUserPermissions([PermissionsEnum.Participants_Import, PermissionsEnum.Participants_View,]))
            participants.items?.push({ label: 'Region and Centers (View)', icon: 'pi pi-building-columns', routerLink: ['/region-centers'] });
        
        if(this.auth.HasUserPermissions([PermissionsEnum.Participants_Import, PermissionsEnum.Participants_View,]))
            participants.items?.push({ label: 'Skill and Categories (View)', icon: 'fa-solid fa-kitchen-set', routerLink: ['/skill-categories'] });

        // EVENTS
        let events: MenuItem = {label: 'Events', items: []};
        if(this.auth.HasUserPermissions([PermissionsEnum.Events_View]))
            events.items?.push({ label: 'Events', icon: 'fa-solid fa-calendar-check', routerLink: ['/events'] });
        
        // GRADING
        let grading: MenuItem = {label: 'Grading', items: []};
        if(this.auth.HasUserPermissions([PermissionsEnum.Grading_Questions_View]))
            grading.items?.push({ label: 'Grading Topics', icon: 'fa-solid fa-circle-question', routerLink: ['/grading-topics'] });
        if(this.auth.HasUserPermissions([PermissionsEnum.Grading_Participants_Search_Participants]))
            grading.items?.push({ label: 'Grading Participants', icon: 'fa-solid fa-graduation-cap', routerLink: ['/grading-participants'] });
        if(this.auth.HasUserPermissions([PermissionsEnum.Grading_Participants_View_Participants_Grade]))
            grading.items?.push({ label: 'View Participants Grades', icon: 'fa-solid fa-graduation-cap', routerLink: ['/graded-participants'] });

        // ACCOUNTS
        let accounts: MenuItem = {label: 'Accounts', items: []};
        if(this.auth.HasUserPermissions([PermissionsEnum.Users_NationalAdmins_View, PermissionsEnum.Users_RegionalAdmins_View, PermissionsEnum.Users_Proctors_View]))
            accounts.items?.push({ label: 'Users', icon: 'fa-solid fa-user-lock', routerLink: ['/users'] });
        
        if(this.auth.HasUserPermissions([PermissionsEnum.Users_NationalAdmins_View]))
            accounts.items?.push({ label: 'Roles/Permissions', icon: 'fa-solid fa-user-lock', routerLink: ['/rolePermissions'] });

        // CHECK IN
        let checkIn: MenuItem = {label: 'Check In Desk',  items: []};
        if(this.auth.HasUserPermissions([PermissionsEnum.CheckIn_View]))
            checkIn.items?.push({ label: 'Check In Proctors', icon: 'fa-solid fa-user-check', routerLink: ['/check-in-proctors'] });
        
        // REPORTS
        let reports: MenuItem = {label: 'Reports',  items: []};
        if(this.auth.HasUserPermissions([PermissionsEnum.Reports_Check_In_Report]))
            reports.items?.push({ label: 'Check In Report', icon: 'fa-solid fa-user-check', routerLink: ['/check-in-report'] });
        if(this.auth.HasUserPermissions([PermissionsEnum.Reports_Grading_Report]))
            reports.items?.push({ label: 'Grading Report', icon: 'fa-solid fa-graduation-cap', routerLink: ['/gradeing-report'] });

        if(home!.items!.length > 0)
            this.model.push(home);

        if(participants!.items!.length > 0)
            this.model.push(participants);

        if(events!.items!.length > 0)
            this.model.push(events);

        if(grading!.items!.length > 0)
            this.model.push(grading);
        
        if(checkIn!.items!.length > 0)
            this.model.push(checkIn);   

        if(reports!.items!.length > 0)
            this.model.push(reports);  

        if(accounts!.items!.length > 0)
            this.model.push(accounts);     
        
        /*
        // NATIONAL ADMINS
        let nationalAdmin: MenuItem = {label: 'National Admin', items: []};
        nationalAdmin.items?.push({ label: 'Region and Centers (View)', icon: 'pi pi-building-columns', routerLink: ['/region-centers'] });
        nationalAdmin.items?.push({ label: 'Skill and Categories (View)', icon: 'fa-solid fa-kitchen-set', routerLink: ['/skill-categories'] });
        nationalAdmin.items?.push({ label: 'Grading Topics', icon: 'fa-solid fa-circle-question', routerLink: ['/grading-topics'] });
        nationalAdmin.items?.push({ label: 'Events', icon: 'fa-solid fa-calendar-check', routerLink: ['/events'] });

        // PROCTOR ADMINS
        let proctorAdmin: MenuItem = {label: 'Proctor Admins', items: []};
        proctorAdmin.items?.push({ label: 'Region and Centers (View)', icon: 'pi pi-building-columns', routerLink: ['/region-centers'] });
        proctorAdmin.items?.push({ label: 'Skill and Categories (View)', icon: 'fa-solid fa-kitchen-set', routerLink: ['/skill-categories'] });
        proctorAdmin.items?.push({ label: 'Grading Topics (View)', icon: 'fa-solid fa-circle-question', routerLink: ['/grading-topics'] });
        proctorAdmin.items?.push({ label: 'Events (Update)', icon: 'fa-solid fa-calendar-check', routerLink: ['/events'] });

        // PROCTORS
        let proctors: MenuItem = {label: 'Proctors', items: []};
        proctors.items?.push({ label: 'Grade Participants', icon: 'fa-solid fa-graduation-cap', routerLink: ['/grading-participants'] });

        // ACCOUNTS
        //if(this.HasUserPermissions([PermissionsEnum.USERS_LIST]))
        let accounts: MenuItem = {label: 'Accounts', items: []};
        accounts.items?.push({ label: 'Users', icon: 'fa-solid fa-user-lock', routerLink: ['/users'] });
        accounts.items?.push({ label: 'Roles/Permissions', icon: 'fa-solid fa-user-lock', routerLink: ['/rolePermissions'] });

        // CHECK IN
        let checkIn: MenuItem = {label: 'Check In Desk',  items: []};
        checkIn.items?.push({ label: 'Check In Proctors', icon: 'fa-solid fa-user-check', routerLink: ['/check-in-proctors'] });
        
        // REPORTS
        let reports: MenuItem = {label: 'Reports',  items: []};
        reports.items?.push({ label: 'Check In Report', icon: 'fa-solid fa-user-check', routerLink: ['/check-in-report'] });
        reports.items?.push({ label: 'Grading Report', icon: 'fa-solid fa-graduation-cap', routerLink: ['/gradeing-report'] });

        if(home!.items!.length > 0)
            this.model.push(home);

        if(participants!.items!.length > 0)
            this.model.push(participants);

        if(nationalAdmin!.items!.length > 0)
            this.model.push(nationalAdmin);

        if(proctorAdmin!.items!.length > 0)
            this.model.push(proctorAdmin);

        if(proctors!.items!.length > 0)
            this.model.push(proctors);

        if(accounts!.items!.length > 0)
            this.model.push(accounts);     
        
        if(checkIn!.items!.length > 0)
            this.model.push(checkIn);   

        if(reports!.items!.length > 0)
            this.model.push(reports);  
        */
    }
}
