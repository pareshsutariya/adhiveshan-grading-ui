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
import { User } from "../../models/user";
import { RegionCenterService } from "../../services/_regionCenters.service";
import { RolePermissionsService } from "../../services/rolePermissions.service";
import { CompetitionEventsService } from "../../services/competitionEvents.service";
import { CompetitionEvent } from "../../models/competitionEvent";
import { ParticipantsService } from "../../services/participants.service";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService, Constants],
  templateUrl: "users.html",
})
export class Users implements OnInit {
  @ViewChild("dt") dt!: Table;

  dialog: boolean = false;
  data = signal<User[]>([]);
  roles = signal<any[]>([]);
  genders = signal<any[]>([]);
  events = signal<CompetitionEvent[]>([]);
  skillCategories = signal<any[]>([]);
  addOrEditItem!: User;
  submitted: boolean = false;

  constructor(
    private usersService: UsersService,
    public router: Router,
    public constants: Constants,
    public regionsService: RegionCenterService,
    public eventsService: CompetitionEventsService,
    public rolePermissionsService: RolePermissionsService,
    private participantsService: ParticipantsService,
    public authService: AuthService,
    private messageService: MessageService,
    public layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.roles.set(this.rolePermissionsService.Roles);
    this.genders.set(this.constants.Genders);
    this.skillCategories.set(this.constants.SkillCategories);

    this.layoutService.isDataLoading.set(true);
    this.eventsService.GetItems().subscribe(data => { 
      this.events.set(data);
      this.layoutService.isDataLoading.set(false);
    });

    this.layoutService.isDataLoading.set(true);
    this.usersService.GetItems().subscribe(data => { 
      this.data.set(data);
      this.layoutService.isDataLoading.set(false);
    });
  }

  openNew() {
    this.addOrEditItem = {};
    this.addOrEditItem.status = "Active";
    this.submitted = false;
    this.dialog = true;
  }

  openEdit(user: User) {
    this.addOrEditItem = { ...user };
    this.dialog = true;
  }

  hideDialog() {
    this.dialog = false;
    this.submitted = false;
  }

  searchByMisId(){
    if(!this.addOrEditItem.misId || isNaN(Number(this.addOrEditItem.misId!))){
      this.messageService.add({ severity: "error", summary: "Validation", detail: "Please enter a valid MIS Id", life: 3000 });
      return;
    }

    this.layoutService.isDataLoading.set(true);

    this.participantsService.GetByMisId(Number(this.addOrEditItem.misId!)).subscribe(participant => {
      this.layoutService.isDataLoading.set(false);

      if(participant == null) {

        this.messageService.add({ severity: "error", summary: "Validation", detail: "Participant not found", life: 3000 });
        
        return;
      }

      this.addOrEditItem.fullName = participant.fullName;
      this.addOrEditItem.region = participant.region;
      this.addOrEditItem.center = participant.center;
    });
  }
  
  save() {
    this.submitted = true;

    if(this.isValid() == false)
      return;

    this.layoutService.isDataLoading.set(true);

    this.usersService.Save(this.addOrEditItem).subscribe(c => {
        this.layoutService.isDataLoading.set(false);

        let detail = this.addOrEditItem.userId ? "User Updated" : "User Created";
        this.messageService.add({ severity: "success", summary: "Successful", detail: detail, life: 1000 });

        this.dialog = false;
        this.addOrEditItem = {};
        this.loadData();
    });
  }

  isValid() {
    if(!this.addOrEditItem.misId || this.addOrEditItem.misId.trim().length == 0)
      return false;

    if(!this.addOrEditItem.region || this.addOrEditItem.region.trim().length == 0)
      return false;

    if(!this.addOrEditItem.center || this.addOrEditItem.center.trim().length == 0)
      return false;

    if(!this.addOrEditItem.fullName || this.addOrEditItem.fullName.trim().length == 0)
      return false;

    if(!this.addOrEditItem.password || this.addOrEditItem.password.trim().length == 0)
      return false;

    if(!this.addOrEditItem.status || this.addOrEditItem.status.trim().length == 0)
      return false;

    return true;
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearGlobalFilter(){
    this.dt.filterGlobal("", 'contains');
  }

}
