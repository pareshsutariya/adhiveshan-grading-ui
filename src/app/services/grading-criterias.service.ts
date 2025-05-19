import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { SkillCategory, GradingCriteria } from "../models/_index";

@Injectable({providedIn: 'root'})
export class GradingCriteriasService {
  constructor(private http: HttpClient) {}

  GetSkillCategories(): Observable<Array<SkillCategory>> {
    return this.http.get<Array<SkillCategory>>(Constants.WebApiBaseUrl + "/GradingCriterias/GetSkillCategories");
  }

  GetItems(): Observable<Array<GradingCriteria>> {
    return this.http.get<Array<GradingCriteria>>(Constants.WebApiBaseUrl + "/GradingCriterias");
  }

  GetBySkillCategory(skillCategory: string): Observable<Array<GradingCriteria>> {
    return this.http.get<Array<GradingCriteria>>(Constants.WebApiBaseUrl + `/GradingCriterias/GetBySkillCategory/${skillCategory}`);
  }

  GetById(id: number): Observable<GradingCriteria> {
    return this.http.get<GradingCriteria>(Constants.WebApiBaseUrl + "/GradingCriterias/" + id);
  }

  Save(item: GradingCriteria) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    if (item.gradingCriteriaId == null || item.gradingCriteriaId == 0)
      return this.http
        .post(Constants.WebApiBaseUrl + "/GradingCriterias", JSON.stringify(item), { headers: headers })
        .pipe();
    else
      return this.http
        .put(Constants.WebApiBaseUrl + "/GradingCriterias/" + item.gradingCriteriaId, JSON.stringify(item), { headers: headers })
        .pipe();
  }
}
