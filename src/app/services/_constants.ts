import { Injectable } from "@angular/core";
import moment, { Moment } from "moment";

@Injectable({ providedIn: 'root' })
export class Constants {
  public static DateTimeFormat: string = "MM/DD/YYYY HH:mm";
  public static DateTimeFormatShort: string = "MM/DD HH:mm";
}
