import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Constants } from "./_constants";
import { AdhiveshanInput, Candidate, Skill, TimeSlice } from "../models/_index";

import moment, { Moment } from "moment";
import { DataService } from "./dataService";

@Injectable({ providedIn: 'root' })
export class FileDataService {
  constructor(private http: HttpClient, public data: DataService) {}

  /*
  generateFileData(input: AdhiveshanInput, jsonData: any[]){

    let importData: Candidate[] = [];
    let eligibleData: Candidate[] = [];
    
    for (let index = 0; index < jsonData.length; index++) {
      const raw = jsonData[index];

      let eligible = raw["Speech (Pravachan) Category"] != null && raw["Speech (Pravachan) Category"] != undefined && raw["Speech (Pravachan) Category"].trim().length > 0 || 
                    raw["Emcee Category"] != null && raw["Emcee Category"] != undefined  && raw["Emcee Category"].trim().length > 0;

      if(eligible == false){
        continue;
      }

      importData.push({
        center: raw["Center"],
        registration_Status: raw["Registration Status"],
        mandal: raw["Mandal"],
        firstLastName_MISID: raw["FirstLastName-MISID"],
        speech_pravachan_category: raw["Speech (Pravachan) Category"],
        emcee_category: raw["Emcee Category"],
        gender: raw["Gender"],

        misId: raw["FirstLastName-MISID"].split("-")[1],
        fullName: raw["FirstLastName-MISID"].split("-")[0],
      });
    }

    this.data.candidates = importData;
    //input.fileData = importData;

    console.log("importData:", jsonData.length, this.data.candidates);
    console.log("eligibleData:", eligibleData.length, eligibleData);
  }
  */

  populateDataFromFile(input: AdhiveshanInput){
    this.prepareCentersFromFile(input);
    this.prepareCountsFromFile(input);
    this.prepareCandidatesParticipationSkills(input);
  }

  prepareCentersFromFile(input: AdhiveshanInput){
    let cntrs = this.data.candidates?.map(d=>d.center);
    let distinctCenters = [...new Set(cntrs)];
    input.centers = [];

    distinctCenters.forEach(c=>{
      input.centers!.push({label: c, value: c});
    });
  }

