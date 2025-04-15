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
  template: `
    <!-- Toolbar -->
    <p-toolbar styleClass="mb-2">
      <ng-template #start>
        <p-button icon="fa-solid fa-home" class="mr-2" [rounded]="true" [outlined]="true" [severity]="'secondary'" (onClick)="router.navigate(['/'])"/>

        <p-iconfield>
          <p-inputicon styleClass="pi pi-search" />
          <input pInputText type="text" placeholder="Search..." (input)="onGlobalFilter(dt, $event)"/>
        </p-iconfield>
        <p-button icon="fa-solid fa-text-slash" class="ml-2" [rounded]="true" [outlined]="true" severity="contrast" (click)="clearGlobalFilter()"/>
        <p-button icon="pi pi-plus" class="ml-4" [rounded]="true" [outlined]="true" severity="success" (onClick)="openNew()"/>
      </ng-template>
    </p-toolbar>

    <!-- List View -->
    <p-table #dt dataKey="id"
      [value]="data()"
      [globalFilterFields]="['fullName', 'username']"

      [tableStyle]="{ 'min-width': '75rem' }"
      [rowHover]="true"
      [scrollable]="true"
      scrollHeight="450px"

      [showCurrentPageReport]="true"
      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
      [paginator]="true"
      [rows]="10"
      [rowsPerPageOptions]="[10, 20, 30]">

      <!-- List View Header -->
      <ng-template #header>
        <tr>
          <th style="width: 1rem"></th>
          <th pSortableColumn="fullName" class="whitespace-nowrap" >
          Fullname
            <p-sortIcon field="fullName" />
          </th>
          <th pSortableColumn="username" class="whitespace-nowrap" >
          Username
            <p-sortIcon field="username" />
          </th>
          <!-- <th pSortableColumn="password" class="whitespace-nowrap" >
            Password
            <p-sortIcon field="password" />
          </th> -->
          <th pSortableColumn="status" class="whitespace-nowrap" >
            Status
            <p-sortIcon field="status" />
          </th>
          <th>
            Permissions
          </th>
        </tr>
      </ng-template>

      <!-- List View Data -->
      <ng-template #body let-item>
        <tr>
          <td class="align-top">
            <p-button icon="pi pi-pencil" class="mr-2" [rounded]="true" [outlined]="true" (click)="openEdit(item)"/>
          </td>
          <td class="align-top whitespace-nowrap">{{ item.fullName }}</td>
          <td class="align-top">{{ item.username }}</td>
          <!-- <td class="align-top">{{ item.password }}</td> -->
          <td class="align-top">
            <p-tag [value]="item.status" [severity]="constants.GetStatusTag(item.status)" styleClass="dark:!bg-surface-900" />
          </td>
          <td class="align-top">
            <p-accordion>
              <p-accordion-panel value="{{item.userId}}">
                <p-accordion-header>Permissions</p-accordion-header>
                <p-accordion-content>
                  <ul><li class="mb-2" *ngFor="let per of item.permissions"> <i class="fa-solid fa-key"></i> {{per}}</li></ul>
                </p-accordion-content>
              </p-accordion-panel>
            </p-accordion>
          </td>
        </tr>
      </ng-template>
    </p-table>

    <!-- Add/Edit Dialog -->
    <p-dialog [(visible)]="dialog" [style]="{ width: '400px', height: 'auto' }" header="User Details" [modal]="true">
      <ng-template #content>
        <div class="flex flex-col gap-2">

          <!-- Full Name -->
          <p-inputgroup>
              <p-inputgroup-addon>
                  <i class="fa-solid fa-signature"></i>
              </p-inputgroup-addon>
              <input pInputText type="text" id="fullName" [(ngModel)]="addOrEditItem.fullName" placeholder="Full Name" required autofocus fluid />
          </p-inputgroup>
          <small class="text-red-500" *ngIf="submitted && !addOrEditItem.fullName">Fullname is required.</small>

          <!-- Username -->
          <p-inputgroup>
              <p-inputgroup-addon>
                  <i class="pi pi-user"></i>
              </p-inputgroup-addon>
              <input pInputText type="text" id="username" [(ngModel)]="addOrEditItem.username" placeholder="Username" required autofocus fluid />
          </p-inputgroup>
          <small class="text-red-500" *ngIf="submitted && !addOrEditItem.username">Username is required.</small>

          <!-- Password -->
          <p-inputgroup>
              <p-inputgroup-addon>
                  <i class="pi pi-lock"></i>
              </p-inputgroup-addon>
              <input pInputText type="password" id="password" [(ngModel)]="addOrEditItem.password" placeholder="Password" required fluid />
          </p-inputgroup>
          <small class="text-red-500" *ngIf="submitted && !addOrEditItem.password">Password is required.</small>

          <!-- Status -->
          <p-inputgroup>
              <p-inputgroup-addon>
                <i class="fa-solid fa-wand-magic-sparkles"></i>
              </p-inputgroup-addon>
              <p-select inputId="status" [options]="constants.UserStatuses" optionLabel="label" optionValue="value" [(ngModel)]="addOrEditItem.status" placeholder="Select a Status" fluid />
          </p-inputgroup>
          <small class="text-red-500" *ngIf="submitted && !addOrEditItem.status">Status is required.</small>

          <!-- Permissions -->
          <p-toolbar styleClass="mb-2">
            <ng-template #start>
              <h5 class="m-0 mr-2">Permissions</h5>
              <p-iconfield>
                <p-inputicon styleClass="pi pi-search" />
                <input pInputText type="text" placeholder="Search..." (input)="onPermissionsFilter(dtPermissions, $event)"/>
              </p-iconfield>
              <p-button icon="fa-solid fa-text-slash" class="ml-2" [rounded]="true" [outlined]="true" severity="contrast" (click)="clearPermissionsFilter()"/>
            </ng-template>
          </p-toolbar>
          
          <p-table #dtPermissions 
            [value]="permissions()"
            [(selection)]="addOrEditItem.permissions"
            [globalFilterFields]="['label']"
            [rowHover]="true"
            [scrollable]="true"
            scrollHeight="300px">

            <ng-template #header>
              <tr>
                <th style="width: 1rem"></th>
                <th pSortableColumn="label" style="min-width:7rem">
                  Permissions
                  <p-sortIcon field="label" />
                </th>
              </tr>
            </ng-template>

            <ng-template #body let-permission>
              <tr [style]="{'color':permission.color}">
                <td>
                    <p-tableCheckbox ngDefaultControl [value]="permission.value"/>
                </td>
                <td> <i class="{{permission.icon}}"  ></i> {{ permission.label }}</td>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </ng-template>

      <ng-template #footer>
        <p-button label="Cancel" icon="pi pi-times" text (click)="hideDialog()"/>
        <p-button label="Save" icon="pi pi-check" (click)="save()" />
      </ng-template>
    </p-dialog>
  `,
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
