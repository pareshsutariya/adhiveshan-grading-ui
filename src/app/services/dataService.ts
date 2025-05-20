import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import moment, { Moment } from "moment";
import { AdhiveshanInput, Candidate, Room, TimeSlice } from "../models/_index";

@Injectable({ providedIn: 'root' })
export class DataService {

    candidates: Candidate[] = [];
    rooms: Room[] = [];

    constructor(private http: HttpClient) {}

    getByMisId(misId:string){
        return this.candidates.filter(c=>c.misId == misId)[0];
    }

    getUnassignedPSKs(misId: string){
        let candidate = this.getByMisId(misId);
        return candidate?.participatingSkills?.filter(s => s.sliceNumber == null || s.sliceNumber == undefined);
    }

    getAssignedPSKs(misId: string){
        let candidate = this.getByMisId(misId);
        return candidate?.participatingSkills?.filter(s => s.sliceNumber != null && s.sliceNumber != undefined);
    }
  
    getLastAssignedSlot(misId: string){
        let candidate = this.getByMisId(misId);
        let assignedPSKs = candidate?.participatingSkills?.filter(s => s.sliceNumber != null);
        let lastAssignedSlot = assignedPSKs![assignedPSKs!.length-1];

        return lastAssignedSlot;
    }

    getAvailableSlotsOfRoom(skillName: string) {
    
        let slots: TimeSlice[] = [];

        this.rooms.filter(r=>r.skill == skillName).forEach(room => {
            slots.push(...room.timeSlices.filter(sl=>sl.misId == null || sl.misId == undefined));
        });

        slots = this.sortByProperty(slots, "sliceStartMoment");

        return slots;

    //    return this.rooms.filter(r=>r.skill == skillName)[0]
    //                     .slots.filter(sl=>sl.misId == null || sl.misId == undefined);

    }

    assignSlotToPSK(misId: string, skillName: string, slot?: TimeSlice){

        if(slot == null || misId == null)
          return null;

        let candidate = this.getByMisId(misId);
        let psk = candidate.participatingSkills?.filter(s=>s.name == skillName)[0]!;
  
        psk.sliceNumber = slot.sliceNumber;
        psk.sliceStart = slot.sliceStart;
        psk.sliceEnd = slot.sliceEnd;
  
        psk.sliceStartMoment = slot.sliceStartMoment;
        psk.sliceEndMoment = slot.sliceEndMoment;

        slot.misId = candidate.misId;

        // alert(`${JSON.stringify(slot.sliceStart)} : ${JSON.stringify(slot.sliceStartMoment?.format(Constants.TimeFormat))},
        // ${JSON.stringify(slot.sliceEnd)} : ${JSON.stringify(slot.sliceEndMoment?.format(Constants.TimeFormat))},
        // `);
        
        return {candidate, psk, slot};
    }

    addRoom(skill: string, input: AdhiveshanInput, defaultRoom: boolean = false){

      let room : Room = { roomNumber: 0, 
        skill: skill, 
        duration: 0, 
        defaultRoom: defaultRoom, 
        roomStartMoment : moment(input.examStartDate, Constants.DateTimeFormat),
        roomEndMoment : moment(input.examStartDate, Constants.DateTimeFormat),
        roomStartTime: Constants.ExamStartTime,
        roomEndTime: Constants.ExamEndTime,
        timeSlices: [] };

      room = this.setRoomDurationAndColor(skill, room);

      this.rooms.push(room);

      // assign room number
      for (let index = 0; index < this.rooms.length; index++) {
        const room = this.rooms[index];

        room.roomNumber = (index + 1) * 1000;

        //if(room.defaultRoom == true)
        if(!room.roomName)
          room.roomName = `Room - ${ index < 9 ? '0'+(index + 1) : (index + 1)}`;
      }

      // Sort Rooms By Name
      this.SortRoomsByName();
    }

    removeRoom(index: number, input: AdhiveshanInput, defaultRoom: boolean = false){

      //let index = this.rooms.findIndex(c=>c.skill == skill && c.defaultRoom != true);

      this.rooms.splice(index, 1);
    }