  prepareCountsFromFile(input: AdhiveshanInput){
    let emceeSahajanandCount = this.data.candidates?.filter(c => c.emcee_category != null && c.emcee_category != undefined && c.emcee_category.indexOf("Sahajanand") >= 0).length;
    let emceeNeelkanthCount = this.data.candidates?.filter(c => c.emcee_category != null && c.emcee_category != undefined && c.emcee_category.indexOf("Neelkanth") >= 0).length;
    let emceeShriHariCount = this.data.candidates?.filter(c => c.emcee_category != null && c.emcee_category != undefined && c.emcee_category.indexOf("Shri Hari") >= 0).length;
    let emceeGhanshyamCount = this.data.candidates?.filter(c => c.emcee_category != null && c.emcee_category != undefined && c.emcee_category.indexOf("Ghanshyam") >= 0).length;
    let emceeHariKrishnaCount = this.data.candidates?.filter(c => c.emcee_category != null && c.emcee_category != undefined && c.emcee_category.indexOf("Harikrishna") >= 0).length;

    let ghanshyamCount = this.data.candidates?.filter(c => c.speech_pravachan_category?.indexOf("Ghanshyam") == 0 ).length;
    let neelkanthCount = this.data.candidates?.filter(c => c.speech_pravachan_category?.indexOf("Neelkanth") == 0 ).length;
    let sahajanandCount = this.data.candidates?.filter(c => c.speech_pravachan_category?.indexOf("Sahajanand") == 0 ).length;
    let harikrishnaCount = this.data.candidates?.filter(c => c.speech_pravachan_category?.indexOf("Harikrishna") == 0 ).length;
    let shriHariCount = this.data.candidates?.filter(c => c.speech_pravachan_category?.indexOf("Shri Hari") == 0 ).length;

    //input.examStartDate = Constants.ExamStartDate;
    //input.examEndDate = Constants.ExamEndDate;

    //input.examDateOnly = Constants.ExamDate;

    //input.examStartTime = Constants.ExamStartTime;
    //input.examEndTime = Constants.ExamEndTime;

    input.break1StartTime = Constants.Break1StartTime;
    input.break1EndTime = Constants.Break1EndTime;
    input.break2StartTime = Constants.Break2StartTime;
    input.break2EndTime = Constants.Break2EndTime;
    
    input.minSpaceBetweenTwoTests = Constants.MinSpaceBetweenTwoTests;
    input.totalCandidate = this.data.candidates?.length;
    input.skills  = [
      { name: "Emcee: Sahajanand", duration: Constants.EmceeSahajanandDuration, color: Constants.EmceeColor, noOfParticipants: emceeSahajanandCount, noOfRooms: 1 },
      { name: "Emcee: Neelkanth", duration: Constants.EmceeNeelkanthDuration, color: Constants.EmceeColor, noOfParticipants: emceeNeelkanthCount, noOfRooms: 1 },
      { name: "Emcee: Shri Hari", duration: Constants.EmceeShriHariDuration, color: Constants.EmceeColor, noOfParticipants: emceeShriHariCount, noOfRooms: 1 },
      { name: "Emcee: Ghanshyam", duration: Constants.EmceeGhanshyamDuration, color: Constants.EmceeColor, noOfParticipants: emceeGhanshyamCount, noOfRooms: 1 },
      { name: "Emcee: Harikrishna", duration: Constants.EmceeHariKrishnaDuration, color: Constants.EmceeColor, noOfParticipants: emceeHariKrishnaCount, noOfRooms: 1 },

      { name: "Pravachan: Ghanshyam", duration: Constants.PravachanGhanshyamDuration, color: Constants.PravachanColor, noOfParticipants: ghanshyamCount, noOfRooms: 1 },
      { name: "Pravachan: Neelkanth", duration: Constants.PravachanNeelkanthDuration, color: Constants.PravachanColor, noOfParticipants: neelkanthCount, noOfRooms: 1 },
      { name: "Pravachan: Sahajanand", duration: Constants.PravachanSahajanandDuration, color: Constants.PravachanColor, noOfParticipants: sahajanandCount, noOfRooms: 1 },
      { name: "Pravachan: Harikrishna", duration: Constants.PravachanHarikrishnaDuration, color: Constants.PravachanColor, noOfParticipants: harikrishnaCount, noOfRooms: 1 },
      { name: "Pravachan: Shri Hari", duration: Constants.PravachanShriHariDuration, color: Constants.PravachanColor, noOfParticipants: shriHariCount, noOfRooms: 1 },

      // { name: "Sampark: Akshar", duration: Constants.SamparkAksharDuration, color: Constants.SamparkColor, noOfParticipants: samparkAksharCount, noOfRooms: 1 },
      // { name: "Sampark: Brahm", duration: Constants.SamparkBrahmDuration, color: Constants.SamparkColor, noOfParticipants: samparkBrahmCount, noOfRooms: 1 },
      // { name: "Sampark: Nirgun", duration: Constants.SamparkNirgunDuration, color: Constants.SamparkColor, noOfParticipants: samparkNirgunCount, noOfRooms: 1 },

      // { name: "TedTalk", duration: Constants.TedTalkDuration, color: Constants.TedTalkColor, noOfParticipants: tedTalkCount, noOfRooms: 1 },

      // { name: "Vyaktigat Kirtan Gaan", duration: Constants.VyaktigatKirtanGaanDuration, color: Constants.VyaktigatKirtanGaanColor, noOfParticipants: vyaktigatKirtanGaanCount, noOfRooms: 1 },
    ];

    this.data.rooms = [];

    this.data.addRoom("Emcee: Sahajanand", input, true);
    this.data.addRoom("Emcee: Neelkanth", input, true);
    this.data.addRoom("Emcee: Shri Hari", input, true);
    this.data.addRoom("Emcee: Ghanshyam", input, true);
    this.data.addRoom("Emcee: Harikrishna", input, true);

    this.data.addRoom("Pravachan: Ghanshyam", input, true);
    this.data.addRoom("Pravachan: Neelkanth", input, true);
    this.data.addRoom("Pravachan: Sahajanand", input, true);
    this.data.addRoom("Pravachan: Harikrishna", input, true);
    this.data.addRoom("Pravachan: Shri Hari", input, true);

    /*
    this.data.addRoom("Sampark: Akshar", input, true);
    this.data.addRoom("Sampark: Brahm", input, true);
    this.data.addRoom("Sampark: Nirgun", input, true);

    this.data.addRoom("TedTalk", input, true);

    this.data.addRoom("Vyaktigat Kirtan Gaan", input, true);
    */

    /*
    this.data.rooms = [
      { roomNumber: 1 * 1000, skill: "Sampark", duration: Constants.SamparkDuration, color: Constants.SamparkColor, defaultRoom: true, startTime: input.examStartDate, slots: []},
      { roomNumber: 1 * 2000, skill: "Emcee", duration: Constants.EMCeeDuration, color: Constants.EmceeColor, defaultRoom: true, startTime: input.examStartDate, slots: []},
      { roomNumber: 1 * 3000, skill: "Ghanshyam", duration: Constants.GhanshyamDuration, color: Constants.GhanshyamColor, defaultRoom: true, startTime: input.examStartDate, slots: []},
      { roomNumber: 1 * 4000, skill: "Neelkanth", duration: Constants.NeelkanthDuration, color: Constants.NeelkanthColor, defaultRoom: true, startTime: input.examStartDate, slots: []},
      { roomNumber: 1 * 5000, skill: "Sahajanand", duration: Constants.SahajanandDuration, color: Constants.SahajanandColor, defaultRoom: true, startTime: input.examStartDate, slots: []},
      { roomNumber: 1 * 6000, skill: "Harikrishna", duration: Constants.HarikrishnaDuration, color: Constants.HarikrishnaColor, defaultRoom: true, startTime: input.examStartDate, slots: []},
      { roomNumber: 1 * 7000, skill: "Shri Hari", duration: Constants.ShriHariDuration, color: Constants.ShriHariColor, defaultRoom: true, startTime: input.examStartDate, slots: []},
    ];
    */
  }

