import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {

    const requiredPermissions = route.data['permissions'] as Array<string>;
    
    let userLoggedIn = this.authService.IsUserLoggedIn();
    let userPermissions = this.authService.HasUserPermissions(requiredPermissions);

    if(!userLoggedIn) {
      // Redirect to the login page
      this.router.navigate(['/login']);
      return false;
    }

    if(!userPermissions) {
      // Redirect to the access denied page
      this.router.navigate(['/access']);
      return false;
    }

    return true;

    /*
    if (this.authService.IsUserLoggedIn() && this.authService.HasUserPermissions(requiredPermissions) ) {
      return true; 
    } else {
      this.router.navigate(['/login']);
      return false;
    }
    */
  }
}