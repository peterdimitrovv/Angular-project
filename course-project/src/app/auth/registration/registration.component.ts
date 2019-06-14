import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import UsersService from '../../users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  
  registrationForm: FormGroup;
  
  constructor(private fb: FormBuilder,
    private usersService: UsersService,
    private router: Router) { }
  ngOnInit() {
    this.registrationForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.maxLength(10)]],
      email: ['', [Validators.required]],
      role: ['user'],
      isBlocked: ['false'],
      picture: ["https://picsum.photos/200/300",Validators.required]
    });
  }

  onRegister(): void {
    this.usersService.getAllUsers().subscribe((users) => {
      const username = this.registrationForm.value.username.toLowerCase();
      if (users.find(u => u.username.toLowerCase() === username)) {
        return;
      }

      this.usersService.addNewUser(this.registrationForm.value)
        .subscribe(() => {
          this.router.navigateByUrl('auth/login');
        });

    });
  }

  get isFormValid(): boolean{
    return this.registrationForm.valid;
  }

}