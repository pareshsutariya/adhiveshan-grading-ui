import { Component, OnInit, signal, ViewChild } from "@angular/core";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { SkillCategory, GradingCriteria } from "../../models/_index";

import { MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { BaseComponent } from "../base-component/baseComponent";
import { Providers } from "../../models/_providers";

@Component({
  selector: "app-grading-criterias-list",
  imports: [AngularModules, PrimeNgModules],
  providers: [Providers],
  templateUrl: "grading-criterias-list.html",
})
export class GradingCriteriasList extends BaseComponent implements OnInit {
  @ViewChild("dt") dt!: Table;

  data = signal<GradingCriteria[]>([]);

  dialog: boolean = false;
  skillCategories = signal<SkillCategory[]>([]);
  addOrEditItem!: GradingCriteria;
  submitted: boolean = false;

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.layoutService.isDataLoading.set(true);
    this.gradingCriteriasService.GetSkillCategories().subscribe(response => {
      this.skillCategories.set(response.data);
      this.layoutService.isDataLoading.set(false);
    });

    this.layoutService.isDataLoading.set(true);
    this.gradingCriteriasService.GetItems().subscribe(response => { 
        this.data.set(response.data);
        this.layoutService.isDataLoading.set(false);
      });
  }

  openNew() {
    this.addOrEditItem = {};
    this.addOrEditItem.status = "Active";
    this.submitted = false;
    this.dialog = true;
  }

  openEdit(item: GradingCriteria) {
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

    this.gradingCriteriasService.Save(this.addOrEditItem).subscribe(response => {
        this.layoutService.isDataLoading.set(false);

        let detail = this.addOrEditItem.gradingCriteriaId ? "Grading Criteria Updated" : "Grading Criteria Created";
        this.messageService.add({ severity: "success", summary: "Successful", detail: detail, life: 3000 });

        let selectedSkillCategoryId = this.addOrEditItem.skillCategoryId;

        this.loadData();

        if(!this.addOrEditItem.gradingCriteriaId){
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
