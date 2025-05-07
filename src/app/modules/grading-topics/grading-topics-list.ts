import { Component, OnInit, signal, ViewChild } from "@angular/core";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { SkillCategory, GradingTopic } from "../../models/_index";

import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { BaseComponent } from "../../services/_baseComponent";

@Component({
  selector: "app-grading-topics-list",
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService],
  templateUrl: "grading-topics-list.html",
})
export class GradingTopicsList extends BaseComponent implements OnInit {
  @ViewChild("dt") dt!: Table;

  data = signal<GradingTopic[]>([]);

  dialog: boolean = false;
  skillCategories = signal<SkillCategory[]>([]);
  addOrEditItem!: GradingTopic;
  submitted: boolean = false;

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

  isValid() {
    //console.log(this.addOrEditItem);

    if(!this.addOrEditItem.skillCategoryId || this.addOrEditItem.skillCategoryId == 0)
      return false;

    if(!this.addOrEditItem.sequence)
      return false;

    if(!this.addOrEditItem.name || this.addOrEditItem.name.trim().length == 0)
      return false;

    if(!this.addOrEditItem.maximumMarks || this.addOrEditItem.maximumMarks == 0)
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
