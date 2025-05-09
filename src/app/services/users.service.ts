import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { User } from "../models/_index";

@Injectable({providedIn: 'root'})
export class UsersService {
  constructor(private http: HttpClient) {}

  GetUsersForLoginUser(loginUserBapsId: string): Observable<Array<User>> {
    return this.http.get<Array<User>>(Constants.WebApiBaseUrl + "/Users/GetUsersForLoginUser/" + loginUserBapsId);
  }

  GetById(id: number): Observable<User> {
    return this.http.get<User>(Constants.WebApiBaseUrl + "/Users/" + id);
  }

  Save(item: User) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    if (item.userId == null || item.userId == 0)
      return this.http
        .post(Constants.WebApiBaseUrl + "/Users", JSON.stringify(item), { headers: headers })
        .pipe();
    else
      return this.http
        .put(Constants.WebApiBaseUrl + "/Users/" + item.userId, JSON.stringify(item), { headers: headers })
        .pipe();
  }
}
