import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from './_index';
import { CompetitionEvent, ServiceResponse } from "../models/_index";

@Injectable({providedIn: 'root'})
export class CompetitionEventsService {
  constructor(private http: HttpClient) {}

  GetItems(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + "/CompetitionEvents");
  }

  GetEventsForLoginUser(loginUserBapsId: string): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + "/CompetitionEvents/GetEventsForLoginUser/" + loginUserBapsId);
  }

  GetById(id: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + `/CompetitionEvents/getById/${id}`);
  }
  
  Save(item: CompetitionEvent) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    console.log("Save", item);

    if (item.competitionEventId == null || item.competitionEventId == 0)
      return this.http
        .post<ServiceResponse>(environment.WebApiBaseUrl + "/CompetitionEvents", JSON.stringify(item), { headers: headers })
        .pipe();
    else
      return this.http
        .put<ServiceResponse>(environment.WebApiBaseUrl + "/CompetitionEvents/" + item.competitionEventId, JSON.stringify(item), { headers: headers })
        .pipe();
  }
}
