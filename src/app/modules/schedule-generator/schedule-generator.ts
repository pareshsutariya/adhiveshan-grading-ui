import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ScheduleByCandidates } from "./components/schedule-by-candidates";
import { Parameters } from "./components/parameters";
import { FileData } from "./components/file-data";
import { ScheduleByRooms } from "./components/schedule-by-rooms";
import { Providers } from '../../models/_providers';
import { AdhiveshanInput, Candidate } from '../../models/_index';
import { BaseComponent } from '../base-component/baseComponent';
import { PrimeNgModules } from '../../models/_prime-ng-imports';
import { AngularModules } from '../../models/_angular-imports';

@Component({
    selector: 'app-schedule-generator',
    imports: [AngularModules, PrimeNgModules, ScheduleByCandidates, ScheduleByRooms, Parameters, FileData],
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
            <p-tab value="1" [disabled]="this.dataService.candidates.length == 0">
              <p-avatar image="https://static.thenounproject.com/png/1194546-512.png" size="large"/>
                <!-- <p-avatar image="https://static.thenounproject.com/png/532076-512.png" size="large"/> -->
                <span class="font-bold whitespace-nowrap" style="font-size: medium">File Data</span>
            </p-tab>
            <p-tab value="2" [disabled]="this.dataService.candidates.length == 0">
                <!-- <p-avatar image="https://static.thenounproject.com/png/7644636-512.png" size="large"/> -->
                <p-avatar image="https://static.thenounproject.com/png/532076-512.png" size="large"/>
                <span class="font-bold whitespace-nowrap" style="font-size: medium">Schedule By Participants</span>
            </p-tab>
            <p-tab value="3" [disabled]="this.dataService.candidates.length == 0">
                <p-avatar image="https://static.thenounproject.com/png/7699115-512.png" size="large"/>
                <span class="font-bold whitespace-nowrap" style="font-size: medium">Schedule By Rooms</span>
            </p-tab>
            <!-- 
            <p-tab value="4" [disabled]="this.slotsService.logs.length == 0">
                <p-avatar image="https://static.thenounproject.com/png/6203482-512.png" size="normal"/>
                <span class="font-bold whitespace-nowrap" style="font-size: medium">Logs</span>
            </p-tab> 
            -->
            <ng-template #nexticon>
                <i class="pi pi-plus"></i>
            </ng-template>
        </p-tablist>
        <p-tabpanels>
            <p-tabpanel value="0">
                <app-parameters #appParameters></app-parameters>
                <!-- Submit & Reset -->
                <div class="flex justify-end items-center gap-2 mt-3">
                  <p-button label="Generate Schedule" severity="primary" (onClick)="OnGenerate()" [disabled]="dataService.candidates.length==0" />
                  <!-- <p-button label="Assign Time Slices" severity="primary" (onClick)="OnAssignTimeSlices()" /> -->
                  <p-button label="Reset" severity="secondary" (onClick)="reset()" />
                </div>
            </p-tabpanel>
            <p-tabpanel value="1">
              <app-file-data #appFileData [input]="input"></app-file-data>
            </p-tabpanel>
            <p-tabpanel value="2">
              <app-schedule-by-candidates #appScheduleByCandidates [input]="input"></app-schedule-by-candidates>
            </p-tabpanel>
            <p-tabpanel value="3">
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
    @ViewChild("appFileData") appFileData!: FileData;
    
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
      localStorage.clear();
      window.location.reload();
    }
    
    OnGenerate() {
      this.layoutService.isDataLoading.set(true);

      setTimeout(() => {
        this.generateAsync();
        this.layoutService.isDataLoading.set(false);
      }, 1000);
    }

    generateAsync(){
        this.input = this.appParameters.input;

        this.input.examStartDate = `${this.input.examDateOnly} ${this.input.examStartTime}`;
        this.input.examEndDate = `${this.input.examDateOnly} ${this.input.examEndTime}`;

        this.appFileData.input = this.input;

        // Generate Room and timeslices
        this.appScheduleByRooms.generateRoomsAndTimeSlices(this.input);
        //this.rooms = this.appScheduleByRooms.rooms;

        this.OnAssignTimeSlices();

        //this.assignSlotsAsync();
    }

    OnAssignTimeSlices(){

      // if(!this.input.hostCenter){
      //   this.messageService.add({ severity: "warn", summary: "Validation", detail: "Host Center is mandatory", life: 3000 });
      //   return;
      // }

      this.layoutService.isDataLoading.set(true);

      this.fileDataService.setCandidatePriority(this.input);

      //setTimeout(() => {
        //this.assignSlotsAsync2();

        //this.layoutService.isDataLoading.set(true);

        // Iterate over each candidate
        this.dataService.candidates.forEach((candidate: Candidate) => {

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

        //this.layoutService.isDataLoading.set(false);
      //}, 2000);
    }
}
