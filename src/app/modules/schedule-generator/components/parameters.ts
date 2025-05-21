import { Component, Input, OnInit, signal } from '@angular/core';
import * as XLSX from "xlsx";

import moment, { Moment } from "moment";
import { AdhiveshanInput, ParticipantForSchedule, CompetitionEvent, Room  } from '../../../models/_index';
import { BaseComponent } from '../../base-component/baseComponent';
import { AngularModules } from '../../../models/_angular-imports';
import { PrimeNgModules } from '../../../models/_prime-ng-imports';
import { Constants } from '../../../services/_index';

@Component({
    standalone: true,
    selector: 'app-parameters',
    imports: [AngularModules, PrimeNgModules],
    template: `
     <div class="flex flex-col md:flex-row gap-1">
        <!-- Schedule -->
        <div class="md:w-1/3 pt-2">
            <!-- Event Date / Start Time / End Time -->
          <table [cellPadding]="7" [cellSpacing]="7">
            <tr style="border-bottom: 1px solid lightgray;">
              <th [colSpan]="1">
                <div class="flex" >
                  <h5 class="m-0 whitespace-nowrap">Event</h5>
                </div>
              </th>
              <th [colSpan]="2">
                <p-select inputId="region" [options]="events()" optionLabel="regionalHostCenterDate"
                        [(ngModel)]="selectedEvent" placeholder="Select an Event" [showClear]="true"
                        (onChange)="onCompetitionEventChange()" [ngStyle]="{'width': '300px'}" />
              </th>
            </tr>
            <tr>
              <td><i class="fa-solid fa-gopuram mr-2"></i>Host Center</td>
              <td colspan="2">
                <span style="color:navy">{{input.hostCenter}}</span>
              </td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-person-running fa-xl mr-2"></i>Start Time</td>
              <td>
                <span style="color:navy">{{input.examStartTime}}</span>
              </td>
              <td>
                <span style="color:navy">{{input.examEndTime}}</span>
              </td>
            </tr>
            <tr>
              <td><i class="fa-solid fa-utensils fa-xl mr-2"></i>Break-1</td>
              <td><span style="color:navy">{{input.break1StartTime}}</span>
              <td><span style="color:navy">{{input.break1EndTime}}</span><td> 
            </tr>
            <tr>
              <td><i class="fa-solid fa-mug-hot fa-xl mr-2"></i>Break-2</td>
              <td><span style="color:navy">{{input.break2StartTime}}</span>
              <td><span style="color:navy">{{input.break2EndTime}}</span></td>
            </tr>
            <tr>
              <td colspan="2"><i class="fa-solid fa-stopwatch-20 mr-2"></i>Gap between two tests</td>
              <td>
                <span style="color:navy">{{input.minSpaceBetweenTwoTests}} minutes</span>
              </td>
            </tr>
          </table>
          
          <!-- Participants Count -->
          <table width="100%" [cellPadding]="14" [cellSpacing]="7" *ngIf="selectedEvent">
            <thead>
              <tr style="border-bottom: 1px solid lightgray;">
                <th [colSpan]="4" style="padding:5pt">
                  <div class="flex items-center justify-center" >
                    <h5 class="m-0 whitespace-nowrap">Participants</h5>
                  </div>
                </th>
              </tr>
              <tr class="bold">
                <th style="width: 1rem;" class="text-left">Skill Name</th>
                <th style="width: 1rem;" class="text-left">Total</th>
                <th style="width: 1rem;color: green;" class="text-left">Assigned</th>
                <th style="width: 1rem;color: red" class="text-left">Pending</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let skill of input.skills">
                <td style="color:{{skill.color}}" class="whitespace-nowrap" >{{skill.name}}</td>
                <td>{{skill.noOfParticipants}}</td>
                <td style="color: green">{{skill.noOfAssigned}}</td>
                <td style="color: red">{{skill.noOfPending}}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="color:red;border-top: 1px solid lightgray;">
                <th style="width: 1rem;font-weight:bold;" class="text-left underline whitespace-nowrap">Total Candidates</th>
                <th class="text-left">{{input.totalCandidate}}</th>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="md:w-1/2 pt-2 ml-14">
          <!-- Skills Duration -->
          <table [cellPadding]="5" [cellSpacing]="5" width="100%" class="mt-10" *ngIf="selectedEvent">
            <thead>
            <tr style="border-bottom: 1px solid lightgray;">
              <th [colSpan]="3" >
                <div class="flex items-center justify-start" >
                  <h5 class="m-0 whitespace-nowrap">Skills/Rooms Configuration</h5>
                </div>
              </th>
              <th [colSpan]="3" >
                <!-- <p-select [options]="input.skills" [showClear]="true" [filter]="true"  optionLabel="name" optionValue="name"
                  placeholder="Select a Skill" [ngStyle]="{'width': '190px', 'text-align':'left'}"
                  [(ngModel)]="selectedSkillToAddRoom"/> -->
              
                <p-button label="Add Room" severity="primary" (onClick)="OnRoomAdded($event)" class="ml-3"/>
              </th>
            </tr>
            <tr class="bold">
              <th style="width: 1rem;" class="whitespace-nowrap text-left">Room Name <p-button icon="fa-solid fa-arrow-up-a-z" [rounded]="true" [text]="true" (onClick)="dataService.SortRoomsByName()" /></th>
              <th style="width: 1rem;" class="whitespace-nowrap text-left">Start Time</th>
              <th style="width: 1rem;" class="whitespace-nowrap text-left">End Time</th>
              <th style="width: 12rem;" class="whitespace-nowrap text-left">Skill Name</th>
              <th style="width: 1rem;" class="whitespace-nowrap text-left">Skill Duration</th>
              <th style="width: 1rem;" class="whitespace-nowrap text-left"># Proctors</th>
              <th>&nbsp;</th>
            </tr>
            </thead>
            <tbody>
              <tr *ngFor="let room of dataService.rooms;index as i" [ngStyle]="{'color': room.color}">
                <td><input pInputText type="text" style="width:100px" class="mr-1" [readOnly]="false" [(ngModel)]="room.roomName" /></td> 
                <td><input pInputText type="time" [(ngModel)]="room.roomStartTime" /></td>
                <td><input pInputText type="time" [(ngModel)]="room.roomEndTime" /></td>
                <td>
                  <p-select [options]="input.skills" [showClear]="true" [filter]="true"  optionLabel="name" optionValue="name"
                    placeholder="Select a Skill" [ngStyle]="{'width': '190px', 'text-align':'left'}" (onChange)="OnSkillChanged(room)"
                    [(ngModel)]="room.skill"/>
                </td>
                <td>{{room.duration}} minutes</td>
                <!-- <td><input pInputText type="number" min="1" style="width:60px" class="mr-1" [readOnly]="false" [(ngModel)]="room.duration" /></td> -->
                <td>x 2 = {{1 * 2}}</td> 
                <td>
                  <p-button [icon]="'pi pi-times'" [rounded]="true" [outlined]="true" severity="danger" (onClick)="OnRoomRemoved(i)" class="ml-3"/>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr style="color:red;border-top: 1px solid lightgray;">
                <th style="font-weight:bold; text-align:left;" class="underline">Total</th>
                <th style="font-weight:bold; text-align:left;" class="pl-3 whitespace-nowrap">
                  {{ dataService.GetRoomCount() }} Rooms
                </th>
                <th style="font-weight:bold; text-align:right;" colspan=4 class="whitespace-nowrap">
                  {{ dataService.rooms.length * 2 }} Proctors
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
    </div>
  `
})
export class Parameters extends BaseComponent implements OnInit {
  dummy: any = ["dummy-1"];

