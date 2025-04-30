import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/modules/dashboard/dashboard';
import { Users } from './app/modules/users/users';
import { ImportParticipants } from './app/modules/participants/import-participants';
import { Notfound } from './app/modules/auth/notfound';
import { RolePermissionsList } from './app/modules/role-permissions/role-permissions-list';
import { Events } from './app/modules/competitionEvents/events';
import { SkillCategoriesList } from './app/modules/skill-categories/skill-categories-list';
import { GradingTopicsList } from './app/modules/grading-topics/grading-topics-list';
import { GradingParticipants } from './app/modules/grading-participants/grading-participants';
import { RegionCentersList } from './app/modules/region-centers/region-centers-list';
import { Login } from './app/modules/auth/login';
import { Access } from './app/modules/auth/access';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'dashboard', component: Dashboard },
            { path: 'import-participants', component: ImportParticipants },
            { path: 'users', component: Users },
            { path: 'events', component: Events },
            { path: 'rolePermissions', component: RolePermissionsList },
            { path: 'skill-categories', component: SkillCategoriesList },
            { path: 'grading-topics', component: GradingTopicsList },
            { path: 'grading-participants', component: GradingParticipants },
            { path: 'region-centers', component: RegionCentersList },
            //{ path: '**', component: Notfound }
        ]
    },
    { path: 'login', component: Login  },
    { path: 'access', component: Access  },
    { path: 'notfound', component: Notfound },

    //{ path: 'auth', loadChildren: () => import('./app/modules/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
