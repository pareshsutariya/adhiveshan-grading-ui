import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [ProgressSpinnerModule, RouterModule, CommonModule, StyleClassModule],
    template: `
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
                <i class="pi pi-bars"></i>
            </button>
            <a class="layout-topbar-logo" routerLink="/">
                <img src="./public/images/AdhiveshanLogo_BlackAndWhite.svg" width="60px" height="60px" />
                <!-- <img src="./public/images/AdhiveshanLogo_Color.png" width="35px" height="35px" /> -->

                <span class="whitespace-nowrap">Adhiveshan Grading</span>
                <!-- <span class="whitespace-nowrap">{{layoutService.pageTitle()}}</span> -->
            </a>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <div *ngIf="authService.IsUserLoggedIn()" class="whitespace-nowrap">
                    <button type="button" class="layout-topbar-action" style="color:blue">
                        <i class="pi pi-user"></i>
                    </button>
                </div> 
            </div>

            <span class="layout-topbar-logo" style="font-size: 1.2rem;">{{authService.LoggedInUserFirstName()}}</span>

            <button class="layout-topbar-menu-button layout-topbar-action" pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true">
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action" style="color:brown" (click)="authService.logoutUserAndRedirect()">
                        <i class="pi pi-sign-out"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </div> 
        </div>
    </div>
    
    <div class="progress-spinner" *ngIf="layoutService.isDataLoading()">
        <p-progress-spinner strokeWidth="4" fill="transparent" animationDuration="4s" ariaLabel="loading"/>
    </div>
    `
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService, public authService: AuthService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
