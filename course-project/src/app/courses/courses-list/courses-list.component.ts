import { Component, OnInit } from '@angular/core';
import CourseInterface from '../models/course.model';
import CoursesService from '../courses.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  courses: CourseInterface[] = [];
  isLogged: boolean = false;

  constructor(private coursesService: CoursesService,
              private router: Router,
              private authService: AuthService) {
                this.isLogged = this.authService.isLogged(); 
  }

  ngOnInit() {
    this.coursesService.getAllCourses().subscribe((response) =>{
        this.courses=response;
    });
  }

  onItemDeleted(courseId: number): void {
      const index = this.courses.findIndex(u => u.id === courseId);
      if(index !== -1){
        this.courses.splice(index, 1);
        this.coursesService.deleteCourse(courseId).subscribe(() => {
          console.log('Course DELETED');
        });
      }
    }

    onAddCourse(): void{
      this.router.navigateByUrl('/courses/add');
    }
}
