import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { Participant } from "../models/participant";
import { RolePermissions } from "../models/rolePermissions";

@Injectable({providedIn: 'root'})
export class RolePermissionsService {
  constructor(private http: HttpClient) {}

  GetItems(): Observable<Array<RolePermissions>> {
    return this.http.get<Array<RolePermissions>>(Constants.WebApiBaseUrl + "/RolePermissions");
  }
}
