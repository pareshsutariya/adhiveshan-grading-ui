import { Injectable } from "@angular/core";
import moment, { Moment } from "moment";

@Injectable({ providedIn: 'root' })
export class Constants {

  public static DateTimeFormat: string = "MM/DD/YYYY HH:mm";
  public static DateTimeFormatShort: string = "MM/DD HH:mm";

  public static ExamDate: string = "06/01/2025";

  public static ExamStartTime: string = "09:00";
  public static ExamEndTime: string = "18:00";

  public static Break1StartTime: string = "12:00";
  public static Break1EndTime: string = "13:00";

  public static Break2StartTime: string = "15:00";
  public static Break2EndTime: string = "15:30";

  public static SamparkAksharDuration: number = 12;
  public static SamparkBrahmDuration: number = 12;
  public static SamparkNirgunDuration: number = 7;
  
  public static EmceeSahajanandDuration: number = 10;
  public static EmceeNeelkanthDuration: number = 10;
  public static EmceeShriHariDuration: number = 10;
  public static EmceeGhanshyamDuration: number = 7;
  public static EmceeHariKrishnaDuration: number = 7;

  public static PravachanGhanshyamDuration: number = 8;
  public static PravachanHarikrishnaDuration: number = 8;
  public static PravachanNeelkanthDuration: number = 10;
  public static PravachanShriHariDuration: number = 10;
  public static PravachanSahajanandDuration: number = 15;

  public static VyaktigatKirtanGaanDuration: number = 10;

  public static TedTalkDuration: number = 10;

  public static SamparkColor: string = "black";
  public static EmceeColor: string = "navy";
  public static PravachanColor: string = "green";

  public static VyaktigatKirtanGaanColor: string = "orange";

  public static TedTalkColor: string = "purple";

  // public static GhanshyamColor: string = "brown";
  // public static NeelkanthColor: string = "orange";
  // public static HarikrishnaColor: string = "maroon";
  // public static ShriHariColor: string = "blue";
  
  public static MinSpaceBetweenTwoTests: number = 60;
  public static ExtraSlotsPercentage: number = 500;

  public static timeDiff(startTime: Moment, endTime: Moment) : number {
    let minutes = moment.duration(endTime.diff(startTime)).asMinutes();

    if(minutes != 0 && !isNaN(minutes))
      return minutes;
    
    return 0;
  }

  get UserStatuses(): any {
    return [
      { label: "Active", value: "Active" },
      { label: "In Active", value: "In Active" },
      { label: "Deleted", value: "Deleted" }
    ];
  }

  GetStatusTag(status: string) {
    status = status.toLowerCase();
    switch (status) {
        case 'raised':
        case 'in active':
            return 'danger';

        case 'active':
        case 'resolved':
          return 'success';

        case 'deleted':
          return 'contrast';

        default:
            return 'info';
    }
  }

  get Mandals(): any {
    return [
      //{ label: "F1 Student", value: "F1 Student", icon: "fa-solid fa-person", color: "navy" },
      //{ label: "Kishor", value: "Kishor", icon: "fa-solid fa-person", color: "navy"  },
      { label: "Yuvak", value: "Yuvak", icon: "fa-solid fa-person", color: "navy"  },
      { label: "Sanyukta", value: "Sanyukta", icon: "fa-solid fa-person", color: "navy"  },
    
      //{ label: "iF1 Student", value: "iF1 Student", icon: "fa-solid fa-person-dress", color: "brown" },
      //{ label: "Kishori", value: "Kishori", icon: "fa-solid fa-person-dress", color: "brown" },
      { label: "Yuvati", value: "Yuvati", icon: "fa-solid fa-person-dress", color: "brown" },
      { label: "Premvati", value: "Premvati", icon: "fa-solid fa-person-dress", color: "brown" },
    ];
  }


  get Genders(): any {
    return [
      { label: "Male", value: "Male", icon: "fa-solid fa-person", color: "navy"  },
      { label: "Female", value: "Female", icon: "fa-solid fa-person-dress", color: "brown" },
    ];
  }

  get SkillCategories(): any {
    return [
      { label: "Pravachan: Ghanshyam", value: "Pravachan: Ghanshyam", icon: "fa-solid fa-person", color: "black" },
      { label: "Pravachan: Neelkanth", value: "Pravachan: Neelkanth", icon: "fa-solid fa-person", color: "brown" },
      { label: "Pravachan: Sahajanand", value: "Pravachan: Sahajanand", icon: "fa-solid fa-person", color: "green" },
      { label: "Pravachan: Harikrishna", value: "Pravachan: Harikrishna", icon: "fa-solid fa-person", color: "purple" },
      { label: "Pravachan: Shri Hari", value: "Pravachan: Shri Hari", icon: "fa-solid fa-person", color: "orange" },
      
      { label: "Emcee: Ghanshyam", value: "Emcee: Ghanshyam", icon: "fa-solid fa-person", color: "black" },
      { label: "Emcee: Neelkanth", value: "Emcee: Neelkanth", icon: "fa-solid fa-person", color: "brown" },
      { label: "Emcee: Sahajanand", value: "Emcee: Sahajanand", icon: "fa-solid fa-person", color: "green" },
      { label: "Emcee: Harikrishna", value: "Emcee: Harikrishna", icon: "fa-solid fa-person", color: "purple" },
      { label: "Emcee: Shri Hari", value: "Emcee: Shri Hari", icon: "fa-solid fa-person", color: "orange" },
    ]
  }

   GetColorForSkill(skill: string) {
    return this.SkillCategories().filter((c: { label: string; })=>c.label == skill)[0].color;
  }
}