  prepareCandidatesParticipationSkills(input: AdhiveshanInput){

    this.data.candidates.forEach(candidate=> {

      candidate.participatingSkills = [];

      /*
      if(candidate.sampark_category != null && candidate.sampark_category != undefined){
        if(candidate.sampark_category.indexOf("Akshar") >= 0)
          candidate.participatingSkills.push({name: "Sampark: Akshar", duration: Constants.SamparkAksharDuration, color: Constants.SamparkColor });

        if(candidate.sampark_category.indexOf("Brahm") >= 0)
          candidate.participatingSkills.push({name: "Sampark: Brahm", duration: Constants.SamparkBrahmDuration, color: Constants.SamparkColor });

        if(candidate.sampark_category.indexOf("Nirgun") >= 0)
          candidate.participatingSkills.push({name: "Sampark: Nirgun", duration: Constants.SamparkNirgunDuration, color: Constants.SamparkColor });
      }

      if(candidate.tedtalk_category != null && candidate.tedtalk_category != undefined) {
        if(candidate.tedtalk_category?.indexOf("TedTalk") == 0)
          candidate.participatingSkills.push({name: "TedTalk", duration: Constants.TedTalkDuration, color: Constants.TedTalkColor });
      }
      */

      if(candidate.emcee_category != null && candidate.emcee_category != undefined) {
        if(candidate.emcee_category.indexOf("Sahajanand") >= 0)
          candidate.participatingSkills.push({name: "Emcee: Sahajanand", duration: Constants.EmceeSahajanandDuration, color: Constants.EmceeColor });

        if(candidate.emcee_category.indexOf("Neelkanth") >= 0)
          candidate.participatingSkills.push({name: "Emcee: Neelkanth", duration: Constants.EmceeNeelkanthDuration, color: Constants.EmceeColor });
        
        if(candidate.emcee_category.indexOf("Shri Hari") >= 0)
          candidate.participatingSkills.push({name: "Emcee: Shri Hari", duration: Constants.EmceeShriHariDuration, color: Constants.EmceeColor });
        
        if(candidate.emcee_category.indexOf("Ghanshyam") >= 0)
          candidate.participatingSkills.push({name: "Emcee: Ghanshyam", duration: Constants.EmceeGhanshyamDuration, color: Constants.EmceeColor });
        
        if(candidate.emcee_category.indexOf("Harikrishna") >= 0)
          candidate.participatingSkills.push({name: "Emcee: Harikrishna", duration: Constants.EmceeHariKrishnaDuration, color: Constants.EmceeColor });
      }

      if(candidate.speech_pravachan_category != null && candidate.speech_pravachan_category != undefined) {

        if(candidate.speech_pravachan_category?.indexOf("Ghanshyam") == 0)
          candidate.participatingSkills.push({name: "Pravachan: Ghanshyam", duration: Constants.PravachanGhanshyamDuration, color: Constants.PravachanColor });

        if(candidate.speech_pravachan_category?.indexOf("Neelkanth") == 0)
          candidate.participatingSkills.push({name: "Pravachan: Neelkanth", duration: Constants.PravachanNeelkanthDuration, color: Constants.PravachanColor });
        
        if(candidate.speech_pravachan_category?.indexOf("Sahajanand") == 0)
          candidate.participatingSkills.push({name: "Pravachan: Sahajanand", duration: Constants.PravachanSahajanandDuration, color: Constants.PravachanColor });

        if(candidate.speech_pravachan_category?.indexOf("Shri Hari") == 0)
          candidate.participatingSkills.push({name: "Pravachan: Shri Hari", duration: Constants.PravachanShriHariDuration, color: Constants.PravachanColor });

        if(candidate.speech_pravachan_category?.indexOf("Harikrishna") == 0)
          candidate.participatingSkills.push({name: "Pravachan: Harikrishna", duration: Constants.PravachanHarikrishnaDuration, color: Constants.PravachanColor });
      }
    });

    this.setCandidatePriority(input);
  }

  setCandidatePriority(input: AdhiveshanInput){
    this.data.candidates.forEach(candidate=> {

      candidate.priority = candidate.participatingSkills?.length;

      candidate.hasHostCenter = false;

      if(candidate.center == input.hostCenter){
        candidate.hasHostCenter = true;
        candidate.priority = candidate.priority ? (candidate.priority + 3) : 4;
      }
    });

    this.data.candidates = this.sortByProperty(this.data.candidates, "priority");
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
}
