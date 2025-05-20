import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from './_index';
import { AuthResponseModel, ServiceResponse, User } from '../models/_index';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private loggedInUser:User;

  constructor(private http: HttpClient, private router: Router) {
  }  

  SetLoginUser(authResponse: AuthResponseModel) {

    console.log(JSON.stringify(authResponse.user));
    localStorage.setItem("loggedInUser", JSON.stringify(authResponse.user));
    localStorage.setItem('jwtToken', authResponse.accessToken!);
    //this.loggedInUser = user;
  }

  GetLoginUser() : User {
    return JSON.parse(localStorage.getItem("loggedInUser") as string) as User;
  }

  GetLoginUserId() : number {
    let user = this.GetLoginUser();

    if(user == null)
      return 0;

    return user.userId!;
  }

  GetLoginUserBAPSId() : string {
    let user = this.GetLoginUser();


    return user?.bapsId!;
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

  HasUserRoles(requiredRoles: Array<string>): boolean {

    if(!requiredRoles) return true;

    if(this.IsSuperAdminUser()) return true;

    let userRoles = this.LoggedInUserRoles();
    if(!userRoles){
      return false;
    }

    return requiredRoles?.filter(role => userRoles.includes(role)).length > 0;
  }

  HasUserPermissions(requiredPermissions: Array<string>): boolean {

    if(!requiredPermissions) return true;

    if(this.IsSuperAdminUser()) return true;

    let userPermissions = this.LoggedInUserPermissions();
    if(!userPermissions){

      //console.log("requiredPermissions", requiredPermissions);
      //console.log("userPermissions", userPermissions);
  
      return false;
    }

    return requiredPermissions?.filter(permission => userPermissions.includes(permission)).length > 0;
  }

  HasUserSkill(skill: string, category: string): boolean {

    if(this.IsSuperAdminUser()) return true;

    let user = this.GetLoginUser();

    category = category.replace("(", "").replace(")", "").replace("Gujarati", "").replace("English", "").trim();

    let skillCategory = `${skill}: ${category}`;

    // console.log("skillCategory", skillCategory);
    // console.log("user.assignedSkillCategories", user.assignedSkillCategories);

    if(!user || !user.assignedSkillCategories){

      //console.log("requiredPermissions", requiredPermissions);
      //console.log("userPermissions", userPermissions);
  
      return false;
    }

    return user.assignedSkillCategories!.includes(skillCategory);
  }

  IsSuperAdminUser():boolean {
    if (this.GetLoginUser() && this.GetLoginUser().bapsId=='vyom131313') {
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
    return this.GetLoginUser()  != null ? this.GetLoginUser().assignedPermissions : null;
  }

  LoggedInUserRoles(){
    return this.GetLoginUser()  != null ? this.GetLoginUser().assignedRoles : null;
  }
  
  logoutUser(): void{
    localStorage.clear(); 
  }

  logoutUserAndRedirect(): void{
    localStorage.clear(); 
    this.router.navigate(['/login']);
    //location.reload();
  }

  login(username: string, password: string): Observable<ServiceResponse> {
    // if(username == "vyom131313") {
    //   return new Observable<User>(observable => {
    //     let user: User = {};
    //     user.fullName = "Paresh";
    //     user.bapsId = "vyom131313";
    //     user.status = "ACTIVE";
    //     user.assignedRoles = [];
    //     observable.next(user);
    //   });
    // }
    // else 
    {
      let headers = new HttpHeaders({ "Content-Type": "application/json" });
      let model = { userName: username, password: password };

      return this.http.post<ServiceResponse>(`${environment.WebApiBaseUrl}/auth/login`, JSON.stringify(model), {headers: headers}).pipe();
    }
  }
}
