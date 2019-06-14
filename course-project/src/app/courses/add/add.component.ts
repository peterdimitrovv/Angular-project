import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import CoursesService from '../courses.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  courseForm: FormGroup;

  constructor(private fb: FormBuilder, private coursesService: CoursesService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { 
    const role = this.authService.getLoggedUser().role;
    if(role == "admin"){
      this.route.params.subscribe((params) => {
  
        if(params.id){
          this.coursesService.getById(params.id).subscribe((course) => {
            this.createForm();
  
            this.courseForm.patchValue({...course})
          });
        }
      });
  
      this.createForm();
    }
    else{
      alert ("You are not admin");
      this.router.navigateByUrl('courses/list');
    }
  }

  

  ngOnInit() {
  }

  private createForm(): void{
    const role = this.authService.getLoggedUser().role;
    if(role == "admin"){
      this.courseForm = this.fb.group({
        id: [''],
        title: ['', Validators.required],
        description: ['', [Validators.required, Validators.minLength(3)]],
        rating: ['', [Validators.required]],
        picture: ["https://picsum.photos/200/300",Validators.required],
        joinedUsers: [[]]
      });
    }
  }

  onFormSubmit($event): void{
    this.coursesService.addNewCourse(this.courseForm.value).subscribe(()=>{
      this.router.navigateByUrl('courses/list');
    })
  }

  get isFormValid(): boolean{
    return this.courseForm.valid;
  }

  get title() {
    return this.courseForm.get('title');
  }

  get description() {
    return this.courseForm.get('description');
  }

  get rating(){
    return this.courseForm.get('rating');
  }

  get picture() {
    return this.courseForm.get('picture');
  }
}
