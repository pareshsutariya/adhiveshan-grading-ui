import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { SkillCategory } from "../models/skill-category";
import { GradingTopic } from "../models/grading-topic";
import { Grade } from "../models/grade";

@Injectable({providedIn: 'root'})
export class GradesService {
  constructor(private http: HttpClient) {}

  GetForParticipantAndProctor(misId: number, skillCategory: string, proctorUserId: number): Observable<Array<Grade>> {
    return this.http.get<Array<Grade>>(Constants.WebApiBaseUrl + `/Grades/GetForParticipantAndProctor/${misId}/${skillCategory}/${proctorUserId}`);
  }

  GetGradedParticipantsForProctor(proctorUserId: number): Observable<Array<Grade>> {
    return this.http.get<Array<Grade>>(Constants.WebApiBaseUrl + `/Grades/GetGradedParticipantsForProctor/${proctorUserId}`);
  }

  Save(item: Grade) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http
      .post(Constants.WebApiBaseUrl + "/Grades/", JSON.stringify(item), { headers: headers })
      .pipe();
  }
}
