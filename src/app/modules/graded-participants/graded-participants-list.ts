import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Table } from "primeng/table";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../../services/_baseComponent";

import { SkillCategory } from "../../models/skill-category";
import { Grade } from "../../models/grade";

@Component({
  selector: "app-graded-participants-list",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService],
  templateUrl: "graded-participants-list.html",
})
export class GradedParticipantsList extends BaseComponent implements OnInit {
  @ViewChild("dt") dt!: Table;

  data = signal<Grade[]>([]);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.layoutService.isDataLoading.set(true);

    //let loginUserId = this.authService.GetLoginUserId();
    let loginUserId = 1;
    this.gradesService.GetGradedParticipantsForProctor(loginUserId).subscribe(data => { 
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
