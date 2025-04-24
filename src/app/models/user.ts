export interface User {
    id?: string;
    userId?: number;
    region?: string;
    center?: string;

    fullName?: string;
    misId?: string;
    password?: string;
    status?: string;

    assignedRoles?: any[];
    assignedEventIds?: any[];
    assignedMandals?: any[];
    assignedSkillCategories?: any[];

    checkedIn?: boolean;

    //-------------
    assignedEvents?: any[];
  }