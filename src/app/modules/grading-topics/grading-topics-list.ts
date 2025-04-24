import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";

import { MessageService } from "primeng/api";
import { Table } from "primeng/table";

import { LayoutService } from "../../layout/service/layout.service";
import { Constants } from "../../services/_constants";
import { AuthService } from "../../services/auth.service";
import { SkillCategory } from "../../models/skill-category";
import { GradingTopicsService } from "../../services/grading-topics.service";
import { GradingTopic } from "../../models/grading-topic";

@Component({
  selector: "app-grading-topics-list-list",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService, Constants],
  templateUrl: "grading-topics-list.html",
})
export class GradingTopicsList implements OnInit {
  @ViewChild("dt") dt!: Table;

  data = signal<GradingTopic[]>([]);

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

    this.gradingTopicsService.GetItems().subscribe(data => { 
        this.data.set(data);
        this.layoutService.isDataLoading.set(false);
      });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearGlobalFilter(table: Table){
    table.filterGlobal("", 'contains');
  }
}
