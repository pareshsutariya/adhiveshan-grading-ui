import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleByCandidates } from "./components/schedule-by-candidates";
import { Parameters } from "./components/parameters";
import { FileData } from "./components/file-data";
import { ScheduleByRooms } from "./components/schedule-by-rooms";
import { Providers } from '../../models/_providers';
import { AdhiveshanInput, ParticipantForSchedule } from '../../models/_index';
import { BaseComponent } from '../base-component/baseComponent';
import { PrimeNgModules } from '../../models/_prime-ng-imports';
import { AngularModules } from '../../models/_angular-imports';

@Component({
    selector: 'app-schedule-generator',
    imports: [AngularModules, PrimeNgModules, ScheduleByCandidates, ScheduleByRooms, Parameters],
    providers: [Providers],
    template: `
    <p-toast />

    <div class="card">
      <p-tabs value="0" scrollable>
        <p-tablist>
            <ng-template #previcon>
                <i class="pi pi-minus"></i>
            </ng-template>
            <p-tab value="0">
              <p-avatar image="https://static.thenounproject.com/png/2442972-512.png" size="normal"/>
              <span class="font-bold whitespace-nowrap" style="font-size: medium">Input</span>
            </p-tab>
            <!-- 
            <p-tab value="1" [disabled]="this.dataService.candidates.length == 0">
              <p-avatar image="https://static.thenounproject.com/png/1194546-512.png" size="large"/>
                <span class="font-bold whitespace-nowrap" style="font-size: medium">Participants</span>
            </p-tab> 
            -->
            <p-tab value="1" [disabled]="this.dataService.candidates.length == 0">
                <p-avatar image="https://static.thenounproject.com/png/532076-512.png" size="large"/>
                <span class="font-bold whitespace-nowrap" style="font-size: medium">Schedule By Participants</span>
            </p-tab>
            <p-tab value="2" [disabled]="this.dataService.candidates.length == 0">
                <p-avatar image="https://static.thenounproject.com/png/7699115-512.png" size="large"/>
                <span class="font-bold whitespace-nowrap" style="font-size: medium">Schedule By Rooms</span>
            </p-tab>
            <ng-template #nexticon>
                <i class="pi pi-plus"></i>
            </ng-template>
        </p-tablist>
        <p-tabpanels>
            <p-tabpanel value="0">
                <app-parameters #appParameters></app-parameters>
                <!-- Submit & Reset -->
                <div class="flex justify-end items-center gap-2 mt-3" *ngIf="dataService.candidates.length > 0">
                  <p-button label="Generate Schedule" severity="primary" (onClick)="OnGenerate()" />
                  <p-button label="Reset" severity="secondary" (onClick)="reset()" />
                  <p-button label="Save Schedule" severity="warn" (onClick)="OnSave()"/>
                </div>
            </p-tabpanel>
            <p-tabpanel value="1">
              <app-schedule-by-candidates #appScheduleByCandidates [input]="input"></app-schedule-by-candidates>
            </p-tabpanel>
            <p-tabpanel value="2">
              <app-schedule-by-rooms #appScheduleByRooms [input]="input"></app-schedule-by-rooms>
            </p-tabpanel>
            <!-- 
            <p-tabpanel value="4">
              <div style="font-size: large" *ngFor="let log of this.slotsService.logs" [innerHTML]="log"></div>
            </p-tabpanel> 
            -->
        </p-tabpanels>
      </p-tabs>
    </div>
    `
})
export class ScheduleGenerator extends BaseComponent implements OnInit, AfterViewInit {

    @ViewChild("appScheduleByCandidates") appScheduleByCandidates!: ScheduleByCandidates;
    @ViewChild("appScheduleByRooms") appScheduleByRooms!: ScheduleByRooms;
    @ViewChild("appParameters") appParameters!: Parameters;
    
    logs: string[] = [];
    tabs1: string = "   "; // /t
    tabs2: string = "      "; // /t\t

    input: AdhiveshanInput = {};

    ngOnInit() {
    }

    ngAfterViewInit(): void {
      this.OnGenerate();
    }

    reset() {
      window.location.reload();
    }
    
    OnGenerate() {
      this.layoutService.isDataLoading.set(true);

      setTimeout(() => {
        this.generateAsync();
        this.layoutService.isDataLoading.set(false);
      }, 1000);
    }

    OnSave() {
      let eventSchedule = {
        eventId: this.input.eventId,
        rooms: this.dataService.rooms,
        participants: this.dataService.candidates,
      }

      this.eventSchedulesService.Save(eventSchedule).subscribe(response => {
        if(response.isSuccessful == true)
          this.messageService.add({ severity: "success", summary: "Schedule", detail: "Schedule saved successfully", life: 3000 });
        else 
          this.messageService.add({ severity: "danger", summary: "Schedule", detail: "Schedule didn't saved successfully", life: 3000 });
      });
    }

    generateAsync(){
        this.input = this.appParameters.input;

        // Generate Room and timeslices
        this.appScheduleByRooms.generateRoomsAndTimeSlices(this.input);

        this.OnAssignTimeSlices();
    }

    OnAssignTimeSlices(){

      this.layoutService.isDataLoading.set(true);

      this.fileDataService.setCandidatePriority(this.input);

      // Iterate over each candidate
      this.dataService.candidates.forEach((candidate: ParticipantForSchedule) => {

        // Process each candidate
        this.slotsService.processCandidate(this.input, candidate.misId!);
      });

      // Check for pendingAssignment
      this.dataService.candidates.forEach(candidate=>{
        candidate.pendingAssignment = false;

        candidate.participatingSkills?.forEach(psk=>{
          if(psk.sliceNumber == null || psk.sliceNumber == undefined)
            candidate.pendingAssignment = true;
        });
      });

      // Count Assigned Unassigned Candidates();
      this.input.skills?.forEach(skill=>{
        skill.noOfAssigned = this.dataService.getAssignedCount(skill.name);
        skill.noOfPending = this.dataService.getUnAssignedCount(skill.name);
      });
    }
}
