import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/modules/dashboard/dashboard';
import { Users } from './app/modules/users/users';
import { ImportParticipants } from './app/modules/participants/import-participants';
import { Notfound } from './app/modules/auth/notfound';
import { RolePermissionsList } from './app/modules/role-permissions/role-permissions-list';
import { Events } from './app/modules/competitionEvents/events';
import { SkillCategoriesList } from './app/modules/skill-categories/skill-categories-list';
import { GradingCriteriasList } from './app/modules/grading-criterias/grading-criterias-list';
import { GradingParticipants } from './app/modules/grading-participants/grading-participants';
import { RegionCentersList } from './app/modules/region-centers/region-centers-list';
import { Login } from './app/modules/auth/login';
import { Access } from './app/modules/auth/access';
import { GradedParticipantsList } from './app/modules/graded-participants/graded-participants-list';
import { AuthGuard } from './app/services/auth.guard';
import { PermissionsEnum } from './app/services/_index';
import { ScheduleGenerator } from './app/modules/schedule-generator/schedule-generator';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard, canActivate: [AuthGuard] },
            { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard] },

            { path: 'import-participants', component: ImportParticipants, canActivate: [AuthGuard], data: { permissions: [PermissionsEnum.Participants_View] } },
            //{ path: 'import-participants', component: ImportParticipants },
            { path: 'skill-categories', component: SkillCategoriesList, canActivate: [AuthGuard], data: { permissions: [PermissionsEnum.Skill_Categories_View] } },
            { path: 'region-centers', component: RegionCentersList, canActivate: [AuthGuard], data: { permissions: [PermissionsEnum.Regions_Centers_View] } },
            
            { path: 'events', component: Events, canActivate: [AuthGuard], data: { permissions: [PermissionsEnum.Events_View] } },

            { path: 'grading-criterias', component: GradingCriteriasList, canActivate: [AuthGuard], data: { permissions: [PermissionsEnum.Grading_Questions_View] } },
            { path: 'grading-participants', component: GradingParticipants, canActivate: [AuthGuard], data: { permissions: [PermissionsEnum.Grading_Participants_Search_Participants] } },
            { path: 'graded-participants', component: GradedParticipantsList, canActivate: [AuthGuard], data: { permissions: [PermissionsEnum.Grading_Participants_View_Participants_Grade] } },

            { path: 'schedule-generator', component: ScheduleGenerator, canActivate: [AuthGuard], data: { permissions: [PermissionsEnum.Schedules_View] } },

            { path: 'users', component: Users, canActivate: [AuthGuard], data: { permissions: [PermissionsEnum.Users_NationalAdmins_View, PermissionsEnum.Users_RegionalAdmins_View, PermissionsEnum.Users_Judges_View, PermissionsEnum.Users_CheckIns_View] } },
            { path: 'rolePermissions', component: RolePermissionsList, canActivate: [AuthGuard], data: { permissions: [PermissionsEnum.Users_NationalAdmins_View] } },

            //{ path: '**', component: Notfound }
        ]
    },
    { path: 'login', component: Login  },
    { path: 'access', component: Access  },
    { path: 'notfound', component: Notfound },

    //{ path: 'auth', loadChildren: () => import('./app/modules/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
