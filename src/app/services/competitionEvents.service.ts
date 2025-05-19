import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from './_index';
import { CompetitionEvent } from "../models/_index";

@Injectable({providedIn: 'root'})
export class CompetitionEventsService {
  constructor(private http: HttpClient) {}

  GetItems(): Observable<Array<CompetitionEvent>> {
    return this.http.get<Array<CompetitionEvent>>(environment.WebApiBaseUrl + "/CompetitionEvents");
  }

  GetEventsForLoginUser(loginUserBapsId: string): Observable<Array<CompetitionEvent>> {
    return this.http.get<Array<CompetitionEvent>>(environment.WebApiBaseUrl + "/CompetitionEvents/GetEventsForLoginUser/" + loginUserBapsId);
  }

  GetById(id: number): Observable<CompetitionEvent> {
    return this.http.get<CompetitionEvent>(environment.WebApiBaseUrl + `/CompetitionEvents/getById/${id}`);
  }
  
  Save(item: CompetitionEvent) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    console.log("Save", item);

    if (item.competitionEventId == null || item.competitionEventId == 0)
      return this.http
        .post(environment.WebApiBaseUrl + "/CompetitionEvents", JSON.stringify(item), { headers: headers })
        .pipe();
    else
      return this.http
        .put(environment.WebApiBaseUrl + "/CompetitionEvents/" + item.competitionEventId, JSON.stringify(item), { headers: headers })
        .pipe();
  }
}
