export interface GradingTopic {
    gradingTopicId?: number;
    skillCategoryId?: number;
    name?: string,
    description?: string,
    sequence?: number;
    round?: number;
    requiredJudges?: number;
    maximumMarks?: number;
    weightageOptions?: number[];
    status?: string;

    // ----------
    skill?: string,
    category?: string,
    color?: string,
  }