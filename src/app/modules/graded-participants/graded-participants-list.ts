import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Table } from "primeng/table";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../base-component/baseComponent";

import { Grade, Participant } from "../../models/_index";
import { Providers } from "../../models/_providers";
import { ParticipantGrades } from "../../models/participant-grades";

@Component({
  selector: "app-graded-participants-list",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [Providers],
  templateUrl: "graded-participants-list.html",
})
export class GradedParticipantsList extends BaseComponent implements OnInit {
  @ViewChild("dt") dt!: Table;

  data = signal<Grade[]>([]);
  dialog: boolean = false;
  selectedParticipant: Participant| undefined;
  selectedSkillCategory: string| undefined;
  selectedGrades: Grade[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.layoutService.isDataLoading.set(true);

    let loginUserId = this.authService.GetLoginUserId();
    this.gradesService.GetGradedParticipantsForJudge(loginUserId).subscribe(response => { 
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

  openPravachanGrades(item: ParticipantGrades) {
    this.selectedParticipant = item.participant;
    this.selectedGrades = item.pravachanGrades!;
    this.selectedSkillCategory = item.pravachanSkill + ": " + item.pravachanCategory;
    this.dialog = true;
  }

  openEmceeGrades(item: ParticipantGrades) {
    this.selectedParticipant = item.participant;
    this.selectedGrades = item.emceeGrades!;
    this.selectedSkillCategory = item.emceeSkill + ": " + item.emceeCategory;
    this.dialog = true;
  }
}
