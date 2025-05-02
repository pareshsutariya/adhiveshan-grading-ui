import { Participant } from "./participant";

export interface Grade {
  gradeId?: number;
  misId?: number;
  gradingTopicId?: number;
  marks?: number;
  judgeUserId: number;

  // ----------
  participant?: Participant,
  topicName?: string,
  sequence?: number;
  maximumMarks?: number;
  skill?: string,
  category?: string,
  color?: string,
  skillWithCategory?: string;
  judgeName?: string,
}