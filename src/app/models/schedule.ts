import { Time } from "@angular/common";
import moment, { Moment } from "moment";

export interface AdhiveshanInput {
  eventId?: number;

  centers?: any[];
  hostCenter?: string;
  
  examDateOnly?: string;
  
  examStartTime?: string;
  examEndTime?: string;

  examStartDate?: string;
  examEndDate?: string;

  break1StartTime?: string;
  break1EndTime?: string;
  break2StartTime?: string;
  break2EndTime?: string;

  totalCandidate?: number;
  skills?: Skill[];
  minSpaceBetweenTwoTests?: number;
}

export interface Skill {
  name: string;
  duration: number;
  noOfRooms?: number;
  color?: string;

  noOfParticipants?: number;
  noOfAssigned?: number;
  noOfPending?: number;
}

export interface Room {
  roomNumber: number;
  roomName?: string;
  skill: string;
  duration: number;
  
  roomStartTime?: string;
  roomEndTime?: string;

  roomStartMoment?: Moment;
  roomEndMoment?: Moment;

  timeSlices: TimeSlice[];
  color?: string;
  defaultRoom?: boolean;
}

export interface TimeSlice {
  skill: string;
  sliceNumber: number;
  sliceStart: string;
  sliceEnd: string;
  sliceStartMoment?: Moment;
  sliceEndMoment?: Moment;

  isBreakTime?: boolean;
  isLunchBreak?: boolean;
  isTeaBreak?: boolean;
  isSpillOver?: boolean;
  misId?: number;
}

export interface ParticipantForSchedule {
  misId?: number;
  bapsId?: string;
  region?: string;
  center?: string;
  hostCenter?: string;
  zone?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  gender?: string;
  mandal?: string;
  category?: string;

  registrationStatus?: string;
  language_For_Skill_Competitions?: string;
  
  speech_Pravachan?: string;
  speech_Pravachan_Category?: string;
  emcee?: string;
  emcee_Category?: string;

  fullName?: string;

  //------
  participatingSkills?: ParticipatingSkill[];
  priority?: number;
  hasHostCenter?: boolean;
  pendingAssignment?: boolean;
}

export interface ParticipatingSkill {
  name: string;
  duration: number;
  color?: string;

  sliceStartMoment?: Moment;
  sliceEndMoment?: Moment;

  sliceStart?: string;
  sliceEnd?: string;
  sliceNumber?: number;
}

export interface EventSchedule {
  eventId?: number;
  rooms?: Room[];
  participants?: ParticipantForSchedule[];
}