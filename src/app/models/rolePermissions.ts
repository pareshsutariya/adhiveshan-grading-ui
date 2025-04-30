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
    proctor: boolean;
    checkIn: boolean;

    nationalAdminIcon: string;
    regionalAdminIcon: string;
    proctorIcon: string;
    checkInIcon: string;

    nationalAdminColor: string;
    regionalAdminColor: string;
    proctorColor: string;
    checkInColor: string;
  }