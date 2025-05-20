import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { environment } from './_index';
import { ServiceResponse, User, UserJudgeImport } from "../models/_index";

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private http: HttpClient) {}

  GetUsersForLoginUser(loginUserBapsId: string): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + "/Users/GetUsersForLoginUser/" + loginUserBapsId);
  }

  GetById(id: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + "/Users/" + id);
  }

  Save(item: User) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    if (item.userId == null || item.userId == 0)
      return this.http
        .post<ServiceResponse>(environment.WebApiBaseUrl + "/Users", JSON.stringify(item), { headers: headers })
        .pipe();
    else
      return this.http
        .put<ServiceResponse>(environment.WebApiBaseUrl + "/Users/" + item.userId, JSON.stringify(item), { headers: headers })
        .pipe();
  }

  ImportJudges(loginUserBapsId: string, items: UserJudgeImport[]) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http
      .post<ServiceResponse>(environment.WebApiBaseUrl + "/Users/JudgesImport/" + loginUserBapsId, JSON.stringify(items), { headers: headers }).pipe();
  }
}
