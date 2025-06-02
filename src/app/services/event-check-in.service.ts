import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from './_index';
import { EventCheckIn, ServiceResponse } from "../models/_index";

@Injectable({providedIn: 'root'})
export class EventCheckInService {
  constructor(private http: HttpClient) {}
  
  CheckIn(model: EventCheckIn) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http
    .post<ServiceResponse>(environment.WebApiBaseUrl + "/EventCheckIn", JSON.stringify(model), { headers: headers })
    .pipe();
  }

  GetCheckedInParticipants(selectedEventId: number) {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + `/EventCheckIn/GetCheckedInParticipants/${selectedEventId}`).pipe()
  }
}