  events = signal<CompetitionEvent[]>([]);
  selectedEvent: CompetitionEvent | undefined;
  
  input: AdhiveshanInput = {};
  selectedSkillToAddRoom: string | undefined;
  //centers: any[]=[];
 
  ngOnInit(): void {

     this.eventsService.GetEventsForLoginUser(this.authService.GetLoginUserBAPSId()).subscribe(response => { 
      this.events.set(response.data);
      this.layoutService.isDataLoading.set(false);
    });

    let storageInput = localStorage.getItem("INPUT");
    if(storageInput){
      this.input = JSON.parse(storageInput) as AdhiveshanInput;
      console.log("INPUT from storage: ", this.input);
    }
    else 
    {
      this.input = {};
    }

    let storageCandidates = localStorage.getItem("CANDIDATES");
    if(storageCandidates){
      this.dataService.candidates = JSON.parse(storageCandidates) as ParticipantForSchedule[];
      console.log("CANDIDATES from storage: ", this.dataService.candidates);
    }

    let storageRooms = localStorage.getItem("ROOMS");
    if(storageRooms){
      this.dataService.rooms = JSON.parse(storageRooms) as Room[];
      console.log("ROOMS from storage: ", this.dataService.rooms);
    }

    this.fileDataService.populateDataFromFile(this.input);
  }

  onCompetitionEventChange(){

   if(!this.selectedEvent){
    this.input.hostCenter = undefined;
    this.input.examDateOnly = undefined;
    this.input.examStartTime = undefined;
    this.input.examEndTime = undefined;
    return;
   }

   this.input.hostCenter = this.selectedEvent?.hostCenter;
   this.input.examDateOnly = moment(this.selectedEvent?.startDate).format("MM/DD/yyyy");
   this.input.examStartTime = moment(this.selectedEvent?.startDate).format("HH:mm");
   this.input.examEndTime = moment(this.selectedEvent?.endDate).format("HH:mm");

   this.layoutService.isDataLoading.set(true);

   this.participantsService.GetParticipantsForEvent(this.selectedEvent?.competitionEventId!, "Male").subscribe(response => {
      this.layoutService.isDataLoading.set(false);
      
      this.dataService.candidates = response.data;

      this.layoutService.isDataLoading.set(true);
      this.fileDataService.populateDataFromFile(this.input);
      this.layoutService.isDataLoading.set(false);
   });
  }

  onHostCenterChanged(event: any){
    this.fileDataService.populateDataFromFile(this.input);

    localStorage.setItem("INPUT", JSON.stringify(this.input));
  }

  OnRoomAdded(event: any){
    // if(!this.selectedSkillToAddRoom){
    //   this.messageService.add({ severity: "warn", summary: "Validation", detail: "Please select a Skill to add room", life: 3000 });
    //   return;
    // }

    this.dataService.addRoom("", this.input);

    this.messageService.add({ severity: "success", summary: "Room Added", detail: `${this.selectedSkillToAddRoom} Room has been added successfully`, life: 3000 });
  
    //this.selectedSkillToAddRoom = undefined;
  }

  OnSkillChanged(room: Room){
    room = this.dataService.setRoomDurationAndColor(room.skill, room);
  }

  OnRoomRemoved(index: number){
    this.dataService.removeRoom(index, this.input);
  }

  downloadSampleFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', './public/Adveshan_Participants.xlsx');
    link.setAttribute('download', `Adveshan_Participants.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}