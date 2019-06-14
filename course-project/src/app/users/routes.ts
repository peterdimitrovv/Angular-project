import { Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersComponent } from './users.component';
import { AddComponent } from './add/add.component';

export const routes: Routes = [
    {
        path: '',
        component: UsersComponent,
        children: [
            {
                path: 'list',
                component: UsersListComponent
            },
            {
                path: 'add',
                component: AddComponent
            },
            {
                path: 'add/:id',
                component: AddComponent
            }
        ]

    }
];