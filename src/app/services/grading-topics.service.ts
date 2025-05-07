import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { SkillCategory, GradingTopic } from "../models/_index";

@Injectable({providedIn: 'root'})
export class GradingTopicsService {
  constructor(private http: HttpClient) {}

  GetSkillCategories(): Observable<Array<SkillCategory>> {
    return this.http.get<Array<SkillCategory>>(Constants.WebApiBaseUrl + "/GradingTopics/GetSkillCategories");
  }

  GetItems(): Observable<Array<GradingTopic>> {
    return this.http.get<Array<GradingTopic>>(Constants.WebApiBaseUrl + "/GradingTopics");
  }

  GetBySkillCategory(skillCategory: string): Observable<Array<GradingTopic>> {
    return this.http.get<Array<GradingTopic>>(Constants.WebApiBaseUrl + `/GradingTopics/GetBySkillCategory/${skillCategory}`);
  }

  GetById(id: number): Observable<GradingTopic> {
    return this.http.get<GradingTopic>(Constants.WebApiBaseUrl + "/GradingTopics/" + id);
  }

  Save(item: GradingTopic) {
    let headers = new HttpHeaders({ "Content-Type": "application/json" });

    if (item.gradingTopicId == null || item.gradingTopicId == 0)
      return this.http
        .post(Constants.WebApiBaseUrl + "/GradingTopics", JSON.stringify(item), { headers: headers })
        .pipe();
    else
      return this.http
        .put(Constants.WebApiBaseUrl + "/GradingTopics/" + item.gradingTopicId, JSON.stringify(item), { headers: headers })
        .pipe();
  }
}
