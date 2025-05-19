import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from './_index';
import { Grade } from "../models/_index";

@Injectable({providedIn: 'root'})
export class GradesService {
  constructor(private http: HttpClient) {}

  GetForParticipantAndJudge(bapsId: string, skillCategory: string, judgeUserId: number): Observable<Array<Grade>> {
    return this.http.get<Array<Grade>>(environment.WebApiBaseUrl + `/Grades/GetForParticipantAndJudge/${bapsId}/${skillCategory}/${judgeUserId}`);
  }

  GetGradedParticipantsForJudge(judgeUserId: number): Observable<Array<Grade>> {
    return this.http.get<Array<Grade>>(environment.WebApiBaseUrl + `/Grades/GetGradedParticipantsForJudge/${judgeUserId}`);
  }

  Save(item: Grade) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http
      .post(environment.WebApiBaseUrl + "/Grades/", JSON.stringify(item), { headers: headers })
      .pipe();
  }
}
