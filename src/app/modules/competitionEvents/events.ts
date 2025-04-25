import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";

import { MessageService } from "primeng/api";
import { Table } from "primeng/table";

import { LayoutService } from "../../layout/service/layout.service";
import { Constants } from "../../services/_constants";
import { UsersService } from "../../services/users.service";
import { AuthService } from "../../services/auth.service";
import { RegionCenterService } from "../../services/_regionCenters.service";
import { RolePermissionsService } from "../../services/rolePermissions.service";
import { CompetitionEventsService } from "../../services/competitionEvents.service";
import { CompetitionEvent } from "../../models/competitionEvent";

@Component({
  selector: "app-events",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService, Constants],
  templateUrl: "events.html",
})
export class Events implements OnInit {
  @ViewChild("dt") dt!: Table;
  @ViewChild("dtCenters") dtCenters!: Table;

  dialog: boolean = false;
  data = signal<CompetitionEvent[]>([]);
  centersForRegion = signal<any[]>([]);
  skillCategories = signal<any[]>([]);
  addOrEditItem!: CompetitionEvent;
  submitted: boolean = false;
  public startDateValue: Date = new Date();
  public endDateValue: Date = new Date();
  
  constructor(
    public router: Router,
    public constants: Constants,
    public regionsService: RegionCenterService,
    public eventsService: CompetitionEventsService,
    public rolePermissionsService: RolePermissionsService,
    public authService: AuthService,
    private messageService: MessageService,
    public layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.layoutService.isDataLoading.set(true);
    this.eventsService.GetItems().subscribe(data => { 
      this.data.set(data);
      this.layoutService.isDataLoading.set(false);
    });
  }

  openNew() {
    this.startDateValue.setDate(new Date().getDate());
    this.endDateValue.setDate(new Date().getDate());

    this.addOrEditItem = {startDate: new Date(), endDate: new Date()};
    this.submitted = false;
    this.dialog = true;
  }

  openEdit(item: CompetitionEvent) {    
    this.addOrEditItem = { ...item };
    this.startDateValue = new Date(this.addOrEditItem.startDate);
    this.endDateValue = new Date(this.addOrEditItem.endDate);

    this.dialog = true;

    console.log(item);
    this.getCentersForRegion();
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  getCentersForRegion(){

    this.centersForRegion.set(this.regionsService.GetCentersForRegion(this.addOrEditItem.region));
  }
  
  save() {
    this.submitted = true;

    if(this.isValid() == false)
      return;

    this.layoutService.isDataLoading.set(true);

    this.eventsService.Save(this.addOrEditItem).subscribe(c => {
        this.layoutService.isDataLoading.set(false);

        let detail = this.addOrEditItem.competitionEventId ? "Event Updated" : "Event Created";
        this.messageService.add({ severity: "success", summary: "Successful", detail: detail, life: 1000 });

        this.dialog = false;
        this.addOrEditItem = {startDate : new Date(), endDate : new Date()};
        this.loadData();
    });
  }

  isValid() {
    
    if(!this.addOrEditItem.region || this.addOrEditItem.region.trim().length == 0)
      return false;

    if(!this.addOrEditItem.hostCenter || this.addOrEditItem.hostCenter.trim().length == 0)
      return false;

    if(!this.addOrEditItem.centers || this.addOrEditItem.centers.length == 0)
      return false;

    if(!this.addOrEditItem.startDate)
      return false;

    if(!this.addOrEditItem.endDate)
      return false;

    this.addOrEditItem.startDate = this.startDateValue;
    this.addOrEditItem.endDate = this.endDateValue;

    if(!(this.addOrEditItem.startDate < this.addOrEditItem.endDate)) {

      this.messageService.add({ severity: "error", summary: "Validation", detail: "Start Date should be less than End Date", life: 3000 });
      
      return false;
    }

    // if(!this.addOrEditItem.name || this.addOrEditItem.name.trim().length == 0)
    //   return false;

    if(!this.addOrEditItem.status || this.addOrEditItem.status.trim().length == 0)
      return false;

    // TODO: Validate for unique

    return true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearGlobalFilter(table: Table){
    table.filterGlobal("", 'contains');
  }
}
