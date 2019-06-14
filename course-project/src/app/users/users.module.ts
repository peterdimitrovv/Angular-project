import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersCardComponent } from './users-card/users-card.component';
import { UsersComponent } from './users.component';
import { RouterModule } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { routes } from './routes';

@NgModule({
  declarations: [UsersListComponent, UsersCardComponent, UsersComponent, AddComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UsersModule { }
