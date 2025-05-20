import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Table } from "primeng/table";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../base-component/baseComponent";

import { RolePermissionsPivot } from "../../models/_index";

@Component({
  selector: "app-role-permissions-list",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService],
  templateUrl: "role-permissions-list.html",
})
export class RolePermissionsList extends BaseComponent implements OnInit {
  @ViewChild("dt") dt!: Table;

  data = signal<RolePermissionsPivot[]>([]);

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.layoutService.isDataLoading.set(true);

    this.rolePermissionsService.GetPivotItems().subscribe(response => { 
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
}
