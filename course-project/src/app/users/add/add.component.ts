import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import UsersService from '../users.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router, private route: ActivatedRoute, private authService: AuthService) { 
    const role = this.authService.getLoggedUser().role;
    if(role == "admin"){ 
      this.route.params.subscribe((params) => {
  
        if(params.id){
          this.usersService.getById(params.id).subscribe((user) => {
            this.createForm();
  
            this.userForm.patchValue({...user})
          });
        }
      });
  
      this.createForm();
    }
    else{
      alert ("You are not admin");
      this.router.navigateByUrl('users/list');
    }
  }

  ngOnInit() {
  }

  private createForm(): void{
    this.userForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required]],
      role: [''],
      isBlocked: [''],
      picture: ["https://picsum.photos/200/300",Validators.required]
    });
  }

  onFormSubmit($event): void{

    this.usersService.addNewUser(this.userForm.value).subscribe(() => {
      this.router.navigateByUrl('users/list');
    })
  }

  get isFormValid(): boolean{
    return this.userForm.valid;
  }

  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get name() {
    return this.userForm.get('name');
  }

  get email() {
    return this.userForm.get('email');
  }

  get isBlocked(){
    return this.userForm.get('isBlocked');
  }

  get role(){
    return this.userForm.get('role');
  }

  get picture() {
    return this.userForm.get('picture');
  }
}
