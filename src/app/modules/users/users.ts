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

@Component({
  selector: "app-users",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService, UsersService, Constants],
  templateUrl: "users.html",
})
export class Users implements OnInit {
  @ViewChild("dt") dt!: Table;

  dialog: boolean = false;
  data = signal<User[]>([]);
  roles = signal<any[]>([]);
  mandals = signal<any[]>([]);
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
    public authService: AuthService,
    private messageService: MessageService,
    public layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.layoutService.pageTitle.set("Users");

    this.loadData();
  }

  loadData() {

    this.roles.set(this.rolePermissionsService.Roles);
    this.mandals.set(this.constants.Mandals);
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
