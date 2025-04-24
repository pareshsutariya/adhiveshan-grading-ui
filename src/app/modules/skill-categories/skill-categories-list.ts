import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";

import { MessageService } from "primeng/api";
import { Table } from "primeng/table";

import { LayoutService } from "../../layout/service/layout.service";
import { Constants } from "../../services/_constants";
import { UsersService } from "../../services/users.service";
import { AuthService } from "../../services/auth.service";
import { SkillCategory } from "../../models/skill-category";
import { GradingTopicsService } from "../../services/grading-topics.service";

@Component({
  selector: "app-skill-categories-list",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService, UsersService, Constants],
  templateUrl: "skill-categories-list.html",
})
export class SkillCategoriesList implements OnInit {
  @ViewChild("dt") dt!: Table;

  data = signal<SkillCategory[]>([]);

  constructor(
    private gradingTopicsService: GradingTopicsService,
    public router: Router,
    public constants: Constants,
    public authService: AuthService,
    private messageService: MessageService,
    public layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.layoutService.isDataLoading.set(true);

    this.gradingTopicsService.GetSkillCategories().subscribe(data => { 
        this.data.set(data);
        this.layoutService.isDataLoading.set(false);
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearGlobalFilter(){
    this.dt.filterGlobal("", 'contains');
  }
}
