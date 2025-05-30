import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Table } from "primeng/table";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../base-component/baseComponent";
import { Providers } from "../../models/_providers";

@Component({
  selector: "app-region-centers-list",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [Providers],
  templateUrl: "region-centers-list.html",
})
export class RegionCentersList extends BaseComponent implements OnInit {
  @ViewChild("dt") dt!: Table;

  data = signal<string[]>([]);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
   this.data.set(this.regionsService.Regions);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearGlobalFilter(){
    this.dt.filterGlobal("", 'contains');
  }
}