    setRoomDurationAndColor(skill: string, room: Room){
      switch (skill) {        

        case "Emcee: Sahajanand":
          room.duration = Constants.EmceeSahajanandDuration;
          room.color = Constants.EmceeColor;
          break;
        case "Emcee: Neelkanth":
          room.duration = Constants.EmceeNeelkanthDuration;
          room.color = Constants.EmceeColor;

          break;
        case "Emcee: Shri Hari":
          room.duration = Constants.EmceeShriHariDuration;
          room.color = Constants.EmceeColor;
          break;
        case "Emcee: Ghanshyam":
          room.duration = Constants.EmceeGhanshyamDuration;
          room.color = Constants.EmceeColor;
          break;
        case "Emcee: Harikrishna":
          room.duration = Constants.EmceeHariKrishnaDuration;
          room.color = Constants.EmceeColor;
          break;

        case "Pravachan: Ghanshyam":
          room.duration = Constants.PravachanGhanshyamDuration;
          room.color = Constants.PravachanColor;
          break;

        case "Pravachan: Neelkanth":
          room.duration = Constants.PravachanNeelkanthDuration;
          room.color = Constants.PravachanColor;
          break;

        case "Pravachan: Sahajanand":
          room.duration = Constants.PravachanSahajanandDuration;
          room.color = Constants.PravachanColor;
          break;
    
        case "Pravachan: Harikrishna":
          room.duration = Constants.PravachanHarikrishnaDuration;
          room.color = Constants.PravachanColor;
          break;
    
        case "Pravachan: Shri Hari":
          room.duration = Constants.PravachanShriHariDuration;
          room.color = Constants.PravachanColor;
          break;
        /*
        case "Sampark: Akshar":
          room.duration = Constants.SamparkAksharDuration;
          room.color = Constants.SamparkColor;
          break;
        case "Sampark: Brahm":
          room.duration = Constants.SamparkBrahmDuration;
          room.color = Constants.SamparkColor;
          break;
        case "Sampark: Nirgun":
          room.duration = Constants.SamparkNirgunDuration;
          room.color = Constants.SamparkColor;
          break;
        case "Vyaktigat Kirtan Gaan":
          room.duration = Constants.VyaktigatKirtanGaanDuration;
          room.color = Constants.VyaktigatKirtanGaanColor;
          break;          
        case "TedTalk":
          room.duration = Constants.TedTalkDuration;
          room.color = Constants.TedTalkColor;
          break;
        */
        default:
          break;
      }

      return room;
    }

    SortRoomsByName(){
      this.rooms = this.sortByProperty(this.rooms, "roomName");

      this.GroupByRoomName();
    }

    GroupByRoomName(){
      let groupedByRoomName = this.groupBy(this.rooms, room => room.roomName!);
      //let result =  Object.entries(groupedByRoomName);

      //console.log(result);

      return groupedByRoomName;
    }

    GetRoomCount(){
      let groupedByRoomName = this.groupBy(this.rooms, room => room.roomName!);
      let result =  Object.entries(groupedByRoomName);

      //console.log(result);

      return result.length;
    }

    getAssignedCount(skill: string){
      let total = 0;

      for (let candidate of this.candidates) {
        if (candidate.participatingSkills!.filter(psk=>psk.name == skill && psk.sliceNumber != null && psk.sliceNumber != undefined).length > 0) {
            total++;
        }
      }

      return total;
    }

    getUnAssignedCount(skill: string){
      let total = 0;

      for (let candidate of this.candidates) {
        if (candidate.participatingSkills!.filter(psk=>psk.name == skill && !psk.sliceNumber).length > 0) {
          total++;
        }
      }

      return total;
    }

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

    groupBy<T, K extends keyof any>(list: T[], getKey: (item: T) => K): Record<K, T[]> {
      return list.reduce((previous, currentItem) => {
        const group = getKey(currentItem);
        if (!previous[group]) {
          previous[group] = [];
        }
        previous[group].push(currentItem);
        return previous;
      }, {} as Record<K, T[]>);
    }
}