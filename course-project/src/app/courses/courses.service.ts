import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import CourseInterface from './models/course.model';

@Injectable({
  providedIn: 'root'
})
export default class CoursesService {

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<CourseInterface[]> {
    return this.http.get<CourseInterface[]>("http://localhost:3000/courses");
  }

  deleteCourse(courseId: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/courses/${courseId}`);
  }

  addNewCourse(course:  CourseInterface): Observable<any>{
    if (course.id){
      return this.http.put(`http://localhost:3000/courses/${course.id}`, course);
    }
    return this.http.post('http://localhost:3000/courses', course);
  }

  getById(courseId: number): Observable<CourseInterface>{
    return this.http.get<CourseInterface>(`http://localhost:3000/courses/${courseId}`);
  }

  public joinCourse(course: CourseInterface): Observable<any> {
    return this.http.put(`http://localhost:3000/courses/${course.id}`, course);
  }

  public ratingTask(course: CourseInterface): Observable<any> {
    return this.http.put(`http://localhost:3000/courses/${course.id}`, course);
  }
}
