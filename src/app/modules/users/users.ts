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

@Component({
  selector: "app-users",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService, UsersService, Constants],
  templateUrl: "users.html",
})
export class Users implements OnInit {
  @ViewChild("dt") dt!: Table;
  @ViewChild("dtPermissions") dtPermissions!: Table;

  dialog: boolean = false;
  data = signal<User[]>([]);
  permissions = signal<any[]>([]);
  addOrEditItem!: User;
  submitted: boolean = false;

  constructor(
    private usersService: UsersService,
    public router: Router,
    public constants: Constants,
    public authService: AuthService,
    private messageService: MessageService,
    public layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.layoutService.pageTitle.set("Users");

    this.permissions.set(this.constants.Permissions);
    this.loadData();
  }

  loadData() {
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
    if(!this.addOrEditItem.username || this.addOrEditItem.username.trim().length == 0)
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

  onPermissionsFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clearPermissionsFilter(){
    this.dtPermissions.filterGlobal("", 'contains');
  }
}
