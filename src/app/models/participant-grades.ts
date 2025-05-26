import { Grade, Participant } from "./_index";

export interface ParticipantGrades {
  participant: Participant;
  pravachanGrades?: Grade[];
  emceeGrades?: Grade[];
  pravachanSkill?: string;
  pravachanCategory?: string;

  emceeSkill?: string;
  emceeCategory?: string;
}