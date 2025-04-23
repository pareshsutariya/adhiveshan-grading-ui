import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { CompetitionEvent } from "../models/competitionEvent";

@Injectable({providedIn: 'root'})
export class CompetitionEventsService {
  constructor(private http: HttpClient) {}

  GetItems(): Observable<Array<CompetitionEvent>> {
    return this.http.get<Array<CompetitionEvent>>(Constants.WebApiBaseUrl + "/CompetitionEvents");
  }

  GetById(id: number): Observable<CompetitionEvent> {
    return this.http.get<CompetitionEvent>(Constants.WebApiBaseUrl + `/CompetitionEvents/getById/${id}`);
  }
  
  Save(item: CompetitionEvent) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    if (item.competitionEventId == null || item.competitionEventId == 0)
      return this.http
        .post(Constants.WebApiBaseUrl + "/CompetitionEvents", JSON.stringify(item), { headers: headers })
        .pipe();
    else
      return this.http
        .put(Constants.WebApiBaseUrl + "/CompetitionEvents/" + item.competitionEventId, JSON.stringify(item), { headers: headers })
        .pipe();
  }
}
