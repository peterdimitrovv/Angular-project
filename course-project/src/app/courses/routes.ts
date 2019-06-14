import { Routes } from '@angular/router';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesComponent } from './courses.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
    {
        path: '',
        component: CoursesComponent,
        children: [
            {
                path: 'list',
                component: CoursesListComponent
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

export default routes;