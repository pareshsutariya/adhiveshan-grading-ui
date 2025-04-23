import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/modules/dashboard/dashboard';
import { Users } from './app/modules/users/users';
import { ImportParticipants } from './app/modules/participants/import-participants';
import { Notfound } from './app/modules/auth/notfound';
import { RolePermissionsList } from './app/modules/rolePermissions/rolePermissionsList';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'import-participants', component: ImportParticipants },
            { path: 'users', component: Users },
            { path: 'rolePermissions', component: RolePermissionsList },
            { path: '**', component: Notfound }
        ]
    },
    { path: 'auth', loadChildren: () => import('./app/modules/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
