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
}
