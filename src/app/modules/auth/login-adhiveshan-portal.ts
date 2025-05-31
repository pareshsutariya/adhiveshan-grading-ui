import { Component, OnInit } from '@angular/core';
import { AngularModules } from '../../models/_angular-imports';
import { PrimeNgModules } from '../../models/_prime-ng-imports';
import { AuthResponseModel, ServiceResponse } from '../../models/_index';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Providers } from '../../models/_providers';
import { BaseComponent } from '../base-component/baseComponent';

@Component({
    selector: 'login-adhiveshan-portal',
    standalone: true,
    imports: [AngularModules, PrimeNgModules, ProgressSpinnerModule],
    providers: [Providers],
    template: `
        <p-toast />
        <div class="progress-spinner" *ngIf="layoutService.isDataLoading()">
            <p-progress-spinner strokeWidth="4" fill="transparent" animationDuration="4s" ariaLabel="loading"/>
        </div>
    `
})
export class LoginAdhiveshanPortal extends BaseComponent implements OnInit {
    username: string | null | undefined;
    error: string = '';

  ngOnInit() {
    this.authService.logoutUser();

    this.route.paramMap.subscribe(params => {
      this.username = params.get('bapsId');
      if(this.username){
        this.onSubmit();
      }
      else {
        window.close();
      }
    });
  }

  onSubmit(): void {
    this.error = "";

    this.layoutService.isDataLoading.set(true);

    this.authService.loginForAdhiveshanPortal(this.username!)
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
