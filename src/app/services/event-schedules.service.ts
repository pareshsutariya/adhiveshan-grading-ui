import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from './_index';
import { CompetitionEvent, EventSchedule, ServiceResponse } from "../models/_index";

@Injectable({providedIn: 'root'})
export class EventSchedulesService {
  constructor(private http: HttpClient) {}

  GetByEventId(eventId: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + `/eventSchedules/getByEventId/${eventId}`);
  }
  
  Save(item: EventSchedule) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    console.log("Save", item);

    return this.http
      .post<ServiceResponse>(environment.WebApiBaseUrl + "/eventSchedules", JSON.stringify(item), { headers: headers })
      .pipe();
  }
}
