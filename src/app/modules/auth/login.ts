import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { AngularModules } from '../../models/_angular-imports';
import { PrimeNgModules } from '../../models/_prime-ng-imports';
import { LayoutService } from '../../layout/service/layout.service';
import { AuthResponseModel, ServiceResponse } from '../../models/_index';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Providers } from '../../models/_providers';
import { BaseComponent } from '../base-component/baseComponent';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [AngularModules, PrimeNgModules, ProgressSpinnerModule],
    providers: [Providers],
    template: `
        <p-toast />
        <div class="progress-spinner" *ngIf="layoutService.isDataLoading()">
            <p-progress-spinner strokeWidth="4" fill="transparent" animationDuration="4s" ariaLabel="loading"/>
        </div>
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <img src="./public/images/AdhiveshanLogo_BlackAndWhite.svg" width="120px" height="120px" class="mb-4 shrink-0 mx-auto"/>
                          
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to Adhiveshan Grading!</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>

                        <div>
                            <label for="userName" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Username</label>
                            <input pInputText id="userName" type="text" placeholder="Username" class="w-full md:w-[30rem] mb-8" [(ngModel)]="username" />

                            <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Password</label>
                            <input pInputText type="password" id="password" [(ngModel)]="password" (keyup.enter)="onSubmit()" placeholder="Password"  class="w-full md:w-[30rem] mb-8" />

                            <!-- 
                            <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                                <div class="flex items-center">
                                    <p-checkbox [(ngModel)]="checked" id="rememberme1" binary class="mr-2"></p-checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div>
                                <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                            </div> 
                            -->
                            <p-button label="Sign In" styleClass="w-full" (onClick)="onSubmit()"></p-button>
                        </div>

                        <br>
                        <!-- Error message -->
                        <p-message severity="error" *ngIf="error" size="large">
                            {{error}}
                        </p-message>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login extends BaseComponent implements OnInit {
    username: string = '';
    password: string = '';
    error: string = '';

  ngOnInit() {
    this.authService.logoutUser();
  }

  onSubmit(): void {
    this.error = "";

    this.layoutService.isDataLoading.set(true);

    this.authService.login(this.username, this.password)
    .subscribe((response: ServiceResponse) => {
        this.layoutService.isDataLoading.set(false);

        if(response.isSuccessful){

            console.log(response.data);

            let authResponse: AuthResponseModel = response.data;
            this.authService.SetLoginUser(authResponse);
            this.messageService.add({ severity: "success", summary: "Authentication", detail: "Login successfully !!", life: 3000 });
            this.router.navigate(['dashboard']);
        }
        else {
            this.error = response.errorMessage!;

            this.messageService.add({ severity: "error", summary: "Authentication", detail: response.errorMessage, life: 3000 });
        }
    });
  }
}
