export interface RolePermissions {
    roleName: string;
    icon: string,
    color: string,
    permissions: string[];
  }

  export interface RolePermissionsPivot {
    permission: string;
    nationalAdmin: boolean;
    regionalAdmin: boolean;
    judge: boolean;
    checkIn: boolean;

    nationalAdminIcon: string;
    regionalAdminIcon: string;
    judgeIcon: string;
    checkInIcon: string;

    nationalAdminColor: string;
    regionalAdminColor: string;
    judgeColor: string;
    checkInColor: string;
  }