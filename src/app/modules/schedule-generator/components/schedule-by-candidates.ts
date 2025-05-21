import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import moment, { Moment } from "moment";
import { Table } from 'primeng/table';
import { Constants } from '../../../services/_constants';
import { AdhiveshanInput, ParticipantForSchedule, Room  } from '../../../models/_index';
import { BaseComponent } from '../../base-component/baseComponent';
import { AngularModules } from '../../../models/_angular-imports';
import { PrimeNgModules } from '../../../models/_prime-ng-imports';

@Component({
    standalone: true,
    selector: 'app-schedule-by-candidates',
    imports: [AngularModules, PrimeNgModules],
    template: `
    <p-toolbar styleClass="mb-1" >
      <ng-template #start>
          <p-iconfield>
            <p-inputicon styleClass="pi pi-search" />
            <input pInputText type="text" placeholder="Search..." [(ngModel)]="globalSearchText" (input)="onGlobalFilter($event)" />
          </p-iconfield>
          <p-button icon="fa-solid fa-text-slash" class="ml-2 mr-2" [rounded]="true" [outlined]="true" [severity]="globalSearchText.length > 0 ? 'contrast' : 'secondary'"
          (click)="clearGlobalFilter()" />
      </ng-template>
    </p-toolbar>

    <p-table #dt *ngIf="dataService.candidates.length > 0"
        [globalFilterFields]="['center', 'misId', 'fullName', 'sampark_category', 'emcee_category', 'speech_pravachan_category', 'gender', 'pendingAssignment']"
        [value]="dataService.candidates"
        rowGroupMode="subheader" groupRowsBy="center"
        [scrollable]="true"
        scrollHeight="500px"
        [paginator]="false"
        [rowHover]="true">
        <ng-template #header>
          <tr>
            <th class="whitespace-nowrap">Center</th>
            <th class="whitespace-nowrap">MIS Id</th>
            <th class="whitespace-nowrap">BAPS Id</th>
            <th class="whitespace-nowrap">Full Name</th>
            <th class="whitespace-nowrap">Gender</th>
            <th class="whitespace-nowrap" style="text-align:center;">Emcee</th>
            <th class="whitespace-nowrap" style="text-align:center;">Pravachan</th>
            <th class="whitespace-nowrap" style="text-align:center;color:brown">Priority</th>
            <th class="whitespace-nowrap" style="font-weight: bold; color:brown">Skill and it's time assignment 
            </th>
            <th class="whitespace-nowrap" style="font-weight: bold; color:brown">Pending Assignment<p-columnFilter type="boolean" field="pendingAssignment"/>
            </th>
          </tr>
        </ng-template>

        <!-- Group Header -->
        <ng-template #groupheader let-item let-rowIndex="rowIndex" let-expanded="expanded">
            <tr pRowGroupHeader>
                <td colspan="10">
                  <button type="button" pButton pRipple text rounded plain class="mr-2"
                      [pRowToggler]="item"
                      [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'">
                  </button>
                  <span class="font-bold">
                    {{ item.center }} </span>
                    (
                    <span class="font-bold"> 
                      Total: #{{calculateCenterCandidatesTotal(item.center)}}, </span>
                      <span class="font-bold" style="color: green">  Assigned: #{{calculateCenterCandidatesAssigned(item.center)}}, </span>
                      <span class="font-bold" style="color: brown">  Un Assigned: #{{calculateCenterCandidatesUnAssigned(item.center)}} 
                    </span>
                    )
                </td>
            </tr>
        </ng-template>

        <!-- Expanded row -->
        <ng-template #expandedrow let-candidate>
          <tr>
            <td valign="top" style="width:150px" class="no-wrap">{{candidate.center}}</td>
            <td valign="top" style="width:1rem">#{{candidate.misId}}</td>
            <td valign="top" style="width:1rem">#{{candidate.bapsId}}</td>
            <td valign="top" class= "whitespace-nowrap" style="width:1rem">{{candidate.fullName}}</td>
            <td valign="top" style="width:1rem">{{candidate.gender}}</td>
            <td valign="top" style="text-align:center;width:1rem">
              <i class="pi pi-check-circle" *ngIf="candidate.emcee_category"></i>
            </td>
            <td valign="top" style="text-align:center;width:1rem">
              {{candidate.speech_pravachan_category?.charAt(0)}}
            </td>
            <td valign="top" style="text-align:center;width:1rem">{{candidate.priority}}</td>
            <td valign="top" >
              <table *ngFor="let sk of candidate.participatingSkills;index as i" cellpadding=5 width="100%">
                <tr style="color:{{sk.color}}">
                  <td width="200px" class="whitespace-nowrap">{{sk.name}}</td>
                  <td class="whitespace-nowrap"><i class="fa-regular fa-clock mr-1"></i>{{sk.sliceStartMoment?.format("HH:mm")}} - {{sk.sliceEndMoment?.format("HH:mm")}}</td>
                  <td class="whitespace-nowrap"><span *ngIf="i>0">{{timeDiff(sk.sliceStart, candidate.participatingSkills[i-1].sliceEnd)}}</span><span *ngIf="i==0">&nbsp;</span></td>
                  <td class="whitespace-nowrap text-right"><span *ngIf="sk.sliceNumber">Time Slice #{{sk.sliceNumber}}</span></td>
                </tr>
              </table>
            </td>
            <td valign="top" >
              {{candidate.pendingAssignment}}
              <!-- <i class="pi" [ngClass]="{ 'text-green-500 pi-check-circle': candidate.pendingAssignment, 'text-red-500 pi-times-circle': !candidate.pendingAssignment }"></i> -->
            </td>
          </tr>
        </ng-template>
    </p-table>`
})
export class ScheduleByCandidates extends BaseComponent implements OnInit {

  @Input() input!: AdhiveshanInput;
  @Output() candidatesChanges = new EventEmitter<ParticipantForSchedule[]>();

  @ViewChild("dt") dt!: Table;
  globalSearchText: string = "";


  ngOnInit(): void {
    //this.generateCandidate(this.input.totalCandidate);
  }

  onGlobalFilter(event: Event) {
    console.log((event.target as HTMLInputElement).value);
    this.dt.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  clearGlobalFilter() {
    this.globalSearchText = "";

    this.dt.filterGlobal("", "contains");
  }

  calculateCenterCandidatesTotal(center: string) {
    let total = 0;

    if (this.input && this.dataService.candidates) {
        for (let candidate of this.dataService.candidates) {
            if (candidate.center === center) {
                total++;
            }
        }
    }

    return total;
  }

  calculateCenterCandidatesAssigned(center: string) {
    let total = 0;

    if (this.input && this.dataService.candidates) {
        for (let candidate of this.dataService.candidates) {
            if (candidate.center === center && candidate.pendingAssignment == false) {
                total++;
            }
        }
    }

    return total;
  }

  calculateCenterCandidatesUnAssigned(center: string) {
    let total = 0;

    if (this.input && this.dataService.candidates) {
        for (let candidate of this.dataService.candidates) {
            if (candidate.center === center && candidate.pendingAssignment == true) {
                total++;
            }
        }
    }

    return total;
  }

  timeDiff(startTime: string, endTime: string){
    let duration = moment.duration(moment(endTime, Constants.DateTimeFormat).diff(moment(startTime, Constants.DateTimeFormat)));
    let minutes = duration.asMinutes();

    if(minutes != 0 && !isNaN(minutes))
      return minutes + " Minutes";
    return "";
  }
}