import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Dashboard } from './app/modules/dashboard/dashboard';
import { Users } from './app/modules/users/users';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        children: [
            { path: '', component: Dashboard },
            { path: 'pages', loadChildren: () => import('./app/modules/modules.routes') },
            { path: 'users', component: Users },

        ]
    },
    { path: 'auth', loadChildren: () => import('./app/modules/auth/auth.routes') },
    { path: '**', redirectTo: '/notfound' }
];
