import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { RolePermissions, RolePermissionsPivot } from "../models/rolePermissions";

@Injectable({providedIn: 'root'})
export class RolePermissionsService {
  constructor(private http: HttpClient) {}

  GetItems(): Observable<Array<RolePermissions>> {
    return this.http.get<Array<RolePermissions>>(Constants.WebApiBaseUrl + "/RolePermissions");
  }

  GetPivotItems(): Observable<Array<RolePermissionsPivot>> {
    return this.http.get<Array<RolePermissionsPivot>>(Constants.WebApiBaseUrl + "/RolePermissions/Pivot");
  }

  get Roles(): any {
    return [
      { label: "National Admin", value: RolesEnum.NationalAdmin, icon: "fa fa-user-secret", color: 'red' },
      { label: "Regional Admin", value: RolesEnum.RegionalAdmin, icon: "fa fa-user-tie", color: 'purple' },
      { label: "Proctor", value: RolesEnum.Proctor, icon: "fa fa-user-pen", color: 'black' },
      { label: "Check In", value: RolesEnum.CheckIn, icon: "fa-solid fa-user-check", color: 'green' },
    ];
  }

  public get RolesEnum(): typeof RolesEnum {
    return RolesEnum; 
  }
  public get PermissionsEnum(): typeof PermissionsEnum {
    return PermissionsEnum; 
  }
}

export enum RolesEnum {

  NationalAdmin = 'National Admin',
  RegionalAdmin = 'Regional Admin',
  Proctor = 'Proctor',
  CheckIn = 'Check In',
}

export enum PermissionsEnum {

  Users_NationalAdmins_View = "Users: National Admins: View",
  Users_NationalAdmins_Add = "Users: National Admins: Add",
  Users_NationalAdmins_Update = "Users: National Admins: Update",

  Users_RegionalAdmins_View = "Users: Regional Admins: View",
  Users_RegionalAdmins_Add = "Users: Regional Admins: Add",
  Users_RegionalAdmins_Update = "Users: Regional Admins: Update",

  Users_Proctors_View = "Users: Proctors: View",
  Users_Proctors_Add = "Users: Proctors: Add",
  Users_Proctors_Update = "Users: Proctors: Update",

  Grading_Questions_View = "Grading Questions: View",
  Grading_Questions_Add = "Grading Questions: Add",
  Grading_Questions_Update = "Grading Questions: Update",

  Skill_Categories_View = "Skill Categories: View",

  Participants_View = "Participants: View",
  Participants_Import = "Participants: Import",

  CheckIn_View = "Check In: View",
  CheckIn_Update = "Check In: Update",

  Events_View = "Events: View",
  Events_Add = "Events: Add",
  Events_Update = "Events: Update",

  Grading_Participants_Search_Participants = "Grading Participants: Search Participants",
  Grading_Participants_Grade_Participants = "Grading Participants: Grade Participants",
  Grading_Participants_View_Participants_Grade = "Grading Participants: View Participants Grade",

  Reports_Check_In_Report = "Reports: Check In Report",
  Reports_Grading_Report = "Reports: Grading Report",
}