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

  get Regions(): any {
    return [
      { label: "Canada", value: "Canada", color: "navy" },
      { label: "North East", value: "Northeast", color: "#C95792" },
      { label: "South East", value: "Southeast", color: "brown" },
      { label: "South West", value: "Southwest", color: "#F8B55F" },
      { label: "West", value: "West", color: "#3D365C" },
      { label: "Mid West", value: "Midwest", color: "#7C4585" },
      { label: "Unknown", value: "Unknown", color: "black" },
    ];
  }

  get Mandals(): any {
    return [
      { label: "F1 Student", value: "F1 Student", icon: "fa-solid fa-person", color: "navy" },
      { label: "Kishor", value: "Kishor", icon: "fa-solid fa-person", color: "navy"  },
      { label: "Yuvak", value: "Yuvak", icon: "fa-solid fa-person", color: "navy"  },
      { label: "Sanyukta", value: "Sanyukta", icon: "fa-solid fa-person", color: "navy"  },
    
      { label: "iF1 Student", value: "iF1 Student", icon: "fa-solid fa-person-dress", color: "brown" },
      { label: "Kishori", value: "Kishori", icon: "fa-solid fa-person-dress", color: "brown" },
      { label: "Yuvati", value: "Yuvati", icon: "fa-solid fa-person-dress", color: "brown" },
      { label: "Premvati", value: "Premvati", icon: "fa-solid fa-person-dress", color: "brown" },
    ];
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
