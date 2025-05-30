import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Table } from "primeng/table";
import { AutoComplete } from 'primeng/autocomplete';

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { Participant, ParticipantUpdateHostCenter } from "../../models/_index";

import * as XLSX from "xlsx";
import { BaseComponent } from "../base-component/baseComponent";
import { Providers } from "../../models/_providers";

interface AutoCompleteCompleteEvent {
    originalEvent: Event;
    query: string;
}

@Component({
  selector: "app-import-participants",
  imports: [AngularModules, PrimeNgModules, AutoComplete],
  providers: [Providers],
  templateUrl: "import-participants.html",
  styles: [ 
    ` 
    :host ::ng-deep .p-datatable .p-datatable-thead > tr > th { 
        position: -webkit-sticky; 
        position: sticky; 
        top: 0px; 
    } 

    @media screen and (max-width: 64em) { 
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th { 
            top: 0px; 
        } 
    } 
  `, 
  ],
})
export class ImportParticipants extends BaseComponent implements OnInit {
  globalSearchText: string = "";
  @ViewChild("dt") dt!: Table;
  data = signal<Participant[]>([]);
  dialog: boolean = false;
  addOrEditItem!: Participant;
  submitted: boolean = false;
  filteredCentersWithRegion: any[] | undefined;

  ngOnInit() {

    this.loadData();
  }

  loadData() {
    this.layoutService.isDataLoading.set(true);
    this.participantsService.GetItemsForLoginUser(this.authService.GetLoginUserBAPSId()).subscribe(response =>{ 
      this.layoutService.isDataLoading.set(false);
      this.data.set(response.data); 

      console.log(response);
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

  openView(participant: Participant) {
    this.addOrEditItem = { ...participant };
    this.submitted = false;
    this.dialog = true;
  }

  hideDialog() {
    this.submitted = false;
    this.dialog = false;
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (e: any) => {

      this.layoutService.isDataLoading.set(true);

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
          registrationStatus: raw["RegistrationStatus"],

          misId: raw["MISID"],
          bapsId: raw["BAPSID"],
          firstName: raw["FirstName"],
          middleName: raw["MiddleName"],
          lastName: raw["LastName"],
          gender: raw["Gender"],
          mandal: raw["Mandal"],
          category: raw["Category"],

          language_For_Skill_Competitions: raw["Language for Skill Competitions"],

          speech_Pravachan: raw["Speech (Pravachan)"],
          speech_Pravachan_Category: raw["Speech (Pravachan) Category"],
          emcee: raw["Emcee"],
          emcee_Category: raw["Emcee Category"],

          // skilled_Competitions: raw["Skilled Competitions"],
          // prathmik_Mukhpath_Status: raw["Prathmik Mukhpath Status"],
          // aarti: raw["Aarti"],
          // bhojan_Shlok: raw["Bhojan Shlok"],
          // manglacharan_Shlok: raw["Manglacharan Shlok"],
          // nitya_Puja_Mantra: raw["Nitya Puja Mantra"],
          // sabha_Shlok: raw["Sabha Shlok"],
          // stuti_Shlok: raw["Stuti Shlok"],
          // satsang_Mukhpath: raw["Satsang Mukhpath"],
          // completed_Pushpo: raw["Completed Pushpo"],
        });
      }

      console.log(importData);


      if (importData && importData.length > 0) {
        this.participantsService.Import(importData).subscribe((c) => {
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
      else {
        this.layoutService.isDataLoading.set(false);
      }
      //console.log(this.data);
      //this.data = JSON.parse(this.jsonData);
    };

    fileReader.readAsArrayBuffer(file);
  }

  updateHostCenter() {
    this.submitted = true;

    this.layoutService.isDataLoading.set(true);

    let model: ParticipantUpdateHostCenter = { misId: this.addOrEditItem.misId, hostCenter: this.addOrEditItem.hostCenter};

    this.participantsService.UpdateHostCenter(model).subscribe(c => {
        this.layoutService.isDataLoading.set(false);

        this.messageService.add({ severity: "success", summary: "Successful", detail: "Host Update successfully", life: 1000 });

        this.dialog = false;
        this.addOrEditItem = {};
        this.loadData();
    });
  }

  searchCenter(event: AutoCompleteCompleteEvent): any {
    let query = event.query;
    this.filteredCentersWithRegion = [];

      for (let optgroup of this.regionsService.Regions) {

          let filteredSubOptions = this.filterService.filter(optgroup.centers, ['label'], query, "contains");
          if (filteredSubOptions && filteredSubOptions.length) {
              this.filteredCentersWithRegion.push({
                  label: optgroup.label,
                  value: optgroup.value,
                  color: optgroup.color,
                  items: filteredSubOptions
              });
          }
      }

      console.log(this.filteredCentersWithRegion);
  }
}
