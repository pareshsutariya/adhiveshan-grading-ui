import { Component, OnInit, signal, ViewChild } from "@angular/core";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { Table } from "primeng/table";
import { ConfirmationService, MessageService } from "primeng/api";

import * as XLSX from "xlsx";
import { LayoutService } from "../../layout/service/layout.service";
import { Participant } from "../../models/participant";
import { ParticipantsService } from "../../services/participants.service";

@Component({
  selector: "app-import-participants",
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService],
  template: `
    <p-toast />
    <!-- Import -->
    <p-toolbar styleClass="mb-2" >
      <ng-template #start>
          <input type="file" (change)="onFileChange($event)" />
      </ng-template>
    </p-toolbar>

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
    
    <p-table #dt 
        [value]="data()"
        [globalFilterFields]="['center', 'misId', 'fullName', 'sampark_category', 'emcee_category', 'speech_pravachan_category', 'gender']"
        rowGroupMode="subheader" groupRowsBy="center"
        sortField="center" 

        [scrollable]="true"

        [paginator]="false"
        [rowHover]="true">
        <ng-template #header>
          <tr>
            <th class="whitespace-nowrap">Center</th>
            <th class="whitespace-nowrap">MIS Id</th>
            <th class="whitespace-nowrap">Full Name</th>
            <th class="whitespace-nowrap">Gender</th>
            <th class="whitespace-nowrap">Sampark</th>
            <th class="whitespace-nowrap">Emcee</th>
            <th class="whitespace-nowrap">Pravachan</th>
            <th class="whitespace-nowrap">Kirtan</th>
            <th class="whitespace-nowrap">Ted Talk</th>
          </tr>
        </ng-template>
        <!-- Group Header -->
        <ng-template #groupheader let-item let-rowIndex="rowIndex" let-expanded="expanded">
            <tr pRowGroupHeader>
                <td colspan="9">
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
            <td>{{candidate.sampark_Category}}</td>
            <td>{{candidate.emcee_Category}}</td>
            <td>{{candidate.speech_Pravachan_Category}}</td>
            <td>{{candidate.vyaktigat_Kirtan_Gaan_Category}}</td>
            <td>{{candidate.tedtalk_Category}}</td>
          </tr>
        </ng-template>
    </p-table>
    `,
})
export class ImportParticipants implements OnInit {
  globalSearchText: string = "";
  @ViewChild("dt") dt!: Table;
  data = signal<Participant[]>([]);

  constructor(
    private service: ParticipantsService,
    private layoutService: LayoutService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.layoutService.pageTitle.set("Import Participants");

    this.loadData();
  }

  loadData() {
    this.layoutService.isDataLoading.set(true);
    this.service.GetItems().subscribe(f_data =>{ 
      this.layoutService.isDataLoading.set(false);
      this.data.set(f_data); 

      console.log(f_data);
    });
  }

  onGlobalFilter(event: Event) {
    console.log((event.target as HTMLInputElement).value);
    this.dt.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  clearGlobalFilter() {
    this.globalSearchText = "";

    this.dt.filterGlobal("", "contains");
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {
      const arrayBuffer = e.target.result;
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      let jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      let importData: Participant[] = [];

      for (let index = 0; index < jsonData.length; index++) {
        const raw = jsonData[index];

        importData.push({
          region: raw["Region"],
          center: raw["Center"],
          zone: raw["Zone"],
          registration_Status: raw["Registration Status"],
          mandal: raw["mandal"],
          firstLastName_MISID: raw["FirstLastName-MISID"],
          prathmik_mukhpath_status: raw["Prathmik Mukhpath Status"],
          skilled_competitions: raw["Skilled Competitions"],
          aarti: raw["Aarti"],
          bhojan_shlok: raw["Bhojan Shlok"],
          manglacharan_shlok: raw["Manglacharan Shlok"],
          nitya_puja_mantra: raw["Nitya Puja Mantra"],
          sabha_shlok: raw["Sabha Shlok"],
          stuti_shlok: raw["Stuti Shlok"],
          satsang_mukhpath: raw["Satsang Mukhpath"],
          completed_Pushpo: raw["Completed Pushpo"],
          sampark: raw["Sampark"],
          sampark_Category: raw["Sampark Category"],
          speech_Pravachan: raw["Speech (Pravachan)"],
          speech_Pravachan_Category: raw["Speech (Pravachan) Category"],
          emcee: raw["Emcee"],
          emcee_Category: raw["Emcee Category"],
          skit_Writing_Samvad_Lekhan: raw["Skit Writing (Samvad Lekhan)"],
          article_Writing: raw["Article Writing"],
          speech_Writing_Pravachan_Lekhan: raw["Speech Writing (Pravachan Lekhan)"],
          vyaktigat_Kirtan_Gaan: raw["Vyaktigat Kirtan Gaan"],
          vyaktigat_Kirtan_Gaan_Category: raw["Vyaktigat Kirtan Gaan Category"],
          gender: raw["Gender"],
        });
      }

      this.layoutService.isDataLoading.set(true);

      if (importData && importData.length > 0) {
        this.service.Import(importData).subscribe((c) => {
          this.layoutService.isDataLoading.set(false);

          let detail = "Data Import";
          this.messageService.add({
            severity: "success",
            summary: "Successful",
            detail: detail,
            life: 1000,
          });

          location.reload();
        });
      }
      //console.log(this.data);
      //this.data = JSON.parse(this.jsonData);
    };

    fileReader.readAsArrayBuffer(file);
  }


  calculateCenterCandidatesTotal(center: string) {
    let total = 0;

    if (this.data) {
        for (let candidate of this.data()) {
            if (candidate.center === center) {
                total++;
            }
        }
    }

    return total;
  }
}
