import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import moment, { Moment } from "moment";
import { DataService } from "./dataService";
import { AdhiveshanInput, Candidate, ParticipatingSkill, Skill, TimeSlice } from "../models/_index";


@Injectable({ providedIn: 'root' })
export class SlotsService {
  constructor(private http: HttpClient, public data: DataService) {}

  logs: string[] = [];
  tabs1: string = "&emsp;"; // /t
  tabs2: string = "&emsp;&emsp;"; // /t\t

  processCandidate(input: AdhiveshanInput, misId: string) {
    let candidateLogs: string[]=[];
    
    // 1. Get candidate by misId
    let candidate = this.data.getByMisId(misId);
    candidateLogs.push("<br>");
    candidateLogs.push(`<b>===== MisId: ${misId}, Name: ${candidate.fullName} =====</b>`);

    // 2. Get candidate's unassigned skills
    let unassignedPSKs = this.data.getUnassignedPSKs(candidate.misId!);
    let unassignedPSKNames = unassignedPSKs?.map(c=>c.name);
    candidateLogs.push(`Candidate's unassignedPSK ${JSON.stringify(unassignedPSKNames)}`);

    // Iterate over UnassignedPSKs
    unassignedPSKs:
    for (let unassignedPSKIndex = 0; unassignedPSKIndex < unassignedPSKs!.length; unassignedPSKIndex++) {
      let unassignedPSK = unassignedPSKs![unassignedPSKIndex];

      candidateLogs.push(`<br>Processing unassingedPSK ${unassignedPSK.name}`);

      // Get skill rooms' available slots
      let roomSlots = this.data.getAvailableSlotsOfRoom(unassignedPSK.name);
      candidateLogs.push(`getAvailableSlotsOfRoom ${roomSlots.length}`);

      // Iterate over room slots
      roomSlots:
      for (let roomSlotIndex = 0; roomSlotIndex < roomSlots.length; roomSlotIndex++) {
        let roomSlot = roomSlots[roomSlotIndex];

        candidateLogs.push(`<br>Processing room slot ${JSON.stringify(roomSlot)}`);

        // get assigned PSKs to check for overlapping of current room slot
        let assignedPSKs = this.data.getAssignedPSKs(candidate.misId!);

        candidateLogs.push(`getAssignedPSKs ${assignedPSKs?.length}`);

        // overlapping result
        let overlapping = this.isSlotOverlappingWithAlreadyAssignedPSKs(roomSlot, assignedPSKs!);
        candidateLogs.push(`Check for overlapping ${JSON.stringify(overlapping)}`);

        let isSatisfyingGapCriteria = this.isSatisfyingGapCriteria(candidate, roomSlot, input.minSpaceBetweenTwoTests, candidateLogs);
        candidateLogs.push(`isSatisfyingGapCriteria: ${isSatisfyingGapCriteria}`);

        if (overlapping.isAvailable && isSatisfyingGapCriteria == true && roomSlot.isBreakTime !== true) {
          // if room slot is not overlapping, assign to candidate

          candidateLogs.push(`assignSlotToPSK`);

          let assignmentResult = this.data.assignSlotToPSK(misId, unassignedPSK.name, roomSlot);

          // roomSlot = assignmentResult!.slot;
          // candidate = assignmentResult!.candidate;
          // unassignedPSK = assignmentResult!.psk;

          // candidateLogs.push(`assignSlotToPSK.slot ${JSON.stringify(assignmentResult?.slot)}`);
          // candidateLogs.push(`assignSlotToPSK.candidate ${JSON.stringify(assignmentResult!.candidate)}`);
          // candidateLogs.push(`assignSlotToPSK.psk ${JSON.stringify(assignmentResult!.psk)}`);
          
          //candidateLogs.push(`rooms ${JSON.stringify(this.data.rooms)}`);

          // roomSlots = this.data.getAvailableSlotsOfRoom(unassignedPSK.name);
          // candidateLogs.push(`getAvailableSlotsOfRoom ${roomSlots.length}`);

          break roomSlots;
        }
      }
    }

    candidate.participatingSkills = this.sortByProperty(candidate.participatingSkills!, "sliceStart");

    candidateLogs.forEach(log => {
      this.logs.push(log);
    });
    
    // let skillRooms = this.data.rooms.filter(r => unassignedPSKNames!.indexOf(r.skill) >=0);
    // candidateLogs.push(`${this.tabs1} skillRooms: ${skillRooms.length}`);

    //    3.1 make sure the slot is not over lapping the candidate's already assign slots
    //    3.2 make sure these available slot has gap of X mins from candidate's last assign slot

    // 4. Get the earliest slot from the available slots

    // 5. assign this earliest slot to candidate skill

    // 6. assign misId to this earliest slot

    // 7. Repeat step 2

  }

