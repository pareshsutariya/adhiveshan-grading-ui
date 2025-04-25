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

  dialog: boolean = false;
  skillCategories = signal<SkillCategory[]>([]);
  addOrEditItem!: GradingTopic;
  submitted: boolean = false;

  constructor(
    public gradingTopicsService: GradingTopicsService,
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
      this.skillCategories.set(data);
      this.layoutService.isDataLoading.set(false);
    });

    this.layoutService.isDataLoading.set(true);
    this.gradingTopicsService.GetItems().subscribe(data => { 
        this.data.set(data);
        this.layoutService.isDataLoading.set(false);
      });
  }

  openNew() {
    this.addOrEditItem = {};
    this.addOrEditItem.round = 1;
    this.addOrEditItem.requiredProctors = 2;
    this.addOrEditItem.status = "Active";
    this.submitted = false;
    this.dialog = true;
  }

  openEdit(item: GradingTopic) {
    this.addOrEditItem = { ...item };
    this.dialog = true;
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearGlobalFilter(table: Table){
    table.filterGlobal("", 'contains');
  }

  addGrade(){
    if(!this.addOrEditItem.weightageOptions) 
      this.addOrEditItem.weightageOptions = [];

    this.addOrEditItem.weightageOptions?.push(0.5);
  }

  updateGrade(index: number, event: any){
    this.addOrEditItem.weightageOptions![index]= event.target.value;
  }

  removeGrade(index: number){
    if(!this.addOrEditItem.weightageOptions) 
      this.addOrEditItem.weightageOptions = [];

    this.addOrEditItem.weightageOptions?.splice(index, 1);
  }

  isValid() {
    //console.log(this.addOrEditItem);

    if(!this.addOrEditItem.skillCategoryId || this.addOrEditItem.skillCategoryId == 0)
      return false;

    if(!this.addOrEditItem.name || this.addOrEditItem.name.trim().length == 0)
      return false;

    if(!this.addOrEditItem.round || this.addOrEditItem.round == 0)
      return false;

    if(!this.addOrEditItem.requiredProctors || this.addOrEditItem.requiredProctors == 0)
      return false;

    if(!this.addOrEditItem.status || this.addOrEditItem.status.trim().length == 0)
      return false;

    return true;
  }

  save() {
    this.submitted = true;

    if(this.isValid() == false)
      return;

    this.layoutService.isDataLoading.set(true);

    this.gradingTopicsService.Save(this.addOrEditItem).subscribe(c => {
        this.layoutService.isDataLoading.set(false);

        let detail = this.addOrEditItem.gradingTopicId ? "Grading Topic Updated" : "Grading Topic Created";
        this.messageService.add({ severity: "success", summary: "Successful", detail: detail, life: 3000 });

        let selectedSkillCategoryId = this.addOrEditItem.skillCategoryId;

        this.loadData();

        if(!this.addOrEditItem.gradingTopicId){
          this.openNew();
          this.addOrEditItem.skillCategoryId = selectedSkillCategoryId;
        }
        else {
          this.dialog = false;
          this.addOrEditItem = {};
        }
    });
  }
}
