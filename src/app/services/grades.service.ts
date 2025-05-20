import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from './_index';
import { Grade, ServiceResponse } from "../models/_index";

@Injectable({providedIn: 'root'})
export class GradesService {
  constructor(private http: HttpClient) {}

  GetForParticipantAndJudge(bapsId: string, skillCategory: string, judgeUserId: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + `/Grades/GetForParticipantAndJudge/${bapsId}/${skillCategory}/${judgeUserId}`);
  }

  GetGradedParticipantsForJudge(judgeUserId: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + `/Grades/GetGradedParticipantsForJudge/${judgeUserId}`);
  }

  Save(item: Grade) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http
      .post<ServiceResponse>(environment.WebApiBaseUrl + "/Grades/", JSON.stringify(item), { headers: headers })
      .pipe();
  }
}