  /*
  processCandidate_V2(input: AdhiveshanInput, misId: string) {
    //console.log(`AdhiveshanParticipant ${ JSON.stringify(candidate)}`);

    let candidateLogs: string[]=[];
    //this.logs = [];

    let candidate = this.data.getByMisId(misId);
    candidateLogs.push("<br>");
    candidateLogs.push(`<b>===== MisId: ${misId}, Name: ${candidate.fullName} =====</b>`);

    // Get candidate unassigned skills
    let unassignedPSKs = this.data.getUnassignedPSKs(candidate.misId!);
    let unassignedPSKNames = unassignedPSKs?.map(c=>c.name);

    candidateLogs.push(`Candidate's unassignedPSK ${JSON.stringify(unassignedPSKNames)}`);

    // Iterate over unassignedPSKs

    for (let uPSKIndex = 0; uPSKIndex < unassignedPSKs!.length; uPSKIndex++) {
    //while (unassignedPSKs!.length > 0) {
      //unassignedPSKs = candidate.participatingSkills.filter(s => s.sliceNumber == null || s.sliceNumber == undefined);

      candidateLogs.push(`${this.tabs1} unassignedPSKs.length: ${unassignedPSKs?.length}`);

      // Get the skill names for unassignedPSKs
      let unassignedSkills = unassignedPSKs?.map(s=>s.name);
      candidateLogs.push(`${this.tabs1} unassignedSkills: ${JSON.stringify(unassignedPSKs)}`);

      // Get the skill rooms for unassignedPSKs
      let skillRooms = this.data.rooms.filter(r => unassignedSkills!.indexOf(r.skill) >=0);
      candidateLogs.push(`${this.tabs1} skillRooms: ${skillRooms.length}`);

      let availableSlots: Slot[] = [];
      //let lastAssignedSlot: Skill | null = null;

      // iterate over each skill room to get unassigned Slots
      for (let skIndex = 0; skIndex < skillRooms.length; skIndex++) {
        const room = skillRooms[skIndex];
        
        // Iterate over skillRoom's available slots
        let roomSlots = room.slots.filter(s => s.misId == null);
        for (let roomSlotIndex = 0; roomSlotIndex < roomSlots.length; roomSlotIndex++) {
          let availableSlot = roomSlots[roomSlotIndex];
        //room.slots.filter(s => s.misId == null).forEach(availableSlot => {              

          // Get Participants already assigned skills
          let assignedPSKs = this.data.getAssignedPSKs(misId);
          let result = this.isSlotOverlappingWithAlreadyAssignedPSKs(availableSlot, assignedPSKs!);

          if (result.isAvailable) {
            availableSlots.push(availableSlot);
          }
          //logs.push(`${tabs2} skillRoom.availableSlots: ${availableSlots}`);
        }
      }

      if(availableSlots?.length > 0){
        availableSlots = this.sortByProperty(availableSlots, "sliceStart");
        //let firstAvailableSlot = availableSlots[0];
        let firstAvailableSlot: Slot | null = null;

        for (let aslIndex = 0; aslIndex < availableSlots.length; aslIndex++) {
          const asl = availableSlots[aslIndex];

            //if(candidate.hasHostCenter != true)

            let lastAssignedSlot = this.data.getLastAssignedSlot(candidate.misId!);

            let isSatisfyingGapCriteria = this.isSatisfyingGapCriteria(candidate, asl, input.minSpaceBetweenTwoTests, candidateLogs);
            candidateLogs.push(`${this.tabs2}Skill: ${asl.skill}, 
              lastAssignedSlot: ${lastAssignedSlot?.sliceEndMoment?.format(Constants.TimeFormat)}, 
              availableSlot: ${asl?.sliceStart}, 
              isSatisfyingGapCriteria: ${isSatisfyingGapCriteria}`);

            if(isSatisfyingGapCriteria == true){
              firstAvailableSlot = asl;
              break;
            }
            else {
              // alert(`misId: ${misId}, 
              //        availableSlots: ${availableSlots.length}, 
              //        asl.skill: ${asl?.skill},
              //        lastAssignedSlot: ${lastAssignedSlot?.sliceStartMoment?.format(Constants.TimeFormat)}
              //        firstAvailableSlot: ${firstAvailableSlot}`);
            }
        }

        let unassignedPSK = unassignedPSKs?.filter(c=>c.name == firstAvailableSlot?.skill)[0];

        candidateLogs.push(`${this.tabs2} availableSlots.sort by start time: ${availableSlots.length}`);
        candidateLogs.push(`${this.tabs2} availableSlots.firstAvailableSlot: ${firstAvailableSlot?.sliceStartMoment?.format(Constants.TimeFormat)}`);
        candidateLogs.push(`${this.tabs2} firstAvailableSlot's unassignedPSK: ${unassignedPSK?.name}`);

        //alert(`misId: ${misId}, availableSlots: ${availableSlots.length}, firstAvailableSlot: ${firstAvailableSlot}`);

        if(unassignedPSK){
          let r = this.data.assignSlotToPSK(candidate.misId!, unassignedPSK.name, firstAvailableSlot!);
          candidateLogs.push(`${this.tabs2} assignSlotToPSK's result: ${r}`);

          // if(r){
          //   candidate = r.candidate;
          //   unassignedPSK = r.psk;
          //   firstAvailableSlot = r.slot;
          // }
        }
      }

      unassignedPSKs = this.data.getUnassignedPSKs(candidate.misId!);
    }
   
    candidate.participatingSkills = this.sortByProperty(candidate.participatingSkills!, "sliceStart");

    //if(misId == "28433")
      {
        candidateLogs.forEach(log => {
          this.logs.push(log);
        });
    }
  }
  */

