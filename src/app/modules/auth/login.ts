import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { AngularModules } from '../../models/_angular-imports';
import { PrimeNgModules } from '../../models/_prime-ng-imports';
import { LayoutService } from '../../layout/service/layout.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [AngularModules, PrimeNgModules],
    providers: [MessageService],
    template: `
        <p-toast />
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
                            <p-password id="password1" [(ngModel)]="password" placeholder="Password" [toggleMask]="true" styleClass="mb-4" [fluid]="true" [feedback]="false"></p-password>

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
export class Login {
    username: string = '';
    password: string = '';
    error: string = '';

  constructor(
    private router: Router,        
    private messageService: MessageService,
    private layoutService: LayoutService,
    private authService: AuthService) {
}
  ngOnInit(): void {
    this.authService.logoutUser();
  }

  onSubmit(): void {
    this.error = "";

    this.layoutService.isDataLoading.set(true);

    this.authService.GetUserByUsernameAndPassword(this.username, this.password)
    .subscribe({
        next: (response: any) => {
            this.layoutService.isDataLoading.set(false);

            console.log(response);

            let user = JSON.parse(response);

            if(user != null) {
                this.authService.SetLoginUser(user);
                this.messageService.add({ severity: "success", summary: "Authentication", detail: "Login successfully !!", life: 1000 });
                this.router.navigate(['dashboard']);
              }
              else 
                this.messageService.add({ severity: "error", summary: "Authentication", detail: "Login failed !!", life: 1000 });
        },
        error: (err) => {

            this.error = err.error;
            this.messageService.add({ severity: "error", summary: "Authentication", detail: `${err.error}`, life: 3000 });
            this.layoutService.isDataLoading.set(false);
        }
      });
  }
}
