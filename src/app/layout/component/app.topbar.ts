import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [ProgressSpinnerModule, RouterModule, CommonModule, StyleClassModule],
    template: ` <div class="layout-topbar">
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
    </div>
    
    <div class="progress-spinner" *ngIf="layoutService.isDataLoading()">
        <p-progress-spinner strokeWidth="4" fill="transparent" animationDuration="4s" ariaLabel="loading"/>
    </div>
    `
})
export class AppTopbar {
    items!: MenuItem[];

    constructor(public layoutService: LayoutService) {}

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }
}