  sortByProperty<T, K extends keyof T>(array: T[], property: K): T[] {
    return array.sort((a, b) => {
      if (a[property] < b[property]) {
        return -1; // a comes before b
      }
      if (a[property] > b[property]) {
        return 1;  // a comes after b
      }
      return 0; // a and b are equal
    });
  }

  isSlotOverlappingWithAlreadyAssignedPSKs(availableSlot: TimeSlice, assignedPSKs: ParticipatingSkill[]){
    let isAvailable: boolean = true;
    let hasAnyAssignedPSK: boolean = false;
    for (let m = 0; m < assignedPSKs.length; m++) {
      if (!isAvailable) continue;

      const assignedPSK = assignedPSKs[m];
      hasAnyAssignedPSK = true;

      // Check whether slot is not overlapping with other slots
      if (isAvailable && this.isSlotOverlappingWithAlreadyAssignedPSK(availableSlot, assignedPSK)) {
        isAvailable = false;
      }
    }

    if (!hasAnyAssignedPSK) isAvailable = true;

    return {isAvailable, hasAnyAssignedPSK};
  }

  isSlotOverlappingWithAlreadyAssignedPSK(slot: TimeSlice, psk: ParticipatingSkill): boolean {
    let sliceStart: Moment = moment(slot.sliceStart, Constants.DateTimeFormat);
    let sliceEnd: Moment = moment(slot.sliceEnd, Constants.DateTimeFormat);
    let bookedStart: Moment = moment(psk.sliceStart, Constants.DateTimeFormat);
    let bookedEnd: Moment = moment(psk.sliceEnd, Constants.DateTimeFormat);

    let isOverlapping: boolean = false;

    // Check for overlapping time slots
    if (
        // sliceStart == bookedStart && sliceEnd == bookedEnd
      (sliceStart.isSame(bookedStart) && sliceEnd.isSame(bookedEnd)) ||

        // sliceStart == bookedStart && sliceEnd < bookedEnd
      (sliceStart.isSame(bookedStart) && sliceEnd.isBefore(bookedEnd)) ||

      // sliceStart > bookedStart && sliceStart < bookedEnd
      (sliceStart.isAfter(bookedStart) && sliceStart.isBefore(bookedEnd)) ||

      // sliceEnd > bookedStart && sliceEnd < bookedEnd
      (sliceEnd.isAfter(bookedStart) && sliceEnd.isBefore(bookedEnd)) ||

      // sliceStart < bookedStart && sliceEnd > bookedEnd
      (sliceStart.isBefore(bookedStart) && sliceEnd.isAfter(bookedEnd)) ||

      // sliceStart == bookedStart && sliceEnd > bookedEnd
      (sliceStart.isSame(bookedStart) && sliceEnd.isAfter(bookedEnd))
    ) {
      isOverlapping = true;
    }

    // if (roomSkill === "Neelkanth") {
    //   //console.log("Booked Skill:", psk.name, "-", "Room Skill:", roomSkill);
    //   console.log("Booked Skill:", psk.name, psk.sliceStart, "-", psk.sliceEnd, isAvailable);
    // }
    return isOverlapping;
  }

