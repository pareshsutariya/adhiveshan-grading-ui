export interface Grade {
  gradeId?: number;
  misId?: number;
  gradingTopicId?: number;
  score?: number;
  proctorUserId: number;

  // ----------

  topicName?: string,
  sequence?: number;
  skill?: string,
  category?: string,
  color?: string,
  skillWithCategory?: string;
}