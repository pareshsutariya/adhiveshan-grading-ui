import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Table } from "primeng/table";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../base-component/baseComponent";

import { SkillCategory } from "../../models/_index";
import { Providers } from "../../models/_providers";

@Component({
  selector: "app-skill-categories-list",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [Providers],
  templateUrl: "skill-categories-list.html",
})
export class SkillCategoriesList extends BaseComponent implements OnInit {
  @ViewChild("dt") dt!: Table;

  data = signal<SkillCategory[]>([]);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.layoutService.isDataLoading.set(true);

    this.gradingCriteriasService.GetSkillCategories().subscribe(response => { 
        this.data.set(response.data);
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