  isSatisfyingGapCriteria(candidate: Candidate, roomSlot: TimeSlice, minSpaceBetweenTwoTests?: number, candidateLogs?: string[]){
    let assignedPSKs = this.data.getAssignedPSKs(candidate.misId!);
    //  candidate.participatingSkills?.filter(s => s.sliceNumber != null);

    // Get last assigned slot
    let lastAssignedSlot = assignedPSKs && assignedPSKs.length > 0 
                                    ? assignedPSKs[assignedPSKs.length-1]
                                    : null;

    if(!lastAssignedSlot){
      //alert(`1 -> misId: ${candidate.misId}, assignedPSKs: ${assignedPSKs?.length}, lastAssignedSliceEndTime: ${lastAssignedSliceEndTime}`);
      //candidateLogs?.push(`${this.tabs2}isSatisfyingGapCriteria: (${lastAssignedSliceEndTime} ${roomSlot.sliceStartMoment?.format()}): true`);
      //console.log("isSatisfyingGapCriteria:", "lastAssignedSliceEndTime:" + lastAssignedSliceEndTime, availableSlot.sliceStart, true);
      return true;
    }

    let lastAssignedSlotTime = lastAssignedSlot.sliceEndMoment! < roomSlot.sliceStartMoment! 
                                ? lastAssignedSlot.sliceEndMoment 
                                : lastAssignedSlot.sliceStartMoment;
    let slotTime = lastAssignedSlot.sliceEndMoment! < roomSlot.sliceStartMoment! 
                    ? roomSlot.sliceStartMoment
                    : roomSlot.sliceEndMoment;

    let diff = Constants.timeDiff(lastAssignedSlotTime!, slotTime!);
    if(diff < 0)
      diff = diff * (-1);

    let result =  diff >= minSpaceBetweenTwoTests!;

    //candidateLogs?.push(`${this.tabs2}isSatisfyingGapCriteria: (${lastAssignedSlotTime?.format(Constants.TimeFormat)} ${slotTime?.format(Constants.TimeFormat)}): ${result}`);

      // if(!result)
      //   alert(`misId: ${candidate.misId}, 
      //   assignedPSKs: ${assignedPSKs?.length}, 
      //   skill: ${roomSlot.skill},

      //   lastAssignedSliceEndTime: ${lastAssignedSliceEndTime?.format(Constants.TimeFormat)},
      //   roomSlot: ${roomSlot.sliceStartMoment?.format(Constants.TimeFormat)},
      //   diff: ${diff}
      //   `);

    return result;
  }
}