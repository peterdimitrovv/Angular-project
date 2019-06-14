import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainViewComponent } from './layout/main-view/main-view.component';
import { RouterModule } from '@angular/router';
import UsersService from './users/users.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import CoursesService from './courses/courses.service';

import {TooltipModule} from '../../node_modules/ngx-bootstrap';
import { routes } from './routes';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainViewComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule.forRoot(routes),
    TooltipModule.forRoot(),
    
  ],
  providers: [UsersService, CoursesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
