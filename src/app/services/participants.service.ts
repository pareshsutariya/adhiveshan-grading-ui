import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { environment } from './_index';
import { Participant, ParticipantUpdateHostCenter, ServiceResponse } from "../models/_index";

@Injectable({providedIn: 'root'})
export class ParticipantsService {
  constructor(private http: HttpClient) {}

  GetItems(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + "/Participants");
  }

  GetByMisId(misId: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + `/Participants/getByMisId/${misId}`);
  }

  GetByBAPSId(bapsId: string): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + `/Participants/getByBAPSId/${bapsId}`);
  }

  GetParticipantsForEvent(eventId: number, gender: string): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + `/Participants/GetParticipantsForEvent/${eventId}/${gender}`);
  }

  GetParticipantForJudging(bapsId: string, loginUserId: number) {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + `/Participants/GetParticipantForJudging/${bapsId}/${loginUserId}`).pipe()
  }

  UpdateHostCenter(item: ParticipantUpdateHostCenter) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http
      .post<ServiceResponse>(environment.WebApiBaseUrl + "/Participants/UpdateHostCenter", JSON.stringify(item), { headers: headers })
      .pipe();
  }

  Import(items: Participant[]) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    console.log(items);

    return this.http
      .post<ServiceResponse>(environment.WebApiBaseUrl + "/Participants/import", JSON.stringify(items), { headers: headers })
      .pipe();
  }
}
