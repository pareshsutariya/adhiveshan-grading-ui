import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Table } from "primeng/table";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../base-component/baseComponent";

import { User, CompetitionEvent } from "../../models/_index";
import { RolesEnum } from "../../services/rolePermissions.service";

@Component({
  selector: "app-users",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService],
  templateUrl: "users.html",
})
export class Users extends BaseComponent implements OnInit {
  @ViewChild("dt") dt!: Table;

  dialog: boolean = false;
  data = signal<User[]>([]);
  roles = signal<any[]>([]);
  genders = signal<any[]>([]);
  events = signal<CompetitionEvent[]>([]);
  skillCategories = signal<any[]>([]);
  addOrEditItem!: User;
  submitted: boolean = false;

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    var rolesTemp = [];
    
    if(this.authService.HasUserPermissions([this.permissionsEnum.Users_NationalAdmins_Add]))
      rolesTemp.push({ label: "National Admin", value: RolesEnum.NationalAdmin, icon: "fa fa-user-secret", color: 'red' });
    
    if(this.authService.HasUserPermissions([this.permissionsEnum.Users_RegionalAdmins_Add]))
      rolesTemp.push({ label: "Regional Admin", value: RolesEnum.RegionalAdmin, icon: "fa fa-user-tie", color: 'blue' });
    
    if(this.authService.HasUserPermissions([this.permissionsEnum.Users_Judges_Add]))
      rolesTemp.push({ label: "Judge", value: RolesEnum.Judge, icon: "fa fa-user-pen", color: 'Chocolate' });

    if(this.authService.HasUserPermissions([this.permissionsEnum.Users_NationalAdmins_Add]))
      rolesTemp.push({ label: "Result Committee", value: RolesEnum.ResultCommittee, icon: "fa-solid fa-square-poll-vertical", color: 'purple' });

    if(this.authService.HasUserPermissions([this.permissionsEnum.Users_CheckIns_Add]))
      rolesTemp.push({ label: "Check In", value: RolesEnum.CheckIn, icon: "fa-solid fa-user-check", color: 'green' });

    this.roles.set(rolesTemp);
    this.genders.set(this.constants.Genders);
    this.skillCategories.set(this.constants.SkillCategories);

    this.layoutService.isDataLoading.set(true);
    this.eventsService.GetEventsForLoginUser(this.authService.GetLoginUserBAPSId()).subscribe(data => { 
      this.events.set(data);
      this.layoutService.isDataLoading.set(false);
    });

    this.layoutService.isDataLoading.set(true);
    this.usersService.GetUsersForLoginUser(this.authService.GetLoginUserBAPSId()).subscribe(data => { 

      // Filter out National Admin data
      if(!this.authService.HasUserRoles([this.rolesEnum.NationalAdmin])){
        data = data.filter(d=> d.assignedRoles == null || d.assignedRoles.indexOf(this.rolesEnum.NationalAdmin) <0);
      }

      this.data.set(data);
      this.layoutService.isDataLoading.set(false);
    });
  }

  openNew() {
    this.addOrEditItem = {};
    this.addOrEditItem.assignedGenders = this.authService.GetLoginUser().assignedGenders;
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

  searchByBAPSId(){
    if(!this.addOrEditItem.bapsId){
      this.messageService.add({ severity: "error", summary: "Validation", detail: "Please enter a valid BAPS Id", life: 3000 });
      return;
    }

    this.layoutService.isDataLoading.set(true);

    this.participantsService.GetByBAPSId(this.addOrEditItem.bapsId).subscribe(participant => {
      this.layoutService.isDataLoading.set(false);

      if(participant == null) {

        this.messageService.add({ severity: "error", summary: "Validation", detail: "Participant not found", life: 3000 });
        
        return;
      }

      // Search user gender should match with login user gender
      if(!this.authService.HasUserRoles([RolesEnum.NationalAdmin])){

        console.log(this.authService.GetLoginUser().assignedGenders, participant.gender);

        if(this.authService.GetLoginUser().assignedGenders!.indexOf(participant.gender) < 0){
          this.messageService.add({ severity: "error", summary: "Validation", detail: "Participant gender is not matching with login user gender", life: 3000 });
        
          return;
        }
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
    if(!this.addOrEditItem.bapsId || this.addOrEditItem.bapsId.trim().length == 0)
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
