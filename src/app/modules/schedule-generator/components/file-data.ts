import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import moment, { Moment } from "moment";

import { BaseComponent } from '../../base-component/baseComponent';
import { AdhiveshanInput } from '../../../models/_index';
import { AngularModules } from '../../../models/_angular-imports';
import { PrimeNgModules } from '../../../models/_prime-ng-imports';

@Component({
    standalone: true,
    selector: 'app-file-data',
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

    <p-table #dt *ngIf="dataService.candidates.length"
        [value]="dataService.candidates"
        [globalFilterFields]="['center', 'misId', 'fullName', 'emcee_category', 'speech_pravachan_category', 'gender']"
        rowGroupMode="subheader" groupRowsBy="center"
        sortField="center" 

        [scrollable]="true"
        scrollHeight="450px"

        [paginator]="false"
        [rowHover]="true">
        <ng-template #header>
          <tr>
            <th class="whitespace-nowrap">Center</th>
            <th class="whitespace-nowrap">MIS Id</th>
            <th class="whitespace-nowrap">Full Name</th>
            <th class="whitespace-nowrap">Gender</th>
            <th class="whitespace-nowrap">Emcee</th>
            <th class="whitespace-nowrap">Pravachan</th>
          </tr>
        </ng-template>
        <!-- Group Header -->
        <ng-template #groupheader let-item let-rowIndex="rowIndex" let-expanded="expanded">
            <tr pRowGroupHeader>
                <td colspan="6">
                  <button type="button" pButton pRipple text rounded plain class="mr-2"
                      [pRowToggler]="item"
                      [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'">
                  </button>
                  <span class="font-bold">{{ item.center }} (#{{calculateCenterCandidatesTotal(item.center)}})</span>
                </td>
            </tr>
        </ng-template>

        <!-- Expanded row -->
        <ng-template #expandedrow let-candidate>
          <tr>
            <td class="no-wrap">{{candidate.center}}</td>
            <td valign="top" style="padding-top:20px;">#{{candidate.misId}}</td>
            <td>{{candidate.fullName}}</td>
            <td>{{candidate.gender}}</td>
            <td>{{candidate.emcee_category}}</td>
            <td>{{candidate.speech_pravachan_category}}</td>
          </tr>
        </ng-template>
    </p-table>`
})
export class FileData extends BaseComponent implements OnInit {
  @Input() input!: AdhiveshanInput;

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
}