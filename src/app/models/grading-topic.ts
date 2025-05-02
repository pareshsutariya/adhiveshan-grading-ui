export interface GradingTopic {
    gradingTopicId?: number;
    skillCategoryId?: number;
    name?: string,
    description?: string,
    sequence?: number;
    maximumMarks?: number;
    status?: string;

    // ----------
    skill?: string,
    category?: string,
    color?: string,
  }