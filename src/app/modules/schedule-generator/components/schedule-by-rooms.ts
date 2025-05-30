import { Component, Input, OnInit } from '@angular/core';
import moment, { Moment } from "moment";

import { AdhiveshanInput, TimeSlice } from '../../../models/_index';
import { BaseComponent } from '../../base-component/baseComponent';
import { AngularModules } from '../../../models/_angular-imports';
import { PrimeNgModules } from '../../../models/_prime-ng-imports';
import { Constants } from '../../../services/_index';

@Component({
    standalone: true,
    selector: 'app-schedule-by-rooms',
    imports: [AngularModules, PrimeNgModules],
    template: ` 
    <div class="flex flex-col md:flex-row gap-2 mt-1" style="overflow-x: auto;">
        <div *ngFor="let roomGroup of dataService.GroupByRoomName() | keyvalue">
            <div class="flex items-center justify-center whitespace-nowrap">
                <h5 class="m-0 whitespace-nowrap mr-3">{{roomGroup.key}}</h5> 
            </div>
            <div class="gap-5">
                <p-table *ngFor="let room of roomGroup.value"
                    [value]="room.timeSlices"
                    [paginator]="false"
                    [rowHover]="true"
                    [style]="{'height': '100%'}">
                    <ng-template #caption>
                        <div class="flex items-center justify-center whitespace-nowrap" >
                            <h5 class="m-0 whitespace-nowrap mr-3" style="color:{{room.color}}">{{room.skill}} &nbsp;&nbsp;(<span># {{room.timeSlices.length}} Time Slices</span>)</h5> 
                        </div>
                    </ng-template>
                    <ng-template #header>
                        <tr>
                        <th style="width: 1rem;font-weight:bold;color:{{room.color}} !important" class="whitespace-nowrap">#</th>
                        <th style="width: 1rem;font-weight:bold;color:{{room.color}} !important" class="whitespace-nowrap ">Time Slice</th>
                        <th class="whitespace-nowrap" style="color:brown">Participant MIS Id</th>
                        </tr>
                    </ng-template>
                    <ng-template #body let-slot>
                        <tr style="color:{{ slot.isBreakTime ? 'red' : room.color}};text-decoration: {{ slot.isBreakTime ? 'line-through' : 'none'}};">
                            <td>{{slot.sliceNumber}}</td>
                            <td class="whitespace-nowrap"><i class="fa-regular fa-clock mr-1"></i> {{slot.sliceStartMoment.format("HH:mm")}} - {{slot.sliceEndMoment.format("HH:mm")}}</td>
                            <td style="color:brown"> 
                                <i *ngIf="slot.misId" class="fa-solid fa-graduation-cap mr-1"></i> {{slot.misId}}
                                <i *ngIf="slot.isLunchBreak" class="fa-solid fa-utensils fa-lg" style="text-color:green"></i>
                                <i *ngIf="slot.isTeaBreak" class="fa-solid fa-mug-hot fa-lg"></i>
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        </div>
    </div>

    `
})
export class ScheduleByRooms extends BaseComponent implements OnInit {
    @Input() input!: AdhiveshanInput;

    ngOnInit(): void {
    }

    shortDate(date: string){
        return moment(date, Constants.DateTimeFormatShort);
    }

    generateRoomsAndTimeSlices(input: AdhiveshanInput): void {

        this.input = input;

        // reset rooms
        //this.data.rooms = [];

        // reset candidates
        this.dataService.candidates.forEach(candidate=> {
            candidate.participatingSkills?.forEach(psk => {
                psk.sliceNumber = undefined;
                psk.sliceStart = undefined;
                psk.sliceEnd = undefined;
                psk.sliceStartMoment = undefined;
                psk.sliceEndMoment = undefined;
            });
        });

        if(!this.input || !this.input.skills)
            return;

        this.generateTimeSlices();
    }

    generateTimeSlices(){

        this.dataService.rooms.forEach((room) => {
            const timeSlices: TimeSlice[] = [];
            let sliceNumber = room.roomNumber + 1;
            const now: Date = new Date();

            let currentTime = moment(`${this.input.examDateOnly} ${room.roomStartTime}`, Constants.DateTimeFormat);
            let spillOverTime = moment(`${this.input.examDateOnly} ${room.roomEndTime}`, Constants.DateTimeFormat);

            let skill = this.input.skills!.filter((s: { name: string; })=>s.name == room.skill)[0];

            let sliceEnd = moment(currentTime).add(room.duration, "minutes");

            while (sliceEnd <= spillOverTime) {
                sliceEnd = moment(currentTime).add(room.duration, "minutes");
        
                let break1Start = moment(`${this.input.examDateOnly} ${this.input.break1StartTime}`);
                let break1End = moment(`${this.input.examDateOnly} ${this.input.break1EndTime}`);
                let break2Start = moment(`${this.input.examDateOnly} ${this.input.break2StartTime}`);
                let break2End = moment(`${this.input.examDateOnly} ${this.input.break2EndTime}`);

                let isLunchBreak = (currentTime.isSameOrAfter(break1Start) && currentTime.isBefore(break1End));
                let isTeaBreak = (currentTime.isSameOrAfter(break2Start) && currentTime.isBefore(break2End));

                let slt = {
                    skill: skill.name,
                    sliceNumber: sliceNumber++,
                    sliceStart: currentTime.format(Constants.DateTimeFormat),
                    sliceEnd: sliceEnd.format(Constants.DateTimeFormat),
                    sliceStartMoment: currentTime,
                    sliceEndMoment: sliceEnd,
                    isSpillOver: moment(currentTime).isAfter(spillOverTime),
                    isBreakTime: isLunchBreak == true || isTeaBreak == true,
                    isLunchBreak: isLunchBreak == true,
                    isTeaBreak: isTeaBreak == true,
                };
                timeSlices.push(slt);
            
                currentTime = sliceEnd;
            }
        
            room.timeSlices = timeSlices;
        });
    }
}
