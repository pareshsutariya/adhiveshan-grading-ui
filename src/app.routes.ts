import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/modules/dashboard/dashboard';
import { Users } from './app/modules/users/users';
import { ImportParticipants } from './app/modules/participants/import-participants';
import { Notfound } from './app/modules/auth/notfound';
import { RolePermissionsList } from './app/modules/rolePermissions/rolePermissionsList';
import { Events } from './app/modules/competitionEvents/events';
import { SkillCategoriesList } from './app/modules/skill-categories/skill-categories-list';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'import-participants', component: ImportParticipants },
            { path: 'users', component: Users },
            { path: 'events', component: Events },
            { path: 'rolePermissions', component: RolePermissionsList },
            { path: 'skill-categories', component: SkillCategoriesList },
            { path: '**', component: Notfound }
        ]
    },
    { path: 'auth', loadChildren: () => import('./app/modules/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
