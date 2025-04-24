import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { User } from "../models/user";
import { SkillCategory } from "../models/skill-category";

@Injectable({providedIn: 'root'})
export class GradingTopicsService {
  constructor(private http: HttpClient) {}

  GetSkillCategories(): Observable<Array<SkillCategory>> {
    return this.http.get<Array<SkillCategory>>(Constants.WebApiBaseUrl + "/GradingTopics/GetSkillCategories");
  }
}
