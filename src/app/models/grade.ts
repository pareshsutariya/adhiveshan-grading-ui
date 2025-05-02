import { Participant } from "./participant";

export interface Grade {
  gradeId?: number;
  misId?: number;
  gradingTopicId?: number;
  score?: number;
  judgeUserId: number;

  // ----------
  participant?: Participant,
  topicName?: string,
  sequence?: number;
  skill?: string,
  category?: string,
  color?: string,
  skillWithCategory?: string;
  judgeName?: string,
}