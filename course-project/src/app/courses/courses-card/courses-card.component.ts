import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import CourseInterface from '../models/course.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import CoursesService from '../courses.service';
import JoinedUserInterface from '../models/joinedUser.model';

@Component({
  selector: 'app-courses-card',
  templateUrl: './courses-card.component.html',
  styleUrls: ['./courses-card.component.css']
})
export class CoursesCardComponent implements OnInit {

  @Input() course: CourseInterface;
  @Input() index: number;
  @Output() onDelete: EventEmitter<number> = new EventEmitter();
  isLogged: boolean = false;

  constructor(private router: Router,
              private coursesService: CoursesService,
              private authService: AuthService) { 
           this.isLogged = this.authService.isLogged();
     }
                    
  ngOnInit() {
  }

  getCourseImage(){
    return this.course.picture + "?random=" + this.index;
  }

  onDeleteClicked() {
    const role = this.authService.getLoggedUser().role;
    if(role === "admin"){ 
      this.onDelete.emit(this.course.id);
    }
    else{
      alert("You are not admin! You are not allowed to delete courses.");
    }
  }

  onCourseEdit() { 
    const role = this.authService.getLoggedUser().role;
    if(role === "admin"){
      this.router.navigate(['courses/add', this.course.id]);
    }
    else{
      alert("You are not admin! You are not allowed to edit courses.");
    }
  }

  onJoinClicked() {
    const role = this.authService.getLoggedUser().role;
    const userId = this.authService.getLoggedUser().id;
    if(role === "user"){ 
      if (this.course.joinedUsers.findIndex(u => u.id === userId) !== -1) 
      return;
    
      const joinedUser: JoinedUserInterface = {
        name: this.authService.getLoggedUser().name,
        id: userId
      };
    this.course.joinedUsers.push(joinedUser);

      this.coursesService.joinCourse(this.course).subscribe(() => {
        console.log('SUCCESS JOIN');
      });
    }
    else{
      alert ("You are admin. You cannot join courses!");
    }
  }

 onAddRating(){
    const role = this.authService.getLoggedUser().role;
    if(role === "user"){
      let value = parseInt((<HTMLInputElement>document.getElementById("rate")).value);
      this.course.rating += value;
      var rating = this.course.rating/2;
      this.course.rating = parseFloat(rating.toFixed(2));
      console.log(this.course.rating);
      console.log(rating);
      
  
      this.coursesService.ratingTask(this.course).subscribe(() => {
        console.log('SUCCESS RATE');
      });
    }
    else{
      alert ("You are admin. You cannot rate courses!");
    }
  }

  get canJoin(): boolean{
    const user = this.authService.getLoggedUser();

    if(!user){
      return false;
    }

    const userId=user.id;

    return this.course.joinedUsers.findIndex(u => u.id === userId) === -1;
    
  }

  
}
