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
  templateUrl: "import-participants.html",
})
export class ImportParticipants implements OnInit {
  globalSearchText: string = "";
  @ViewChild("dt") dt!: Table;
  data = signal<Participant[]>([]);
  dialog: boolean = false;
  addOrEditItem!: Participant;

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
    this.dialog = true;
  }

  hideDialog() {
    this.dialog = false;
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
}
