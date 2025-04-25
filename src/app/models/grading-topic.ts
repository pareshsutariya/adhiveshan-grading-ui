export interface GradingTopic {
    gradingTopicId?: number;
    skillCategoryId?: number;
    name?: string,
    description?: string,
    sequence?: number;
    round?: number;
    requiredProctors?: number;
    weightageOptions?: number[];
    status?: string;

    // ----------
    skill?: string,
    category?: string,
    color?: string,
  }