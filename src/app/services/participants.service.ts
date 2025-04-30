import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { Participant } from "../models/participant";

@Injectable({providedIn: 'root'})
export class ParticipantsService {
  constructor(private http: HttpClient) {}

  GetItems(): Observable<Array<Participant>> {
    return this.http.get<Array<Participant>>(Constants.WebApiBaseUrl + "/Participants");
  }

  GetByMisId(misId: number): Observable<Participant> {
    return this.http.get<Participant>(Constants.WebApiBaseUrl + `/Participants/getByMisId/${misId}`);
  }

  GetCandidateForProctoring(misId: number, skillCategory: string, loginUserId: number): Observable<Participant> {
    return this.http.get<Participant>(Constants.WebApiBaseUrl + `/Participants/GetCandidateForProctoring/${misId}/${skillCategory}/${loginUserId}`);
  }

  Import(items: Participant[]) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    console.log(items);

    return this.http
      .post(Constants.WebApiBaseUrl + "/Participants/import", JSON.stringify(items), { headers: headers })
      .pipe();
  }
}
