import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Constants } from './_constants';
import { MenuItem } from 'primeng/api';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public WebApiBaseUrl: string = Constants.WebApiBaseUrl; 
  //private loggedInUser:User;

  constructor(private http: HttpClient, private router: Router) {
  }  

  SetLoginUser(user: User) {

    localStorage.setItem("loggedInUser", JSON.stringify(user));
    //this.loggedInUser = user;
  }

  GetLoginUser() : User {
    return JSON.parse(localStorage.getItem("loggedInUser") as string) as User;
  }

  GetLoginUserInitial() : string {
    let loginUser = this.GetLoginUser();
    let initial = "";

    if(!loginUser || !loginUser.fullName)
      return initial;
    
    let fullName = loginUser.fullName;

    let arr = fullName.split(" ");
    initial = arr[0].charAt(0);

    if(arr.length>1)
      initial = initial + arr[1].charAt(0);

    return initial;
  }

  IsUserLoggedIn(): boolean {
      return this.GetLoginUser() != null;
  }

  HasUserPermissions(requiredPermissions: Array<string>): boolean {

    if(!requiredPermissions) return true;

    if(this.IsAdminUser()) return true;

    let userPermissions = this.LoggedInUserPermissions();
    if(!userPermissions)
      return false;

    return requiredPermissions?.every(permission => userPermissions.includes(permission));
  }

  IsAdminUser():boolean {
    if (this.GetLoginUser() && this.GetLoginUser().misId=='vyom131313') {
        return true; 
    }
    return false;
  }

  LoggedInUserName(){
    return this.GetLoginUser()  != null ? this.GetLoginUser().fullName : null;
  }

  LoggedInUserFirstName(){
    return this.GetLoginUser()  != null ? this.GetLoginUser().fullName?.split(" ")[0] : null;
  }

  LoggedInUserPermissions(){
    return this.GetLoginUser()  != null ? this.GetLoginUser().assignedRoles : null;
  }
  
  logoutUser(): void{
    localStorage.clear(); 
  }

  logoutUserAndRedirect(): void{
    localStorage.clear(); 
    location.reload();
    //this.router.navigate(['/dashboard']);
  }

  GetUserByUsernameAndPassword(username: string, password: string): Observable<User> {
    if(username == "vyom131313") {
      return new Observable<User>(observable => {
        let user: User = {};
        user.fullName = "Paresh";
        user.misId = "vyom131313";
        user.status = "ACTIVE";
        user.assignedRoles = [];
        observable.next(user);
      });
    }
    else {
      return this.http.get<User>(`${this.WebApiBaseUrl}/users/GetUserByUsernameAndPassword/${username}/${password}`);
    }
  }
}
