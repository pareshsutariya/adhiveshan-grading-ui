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
}
