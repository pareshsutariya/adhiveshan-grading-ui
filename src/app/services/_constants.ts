import { Injectable } from "@angular/core";
import moment, { Moment } from "moment";
import { Center } from "../models/center";

@Injectable({ providedIn: 'root' })
export class Constants {

  private static AWSAPI: string =
    /localhost/.test(document.location.host) == true
      ? "http://localhost:5001"
      : "TBD";

  public static WebApiBaseUrl: string = Constants.AWSAPI + "/api";
  public static DateTimeFormat: string = "MM/DD/YYYY HH:mm";
  public static DateTimeFormatShort: string = "MM/DD HH:mm";


  get UserStatuses(): any {
    return [
      { label: "Active", value: "Active" },
      { label: "In Active", value: "In Active" },
      { label: "Deleted", value: "Deleted" }
    ];
  }

  GetStatusTag(status: string) {
    status = status.toLowerCase();
    switch (status) {
        case 'raised':
        case 'in active':
            return 'danger';

        case 'active':
        case 'resolved':
          return 'success';

        case 'deleted':
          return 'contrast';

        default:
            return 'info';
    }
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

export enum RegionsEnum {
  Canada = 'Canada',
  Midwest = 'Midwest',
  Northeast = 'Northeast',
  Southeast = 'Southeast',
  Southwest = 'Southwest',
  West = 'West',
  Unknown = 'Unknown',
}
