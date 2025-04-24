import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { RolePermissions } from "../models/rolePermissions";

@Injectable({providedIn: 'root'})
export class RolePermissionsService {
  constructor(private http: HttpClient) {}

  GetItems(): Observable<Array<RolePermissions>> {
    return this.http.get<Array<RolePermissions>>(Constants.WebApiBaseUrl + "/RolePermissions");
  }

  get Roles(): any {
    return [
      { label: "National Admin", value: RolesEnum.NationalAdmin, icon: "fa fa-user-secret", color: 'red' },
      { label: "Regional Admin", value: RolesEnum.RegionalAdmin, icon: "fa fa-user-tie", color: 'purple' },
      { label: "Proctor", value: RolesEnum.Proctor, icon: "fa fa-user-pen", color: 'navy' },
    ];
  }

  get Permissions(): any {
    return [
      { label: "Participants: List", value: PermissionsEnum.PARTICIPANTS_LIST, icon: "pi pi-id-card", color: 'brown' },

      { label: "Admin: Users List", value: PermissionsEnum.USERS_LIST, icon: "fa-solid fa-user", color: 'red' },
      // { label: "Users Add", value: PermissionsEnum.USERS_ADD },
      // { label: "Users Edit", value: PermissionsEnum.USERS_EDIT },
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
}

export enum PermissionsEnum {

  PARTICIPANTS_LIST = 'PARTICIPANTS_LIST',

  USERS_LIST = 'USERS_LIST',
  USERS_ADD = 'USERS_ADD',
  USERS_EDIT = 'USERS_EDIT',
}