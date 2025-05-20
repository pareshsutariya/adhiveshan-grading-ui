import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from './_index';
import { SkillCategory, GradingCriteria, ServiceResponse } from "../models/_index";

@Injectable({providedIn: 'root'})
export class GradingCriteriasService {
  constructor(private http: HttpClient) {}

  GetSkillCategories(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + "/GradingCriterias/GetSkillCategories");
  }

  GetItems(): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + "/GradingCriterias");
  }

  GetBySkillCategory(skillCategory: string): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + `/GradingCriterias/GetBySkillCategory/${skillCategory}`);
  }

  GetById(id: number): Observable<ServiceResponse> {
    return this.http.get<ServiceResponse>(environment.WebApiBaseUrl + "/GradingCriterias/" + id);
  }

  Save(item: GradingCriteria) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    if (item.gradingCriteriaId == null || item.gradingCriteriaId == 0)
      return this.http
        .post<ServiceResponse>(environment.WebApiBaseUrl + "/GradingCriterias", JSON.stringify(item), { headers: headers })
        .pipe();
    else
      return this.http
        .put<ServiceResponse>(environment.WebApiBaseUrl + "/GradingCriterias/" + item.gradingCriteriaId, JSON.stringify(item), { headers: headers })
        .pipe();
  }
}
