export interface User {
    id?: string;
    userId?: number;
    region?: string;
    center?: string;

    fullName?: string;
    bapsId?: string;
    password?: string;
    status?: string;

    assignedRoles?: any[];
    assignedEventIds?: any[];
    assignedGenders?: any[];
    assignedSkillCategories?: any[];

    checkedIn?: boolean;

    //-------------
    assignedEvents?: any[];
    assignedPermissions?: string[];
  }


export interface AuthResponseModel {

  //------ USER -------
  user?: User;

  //------ JWT -------
  userName?: string;
  accessToken?: string;
  expiresInSeconds?: number;
  expiresInMinutes?: number;
  expiresAtUtc?: Date;
  expiresAtEst?: Date;
}