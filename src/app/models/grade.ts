import { Participant } from "./participant";

export interface Grade {
  gradeId?: number;
  bapsId?: string;
  gradingCriteriaId?: number;
  marks?: number;
  judgeUserId: number;

  // ----------
  participant?: Participant,
  sectionName?: string,
  topicName?: string,
  sequence?: number;
  maximumMarks?: number;
  skill?: string,
  category?: string,
  color?: string,
  skillWithCategory?: string;
  judgeName?: string,
}