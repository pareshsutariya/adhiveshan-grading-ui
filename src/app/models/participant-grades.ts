import { Grade } from "./_index";

export interface ParticipantGrades {
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

  pravachanGrades?: Grade[];
  emceeGrades?: Grade[];
}